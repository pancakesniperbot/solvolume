export interface WorkerMessage {
    type: string;
    data: any;
}
export interface WorkerState {
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
}
export interface WorkerConfig {
    wsUrl: string;
    reconnectInterval: number;
    maxReconnectAttempts: number;
}
