'use client';

import React from 'react';

import LoadingSpinner from '@/components/Loading/LoadingSpinner';

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="mb-6">
          <LoadingSpinner size="lg" color="primary" />
        </div>

        {/* Loading Text */}
        <h2 className="mb-2 text-xl font-semibold text-white">
          Loading Portfolio
        </h2>

        <p className="text-sm text-zinc-400">
          Please wait while we prepare the experience...
        </p>

        {/* Progress Dots */}
        <div className="mt-4 flex justify-center space-x-1">
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full delay-150"></div>
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full delay-300"></div>
        </div>

        {/* Accessibility */}
        <div className="sr-only" role="status" aria-live="polite">
          Portfolio is loading, please wait
        </div>
      </div>
    </div>
  );
}
