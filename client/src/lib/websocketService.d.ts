export interface GameMessage {
    type: 'rocket_fired' | 'mascot_clicked' | 'game_trigger' | 'cta_highlight' | 'moon_hit' | 'price_update' | 'connected' | 'heartbeat' | 'refresh_request';
    data?: any;
}
type MessageCallback = (message: GameMessage) => void;
type ConnectionCallback = () => void;
/**
 * Initialize the WebSocket connection
 */
export declare function initWebSocket(): WebSocket | null;
/**
 * Send a message through the WebSocket
 */
export declare function sendMessage(message: GameMessage): boolean;
/**
 * Add a message event listener
 */
export declare function addMessageListener(callback: MessageCallback): void;
/**
 * Remove a message event listener
 */
export declare function removeMessageListener(callback: MessageCallback): void;
/**
 * Add a connection event listener
 */
export declare function addConnectListener(callback: ConnectionCallback): void;
/**
 * Remove a connection event listener
 */
export declare function removeConnectListener(callback: ConnectionCallback): void;
/**
 * Add a disconnection event listener
 */
export declare function addDisconnectListener(callback: ConnectionCallback): void;
/**
 * Remove a disconnection event listener
 */
export declare function removeDisconnectListener(callback: ConnectionCallback): void;
/**
 * Check if the WebSocket is connected
 */
export declare function isConnected(): boolean;
export declare const webSocketService: {
    connect: typeof initWebSocket;
    disconnect: () => void;
    sendMessage: typeof sendMessage;
    addMessageListener: typeof addMessageListener;
    removeMessageListener: typeof removeMessageListener;
    addConnectListener: typeof addConnectListener;
    removeConnectListener: typeof removeConnectListener;
    addDisconnectListener: typeof addDisconnectListener;
    removeDisconnectListener: typeof removeDisconnectListener;
    isConnected: typeof isConnected;
};
export default webSocketService;
