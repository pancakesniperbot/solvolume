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
  type: 'rocket_fired' | 'mascot_clicked' | 'game_trigger' | 'cta_highlight' | 'moon_hit' | 'price_update' | 'connected' | 'heartbeat' | 'refresh_request' | 'error';
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
    
    // Use the root path for WebSocket connection
    const wsUrl = `${protocol}//${host}`;
    
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
function handleSocketClose(event: CloseEvent): void {
  console.log("WebSocket connection closed", event.code, event.reason);
  
  // Clear heartbeat interval
  if (heartbeatInterval !== null) {
    window.clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
  
  // Notify application of disconnection
  document.dispatchEvent(new CustomEvent('websocket-disconnected', {
    detail: { code: event.code, reason: event.reason }
  }));
  
  // Notify all disconnection listeners
  disconnectCallbacks.forEach(callback => callback());
  
  // Attempt to reconnect if not closed cleanly
  if (event.code !== 1000 && reconnectAttempts < RECONNECT_MAX_ATTEMPTS) {
    scheduleReconnect();
  }
}

/**
 * Handle socket error event
 */
function handleSocketError(error: Event): void {
  console.error("WebSocket error:", error);
  // Note: Let onclose handle reconnection, as it's always called after onerror
}

/**
 * Handle incoming messages
 */
function handleSocketMessage(event: MessageEvent): void {
  try {
    const message = JSON.parse(event.data) as GameMessage;
    lastMessageReceived = Date.now();
    
    // Handle error messages
    if (message.type === 'error') {
      console.error('WebSocket error message:', message.data);
      return;
    }
    
    // Handle heartbeat responses
    if (message.type === 'heartbeat') {
      return;
    }
    
    // Dispatch message to all listeners
    document.dispatchEvent(new CustomEvent('websocket-message', {
      detail: message
    }));
  } catch (error) {
    console.error("Error parsing WebSocket message:", error);
  }
}

/**
 * Start sending heartbeat messages
 */
function startHeartbeat(): void {
  if (heartbeatInterval !== null) {
    window.clearInterval(heartbeatInterval);
  }
  
  heartbeatInterval = window.setInterval(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'heartbeat',
        data: { timestamp: Date.now() }
      }));
    }
  }, HEARTBEAT_INTERVAL);
}

/**
 * Schedule a reconnection attempt
 */
function scheduleReconnect(): void {
  if (reconnectTimeout !== null) {
    window.clearTimeout(reconnectTimeout);
  }
  
  reconnectAttempts++;
  const delay = Math.min(RECONNECT_DELAY * Math.pow(2, reconnectAttempts - 1), 30000);
  
  console.log(`Scheduling reconnection attempt ${reconnectAttempts} in ${delay}ms`);
  
  reconnectTimeout = window.setTimeout(() => {
    initWebSocket();
  }, delay);
}

/**
 * Send a message through the WebSocket
 */
export function sendMessage(message: GameMessage): void {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error("Cannot send message - WebSocket is not connected");
  }
}

/**
 * Add a connection callback
 */
export function onConnect(callback: ConnectionCallback): void {
  connectCallbacks.add(callback);
}

/**
 * Add a disconnection callback
 */
export function onDisconnect(callback: ConnectionCallback): void {
  disconnectCallbacks.add(callback);
}

/**
 * Remove a connection callback
 */
export function offConnect(callback: ConnectionCallback): void {
  connectCallbacks.delete(callback);
}

/**
 * Remove a disconnection callback
 */
export function offDisconnect(callback: ConnectionCallback): void {
  disconnectCallbacks.delete(callback);
}

/**
 * Close the WebSocket connection
 */
export function closeWebSocket(): void {
  if (socket) {
    socket.close(1000, 'User initiated close');
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
 * Check if the WebSocket is connected
 */
export function isConnected(): boolean {
  return socket !== null && socket.readyState === WebSocket.OPEN;
}

// Create a named export object for components that import by name
export const webSocketService = {
  connect: initWebSocket,
  disconnect: closeWebSocket,
  sendMessage,
  addMessageListener,
  removeMessageListener,
  addConnectListener: onConnect,
  removeConnectListener: offConnect,
  addDisconnectListener: onDisconnect,
  removeDisconnectListener: offDisconnect,
  isConnected
};

// Also export as default for components that prefer default imports
export default webSocketService;