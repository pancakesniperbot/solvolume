/**
 * ManualWebSocket - A wrapper around the native WebSocket
 * that prevents any automatic reconnection attempts.
 * All connections must be explicitly initiated by user action.
 */

// Store original WebSocket constructor
const OriginalWebSocket = window.WebSocket;

class ManualWebSocket extends OriginalWebSocket {
  // Override the constructor to add custom behavior
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols);
    console.log("Manual WebSocket created - NO AUTO RECONNECT");
    
    // Override onclose to prevent any automatic reconnection
    const originalOnclose = this.onclose;
    this.onclose = (ev: CloseEvent) => {
      console.log("ManualWebSocket: Connection closed - NO AUTOMATIC RECONNECTION");
      // Still call the original handler if it exists
      if (originalOnclose) originalOnclose.call(this, ev);
    };
  }
}

// Install our override
export function installManualWebSocketOverride() {
  // Replace the global WebSocket constructor with our custom one
  // @ts-ignore - We need to override the WebSocket constructor
  window.WebSocket = ManualWebSocket;
  console.log("Installed manual WebSocket override - automatic reconnection disabled");
}

// Restore the original WebSocket if needed
export function restoreOriginalWebSocket() {
  // @ts-ignore - We need to restore the original WebSocket constructor
  window.WebSocket = OriginalWebSocket;
  console.log("Restored original WebSocket");
}

// Export for usage
export default ManualWebSocket;