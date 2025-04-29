import { Request, Response, NextFunction } from 'express';

// Cache durations in seconds
const CACHE_DURATIONS = {
  // No caching for HTML files
  html: 0,
  // Long-term caching for static assets (1 year)
  static: 31536000,
  // Short-term caching for dynamic data (5 minutes)
  dynamic: 300
};

/**
 * Middleware to add cache control headers based on file type
 */
export function cacheControl(req: Request, res: Response, next: NextFunction) {
  // Skip for WebSocket connections
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
    return next();
  }
  
  // Get the file extension from the URL
  const url = req.url;
  let cacheSeconds = 0; // Default to no caching
  
  // Apply different cache policies based on file type
  if (url.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|ttf|otf|woff|woff2)$/)) {
    // Static assets - cache for 1 year
    cacheSeconds = CACHE_DURATIONS.static;
    
    // Set immutable directive for better performance
    res.setHeader('Cache-Control', `public, max-age=${cacheSeconds}, immutable`);
    
    // Add Expires header for older browsers
    const expiresDate = new Date();
    expiresDate.setSeconds(expiresDate.getSeconds() + cacheSeconds);
    res.setHeader('Expires', expiresDate.toUTCString());
    
  } else if (url.match(/\.html$/) || url === '/' || url === '') {
    // HTML files - no caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
  } else if (url.startsWith('/api/')) {
    // API responses - short-term caching
    cacheSeconds = CACHE_DURATIONS.dynamic;
    res.setHeader('Cache-Control', `public, max-age=${cacheSeconds}`);
    
    // Add Expires header
    const expiresDate = new Date();
    expiresDate.setSeconds(expiresDate.getSeconds() + cacheSeconds);
    res.setHeader('Expires', expiresDate.toUTCString());
  }
  
  // Add ETag support for cache validation
  res.setHeader('Vary', 'Accept-Encoding');
  
  next();
}

export default cacheControl;