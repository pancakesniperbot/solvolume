import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrypto } from '@/state/CryptoContext';
import { getCoinLogo } from '@/utils/getCoinLogo';
import { useWebSocket } from '@/services/WebSocketService';

interface TokenPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  lastUpdate: number;
}

// Sample initial data for demonstration (will be replaced by context data)
const INITIAL_TOKENS: TokenPrice[] = [
  { symbol: 'SOL', name: 'Solana', price: 145.82, change: 2.4, lastUpdate: Date.now() },
  { symbol: 'BONK', name: 'Bonk', price: 0.00002143, change: 5.7, lastUpdate: Date.now() },
  { symbol: 'JUP', name: 'Jupiter', price: 0.84, change: -1.3, lastUpdate: Date.now() },
  { symbol: 'BOME', name: 'Book of Meme', price: 0.002234, change: 7.1, lastUpdate: Date.now() },
];

export function LivePriceUpdates() {
  const [tokens, setTokens] = useState<TokenPrice[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [manuallyConnected, setManuallyConnected] = useState(false);
  
  // Use the centralized crypto context
  const { state, dispatch } = useCrypto();
  const { coins, isConnected, lastUpdated: contextLastUpdated } = state;
  
  // Get WebSocket store
  const webSocketStore = useWebSocket();
  const connectionStatus = webSocketStore.isConnected ? 'connected' : 
                          webSocketStore.error ? 'disconnected' : 'connecting';

  // Manual refresh function
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Connect to WebSocket if not already connected
    if (!webSocketStore.isConnected) {
      console.log("[LivePriceUpdates] Initializing WebSocket connection...");
      webSocketStore.connect();
      setManuallyConnected(true);
    }
    
    // Send refresh request to get fresh data
    console.log("[LivePriceUpdates] Sending refresh request...");
    webSocketStore.sendMessage({ type: 'refresh' });
    
    // Set a timeout to simulate loading and to ensure we have enough time to get fresh data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  
  // Update tokens from the centralized context when data changes
  useEffect(() => {
    if (coins && coins.length > 0) {
      console.log("[LivePriceUpdates] Received new price data:", coins);
      // Map from context coins to token price format
      const updatedTokens = coins.map(coin => ({
        symbol: coin.symbol,
        name: coin.name,
        price: coin.price,
        change: coin.change24h,
        lastUpdate: contextLastUpdated.getTime()
      }));
      
      setTokens(updatedTokens);
      
      // Update last updated time
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setLastUpdated(`${hours}:${minutes}:${seconds}`);
      
      // Stop refreshing if we were refreshing
      if (isRefreshing) {
        setIsRefreshing(false);
      }
    }
  }, [coins, contextLastUpdated]);

  // Connect to WebSocket if not already connected
  useEffect(() => {
    if (!webSocketStore.isConnected && !webSocketStore.error) {
      console.log("[LivePriceUpdates] Initializing WebSocket connection...");
      webSocketStore.connect();
    }
  }, [webSocketStore]);
  
  // Process WebSocket messages
  useEffect(() => {
    if (webSocketStore.lastMessage && webSocketStore.lastMessage.type === 'prices') {
      console.log("[LivePriceUpdates] Received price update:", webSocketStore.lastMessage.data);
      
      // Map the data to the format the CryptoContext expects
      const prices = webSocketStore.lastMessage.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        price: item.price,
        change24h: item.price_change_24h,
        sentiment: item.sentiment,
        volume24h: item.volume_24h,
        icon: item.image,
        color: item.price_change_24h >= 0 ? '#14F195' : '#FB7185',
        trending: item.price_change_24h > 5
      }));
      
      // Update the context with new data
      dispatch({
        type: 'SET_PRICES',
        payload: prices
      });
    }
  }, [webSocketStore.lastMessage, dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Live Price Updates</h2>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${connectionStatus === 'connected' ? 'text-green-500' : connectionStatus === 'connecting' ? 'text-yellow-500' : 'text-red-500'}`}>
            {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            aria-label="Refresh price data"
            title="Refresh price data"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      
      {lastUpdated && (
        <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tokens.map((token) => (
          <div key={token.symbol} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{token.symbol}</span>
              <span className={`text-sm ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {token.change >= 0 ? '+' : ''}{token.change}%
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">${token.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LivePriceUpdates;