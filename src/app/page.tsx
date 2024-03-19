import AboutMe from '@/components/AboutMe'
import Education from '@/components/Education'
import Hero from '@/components/Hero'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import ScrollToTopButton from '@/components/Layout/scrollToTop'
import Portfolio from '@/components/Portfolio'
import Skills from '@/components/Skills'

const Home = async () => {
  return (
    <>
      <Navbar />
      <ScrollToTopButton />
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
