import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Fernando Kawano - Portfolio',
  description: 'This is the my portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <AppRouterCacheProvider>
          <main
            className="
          overflow-hidden
          font-normal
          sm:px-16          
          xl:px-40
          "
          >
            {children}
            <SpeedInsights />
          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

// 2xl:bg-red-400
// xl:bg-blue-400
// lg:bg-red-600
// md:bg-green-300
// sm:bg-yellow-300
