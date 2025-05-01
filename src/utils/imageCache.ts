// Image cache utility
const imageCache = new Map<string, string>();

// Cache the placeholder SVG
const PLACEHOLDER_SVG = '/images/coins/placeholder-coin.svg';
let placeholderSvgCache: string | null = null;

export async function preloadPlaceholderSvg(): Promise<void> {
  if (placeholderSvgCache) return;
  
  try {
    const response = await fetch(PLACEHOLDER_SVG, {
      cache: 'force-cache',
      headers: {
        'Accept': 'image/svg+xml'
      }
    });
    
    if (!response.ok) {
      console.error('Failed to load placeholder SVG:', response.statusText);
      return;
    }
    
    const svgText = await response.text();
    if (!svgText.includes('<svg')) {
      console.error('Invalid SVG content received');
      return;
    }
    
    placeholderSvgCache = svgText;
    imageCache.set(PLACEHOLDER_SVG, svgText);
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
  if (!placeholderSvgCache) {
    // If not cached yet, trigger preload and return the path
    preloadPlaceholderSvg();
    return PLACEHOLDER_SVG;
  }
  return placeholderSvgCache;
}

// Preload the placeholder SVG when the module is imported
preloadPlaceholderSvg(); 