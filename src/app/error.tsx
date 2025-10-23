'use client';

import React, { useEffect } from 'react';

import { FaBug, FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

import Button from '@/components/UI/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console and monitoring service
    console.error('Application Error:', error);

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: reportError(error);
    }
  }, [error]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const isNetworkError =
    error.message.includes('fetch') ||
    error.message.includes('network') ||
    error.message.includes('Network');

  const isChunkError =
    error.message.includes('Loading chunk') ||
    error.message.includes('Loading CSS chunk');

  const getErrorType = () => {
    if (isNetworkError) return 'network';
    if (isChunkError) return 'chunk';
    return 'general';
  };

  const getErrorIcon = () => {
    switch (getErrorType()) {
      case 'network':
        return '📡';
      case 'chunk':
        return '🔧';
      default:
        return '💥';
    }
  };

  const getErrorTitle = () => {
    switch (getErrorType()) {
      case 'network':
        return 'Connection Problem';
      case 'chunk':
        return 'Loading Problem';
      default:
        return 'Oops! Something went wrong';
    }
  };

  const getErrorDescription = () => {
    switch (getErrorType()) {
      case 'network':
        return 'We&apos;re having trouble connecting to our servers. Please check your internet connection and try again.';
      case 'chunk':
        return 'There was a problem loading part of the application. This usually happens after an update.';
      default:
        return 'We&apos;re sorry, but something unexpected happened. Our team has been notified.';
    }
  };

  const getActionText = () => {
    switch (getErrorType()) {
      case 'chunk':
        return 'Refresh Page';
      default:
        return 'Try Again';
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6 text-6xl" role="img" aria-label="Error indicator">
          {getErrorIcon()}
        </div>

        {/* Error Title */}
        <h1 className="mb-4 text-2xl font-bold text-white">
          {getErrorTitle()}
        </h1>

        {/* Error Description */}
        <p className="mb-6 text-zinc-400">{getErrorDescription()}</p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300">
              <FaBug aria-hidden="true" />
              Technical Details
            </summary>
            <div className="bg-background-2 max-h-32 overflow-auto rounded-lg p-4 text-xs text-zinc-300">
              <strong>Error:</strong> {error.name}
              <br />
              <strong>Message:</strong> {error.message}
              <br />
              {error.digest && (
                <>
                  <strong>Digest:</strong> {error.digest}
                  <br />
                </>
              )}
              {error.stack && (
                <>
                  <strong>Stack:</strong>
                  <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
                </>
              )}
            </div>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={
              getErrorType() === 'chunk'
                ? handleRefresh
                : reset || handleRefresh
            }
            className="bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-background flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label={getActionText()}
          >
            <FaRedo aria-hidden="true" />
            {getActionText()}
          </Button>

          <Button
            onClick={handleGoHome}
            className="bg-secondary hover:bg-secondary-dark focus:ring-secondary focus:ring-offset-background flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Go to homepage"
          >
            <FaHome aria-hidden="true" />
            Go Home
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-zinc-500">
          <p>
            If this problem persists, try{' '}
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="text-primary hover:text-primary-dark focus:ring-primary focus:ring-offset-background underline focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label="Clear browser data and refresh"
            >
              clearing your browser data
            </button>{' '}
            or contact support.
          </p>
        </div>

        {/* Error ID for Support */}
        {error.digest && (
          <div className="mt-4 text-xs text-zinc-600">
            <span>Error ID: {error.digest}</span>
          </div>
        )}
      </div>
    </div>
  );
}
