import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import Particles from './components/Particles'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [apiData, setApiData] = useState({ experience: [], projects: [], certificates: [] })

  useEffect(() => {
    // Try to load live data from the API; silently fallback to static data if unavailable
    const load = async () => {
      try {
        const [exp, proj, certs] = await Promise.all([
          fetch(`${API}/api/experience/`).then(r => r.json()),
          fetch(`${API}/api/projects/`).then(r => r.json()),
          fetch(`${API}/api/certificates/`).then(r => r.json()),
        ])
        setApiData({
          experience: Array.isArray(exp) ? exp : [],
          projects: Array.isArray(proj) ? proj : [],
          certificates: Array.isArray(certs) ? certs : [],
        })
      } catch {
        // backend not running — components will use static fallback data
      }
    }
    load()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('aos-animate')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects data={apiData.projects} />
        <Experience data={apiData.experience} />
        <Education />
        <Certificates data={apiData.certificates} />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}

export default App
