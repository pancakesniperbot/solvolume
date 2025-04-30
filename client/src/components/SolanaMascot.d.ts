interface SolanaMascotProps {
    messages?: string[];
    position?: 'bottom-right' | 'mid-right' | 'top-right';
    ctaText?: string;
    ctaLink?: string;
    onCtaClick?: () => void;
    autoHide?: boolean;
    autoHideDelay?: number;
    marketSentiment?: 'bullish' | 'bearish' | 'neutral';
}
export declare function SolanaMascot({ messages, position, ctaText, ctaLink, onCtaClick, autoHide, autoHideDelay, // 1 minute
marketSentiment }: SolanaMascotProps): import("react/jsx-runtime").JSX.Element | null;
export {};
