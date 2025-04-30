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
  // Generate WebP and AVIF sources with responsive sizes
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  const avifSrc = src.replace(/\.(jpg|jpeg|png)$/, '.avif');
  
  // Generate responsive sizes for mobile
  const mobileWidth = Math.min(width, 768);
  const mobileSrcSet = `${webpSrc} ${mobileWidth}w, ${src} ${mobileWidth}w`;

  return (
    <picture>
      {/* AVIF format - best compression */}
      <source
        type="image/avif"
        srcSet={avifSrc}
        sizes={`(max-width: 768px) ${mobileWidth}px, ${width}px`}
      />
      {/* WebP format - good compression */}
      <source
        type="image/webp"
        srcSet={mobileSrcSet}
        sizes={`(max-width: 768px) ${mobileWidth}px, ${width}px`}
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
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: `${width}px ${height}px`
        }}
        {...props}
      />
    </picture>
  );
}; 