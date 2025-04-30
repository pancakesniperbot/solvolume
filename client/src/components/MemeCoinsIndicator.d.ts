export interface MemeCoin {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    sentiment: number;
    volume24h: number;
    icon?: string;
    color: string;
}
export type SentimentStatus = 'bullish' | 'neutral' | 'bearish' | 'extreme-bullish' | 'extreme-bearish';
export declare const getSentimentStatus: (sentiment: number) => SentimentStatus;
export declare const getSentimentColor: (status: SentimentStatus) => string;
export declare const getSentimentText: (status: SentimentStatus) => string;
export declare function MemeCoinsIndicator(): import("react/jsx-runtime").JSX.Element;
