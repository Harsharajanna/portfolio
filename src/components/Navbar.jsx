import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certificates', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      for (const id of [...links].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id); break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={() => scrollTo('home')}>
          HARSHA <span className="logo-accent">/&gt;</span>
        </a>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(id => (
            <li key={id}>
              <button
                className={`nav-link ${active === id ? 'active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <Link to="/resume" className="nav-resume-btn" target="_blank">
              <i className="fas fa-file-alt" /> Resume
            </Link>
          </li>
          <li>
            <Link to="/admin" className="nav-admin-btn" title="Admin Panel">
              <i className="fas fa-lock" /> Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
