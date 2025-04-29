import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import webSocketService, { GameMessage } from '../services/WebSocketService';

// Meme coin interface - reusing from MemeCoinsIndicator component
type SentimentStatus = 'bullish' | 'neutral' | 'bearish' | 'extreme-bullish' | 'extreme-bearish';

interface MemeCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  sentiment: number;
  volume24h: number;
  icon?: string;
  color: string;
  trending?: boolean;
}

// Market sentiment interface
interface MarketSentiment {
  current: 'bullish' | 'bearish' | 'neutral';
  trend: string;
  strength: number;
  lastUpdate: number;
}

// Market data interface
interface MarketData {
  topPlatforms: string[];
  volumeNeeded: string;
  bestStrategy: string;
  successRate: string;
  pricePrediction: string;
}

// State interface
interface CryptoState {
  coins: MemeCoin[];
  marketSentiment: MarketSentiment | null;
  marketInsight: string;
  marketData: MarketData | null;
  lastUpdated: Date;
  isConnected: boolean;
  isLoading: boolean;
}

// Action types
type CryptoAction = 
  | { type: 'SET_PRICES', payload: MemeCoin[] }
  | { type: 'SET_MARKET_SENTIMENT', payload: MarketSentiment }
  | { type: 'SET_MARKET_INSIGHT', payload: string }
  | { type: 'SET_MARKET_DATA', payload: MarketData }
  | { type: 'SET_CONNECTED', payload: boolean }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'UPDATE_ALL', payload: { 
      prices: MemeCoin[], 
      marketSentiment: MarketSentiment, 
      marketInsight: string,
      marketData: MarketData
    } };

// Initial state
const initialState: CryptoState = {
  coins: [],
  marketSentiment: null,
  marketInsight: '',
  marketData: null,
  lastUpdated: new Date(),
  isConnected: false,
  isLoading: true
};

// Create context
const CryptoContext = createContext<{
  state: CryptoState;
  dispatch: React.Dispatch<CryptoAction>;
}>({
  state: initialState,
  dispatch: () => null
});

// Reducer function
const cryptoReducer = (state: CryptoState, action: CryptoAction): CryptoState => {
  switch (action.type) {
    case 'SET_PRICES':
      return {
        ...state,
        coins: action.payload,
        lastUpdated: new Date(),
        isLoading: false
      };
    case 'SET_MARKET_SENTIMENT':
      return {
        ...state,
        marketSentiment: action.payload
      };
    case 'SET_MARKET_INSIGHT':
      return {
        ...state,
        marketInsight: action.payload
      };
    case 'SET_MARKET_DATA':
      return {
        ...state,
        marketData: action.payload
      };
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'UPDATE_ALL':
      return {
        ...state,
        coins: action.payload.prices,
        marketSentiment: action.payload.marketSentiment,
        marketInsight: action.payload.marketInsight,
        marketData: action.payload.marketData,
        lastUpdated: new Date(),
        isLoading: false
      };
    default:
      return state;
  }
};

// Create provider component
export const CryptoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cryptoReducer, initialState);

  // Set up WebSocket message handling (but don't auto-connect)
  useEffect(() => {
    // Handle WebSocket connection status changes
    const handleConnect = () => {
      dispatch({ type: 'SET_CONNECTED', payload: true });
      // Show connected state but don't auto-request data
    };

    const handleDisconnect = () => {
      dispatch({ type: 'SET_CONNECTED', payload: false });
      // Don't auto-set loading on disconnect, as this creates pressure to reconnect
      // Instead, let the user decide when to refresh
    };

    // Handle incoming WebSocket messages
    const handleMessage = (message: GameMessage) => {
      if (message.type === 'price_update' && message.data) {
        // Convert prices to MemeCoin format
        const prices = message.data.prices.map((price: any) => ({
          id: price.symbol,
          name: price.name,
          symbol: price.symbol,
          price: price.price,
          change24h: price.change,
          sentiment: 50 + (price.change * 5), // Derive sentiment from price change
          volume24h: price.volume,
          color: getSentimentColorFromChange(price.change),
          trending: price.trending
        }));

        // Update all related state in one dispatch
        if (message.data.marketSentiment && message.data.marketInsight && message.data.marketData) {
          dispatch({
            type: 'UPDATE_ALL',
            payload: {
              prices,
              marketSentiment: message.data.marketSentiment,
              marketInsight: message.data.marketInsight,
              marketData: message.data.marketData
            }
          });
        } else {
          // Fallback for partial updates
          dispatch({ type: 'SET_PRICES', payload: prices });
          
          if (message.data.marketSentiment) {
            dispatch({ type: 'SET_MARKET_SENTIMENT', payload: message.data.marketSentiment });
          }
          
          if (message.data.marketInsight) {
            dispatch({ type: 'SET_MARKET_INSIGHT', payload: message.data.marketInsight });
          }
          
          if (message.data.marketData) {
            dispatch({ type: 'SET_MARKET_DATA', payload: message.data.marketData });
          }
        }
      }
    };

    // Register event listeners
    webSocketService.addConnectListener(handleConnect);
    webSocketService.addDisconnectListener(handleDisconnect);
    webSocketService.addMessageListener(handleMessage);

    // Set initial connection state and auto-connect to fetch initial data
    dispatch({ type: 'SET_CONNECTED', payload: webSocketService.isConnected() });
    
    // Auto-connect to WebSocket and request initial data 
    if (!webSocketService.isConnected()) {
      // Connect to WebSocket
      webSocketService.connect();
      
      // Request data after a short delay to ensure connection is established
      const initialDataTimer = setTimeout(() => {
        if (webSocketService.isConnected()) {
          webSocketService.sendMessage({
            type: 'refresh_request',
            data: {
              timestamp: Date.now()
            }
          });
        }
      }, 500);
      
      // Cleanup function
      return () => clearTimeout(initialDataTimer);
    }

    // Cleanup function
    return () => {
      webSocketService.removeConnectListener(handleConnect);
      webSocketService.removeDisconnectListener(handleDisconnect);
      webSocketService.removeMessageListener(handleMessage);
    };
  }, []);

  return (
    <CryptoContext.Provider value={{ state, dispatch }}>
      {children}
    </CryptoContext.Provider>
  );
};

// Helper function to determine color based on price change
function getSentimentColorFromChange(change: number): string {
  if (change >= 5) return '#14F195'; // extreme-bullish
  if (change >= 0) return '#4ADE80'; // bullish
  if (change >= -5) return '#FB7185'; // bearish
  return '#F43F5E'; // extreme-bearish
}

// Custom hook to use the crypto context
export const useCrypto = () => useContext(CryptoContext);

// Export default for components that prefer default imports
export default CryptoContext;