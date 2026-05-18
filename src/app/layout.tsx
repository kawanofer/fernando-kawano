import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { SkipLink } from '@/components/Accessibility';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
  display: 'swap', // Improve font loading performance
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Fernando Kawano - Frontend Engineer Portfolio',
    template: '%s | Fernando Kawano',
  },
  description:
    'Senior Front-End Engineer with 10+ years delivering scalable, user-focused digital products. Deep expertise in React, TypeScript, Next.js, Redux, Node.js, and NestJS. Based in Curitiba, Brazil.',
  keywords: [
    'Fernando Kawano',
    'Frontend Engineer',
    'React Developer',
    'TypeScript',
    'Next.js',
    'JavaScript',
    'Web Development',
    'Portfolio',
    'Brazil',
    'Software Engineer',
    'UI/UX',
    'Responsive Design',
  ],
  authors: [{ name: 'Fernando Kawano', url: 'https://github.com/kawanofer' }],
  creator: 'Fernando Kawano',
  publisher: 'Fernando Kawano',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      'https://fernando-kawano-ivory.vercel.app/'
  ),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'pt-BR': '/pt-BR',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Fernando Kawano - Frontend Engineer Portfolio',
    description:
      'Senior Front-End Engineer with 10+ years delivering scalable, user-focused digital products. Deep expertise in React, TypeScript, Next.js, Redux, Node.js, and NestJS. Based in Curitiba, Brazil.',
    siteName: 'Fernando Kawano Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fernando Kawano - Frontend Engineer Portfolio',
        type: 'image/png',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fernando Kawano" />
      </head>
      <body className={poppins.className}>
        {/* Skip Links for accessibility */}
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <SkipLink href="#navigation">Skip to navigation</SkipLink>

        <AppRouterCacheProvider>
          <main
            id="main-content"
            className="overflow-hidden font-normal sm:px-16 xl:px-40"
          >
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
        </AppRouterCacheProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
    </html>
  );
}
