import { MemeCoin } from "@/components/MemeCoinsIndicator";

// Fetch meme coin data from a static JSON file
export const getMemeCoins = async (): Promise<MemeCoin[]> => {
  const res = await fetch('/data/coins.json');
  if (!res.ok) throw new Error('Failed to fetch coins');
  return res.json();
};

// Get a coin by symbol
export const getMemeCoinBySymbol = async (symbol: string): Promise<MemeCoin | null> => {
  const coins = await getMemeCoins();
  return coins.find(coin => coin.symbol === symbol) || null;
};