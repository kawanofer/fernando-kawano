import Layout from '@/components/Layout';
import {
  AboutMe,
  Contact,
  Education,
  Hero,
  Skills,
} from '@/components/Sections';

const Home = async () => {
  return (
    <Layout>
      <Hero />
      <AboutMe />
      <Education />
      <Skills />
      <Contact />
    </Layout>
  );
};

export default Home;
