declare class SocketService {
    private socket;
    private reconnectAttempts;
    private maxReconnectAttempts;
    private reconnectDelay;
    private maxReconnectDelay;
    private reconnectTimer;
    constructor();
    private setupConnectionHandlers;
    private handleReconnect;
    connect(): void;
    disconnect(): void;
    emit(event: string, data: any): void;
    on(event: string, callback: (data: any) => void): void;
    off(event: string, callback: (data: any) => void): void;
}
export declare const socketService: SocketService;
export {};
