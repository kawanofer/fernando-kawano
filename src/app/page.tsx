import dynamic from 'next/dynamic';

import Layout from '@/components/Layout';
import { StructuredData } from '@/components/SEO';
import { Hero } from '@/components/Sections';

// Dynamic imports for code splitting - load above-the-fold content first
const AboutMe = dynamic(() => import('@/components/Sections/AboutMe'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center">Loading…</div>
  ),
});

const Education = dynamic(() => import('@/components/Sections/Education'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center">Loading…</div>
  ),
});

const Skills = dynamic(() => import('@/components/Sections/Skills'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center">Loading…</div>
  ),
});

const Contact = dynamic(() => import('@/components/Sections/Contact'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center">Loading…</div>
  ),
});

const Home = async () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fernando Kawano',
    jobTitle: 'Senior Front-End Engineer',
    description:
      'Senior Front-End Engineer with 10+ years delivering scalable, user-focused digital products. Deep expertise in React, TypeScript, Next.js, Redux, Node.js, and NestJS.',
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://fernando-kawano-ivory.vercel.app/',
    sameAs: [
      'https://github.com/kawanofer',
      'https://linkedin.com/in/kawanofer',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Curitiba',
      addressRegion: 'Paraná',
      addressCountry: 'Brazil',
    },
    knowsAbout: [
      'React',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Frontend Development',
      'Web Development',
      'UI/UX Design',
      'Responsive Design',
      'Material-UI',
      'Tailwind CSS',
      'Redux',
      'Context API',
      'Jest',
      'Testing',
      'Git',
      'Agile Methodologies',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance Frontend Engineer',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Positivo University',
        location: 'Curitiba, Brazil',
      },
    ],
    email: 'kawano.fer@gmail.com',
    image: '/kawano.png',
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <Layout>
        <Hero />
        <AboutMe />
        <Education />
        <Skills />
        <Contact />
      </Layout>
    </>
  );
};

export default Home;
