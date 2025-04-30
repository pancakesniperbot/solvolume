// Cloudflare Worker URLs
const isProduction = process.env.NODE_ENV === 'production';

// Production and development URLs
const PROD_API_URL = 'https://solvolume.workers.dev';
const DEV_API_URL = 'http://localhost:8787';

// WebSocket URLs
const PROD_WS_URL = 'wss://solvolume.workers.dev/ws';
const DEV_WS_URL = 'ws://localhost:8787/ws';

// Determine which URLs to use
export const API_URL = isProduction ? PROD_API_URL : DEV_API_URL;
export const WS_URL = isProduction ? PROD_WS_URL : DEV_WS_URL;

// API endpoints
export const ENDPOINTS = {
  crypto: '/api/crypto',
};

// Configuration settings
export const CONFIG = {
  // WebSocket connection settings
  ws: {
    reconnectInterval: 5000, // 5 seconds
    maxReconnectAttempts: 5,
  },
  
  // Data refresh interval
  refreshInterval: 5000, // 5 seconds
  
  // API cache duration
  cacheDuration: 60000, // 1 minute
}; 