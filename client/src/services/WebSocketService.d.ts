export interface GameMessage {
    type: 'rocket_fired' | 'mascot_clicked' | 'game_trigger' | 'cta_highlight' | 'moon_hit' | 'price_update' | 'connected' | 'heartbeat' | 'refresh_request' | 'error';
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
export declare function sendMessage(message: GameMessage): void;
/**
 * Add a connection callback
 */
export declare function onConnect(callback: ConnectionCallback): void;
/**
 * Add a disconnection callback
 */
export declare function onDisconnect(callback: ConnectionCallback): void;
/**
 * Remove a connection callback
 */
export declare function offConnect(callback: ConnectionCallback): void;
/**
 * Remove a disconnection callback
 */
export declare function offDisconnect(callback: ConnectionCallback): void;
/**
 * Close the WebSocket connection
 */
export declare function closeWebSocket(): void;
/**
 * Add a message event listener
 */
export declare function addMessageListener(callback: MessageCallback): void;
/**
 * Remove a message event listener
 */
export declare function removeMessageListener(callback: MessageCallback): void;
/**
 * Check if the WebSocket is connected
 */
export declare function isConnected(): boolean;
export declare const webSocketService: {
    connect: typeof initWebSocket;
    disconnect: typeof closeWebSocket;
    sendMessage: typeof sendMessage;
    addMessageListener: typeof addMessageListener;
    removeMessageListener: typeof removeMessageListener;
    addConnectListener: typeof onConnect;
    removeConnectListener: typeof offConnect;
    addDisconnectListener: typeof onDisconnect;
    removeDisconnectListener: typeof offDisconnect;
    isConnected: typeof isConnected;
};
export default webSocketService;
