// Image cache utility
const imageCache = new Map<string, string>();

// Cache the placeholder SVG
const PLACEHOLDER_SVG = '/images/coins/placeholder-coin.svg';
let placeholderSvgCache: string | null = null;

export async function preloadPlaceholderSvg(): Promise<void> {
  if (placeholderSvgCache) return;
  
  try {
    const response = await fetch(PLACEHOLDER_SVG);
    if (!response.ok) throw new Error('Failed to load placeholder SVG');
    placeholderSvgCache = await response.text();
    imageCache.set(PLACEHOLDER_SVG, placeholderSvgCache);
  } catch (error) {
    console.error('Error preloading placeholder SVG:', error);
  }
}

export function getCachedImage(url: string): string | null {
  return imageCache.get(url) || null;
}

export function setCachedImage(url: string, data: string): void {
  imageCache.set(url, data);
}

export function getPlaceholderSvg(): string {
  return placeholderSvgCache || PLACEHOLDER_SVG;
}

// Preload the placeholder SVG when the module is imported
preloadPlaceholderSvg(); 