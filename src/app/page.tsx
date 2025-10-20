import Layout from '@/components/Layout';
import {
  AboutMe,
  Contact,
  Education,
  Hero,
  Skills,
  WorkExperiences,
} from '@/components/Sections';

const Home = async () => {
  return (
    <Layout>
      <Hero />
      <AboutMe />
      <Education />
      <WorkExperiences />
      <Skills />
      <Contact />
    </Layout>
  );
};

export default Home;
