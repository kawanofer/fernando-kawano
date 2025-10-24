'use client';

import React from 'react';

import Loader from '../Loader';

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading...',
  fullScreen = false,
}) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50'
    : 'flex min-h-[60vh]';

  return (
    <div
      className={`${containerClasses} flex items-center justify-center`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader size="large" color="primary" />
        <p className="text-lg font-medium text-white">{message}</p>
        <p className="sr-only">Please wait while the content loads</p>
      </div>
    </div>
  );
};

export default PageLoader;
