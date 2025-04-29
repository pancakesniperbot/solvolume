import fetch from 'node-fetch';
import { log } from './vite';

// Define interfaces for our responses
interface BinancePrice {
  symbol: string;
  price: string; // Binance returns prices as strings
}

interface BinanceTicker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
}

// Map for converting Binance symbols to our format
const symbolMap: Record<string, string> = {
  'SOLUSDT': 'SOL',
  'JUPUSDT': 'JUP',
  'RAYUSDT': 'RAY',
  'BONKUSDT': 'BONK',
  'WIFUSDT': 'WIF',
  'MSOLUSDT': 'MSOL'
};

// Name mapping for readable display
const nameMap: Record<string, string> = {
  'SOL': 'Solana',
  'JUP': 'Jupiter',
  'RAY': 'Raydium',
  'BONK': 'Bonk',
  'WIF': 'Dogwifhat',
  'MSOL': 'Marinade Staked SOL'
};

// Fetch price data from Binance
export async function fetchBinancePrices() {
  try {
    // Get 24h ticker data which includes price, volume and % changes
    const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
    
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status} ${response.statusText}`);
    }
    
    const data: BinanceTicker[] = await response.json() as BinanceTicker[];
    
    // Filter and transform the data to match our format
    const relevantTokens = Object.keys(symbolMap);
    const tokenPrices = data
      .filter(ticker => relevantTokens.includes(ticker.symbol))
      .map(ticker => {
        const shortSymbol = symbolMap[ticker.symbol];
        return {
          symbol: shortSymbol,
          name: nameMap[shortSymbol],
          price: parseFloat(ticker.lastPrice),
          change: parseFloat(ticker.priceChangePercent),
          volume: parseFloat(ticker.quoteVolume),
          trending: parseFloat(ticker.priceChangePercent) > 0,
          imageUrl: null // Binance API doesn't provide icon URLs
        };
      });
    
    // If we couldn't get all tokens, log error but return what we have
    if (tokenPrices.length < relevantTokens.length) {
      log(`Warning: Could not fetch data for all tokens. Only got ${tokenPrices.length} of ${relevantTokens.length}`, 'binance');
    }
    
    return tokenPrices;
  } catch (error) {
    log(`Error fetching Binance prices: ${error}`, 'binance');
    
    // Return null to signal that we couldn't get the data
    return null;
  }
}

// Fallback prices in case Binance API fails
export const fallbackTokenPrices = [
  { symbol: 'SOL', name: 'Solana', price: 147.80, change: 2.1, volume: 768500000, trending: true, imageUrl: null },
  { symbol: 'JUP', name: 'Jupiter', price: 2.43, change: 3.2, volume: 189500000, trending: true, imageUrl: null },
  { symbol: 'RAY', name: 'Raydium', price: 1.07, change: 1.8, volume: 43200000, trending: false, imageUrl: null },
  { symbol: 'BONK', name: 'Bonk', price: 0.000018, change: 5.2, volume: 91200000, trending: true, imageUrl: null },
  { symbol: 'WIF', name: 'Dogwifhat', price: 1.35, change: 2.5, volume: 125600000, trending: false, imageUrl: null },
  { symbol: 'MSOL', name: 'Marinade Staked SOL', price: 172.43, change: 2.8, volume: 83400000, trending: false, imageUrl: null }
];