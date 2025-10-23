'use client';

import React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="focus:bg-primary focus:ring-tertiary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-white focus:underline focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      {children}
    </a>
  );
};

export default SkipLink;
