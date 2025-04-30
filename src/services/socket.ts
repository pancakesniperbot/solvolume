import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private maxReconnectDelay = 30000; // Max 30 seconds
  private reconnectTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.setupConnectionHandlers();
  }

  private setupConnectionHandlers() {
    if (this.socket) {
      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        this.handleReconnect();
      });

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        this.handleReconnect();
      });

      this.socket.on('welcome', (data) => {
        console.log('Welcome message:', data);
      });
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);
      this.connect();
    }, this.reconnectDelay);
  }

  public connect() {
    const socketUrl = import.meta.env.PROD 
      ? window.location.origin
      : 'https://solvolume-production-9082.up.railway.app';
    
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(socketUrl, {
      reconnection: false, // We'll handle reconnection manually
      transports: ['websocket', 'polling'],
      autoConnect: true,
      withCredentials: true
    });

    this.setupConnectionHandlers();
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, message not sent');
    }
  }

  public on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  public off(event: string, callback: (data: any) => void) {
    this.socket?.off(event, callback);
  }
}

export const socketService = new SocketService(); 