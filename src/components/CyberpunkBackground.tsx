import React from 'react';

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
export function CyberpunkBackground({
  variant = 'dark',
  withGrid = true,
  withNoise = true,
  withGlitch = false,
  className = ''
}: CyberpunkBackgroundProps) {
  // Base colors based on variant - darker to reduce eye strain
  const bgColors = {
    dark: 'linear-gradient(to bottom, #050508, #0A0B14)',
    medium: 'linear-gradient(to bottom, #0A0B14, #121320)',
    light: 'linear-gradient(to bottom, #121320, #1A1F35)'
  };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Base background with gradient */}
      <div 
        className="absolute inset-0" 
        style={{ background: bgColors[variant] }}
      />
      
      {/* Noise texture overlay - static, no animation */}
      {withNoise && (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px'
          }}
        />
      )}
      
      {/* Simple grid pattern - no animation */}
      {withGrid && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #14F195 1px, transparent 1px),
              linear-gradient(to bottom, #14F195 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px', // Larger grid for better performance
          }}
        />
      )}
      
      {/* Larger horizontal lines - static */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, #14F195 1px, transparent 1px)`,
          backgroundSize: '100% 100px',
          backgroundPosition: '0 25px'
        }}
      />
      
      {/* Static accent colors instead of dynamic rendering */}
      <div 
        className="absolute w-4/5 h-2/5 opacity-40 blur-[100px] rounded-full"
        style={{
          background: 'rgba(20, 241, 149, 0.03)',
          top: '20%',
          left: '30%',
        }}
      />
      
      <div 
        className="absolute w-1/2 h-1/2 opacity-40 blur-[100px] rounded-full"
        style={{
          background: 'rgba(153, 69, 255, 0.04)',
          top: '60%',
          left: '80%',
        }}
      />
      
      {/* Enhanced Vignette effect - simple static gradient */}
      <div 
        className="absolute inset-0 opacity-80" 
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, black 150%)'
        }}
      />
    </div>
  );
}