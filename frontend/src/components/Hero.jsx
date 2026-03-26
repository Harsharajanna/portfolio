import { useState, useEffect, useRef } from 'react'
import harshaPhoto from '../assets/harsha.svg'

const ROLES = [
  'AI Engineer',
  'Full Stack Developer',
  'Data Analyst',
  'Python Developer',
  'React Developer',
]


export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [typing, setTyping] = useState(true)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const role = ROLES[roleIdx]
    if (typing) {
      if (displayed.length < role.length) {
        timeoutRef.current = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80)
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, typing, roleIdx])

  return (
    <section id="home" className="hero">
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      <div className="hero-content">
        {/* Text Side */}
        <div className="hero-text">
          <p className="hero-greeting">// Hello, World! I'm</p>
          <h1 className="hero-name">Harsha R</h1>
          <div className="hero-role-wrapper">
            <span>I'm a </span>
            <span className="typed-text">{displayed}</span>
            <span className="cursor-blink">|</span>
          </div>
          <p className="hero-desc">
            A passionate technologist building intelligent, data-driven solutions at the intersection of analytics and software engineering.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Get In Touch
            </a>
          </div>
          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/harsha-r-2b-pop" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://wa.me/918722831505" target="_blank" rel="noreferrer" className="social-icon" title="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="https://t.me/8722831505" target="_blank" rel="noreferrer" className="social-icon" title="Telegram">
              <i className="fab fa-telegram-plane" />
            </a>
            <a href="mailto:harshar9177@gmail.com" className="social-icon" title="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="hero-visual">
          <div className="hero-triple-ring">
            <div className="hero-ring hero-ring-3" />
            <div className="hero-ring hero-ring-2" />
            <div className="hero-ring hero-ring-1">
              <img src={harshaPhoto} alt="Harsha R" className="avatar-photo" />
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
