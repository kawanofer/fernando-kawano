'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

import Button from '@/components/UI/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Call optional error reporting callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to monitoring service (when implemented)
    // reportError(error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="bg-background flex min-h-screen items-center justify-center p-4">
          <div className="bg-background-2 w-full max-w-md rounded-lg p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <FaExclamationTriangle
                className="h-16 w-16 text-red-500"
                aria-hidden="true"
              />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-white">
              Oops! Something went wrong
            </h1>

            <p className="mb-6 text-zinc-400">
              We&apos;re sorry, but something unexpected happened. Please try
              refreshing the page or return to the homepage.
            </p>

            {this.props.showDetails && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-zinc-500 hover:text-zinc-300">
                  Technical Details
                </summary>
                <div className="mt-2 rounded bg-gray-800 p-3 text-xs text-red-400">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={this.handleRetry}
                icon={FaRedo}
                className="flex items-center justify-center gap-2"
                aria-label="Try again"
              >
                Try Again
              </Button>

              <Button
                onClick={this.handleRefresh}
                className="bg-secondary hover:bg-primary flex items-center justify-center gap-2"
                aria-label="Refresh page"
              >
                <FaRedo className="h-4 w-4" aria-hidden="true" />
                Refresh Page
              </Button>

              <Button
                onClick={this.handleGoHome}
                icon={FaHome}
                className="bg-tertiary text-background hover:bg-secondary flex items-center justify-center gap-2 hover:text-white"
                aria-label="Go to homepage"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
