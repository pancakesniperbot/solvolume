import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { getMemeCoins } from '@/services/memeCoinsService';

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

  // Fetch meme coin data once on mount
  React.useEffect(() => {
    let isMounted = true;
    getMemeCoins()
      .then((coins) => {
        if (isMounted) dispatch({ type: 'SET_PRICES', payload: coins });
      })
      .catch((err) => {
        console.error('Error fetching meme coins:', err);
        if (isMounted) dispatch({ type: 'SET_LOADING', payload: false });
      });
    return () => { isMounted = false; };
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