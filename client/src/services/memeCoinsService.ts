import { MemeCoin } from "@/components/MemeCoinsIndicator";

// Default meme coin data as fallback
const defaultCoins: MemeCoin[] = [
  {
    id: '1',
    name: 'BONK',
    symbol: 'BONK',
    price: 0.00002458,
    change24h: 12.5,
    sentiment: 78,
    volume24h: 25000000,
    color: '#F7931A'
  },
  {
    id: '2',
    name: 'WIF',
    symbol: 'WIF',
    price: 0.87,
    change24h: 5.2,
    sentiment: 65,
    volume24h: 18000000,
    color: '#627EEA'
  },
  {
    id: '3',
    name: 'POPCAT',
    symbol: 'POPCAT',
    price: 0.013,
    change24h: -2.1,
    sentiment: 42,
    volume24h: 7500000,
    color: '#FF007A'
  },
  {
    id: '4',
    name: 'BOOK',
    symbol: 'BOOK',
    price: 0.0035,
    change24h: 8.7,
    sentiment: 71,
    volume24h: 12000000,
    color: '#2775CA'
  },
  {
    id: '5',
    name: 'MOCHI',
    symbol: 'MOCHI',
    price: 0.00000721,
    change24h: 21.3,
    sentiment: 85,
    volume24h: 9500000,
    color: '#E95F98'
  },
  {
    id: '6',
    name: 'BOME',
    symbol: 'BOME',
    price: 0.000071,
    change24h: -7.3,
    sentiment: 34,
    volume24h: 5800000,
    color: '#26A17B'
  }
];

// Connection to WebSocket service for real-time price updates
let ws: WebSocket | null = null;
let updateCallbacks: ((coins: MemeCoin[]) => void)[] = [];
let latestCoins: MemeCoin[] = [...defaultCoins];

// Initialize WebSocket connection - completely rewritten to prevent any auto-reconnect
const initWebSocket = () => {
  if (ws) return;
  
  try {
    // Implement our own WebSocket wrapper to prevent any automatic reconnection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    console.log("Manual WebSocket connection initiated - no auto-reconnect");
    
    // Create WebSocket with controlled behavior
    ws = new WebSocket(wsUrl);
    
    // Set up event handlers
    ws.onopen = () => {
      console.log("WebSocket connection established for meme coin data");
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'price_update' && data.data && data.data.prices) {
          // Map API data to our coin structure
          updateCoinsWithLiveData(data.data.prices);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    
    // Completely disable any automatic reconnection
    ws.onclose = () => {
      console.log("MANUAL MODE: WebSocket connection closed - NO AUTO RECONNECT");
      ws = null;
    };
    
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      try {
        if (ws) {
          ws.close();
          ws = null;
        }
      } catch (closeError) {
        console.error("Error closing WebSocket:", closeError);
      }
    };
  } catch (error) {
    console.error("Failed to initialize WebSocket:", error);
    ws = null;
  }
};

// Update coins with live data from WebSocket
const updateCoinsWithLiveData = (pricesData: any[]) => {
  // Map price data to our coin structure
  latestCoins = latestCoins.map(coin => {
    const liveData = pricesData.find(p => p.symbol === coin.symbol);
    if (liveData) {
      return {
        ...coin,
        price: liveData.price || coin.price,
        change24h: liveData.change || coin.change24h,
        sentiment: liveData.sentiment || coin.sentiment,
        volume24h: liveData.volume || coin.volume24h,
        icon: liveData.imageUrl // Add the CryptoCompare image URL
      };
    }
    return coin;
  });
  
  // Notify all registered callbacks with updated data
  updateCallbacks.forEach(callback => callback(latestCoins));
};

// Register for real-time updates but don't auto-connect
export const subscribeToMemeCoins = (callback: (coins: MemeCoin[]) => void) => {
  // No automatic WebSocket connection - user must manually connect
  // WebSocket initialization is done through explicit UI actions
  
  // Add callback to the list
  updateCallbacks.push(callback);
  
  // Immediately call with latest data
  callback(latestCoins);
  
  // Return unsubscribe function
  return () => {
    updateCallbacks = updateCallbacks.filter(cb => cb !== callback);
  };
};

// Get current meme coins data - no automatic WebSocket connection
export const getMemeCoins = async (): Promise<MemeCoin[]> => {
  // Don't auto-initialize WebSocket - relies on explicit user action
  // This prevents background connections and reduces server load
  
  // Randomize the data slightly to simulate real-time changes if needed
  const simulateChanges = () => {
    return latestCoins.map(coin => ({
      ...coin,
      price: coin.price * (1 + (Math.random() * 0.02 - 0.01)),
      change24h: coin.change24h + (Math.random() * 2 - 1),
      sentiment: Math.max(0, Math.min(100, coin.sentiment + (Math.random() * 4 - 2))),
      volume24h: coin.volume24h * (1 + (Math.random() * 0.1 - 0.05))
    }));
  };
  
  return simulateChanges();
};

// Get a coin by symbol
export const getMemeCoinBySymbol = async (symbol: string): Promise<MemeCoin | null> => {
  const coins = await getMemeCoins();
  return coins.find(coin => coin.symbol === symbol) || null;
};

// Manually connect to WebSocket when requested by user
export const connectToWebSocket = (): boolean => {
  if (!ws) {
    try {
      initWebSocket();
      return true;
    } catch (error) {
      console.error("Error connecting to WebSocket:", error);
      return false;
    }
  }
  return true; // Already connected
};

// Check if WebSocket is connected
export const isWebSocketConnected = (): boolean => {
  return !!ws && ws.readyState === WebSocket.OPEN;
};