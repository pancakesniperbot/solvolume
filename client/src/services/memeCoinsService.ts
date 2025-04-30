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

// Get current meme coins data - no automatic WebSocket connection
export const getMemeCoins = async (): Promise<MemeCoin[]> => {
  // Don't auto-initialize WebSocket - relies on explicit user action
  // This prevents background connections and reduces server load
  
  // Randomize the data slightly to simulate real-time changes if needed
  const simulateChanges = () => {
    return defaultCoins.map(coin => ({
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