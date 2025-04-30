import { MemeCoin } from "@/components/MemeCoinsIndicator";
export declare const subscribeToMemeCoins: (callback: (coins: MemeCoin[]) => void) => () => void;
export declare const getMemeCoins: () => Promise<MemeCoin[]>;
export declare const getMemeCoinBySymbol: (symbol: string) => Promise<MemeCoin | null>;
export declare const connectToWebSocket: () => boolean;
export declare const isWebSocketConnected: () => boolean;
