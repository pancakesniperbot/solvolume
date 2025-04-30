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
export declare function getAccessibleImageProps(src: string, alt: string, width: number, height: number, fallbackSrc?: string, isLazy?: boolean): Record<string, any>;
/**
 * Creates ARIA attributes for an element to enhance accessibility
 *
 * @param {string} role - ARIA role
 * @param {Record<string, string>} attributes - Key-value pairs of ARIA attributes
 * @returns ARIA attribute object
 */
export declare function getAriaAttributes(role: string, attributes?: Record<string, string>): Record<string, string>;
/**
 * Validates a color contrast ratio against WCAG 3.0 requirements
 *
 * @param {string} foregroundColor - Foreground color in hex format (#RRGGBB)
 * @param {string} backgroundColor - Background color in hex format (#RRGGBB)
 * @param {boolean} isLargeText - Whether the text is large (≥ 18pt or 14pt bold)
 * @returns {boolean} Whether the contrast meets WCAG 3.0 requirements
 */
export declare function hasValidContrast(foregroundColor: string, backgroundColor: string, isLargeText?: boolean): boolean;
/**
 * Creates a semantic heading with proper structure
 *
 * @param {string} text - Heading text
 * @param {number} level - Heading level (1-6)
 * @param {string} [id] - Optional ID for the heading
 * @returns Properly structured heading element
 */
export declare function createAccessibleHeading(text: string, level: number, id?: string): string;
