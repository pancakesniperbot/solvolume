import React, { ReactNode } from 'react';
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
interface MarketSentiment {
    current: 'bullish' | 'bearish' | 'neutral';
    trend: string;
    strength: number;
    lastUpdate: number;
}
interface MarketData {
    topPlatforms: string[];
    volumeNeeded: string;
    bestStrategy: string;
    successRate: string;
    pricePrediction: string;
}
interface CryptoState {
    coins: MemeCoin[];
    marketSentiment: MarketSentiment | null;
    marketInsight: string;
    marketData: MarketData | null;
    lastUpdated: Date;
    isConnected: boolean;
    isLoading: boolean;
}
type CryptoAction = {
    type: 'SET_PRICES';
    payload: MemeCoin[];
} | {
    type: 'SET_MARKET_SENTIMENT';
    payload: MarketSentiment;
} | {
    type: 'SET_MARKET_INSIGHT';
    payload: string;
} | {
    type: 'SET_MARKET_DATA';
    payload: MarketData;
} | {
    type: 'SET_CONNECTED';
    payload: boolean;
} | {
    type: 'SET_LOADING';
    payload: boolean;
} | {
    type: 'UPDATE_ALL';
    payload: {
        prices: MemeCoin[];
        marketSentiment: MarketSentiment;
        marketInsight: string;
        marketData: MarketData;
    };
};
declare const CryptoContext: React.Context<{
    state: CryptoState;
    dispatch: React.Dispatch<CryptoAction>;
}>;
export declare const CryptoProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useCrypto: () => {
    state: CryptoState;
    dispatch: React.Dispatch<CryptoAction>;
};
export default CryptoContext;
