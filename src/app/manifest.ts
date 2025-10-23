import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fernando Kawano - Frontend Engineer Portfolio',
    short_name: 'Fernando Kawano',
    description:
      'Frontend Engineer with extensive experience in React, TypeScript, Next.js, and modern web technologies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#27323E',
    theme_color: '#435585',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['portfolio', 'developer', 'frontend'],
    lang: 'en',
    dir: 'ltr',
  };
}
