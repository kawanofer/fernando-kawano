'use client';

import React from 'react';

import Skeleton from './Skeleton';

interface SkeletonListProps {
  count?: number;
  showAvatar?: boolean;
  className?: string;
}

const SkeletonList: React.FC<SkeletonListProps> = ({
  count = 3,
  showAvatar = false,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-background-2 flex items-start space-x-4 rounded-lg p-4"
        >
          {showAvatar && <Skeleton variant="circular" width={48} height={48} />}
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton variant="text" height={20} className="w-1/3" />
            <Skeleton variant="text" height={16} className="w-full" />
            <Skeleton variant="text" height={16} className="w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonList;
