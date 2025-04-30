// Cloudflare Worker URLs
const isProduction = import.meta.env.PROD;

// Production and development URLs
const PROD_API_URL = 'https://small-meadow-d788.comojaw412.workers.dev';
const DEV_API_URL = 'http://localhost:8787';

// WebSocket URLs
const PROD_WS_URL = 'wss://small-meadow-d788.comojaw412.workers.dev/ws';
const DEV_WS_URL = 'ws://localhost:8787/ws';

// Allow environment variables to override defaults
export const API_URL = import.meta.env.VITE_API_URL || (isProduction ? PROD_API_URL : DEV_API_URL);
export const WS_URL = import.meta.env.VITE_WS_URL || (isProduction ? PROD_WS_URL : DEV_WS_URL);

// API endpoints
export const ENDPOINTS = {
  crypto: '/api/crypto',
};

// Configuration settings
export const CONFIG = {
  // WebSocket connection settings
  ws: {
    reconnectInterval: 3000, // 3 seconds
    maxReconnectAttempts: 10,
    heartbeatInterval: 30000, // 30 seconds
  },
  
  // Data refresh interval
  refreshInterval: 5000, // 5 seconds
  
  // API cache duration
  cacheDuration: 60000, // 1 minute
}; 