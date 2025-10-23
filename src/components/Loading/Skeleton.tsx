'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses =
    'bg-gradient-to-r from-background-2 via-gray-600 to-background-2 bg-zinc-700';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse', // Could implement wave animation
    none: '',
  };

  const style = {
    width: width
      ? typeof width === 'number'
        ? `${width}px`
        : width
      : undefined,
    height: height
      ? typeof height === 'number'
        ? `${height}px`
        : height
      : undefined,
  };

  const defaultSizes = {
    text: variant === 'text' && !height ? 'h-4' : '',
    circular: variant === 'circular' && !width && !height ? 'h-12 w-12' : '',
    rectangular: variant === 'rectangular' && !height ? 'h-24' : '',
  };

  return (
    <div
      className={` ${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${defaultSizes[variant]} ${className} `}
      style={style}
      role="status"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
