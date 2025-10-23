'use client';

import React, { ReactNode, Suspense } from 'react';

import SectionErrorBoundary from '../ErrorBoundary/SectionErrorBoundary';
import LoadingSpinner from '../Loading/LoadingSpinner';

interface LoadingWrapperProps {
  children: ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  loadingComponent?: ReactNode;
  sectionName?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  isLoading = false,
  error = null,
  onRetry,
  loadingComponent,
  sectionName = 'Content',
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  // If there's an explicit error prop, show error state
  if (error) {
    return (
      <div
        className={`error-state ${className}`}
        role="alert"
        aria-label={ariaLabel || 'Error occurred'}
        aria-describedby={ariaDescribedby}
      >
        <div className="bg-background-2 flex min-h-[200px] items-center justify-center rounded-lg p-6">
          <div className="text-center">
            <div className="mb-3 text-4xl">⚠️</div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {sectionName} Unavailable
            </h3>
            <p className="mb-4 text-sm text-zinc-400">
              {error.message || 'An unexpected error occurred'}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="bg-primary hover:bg-primary-dark focus:ring-primary rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                aria-label="Retry loading content"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If loading, show loading state
  if (isLoading) {
    return (
      <div
        className={`loading-state ${className}`}
        role="status"
        aria-label={ariaLabel || 'Content is loading'}
        aria-describedby={ariaDescribedby}
        aria-live="polite"
      >
        {loadingComponent || <LoadingSpinner size="lg" />}
      </div>
    );
  }

  // Normal state: wrap in error boundary and suspense
  return (
    <SectionErrorBoundary sectionName={sectionName}>
      <Suspense
        fallback={
          <div
            className={`loading-state ${className}`}
            role="status"
            aria-label={ariaLabel || 'Content is loading'}
            aria-live="polite"
          >
            {loadingComponent || <LoadingSpinner size="lg" />}
          </div>
        }
      >
        <div
          className={className}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
        >
          {children}
        </div>
      </Suspense>
    </SectionErrorBoundary>
  );
};

// Specialized wrapper for async content
interface AsyncContentWrapperProps extends LoadingWrapperProps {
  data?: any;
  isEmpty?: boolean;
  emptyComponent?: ReactNode;
  emptyMessage?: string;
}

export const AsyncContentWrapper: React.FC<AsyncContentWrapperProps> = ({
  children,
  data,
  isEmpty = false,
  emptyComponent,
  emptyMessage = 'No content available',
  ...loadingWrapperProps
}) => {
  // Show empty state if data is loaded but empty
  if (
    !loadingWrapperProps.isLoading &&
    !loadingWrapperProps.error &&
    (isEmpty || (data !== undefined && !data))
  ) {
    return (
      <div
        className={`empty-state p-8 text-center ${loadingWrapperProps.className || ''}`}
        role="status"
        aria-label="No content available"
      >
        {emptyComponent || (
          <div className="text-gray-500 dark:text-gray-400">
            <p className="mb-2 text-lg font-medium">No Content</p>
            <p className="text-sm">{emptyMessage}</p>
          </div>
        )}
      </div>
    );
  }

  return <LoadingWrapper {...loadingWrapperProps}>{children}</LoadingWrapper>;
};
