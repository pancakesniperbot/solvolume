/**
 * Returns the local path to coin logo images stored in our public assets folder.
 * Uses only local assets instead of external API calls for better performance,
 * security, and W3C compliance.
 *
 * @param symbol The cryptocurrency symbol (e.g., 'SOL', 'BTC')
 * @param imageUrl Optional direct URL if you have it from the API (not used anymore)
 * @returns The local path to the coin logo
 */
export declare function getCoinLogo(symbol: string, imageUrl?: string | null): string;
/**
 * Legacy function that previously used CryptoCompare API directly.
 * Now modified to only use local files for W3C compliance and better performance.
 */
export declare function getCryptoCompareLogo(symbol: string): string;
