import React from 'react';
import { useLicense } from './LicenseProvider';
import { Button } from '@/components/ui/button';

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
export function CtaButton({
  className = '',
  variant = 'primary',
  size = 'md',
  children,
  icon
}: CtaButtonProps) {
  const { openRegistrationModal } = useLicense();

  // Determine button styles based on variant
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:from-[#14F195]/90 hover:to-[#9945FF]/90 text-black font-bold';
      case 'secondary':
        return 'bg-[#1e2035] hover:bg-[#2a2c47] text-[#14F195] border border-[#14F195]/50';
      case 'outline':
        return 'bg-transparent hover:bg-[#1e2035]/50 text-white border border-[#9945FF]';
      case 'ghost':
        return 'bg-transparent hover:bg-[#1e2035]/50 text-white';
      default:
        return 'bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:from-[#14F195]/90 hover:to-[#9945FF]/90 text-black font-bold';
    }
  };

  // Determine button size
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-sm py-1.5 px-3';
      case 'md':
        return 'text-base py-2 px-4';
      case 'lg':
        return 'text-lg py-3 px-6';
      default:
        return 'text-base py-2 px-4';
    }
  };

  return (
    <button
      onClick={openRegistrationModal}
      className={`${getButtonStyles()} ${getSizeStyles()} rounded-md transition-all duration-200 flex items-center justify-center ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}