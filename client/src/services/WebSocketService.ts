import { create } from 'zustand';
import { WS_URL, CONFIG } from '../config';

interface WebSocketState {
  isConnected: boolean;
  error: string | null;
  lastMessage: any;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: any) => void;
  manualReconnect: () => void;
}

// Use the values from config
const MAX_RETRIES = CONFIG.ws.maxReconnectAttempts;
const RETRY_DELAY = CONFIG.ws.reconnectInterval;
const HEARTBEAT_INTERVAL = CONFIG.ws.heartbeatInterval;

export const useWebSocket = create<WebSocketState>((set, get) => {
  let ws: WebSocket | null = null;
  let retryCount = 0;
  let isReconnecting = false;
  let reconnectTimeout: number | null = null;
  let heartbeatInterval: number | null = null;

  // Function to send heartbeat
  const sendHeartbeat = () => {
    if (ws?.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ type: 'heartbeat' }));
        console.log('Heartbeat sent');
      } catch (error) {
        console.error('Error sending heartbeat:', error);
      }
    }
  };

  const manualReconnect = () => {
    console.log('Manual reconnect requested');
    disconnect();
    retryCount = 0; // Reset retry count for manual reconnection
    setTimeout(connect, 500);
  };

  const connect = () => {
    if (ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket connection already established');
      return;
    }

    if (isReconnecting) {
      console.log('WebSocket reconnection in progress');
      return;
    }

    try {
      console.log('[WebSocket] Connecting to', WS_URL);
      console.log('Manual WebSocket created - NO AUTO RECONNECT');
      
      // Close any existing connection
      if (ws) {
        try {
          ws.close();
        } catch (e) {
          // Ignore errors on close
        }
      }
      
      ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('[WebSocket] Connection established');
        set({ isConnected: true, error: null });
        retryCount = 0;
        isReconnecting = false;
        
        // Clear any existing heartbeat interval
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
        }
        
        // Start heartbeat interval
        heartbeatInterval = window.setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
        
        // Send initial refresh request
        sendMessage({ type: 'refresh' });
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('[WebSocket] Received message:', data.type, data.data ? data.data : '');
          set({ lastMessage: data });
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        set({ error: 'Connection error occurred' });
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed', event.code, event.reason);
        set({ isConnected: false });
        
        // Clear heartbeat interval
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
          heartbeatInterval = null;
        }
        
        if (retryCount < MAX_RETRIES) {
          isReconnecting = true;
          retryCount++;
          console.log(`Attempting to reconnect (${retryCount}/${MAX_RETRIES})...`);
          
          // Clear any existing reconnect timeout
          if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
          }
          
          // Set new reconnect timeout
          reconnectTimeout = window.setTimeout(() => {
            isReconnecting = false;
            connect();
          }, RETRY_DELAY);
        } else {
          console.log('WebSocket disconnected. Manual refresh required.');
          set({ error: 'Connection lost. Please refresh the page.' });
        }
      };
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
      set({ error: 'Failed to establish connection' });
    }
  };

  const disconnect = () => {
    if (ws) {
      try {
        ws.close();
      } catch (e) {
        // Ignore errors on close
      }
      
      ws = null;
      set({ isConnected: false, error: null });
      
      // Clear any existing reconnect timeout
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
      
      // Clear heartbeat interval
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }
    }
  };

  const sendMessage = (message: any) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error('Cannot send message - WebSocket is not connected');
      return;
    }

    try {
      console.log('Sending message:', message.type);
      ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('Error sending message:', error);
      set({ error: 'Failed to send message' });
    }
  };

  return {
    isConnected: false,
    error: null,
    lastMessage: null,
    connect,
    disconnect,
    sendMessage,
    manualReconnect
  };
}); 