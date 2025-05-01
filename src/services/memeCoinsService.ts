import { MemeCoin } from "@/components/MemeCoinsIndicator";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Fetch meme coin data from a static JSON file with retry logic
export const getMemeCoins = async (): Promise<MemeCoin[]> => {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const res = await fetch('/data/coins.json', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch coins: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      
      // Validate the data structure
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array');
      }
      
      return data;
    } catch (error) {
      retries++;
      console.error(`Attempt ${retries} failed:`, error);
      
      if (retries === MAX_RETRIES) {
        // Return placeholder data on final failure
        return [{
          id: 'placeholder',
          name: 'Error Loading Data',
          symbol: 'ERR',
          price: 0,
          change24h: 0,
          sentiment: 0,
          volume24h: 0,
          color: '#FF4444'
        }];
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retries));
    }
  }
  
  // This should never be reached due to the placeholder return above
  return [];
};

// Get a coin by symbol
export const getMemeCoinBySymbol = async (symbol: string): Promise<MemeCoin | null> => {
  try {
    const coins = await getMemeCoins();
    return coins.find(coin => coin.symbol === symbol) || null;
  } catch (error) {
    console.error('Error fetching coin by symbol:', error);
    return null;
  }
};