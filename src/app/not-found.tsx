'use client';

import React from 'react';

import Link from 'next/link';

import { FaArrowLeft, FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md text-center">
        {/* 404 Illustration */}
        <div className="text-primary mb-8 text-8xl font-bold">404</div>

        {/* Error Message */}
        <h1 className="mb-4 text-3xl font-bold text-white">Page Not Found</h1>

        <p className="mb-8 text-lg text-zinc-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          page might have been moved, deleted, or you might have entered an
          incorrect URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-background inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Go to homepage"
          >
            <FaHome aria-hidden="true" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="bg-secondary hover:bg-secondary-dark focus:ring-secondary focus:ring-offset-background inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Go back to previous page"
          >
            <FaArrowLeft aria-hidden="true" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-zinc-500">
          <p>
            If you think this is a mistake, please{' '}
            <a
              href="mailto:kawano.fer@gmail.com"
              className="text-primary hover:text-primary-dark focus:ring-primary focus:ring-offset-background underline focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              contact me
            </a>{' '}
            and let me know.
          </p>
        </div>
      </div>
    </div>
  );
}
