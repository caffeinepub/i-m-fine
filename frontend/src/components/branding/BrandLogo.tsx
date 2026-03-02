import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'h-32 w-32 sm:h-40 sm:w-40',
    md: 'h-40 w-40 sm:h-48 sm:w-48',
    lg: 'h-48 w-48 sm:h-56 sm:w-56',
  };

  return (
    <img
      src="/assets/Im_Fine_logo.png"
      alt="I'm Fine - a safe space for healing"
      className={`${sizeClasses[size]} object-contain rounded-lg flex-shrink-0 ${className}`}
    />
  );
}
