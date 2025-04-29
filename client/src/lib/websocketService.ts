// WebSocketService.ts - Central WebSocket management for optimal performance
// Singleton pattern to ensure only one WebSocket connection for the entire app
let socket: WebSocket | null = null;
let reconnectTimeout: number | null = null;
const RECONNECT_DELAY = 3000; // 3 seconds
const RECONNECT_MAX_ATTEMPTS = 10; // Maximum number of reconnection attempts
let reconnectAttempts = 0;
let lastMessageReceived = Date.now();
const HEARTBEAT_INTERVAL = 30000; // 30 seconds
let heartbeatInterval: number | null = null;

// Message types for our application
export interface GameMessage {
  type: 'rocket_fired' | 'mascot_clicked' | 'game_trigger' | 'cta_highlight' | 'moon_hit' | 'price_update' | 'connected' | 'heartbeat' | 'refresh_request';
  data?: any;
}

// Create callback collections with weak references to allow garbage collection
type MessageCallback = (message: GameMessage) => void;
const messageCallbacks: Set<MessageCallback> = new Set();

// Connection state callbacks
type ConnectionCallback = () => void;
const connectCallbacks: Set<ConnectionCallback> = new Set();
const disconnectCallbacks: Set<ConnectionCallback> = new Set();

/**
 * Initialize the WebSocket connection
 */
export function initWebSocket(): WebSocket | null {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("WebSocket connection already established");
    return socket;
  }

  try {
    // Close existing socket if any
    if (socket) {
      socket.close();
    }

    // Clear any pending reconnect timeouts
    if (reconnectTimeout !== null) {
      window.clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }

    // Create WebSocket with the appropriate protocol
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = "small-meadow-d788.comojaw412.workers.dev";
    
    // Use the Cloudflare Worker WebSocket endpoint
    const wsUrl = `${protocol}//${host}/ws`;
    
    console.log(`Connecting to WebSocket at ${wsUrl}`);
    
    // Show WebSocket connection errors to the user
    document.dispatchEvent(new CustomEvent('websocket-connecting', { 
      detail: { url: wsUrl } 
    }));
    
    socket = new WebSocket(wsUrl);

    // Set up event handlers
    socket.onopen = handleSocketOpen;
    socket.onclose = handleSocketClose;
    socket.onerror = handleSocketError;
    socket.onmessage = handleSocketMessage;

    return socket;
  } catch (error) {
    console.error("Error initializing WebSocket:", error);
    return null;
  }
}

/**
 * Handle socket open event
 */
function handleSocketOpen(): void {
  console.log("WebSocket connection established");
  
  // Reset reconnection attempts
  reconnectAttempts = 0;
  
  // Start heartbeat to keep connection alive
  startHeartbeat();
  
  // Notify application of successful connection
  document.dispatchEvent(new CustomEvent('websocket-connected'));
  
  // Notify all connection listeners
  connectCallbacks.forEach(callback => callback());
}

/**
 * Handle socket close event
 */
function handleSocketClose(): void {
  console.log("WebSocket connection closed");
  
  // Clear any existing heartbeat interval
  if (heartbeatInterval !== null) {
    window.clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
  
  // Notify application of connection loss
  document.dispatchEvent(new CustomEvent('websocket-closed'));
  
  // Notify all disconnection listeners
  disconnectCallbacks.forEach(callback => callback());
  
  // Schedule reconnection if we haven't exceeded max attempts
  if (reconnectAttempts < RECONNECT_MAX_ATTEMPTS) {
    scheduleReconnect();
  }
}

/**
 * Handle socket error event
 */
function handleSocketError(event: Event): void {
  console.error("WebSocket error:", event);
  
  // Clear any existing heartbeat interval
  if (heartbeatInterval !== null) {
    window.clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
  
  // Schedule reconnection if the socket is closed
  if (socket && socket.readyState === WebSocket.CLOSED) {
    scheduleReconnect();
  }
}

/**
 * Schedule reconnection attempt
 */
function scheduleReconnect(): void {
  if (reconnectTimeout !== null) {
    window.clearTimeout(reconnectTimeout);
  }
  
  reconnectAttempts++;
  console.log(`Scheduling reconnection attempt ${reconnectAttempts} of ${RECONNECT_MAX_ATTEMPTS}`);
  
  reconnectTimeout = window.setTimeout(() => {
    initWebSocket();
  }, RECONNECT_DELAY);
}

/**
 * Start heartbeat interval to keep connection alive
 */
function startHeartbeat(): void {
  if (heartbeatInterval !== null) {
    window.clearInterval(heartbeatInterval);
  }
  
  heartbeatInterval = window.setInterval(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      sendMessage({ type: 'heartbeat' });
    }
  }, HEARTBEAT_INTERVAL);
}

/**
 * Handle incoming messages
 */
function handleSocketMessage(event: MessageEvent): void {
  try {
    const message = JSON.parse(event.data) as GameMessage;
    lastMessageReceived = Date.now();
    messageCallbacks.forEach(callback => callback(message));
  } catch (error) {
    console.error("Error parsing WebSocket message:", error);
  }
}

/**
 * Send a message through the WebSocket
 */
export function sendMessage(message: GameMessage): boolean {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("Cannot send message: WebSocket is not open");
    return false;
  }

  try {
    socket.send(JSON.stringify(message));
    return true;
  } catch (error) {
    console.error("Error sending WebSocket message:", error);
    return false;
  }
}

/**
 * Add a message event listener
 */
export function addMessageListener(callback: MessageCallback): void {
  messageCallbacks.add(callback);
}

/**
 * Remove a message event listener
 */
export function removeMessageListener(callback: MessageCallback): void {
  messageCallbacks.delete(callback);
}

/**
 * Add a connection event listener
 */
export function addConnectListener(callback: ConnectionCallback): void {
  connectCallbacks.add(callback);
}

/**
 * Remove a connection event listener
 */
export function removeConnectListener(callback: ConnectionCallback): void {
  connectCallbacks.delete(callback);
}

/**
 * Add a disconnection event listener
 */
export function addDisconnectListener(callback: ConnectionCallback): void {
  disconnectCallbacks.add(callback);
}

/**
 * Remove a disconnection event listener
 */
export function removeDisconnectListener(callback: ConnectionCallback): void {
  disconnectCallbacks.delete(callback);
}

/**
 * Check if the WebSocket is connected
 */
export function isConnected(): boolean {
  return socket !== null && socket.readyState === WebSocket.OPEN;
}

// Create a named export object for components that import by name
export const webSocketService = {
  connect: initWebSocket,
  disconnect: () => {
    if (socket) {
      socket.close();
    }
  },
  sendMessage,
  addMessageListener,
  removeMessageListener,
  addConnectListener,
  removeConnectListener,
  addDisconnectListener,
  removeDisconnectListener,
  isConnected
};

// Also export as default for components that prefer default imports
export default webSocketService;
