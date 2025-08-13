"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithOptimizationProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export const ImageWithOptimization: React.FC<ImageWithOptimizationProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = "empty",
  blurDataURL
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`
          duration-700 ease-in-out
          ${isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
          }
        `}
        onLoad={() => setLoading(false)}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};