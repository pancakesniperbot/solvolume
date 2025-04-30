declare module 'framer-motion' {
  import * as React from 'react';
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileInView?: any;
    viewport?: any;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    layout?: boolean;
    style?: React.CSSProperties;
  }

  export const motion: {
    div: React.FC<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    // Add other motion components as needed
  };

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
  }>;
} 