import React from 'react';
interface CtaButtonProps {
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    icon?: React.ReactNode;
}
/**
 * Button component that opens the registration modal when clicked
 * This can be used for any CTA (Call to Action) throughout the site
 */
export declare function CtaButton({ className, variant, size, children, icon }: CtaButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
