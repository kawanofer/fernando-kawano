import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Fernando Kawano',
  description:
    'Explore my portfolio of frontend development projects including React applications, TypeScript implementations, and modern web solutions. See my work with TOTVS Fluig, Germini Loyalty Platform, and Art Explorer.',
  keywords: [
    'Fernando Kawano Projects',
    'React Projects',
    'TypeScript Projects',
    'Frontend Portfolio',
    'Web Development Projects',
    'TOTVS Fluig',
    'Germini Loyalty',
    'Art Explorer',
    'Next.js Projects',
  ],
  openGraph: {
    title: 'Projects - Fernando Kawano Portfolio',
    description:
      'Explore my portfolio of frontend development projects including React applications, TypeScript implementations, and modern web solutions.',
    url: '/Projects',
    images: [
      {
        url: '/projects-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fernando Kawano Projects Portfolio',
      },
    ],
  },
  twitter: {
    title: 'Projects - Fernando Kawano Portfolio',
    description:
      'Explore my portfolio of frontend development projects including React applications and modern web solutions.',
    images: ['/projects-twitter-image.png'],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
