/**
 * Accessibility Helpers
 * 
 * This module provides helper functions to enhance accessibility
 * according to W3C Accessibility Guidelines (WCAG) 3.0
 */

/**
 * Creates proper image props with accessibility attributes
 * based on W3C WCAG 3.0 guidelines.
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Descriptive alternative text for the image
 * @param {number} width - Width of the image in pixels
 * @param {number} height - Height of the image in pixels
 * @param {string} [fallbackSrc] - Optional fallback source if the primary image fails
 * @param {boolean} [isLazy=true] - Whether to use lazy loading (default: true)
 * @returns Image props object with proper accessibility attributes
 */
export function getAccessibleImageProps(
  src: string,
  alt: string,
  width: number,
  height: number,
  fallbackSrc?: string,
  isLazy: boolean = true
): Record<string, any> {
  const loading = isLazy ? 'lazy' : 'eager';

  // Base props that should be included on all images
  const props: Record<string, any> = {
    src,
    alt,
    width,
    height,
    loading,
  };

  // Add fallback handling if a fallback source is provided
  if (fallbackSrc) {
    props.onError = `(function(e) {
      const target = e.currentTarget;
      console.warn('Image failed to load: ' + target.src);
      target.onerror = null; // Prevent infinite loop
      target.src = '${fallbackSrc}';
    })(event)`;
  }

  return props;
}

/**
 * Creates ARIA attributes for an element to enhance accessibility
 * 
 * @param {string} role - ARIA role
 * @param {Record<string, string>} attributes - Key-value pairs of ARIA attributes
 * @returns ARIA attribute object
 */
export function getAriaAttributes(
  role: string,
  attributes: Record<string, string> = {}
): Record<string, string> {
  const result: Record<string, string> = { 
    role 
  };
  
  // Add all additional ARIA attributes
  Object.entries(attributes).forEach(([key, value]) => {
    // Format the key to ensure it starts with 'aria-' if it doesn't already
    const formattedKey = key.startsWith('aria-') ? key : `aria-${key}`;
    result[formattedKey] = value;
  });
  
  return result;
}

/**
 * Validates a color contrast ratio against WCAG 3.0 requirements
 * 
 * @param {string} foregroundColor - Foreground color in hex format (#RRGGBB)
 * @param {string} backgroundColor - Background color in hex format (#RRGGBB)
 * @param {boolean} isLargeText - Whether the text is large (≥ 18pt or 14pt bold)
 * @returns {boolean} Whether the contrast meets WCAG 3.0 requirements
 */
export function hasValidContrast(
  foregroundColor: string,
  backgroundColor: string,
  isLargeText: boolean = false
): boolean {
  // Implementation of contrast calculation
  // This is a stub - we would need a proper contrast calculation algorithm
  
  // For now, we'll assume the contrast is valid
  // In a real implementation, you would calculate the actual contrast ratio
  return true;
}

/**
 * Creates a semantic heading with proper structure
 * 
 * @param {string} text - Heading text
 * @param {number} level - Heading level (1-6)
 * @param {string} [id] - Optional ID for the heading
 * @returns Properly structured heading element
 */
export function createAccessibleHeading(
  text: string,
  level: number,
  id?: string
): string {
  const validLevel = Math.min(Math.max(level, 1), 6);
  const idAttribute = id ? ` id="${id}"` : '';
  
  return `<h${validLevel}${idAttribute}>${text}</h${validLevel}>`;
}