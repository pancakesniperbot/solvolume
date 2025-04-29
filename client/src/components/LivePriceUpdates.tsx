import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrypto } from '@/state/CryptoContext';
import { getCoinLogo } from '@/utils/getCoinLogo';
import websocketService from '@/lib/websocketService';

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

  // Manual refresh function
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Connect to WebSocket if not already connected
    if (!websocketService.isConnected()) {
      websocketService.connect();
      setManuallyConnected(true);
    }
    
    // Send refresh request to get fresh data
    websocketService.sendMessage({
      type: 'refresh_request',
      data: {
        timestamp: Date.now()
      }
    });
    
    // Set a timeout to simulate loading and to ensure we have enough time to get fresh data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  
  // Update tokens from the centralized context when data changes
  useEffect(() => {
    if (coins && coins.length > 0) {
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

  // Set up WebSocket connection and message handling
  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === 'price_update' && message.data) {
        // Update the context with new data
        dispatch({
          type: 'UPDATE_ALL',
          payload: {
            prices: message.data.prices,
            marketSentiment: message.data.marketSentiment,
            marketInsight: message.data.marketInsight,
            marketData: message.data.marketData
          }
        });
      }
    };

    // Register message listener
    websocketService.addMessageListener(handleMessage);

    // Connect to WebSocket if not already connected
    if (!websocketService.isConnected()) {
      websocketService.connect();
    }

    // Cleanup
    return () => {
      websocketService.removeMessageListener(handleMessage);
    };
  }, [dispatch]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-[#14F195]/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Live Price Updates</h2>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg transition-colors ${
              isRefreshing
                ? 'bg-[#14F195]/20 cursor-not-allowed'
                : 'bg-[#14F195]/10 hover:bg-[#14F195]/20'
            }`}
            disabled={isRefreshing}
            title="Refresh price data"
            aria-label="Refresh price data"
          >
            <RefreshCw
              className={`h-5 w-5 text-[#14F195] ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            />
          </button>
        </div>

        <div className="flex items-center" aria-live="polite">
          <div 
            className={`h-2 w-2 rounded-full mr-2 ${manuallyConnected ? 'bg-green-500' : 'bg-yellow-500'}`}
            role="status" 
            aria-label={manuallyConnected ? "Connected to price feed" : "Not connected to price feed"}
            title={manuallyConnected ? "Connected to price feed" : "Not connected to price feed"}
          ></div>
          <span 
            className="text-xs text-gray-400"
            role="status"
            aria-live="polite"
          >
            {lastUpdated ? `Updated ${lastUpdated}` : 'Click refresh to load data'}
          </span>
        </div>

        <div className="space-y-2" aria-labelledby="token-prices-heading">
          <AnimatePresence>
            {tokens.map((token) => (
              <motion.div
                key={token.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={getCoinLogo(token.symbol)}
                    alt={`${token.name} logo`}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium">{token.name}</h3>
                    <p className="text-gray-400 text-sm">{token.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    ${token.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </p>
                  <div className="flex items-center space-x-1">
                    {token.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <p
                      className={`text-sm ${
                        token.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {token.change.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default LivePriceUpdates;