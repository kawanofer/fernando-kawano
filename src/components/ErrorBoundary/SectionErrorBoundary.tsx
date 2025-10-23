'use client';

import React, { ReactNode } from 'react';

import ErrorBoundary from './ErrorBoundary';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName: string;
}

const SectionErrorBoundary: React.FC<SectionErrorBoundaryProps> = ({
  children,
  sectionName,
}) => {
  const handleError = (error: Error) => {
    console.error(`Error in ${sectionName} section:`, error);
    // Could send to monitoring service
  };

  const fallbackUI = (
    <div className="bg-background-2 flex min-h-[200px] items-center justify-center rounded-lg p-6">
      <div className="text-center">
        <div className="mb-3 text-4xl">⚠️</div>
        <h3 className="mb-2 text-lg font-semibold text-white">
          {sectionName} Section Unavailable
        </h3>
        <p className="text-sm text-zinc-400">
          This section is temporarily unavailable. Please refresh the page to
          try again.
        </p>
      </div>
    </div>
  );

  return (
    <ErrorBoundary
      fallback={fallbackUI}
      onError={handleError}
      showDetails={process.env.NODE_ENV === 'development'}
    >
      {children}
    </ErrorBoundary>
  );
};

export default SectionErrorBoundary;
