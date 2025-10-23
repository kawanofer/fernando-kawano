import Layout from '@/components/Layout';
import { StructuredData } from '@/components/SEO';
import {
  AboutMe,
  Contact,
  Education,
  Hero,
  Skills,
} from '@/components/Sections';

const Home = async () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fernando Kawano',
    jobTitle: 'Frontend Engineer',
    description:
      'Frontend Engineer with extensive experience in React, TypeScript, Next.js, and modern web technologies.',
    url:
      process.env.NEXT_PUBLIC_SITE_URL || 'https://fernando-kawano.vercel.app',
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
