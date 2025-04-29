import React from 'react';

interface SolanaCustomLogoProps {
  size?: number;
  className?: string;
  hideHamburgerLines?: boolean; // Parameter to specifically hide hamburger menu lines
}

export function SolanaCustomLogo({ size = 24, className = '', hideHamburgerLines = false }: SolanaCustomLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="32" fill="#0c0c15"/>
      
      <defs>
        <linearGradient id="solGradient1" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#14F195"/>
          <stop offset="100%" stopColor="#03E1FF"/>
        </linearGradient>
        <linearGradient id="solGradient2" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#9945FF"/>
          <stop offset="100%" stopColor="#03E1FF"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      
      {!hideHamburgerLines && (
        <g filter="url(#glow)" transform="scale(0.6) translate(20, 20)">
          {/* Top bar */}
          <rect x="10" y="15" width="44" height="8" rx="2" fill="url(#solGradient1)"/>
          
          {/* Middle bar */}
          <rect x="10" y="28" width="44" height="8" rx="2" fill="url(#solGradient2)"/>
          
          {/* Bottom bar */}
          <rect x="10" y="41" width="44" height="8" rx="2" fill="url(#solGradient1)"/>
        </g>
      )}
      
      {hideHamburgerLines && (
        <circle cx="32" cy="32" r="18" fill="url(#solGradient1)" filter="url(#glow)" />
      )}
    </svg>
  );
}

export default SolanaCustomLogo;