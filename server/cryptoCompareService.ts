import fetch from 'node-fetch';
import { log } from './vite';

// CryptoCompare API endpoint for multiple prices
const CRYPTOCOMPARE_API_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';

// Interface for CryptoCompare API response
interface CryptoCompareResponse {
  RAW: {
    [key: string]: {
      USD: {
        PRICE: number;
        CHANGEPCT24HOUR: number;
        VOLUME24HOUR: number;
        IMAGEURL: string;
      }
    }
  };
  DISPLAY?: any; // We're not using the display data
}

// Name mapping for readable display
const nameMap: Record<string, string> = {
  'SOL': 'Solana',
  'JUP': 'Jupiter',
  'RAY': 'Raydium',
  'BONK': 'Bonk',
  'WIF': 'Dogwifhat',
  'MSOL': 'Marinade Staked SOL',
  'PEPE': 'Pepe',
  'TRUMP': 'Donald Trump'
};

// Fetch price data from CryptoCompare
export async function fetchCryptoComparePrices() {
  try {
    // Define the symbols we need to fetch
    const symbols = ['SOL', 'JUP', 'RAY', 'BONK', 'WIF', 'MSOL', 'PEPE', 'TRUMP'];
    
    // Build the URL with query parameters
    const url = `${CRYPTOCOMPARE_API_URL}?fsyms=${symbols.join(',')}&tsyms=USD`;
    
    // Make the API request
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`CryptoCompare API error: ${response.status} ${response.statusText}`);
    }
    
    const data: CryptoCompareResponse = await response.json() as CryptoCompareResponse;
    
    // Check if we have the RAW data
    if (!data.RAW) {
      throw new Error('CryptoCompare API returned no RAW price data');
    }
    
    // Transform the data to our format
    const tokenPrices = symbols.map(symbol => {
      if (data.RAW[symbol] && data.RAW[symbol].USD) {
        const rawData = data.RAW[symbol].USD;
        return {
          symbol: symbol,
          name: nameMap[symbol],
          price: rawData.PRICE,
          change: rawData.CHANGEPCT24HOUR,
          volume: rawData.VOLUME24HOUR,
          trending: rawData.CHANGEPCT24HOUR > 0,
          imageUrl: rawData.IMAGEURL ? `https://www.cryptocompare.com${rawData.IMAGEURL}` : null
        };
      } else {
        // If specific token data is missing, log and return null
        log(`Warning: No data available for ${symbol} from CryptoCompare`, 'cryptocompare');
        return null;
      }
    }).filter(token => token !== null);  // Filter out any nulls
    
    // Log success
    log(`Successfully fetched ${tokenPrices.length} tokens from CryptoCompare`, 'cryptocompare');
    
    return tokenPrices;
  } catch (error) {
    log(`Error fetching CryptoCompare prices: ${error}`, 'cryptocompare');
    
    // Return null to signal that we couldn't get the data
    return null;
  }
}

// Fallback prices in case CryptoCompare API fails
export const fallbackTokenPrices = [
  { symbol: 'SOL', name: 'Solana', price: 147.80, change: 2.1, volume: 768500000, trending: true, imageUrl: null },
  { symbol: 'JUP', name: 'Jupiter', price: 2.43, change: 3.2, volume: 189500000, trending: true, imageUrl: null },
  { symbol: 'RAY', name: 'Raydium', price: 1.07, change: 1.8, volume: 43200000, trending: false, imageUrl: null },
  { symbol: 'BONK', name: 'Bonk', price: 0.000018, change: 5.2, volume: 91200000, trending: true, imageUrl: null },
  { symbol: 'WIF', name: 'Dogwifhat', price: 1.35, change: 2.5, volume: 125600000, trending: false, imageUrl: null },
  { symbol: 'MSOL', name: 'Marinade Staked SOL', price: 172.43, change: 2.8, volume: 83400000, trending: false, imageUrl: null },
  { symbol: 'PEPE', name: 'Pepe', price: 0.000012, change: 7.3, volume: 425800000, trending: true, imageUrl: null },
  { symbol: 'TRUMP', name: 'Donald Trump', price: 1.81, change: 9.2, volume: 225700000, trending: true, imageUrl: null }
];