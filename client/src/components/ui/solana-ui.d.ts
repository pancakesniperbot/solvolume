import { ReactNode } from "react";
interface Solana3DCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: "purple" | "green" | "blue" | "multi";
    depth?: "low" | "medium" | "high";
    interactive?: boolean;
    hoverScale?: number;
}
export declare function Solana3DCard({ children, className, glowColor, depth, interactive, hoverScale, }: Solana3DCardProps): import("react/jsx-runtime").JSX.Element;
interface Solana3DButtonProps {
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    glowColor?: "purple" | "green" | "blue" | "multi";
    fullWidth?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}
export declare function Solana3DButton({ children, onClick, className, variant, size, glowColor, fullWidth, disabled, icon, iconPosition, }: Solana3DButtonProps): import("react/jsx-runtime").JSX.Element;
interface SolanaFloatingBadgeProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "success" | "warning" | "error" | "gradient";
    size?: "sm" | "md" | "lg";
    animated?: boolean;
}
export declare function SolanaFloatingBadge({ children, className, variant, size, animated, }: SolanaFloatingBadgeProps): import("react/jsx-runtime").JSX.Element;
interface SolanaGlowTextProps {
    children: ReactNode;
    className?: string;
    color?: "purple" | "green" | "blue" | "gradient";
    intensity?: "low" | "medium" | "high";
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}
export declare function SolanaGlowText({ children, className, color, intensity, as, }: SolanaGlowTextProps): import("react/jsx-runtime").JSX.Element;
interface SolanaFloatingStatCardProps {
    value: string | number;
    label: string;
    icon?: ReactNode;
    iconColor?: "purple" | "green" | "blue" | "gradient";
    className?: string;
    valueSize?: "sm" | "md" | "lg" | "xl";
}
export declare function SolanaFloatingStatCard({ value, label, icon, iconColor, className, valueSize, }: SolanaFloatingStatCardProps): import("react/jsx-runtime").JSX.Element;
export {};
