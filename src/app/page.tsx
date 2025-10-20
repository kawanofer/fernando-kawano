import Layout from '@/components/Layout';
import {
  AboutMe,
  Contact,
  Education,
  Hero,
  Portfolio,
  Skills,
} from '@/components/Sections';

const Home = async () => {
  return (
    <Layout>
      <Hero />
      <AboutMe />
      <Skills />
      <Portfolio />
      <Education />
      <Contact />
    </Layout>
  );
};

export default Home;
