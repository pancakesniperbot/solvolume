// Cache for crypto data
let cachedCryptoData = null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

// Store for WebSocket connections
const connectedClients = new Set();

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle WebSocket connections
    if (request.headers.get("Upgrade") === "websocket") {
      // Create WebSocket connection
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      
      // Save the connection
      connectedClients.add(server);
      
      // Listen for WebSocket events
      server.accept();
      server.addEventListener("close", () => {
        connectedClients.delete(server);
      });
      
      // Respond to request with websocket
      return new Response(null, {
        status: 101,
        webSocket: client
      });
    }
    
    // Handle /api/crypto endpoint
    if (url.pathname === "/api/crypto") {
      const data = await getCryptoData(env);
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    
    // Serve static files
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
  
  // Scheduled task - runs every minute
  async scheduled(event, env, ctx) {
    await broadcastCryptoData(env);
  }
};

// Fetch crypto data from CryptoCompare
async function fetchCryptoCompareData() {
  try {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=SOL,WIF,BONK,JUP,PYTH&tsyms=USD"
    );
    
    if (!response.ok) {
      throw new Error("CryptoCompare API error");
    }
    
    const data = await response.json();
    
    // Format the response
    if (data && data.RAW) {
      return formatCryptoCompareData(data);
    }
    
    throw new Error("Invalid data format");
  } catch (error) {
    console.error("Error fetching from CryptoCompare:", error);
    return null;
  }
}

// Fetch data from CoinGecko (backup)
async function fetchCoinGeckoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana,dogwifhat,bonk,jupiter-exchange,pyth-network&order=market_cap_desc"
    );
    
    if (!response.ok) {
      throw new Error("CoinGecko API error");
    }
    
    const data = await response.json();
    
    // Format the response
    if (data && data.length > 0) {
      return formatCoinGeckoData(data);
    }
    
    throw new Error("Invalid data format");
  } catch (error) {
    console.error("Error fetching from CoinGecko:", error);
    return null;
  }
}

// Format CryptoCompare data
function formatCryptoCompareData(data) {
  const formattedData = [];
  const coins = {
    SOL: { id: "solana", name: "Solana", image: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
    WIF: { id: "dogwifhat", name: "dogwifhat", image: "https://assets.coingecko.com/coins/images/33085/large/wif.png" },
    BONK: { id: "bonk", name: "Bonk", image: "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg" },
    JUP: { id: "jupiter", name: "Jupiter", image: "https://assets.coingecko.com/coins/images/34417/large/jup.png" },
    PYTH: { id: "pyth-network", name: "Pyth Network", image: "https://assets.coingecko.com/coins/images/28514/large/pyth.png" }
  };
  
  for (const symbol in data.RAW) {
    if (data.RAW[symbol] && data.RAW[symbol].USD) {
      const coinInfo = data.RAW[symbol].USD;
      const coinMetadata = coins[symbol];
      
      if (coinMetadata) {
        formattedData.push({
          id: coinMetadata.id,
          name: coinMetadata.name,
          symbol: symbol,
          price: coinInfo.PRICE || 0,
          price_change_24h: coinInfo.CHANGEPCT24HOUR || 0,
          market_cap: coinInfo.MKTCAP || 0,
          volume_24h: coinInfo.VOLUME24HOUR || 0,
          // Random sentiment value (50-100 range)
          sentiment: Math.floor(Math.random() * 50) + 50,
          image: coinMetadata.image
        });
      }
    }
  }
  
  return formattedData;
}

// Format CoinGecko data
function formatCoinGeckoData(data) {
  return data.map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    price_change_24h: coin.price_change_percentage_24h || 0,
    market_cap: coin.market_cap || 0,
    volume_24h: coin.total_volume || 0,
    // Random sentiment value (50-100 range)
    sentiment: Math.floor(Math.random() * 50) + 50,
    image: coin.image
  }));
}

// Fallback data
const fallbackData = [
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 147.32,
    price_change_24h: 4.23,
    market_cap: 67829076123,
    volume_24h: 2138465277,
    sentiment: 75,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png"
  },
  {
    id: "dogwifhat",
    name: "dogwifhat",
    symbol: "WIF",
    price: 2.73,
    price_change_24h: 8.12,
    market_cap: 2731245789,
    volume_24h: 412987654,
    sentiment: 82,
    image: "https://assets.coingecko.com/coins/images/33085/large/wif.png"
  },
  {
    id: "bonk",
    name: "Bonk",
    symbol: "BONK",
    price: 0.00002812,
    price_change_24h: -3.45,
    market_cap: 1654789234,
    volume_24h: 127654321,
    sentiment: 62,
    image: "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    symbol: "JUP",
    price: 0.72,
    price_change_24h: 2.87,
    market_cap: 987654321,
    volume_24h: 87654321,
    sentiment: 68,
    image: "https://assets.coingecko.com/coins/images/34417/large/jup.png"
  },
  {
    id: "pyth-network",
    name: "Pyth Network",
    symbol: "PYTH",
    price: 0.48,
    price_change_24h: -1.23,
    market_cap: 574321654,
    volume_24h: 43216789,
    sentiment: 55,
    image: "https://assets.coingecko.com/coins/images/28514/large/pyth.png"
  }
];

// Function to fetch crypto data
async function getCryptoData(env) {
  const now = Date.now();
  
  // Get new data if cache has expired
  if (!cachedCryptoData || now - lastFetched > CACHE_DURATION) {
    // Try CryptoCompare first
    const cryptoCompareData = await fetchCryptoCompareData();
    if (cryptoCompareData && cryptoCompareData.length > 0) {
      cachedCryptoData = cryptoCompareData;
      lastFetched = now;
      return cachedCryptoData;
    }
    
    // Try CoinGecko if CryptoCompare fails
    const coinGeckoData = await fetchCoinGeckoData();
    if (coinGeckoData && coinGeckoData.length > 0) {
      cachedCryptoData = coinGeckoData;
      lastFetched = now;
      return cachedCryptoData;
    }
    
    // Use fallback data if both APIs fail
    console.log("Using fallback data as API calls failed");
    cachedCryptoData = fallbackData;
    lastFetched = now;
  }
  
  return cachedCryptoData;
}

// Broadcast data to all connected WebSocket clients
async function broadcastCryptoData(env) {
  if (connectedClients.size === 0) return;
  
  try {
    const data = await getCryptoData(env);
    
    // Send data to all connected clients
    for (const client of connectedClients) {
      try {
        client.send(JSON.stringify({
          type: "prices",
          data: data
        }));
      } catch (error) {
        console.error("Error sending data to WebSocket client:", error);
        try {
          client.close();
        } catch {}
        connectedClients.delete(client);
      }
    }
  } catch (error) {
    console.error("Error broadcasting data:", error);
  }
} 