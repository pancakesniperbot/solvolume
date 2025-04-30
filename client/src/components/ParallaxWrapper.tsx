import { ReactNode, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '@/hooks/use-mobile';

interface ParallaxWrapperProps {
  children: ReactNode;
  strength?: number;
  mouseStrength?: number;
  delay?: number;
  className?: string;
}

export function ParallaxWrapper({
  children,
  strength = 5,
  mouseStrength = 10,
  delay = 0,
  className = '',
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const { top, left, height, width } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;
      
      const offsetX = (centerX - windowCenterX) / window.innerWidth * strength;
      const offsetY = (centerY - windowCenterY) / window.innerHeight * strength;
      
      setPosition({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const mouseX = (e.clientX - left - width / 2) / width * mouseStrength;
      const mouseY = (e.clientY - top - height / 2) / height * mouseStrength;
      
      setPosition((prev) => ({
        x: prev.x + mouseX,
        y: prev.y + mouseY,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength, mouseStrength, isMobile]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ x: 0, y: 0 }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 50, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
} 