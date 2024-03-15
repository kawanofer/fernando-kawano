import AboutMe from '@/components/AboutMe'
import Education from '@/components/Education'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Skills from '@/components/Skills'

const Home = async () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <Skills />
      <Portfolio />
      <Education />
      <Footer />
    </>
  )
}

export default Home
