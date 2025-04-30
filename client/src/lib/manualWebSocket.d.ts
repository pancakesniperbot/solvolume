/**
 * ManualWebSocket - A wrapper around the native WebSocket
 * that prevents any automatic reconnection attempts.
 * All connections must be explicitly initiated by user action.
 */
declare const OriginalWebSocket: {
    new (url: string | URL, protocols?: string | string[]): WebSocket;
    prototype: WebSocket;
    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSING: 2;
    readonly CLOSED: 3;
};
declare class ManualWebSocket extends OriginalWebSocket {
    constructor(url: string | URL, protocols?: string | string[]);
}
export declare function installManualWebSocketOverride(): void;
export declare function restoreOriginalWebSocket(): void;
export default ManualWebSocket;
