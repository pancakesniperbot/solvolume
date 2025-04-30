/**
 * Cyberpunk theme effects utility functions
 * Contains handlers for interactive effects like click ripples, hover effects, and theme toggling
 */
export declare const handleRippleEffect: (event: React.MouseEvent<HTMLElement>, color?: "purple" | "green" | "blue") => void;
export declare const toggleCyberpunkTheme: (enabled: boolean) => void;
export declare const applyHoverTracking: (element: HTMLElement) => () => void;
export declare const addScrollEffects: () => () => void;
export declare const initCyberpunkEffects: (enable?: boolean) => (() => void) | undefined;
