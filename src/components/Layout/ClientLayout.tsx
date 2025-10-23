'use client';

import React from 'react';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const globalErrorFallback = (
    <div className="bg-background flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mb-6 text-6xl">💥</div>
        <h1 className="mb-4 text-2xl font-bold text-white">
          Oops! Something went wrong
        </h1>
        <p className="mb-6 text-zinc-400">
          We&apos;re sorry, but something unexpected happened. Please refresh
          the page to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-background rounded-lg px-6 py-3 text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          aria-label="Refresh the page"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );

  const handleGlobalError = (error: Error) => {
    console.error('Global application error:', error);
    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: reportError(error);
    }
  };

  return (
    <ErrorBoundary
      fallback={globalErrorFallback}
      onError={handleGlobalError}
      showDetails={process.env.NODE_ENV === 'development'}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ClientLayout;
