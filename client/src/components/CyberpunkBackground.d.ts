interface CyberpunkBackgroundProps {
    variant?: 'dark' | 'medium' | 'light';
    withGrid?: boolean;
    withNoise?: boolean;
    withGlitch?: boolean;
    className?: string;
}
/**
 * Optimized CyberpunkBackground component
 * - Removed CPU intensive animations
 * - Reduced visual effects
 * - Simplified rendering for better performance
 */
export declare function CyberpunkBackground({ variant, withGrid, withNoise, withGlitch, className }: CyberpunkBackgroundProps): import("react/jsx-runtime").JSX.Element;
export {};
