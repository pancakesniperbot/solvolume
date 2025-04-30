import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}) => {
  // Generate WebP and AVIF sources
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  const avifSrc = src.replace(/\.(jpg|jpeg|png)$/, '.avif');

  return (
    <picture>
      {/* AVIF format - best compression */}
      <source
        type="image/avif"
        srcSet={avifSrc}
        sizes={`(max-width: ${width}px) 100vw, ${width}px`}
      />
      {/* WebP format - good compression */}
      <source
        type="image/webp"
        srcSet={webpSrc}
        sizes={`(max-width: ${width}px) 100vw, ${width}px`}
      />
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={cn('object-cover', className)}
        {...props}
      />
    </picture>
  );
}; 