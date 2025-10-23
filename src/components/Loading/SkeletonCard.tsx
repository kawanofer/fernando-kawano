'use client';

import React from 'react';

import Skeleton from './Skeleton';

interface SkeletonCardProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showActions?: boolean;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  showImage = true,
  showTitle = true,
  showDescription = true,
  showActions = true,
  className = '',
}) => {
  return (
    <div className={`bg-background-2 rounded-lg p-6 ${className}`}>
      {showImage && (
        <Skeleton variant="rectangular" height={200} className="mb-4 w-full" />
      )}

      {showTitle && (
        <Skeleton variant="text" height={24} className="mb-3 w-3/4" />
      )}

      {showDescription && (
        <div className="mb-4 space-y-2">
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-5/6" />
          <Skeleton variant="text" className="w-4/5" />
        </div>
      )}

      {showActions && (
        <div className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width={80}
            height={36}
            className="rounded-md"
          />
          <Skeleton
            variant="rectangular"
            width={100}
            height={36}
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default SkeletonCard;
