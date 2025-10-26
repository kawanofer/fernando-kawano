const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations (swcMinify is default in Next.js 15)
  compress: true,
  
  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled temporarily for build stability
    scrollRestoration: true,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers are handled in middleware.ts
};

module.exports = withBundleAnalyzer(nextConfig);
