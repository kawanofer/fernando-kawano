import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { SkipLink } from '@/components/Accessibility';
import ClientLayout from '@/components/Layout/ClientLayout';

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
    'Frontend Engineer with extensive experience in React, TypeScript, Next.js, and modern web technologies. Based in Curitiba, Brazil. Specializing in creating immersive digital experiences and user-friendly solutions.',
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
      'Frontend Engineer with extensive experience in React, TypeScript, Next.js, and modern web technologies. Based in Curitiba, Brazil.',
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
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fernando Kawano" />

        {/* Font Awesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        {/* Skip Links for accessibility */}
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <SkipLink href="#navigation">Skip to navigation</SkipLink>

        <ClientLayout>
          <AppRouterCacheProvider>
            <main
              id="main-content"
              className="overflow-hidden font-normal sm:px-16 xl:px-40"
              role="main"
            >
              {children}
              <SpeedInsights />
            </main>
          </AppRouterCacheProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
