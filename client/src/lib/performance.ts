import { onCLS, onFID, onLCP } from 'web-vitals';

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
  }
};

export const measurePerformance = () => {
  // Track Largest Contentful Paint (LCP)
  onLCP((metric) => {
    console.log('LCP:', metric.value);
    // Send to analytics
  });

  // Track First Input Delay (FID)
  onFID((metric) => {
    console.log('FID:', metric.value);
    // Send to analytics
  });

  // Track Cumulative Layout Shift (CLS)
  onCLS((metric) => {
    console.log('CLS:', metric.value);
    // Send to analytics
  });
};

// Performance budget monitoring
export const checkPerformanceBudget = () => {
  const budget = {
    js: 200 * 1024, // 200KB
    css: 50 * 1024, // 50KB
    images: 500 * 1024, // 500KB
  };

  // Check JavaScript size
  const scripts = document.querySelectorAll('script');
  let totalJsSize = 0;
  scripts.forEach((script) => {
    if (script.src) {
      // Fetch and measure script size
      fetch(script.src)
        .then((response) => response.blob())
        .then((blob) => {
          totalJsSize += blob.size;
          if (totalJsSize > budget.js) {
            console.warn('JavaScript size exceeds budget');
          }
        });
    }
  });

  // Check CSS size
  const styles = document.querySelectorAll('link[rel="stylesheet"]');
  let totalCssSize = 0;
  styles.forEach((style) => {
    if (style.href) {
      fetch(style.href)
        .then((response) => response.blob())
        .then((blob) => {
          totalCssSize += blob.size;
          if (totalCssSize > budget.css) {
            console.warn('CSS size exceeds budget');
          }
        });
    }
  });

  // Check image sizes
  const images = document.querySelectorAll('img');
  let totalImageSize = 0;
  images.forEach((img) => {
    if (img.src) {
      fetch(img.src)
        .then((response) => response.blob())
        .then((blob) => {
          totalImageSize += blob.size;
          if (totalImageSize > budget.images) {
            console.warn('Image size exceeds budget');
          }
        });
    }
  });
}; 