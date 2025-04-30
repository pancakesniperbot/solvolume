// Mock data for crypto coins
const mockCoinData = [
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
    id: "jup",
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
    id: "pyth",
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

// Add random price fluctuations to make it look dynamic
function addRandomFluctuation(price: number) {
  const fluctuation = (Math.random() - 0.5) * 0.02; // -1% to +1%
  return price * (1 + fluctuation);
}

// Update price data with small random changes
function getUpdatedData() {
  return mockCoinData.map(coin => ({
    ...coin,
    price: addRandomFluctuation(coin.price),
    price_change_24h: coin.price_change_24h + (Math.random() - 0.5) * 0.5,
    sentiment: Math.min(100, Math.max(0, coin.sentiment + (Math.random() - 0.5) * 3))
  }));
}

export async function fetchCryptoData() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getUpdatedData();
}

// Create a function that mimics WebSocket behavior by using intervals
export function subscribeToUpdates(callback: (data: any) => void) {
  // Initial data
  callback({
    type: 'prices',
    data: getUpdatedData()
  });
  
  // Send updates every 5 seconds
  const intervalId = setInterval(() => {
    callback({
      type: 'prices',
      data: getUpdatedData()
    });
  }, 5000);
  
  // Return a function to unsubscribe
  return () => clearInterval(intervalId);
} 