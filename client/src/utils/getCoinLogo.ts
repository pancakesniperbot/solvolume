// Utility function to get cryptocurrency logos from local assets
// W3C accessibility compliant, using only local images

/**
 * Returns the local path to coin logo images stored in our public assets folder.
 * Uses only local assets instead of external API calls for better performance,
 * security, and W3C compliance.
 * 
 * @param symbol The cryptocurrency symbol (e.g., 'SOL', 'BTC')
 * @param imageUrl Optional direct URL if you have it from the API (not used anymore)
 * @returns The local path to the coin logo
 */
export function getCoinLogo(symbol: string, imageUrl?: string | null): string {
  if (!symbol) return '';
  
  // Convert symbol to uppercase for consistency
  const upperSymbol = symbol.toUpperCase();
  
  // List of coins we have SVG files for
  const supportedSvgCoins = [
    'BONK', 'WIF', 'POPCAT', 'BOOK', 'BOME'
  ];
  
  // List of coins we have PNG files for (older files)
  const supportedPngCoins = [
    'SOL', 'JUP', 'RAY', 'MSOL', 'PEPE', 'TRUMP', 'MOCHI', 'BODEN'
  ];
  
  // Prioritize SVG files for better scaling and performance
  if (supportedSvgCoins.includes(upperSymbol)) {
    return `/images/coins/${upperSymbol}.svg`;
  }
  
  // Fall back to PNG if available
  if (supportedPngCoins.includes(upperSymbol)) {
    return `/images/coins/${upperSymbol}.png`;
  }

  // Return the placeholder image as a last resort
  // This ensures we always return a local file and never an external URL
  return `/images/coins/placeholder-coin.svg`;
}

/**
 * Legacy function that previously used CryptoCompare API directly.
 * Now modified to only use local files for W3C compliance and better performance.
 */
export function getCryptoCompareLogo(symbol: string): string {
  if (!symbol) return '';
  
  // All references now use local files
  const localLogos: Record<string, string> = {
    'SOL': '/images/coins/SOL.png',
    'JUP': '/images/coins/JUP.png',
    'RAY': '/images/coins/RAY.png',
    'BONK': '/images/coins/BONK.svg',
    'WIF': '/images/coins/WIF.svg',
    'MSOL': '/images/coins/MSOL.png',
    'PEPE': '/images/coins/PEPE.png',
    'TRUMP': '/images/coins/TRUMP.png',
    'POPCAT': '/images/coins/POPCAT.svg',
    'BOOK': '/images/coins/BOOK.svg',
    'BOME': '/images/coins/BOME.svg'
  };
  
  return localLogos[symbol.toUpperCase()] || `/images/coins/placeholder-coin.svg`;
}