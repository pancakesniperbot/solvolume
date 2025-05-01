import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getPlaceholderSvg } from '@/utils/imageCache';

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
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(getPlaceholderSvg());
      onError?.(e);
    }
  };

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
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={cn(
          'object-cover',
          isLoading && 'animate-pulse bg-muted',
          className
        )}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </picture>
  );
}; 