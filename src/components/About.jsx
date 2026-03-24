import { Link } from 'react-router-dom'

const stats = [
  { num: '3+', label: 'Projects Completed' },
  { num: '4', label: 'Months at Mu Sigma' },
  { num: '10+', label: 'Technologies' },
  { num: '∞', label: 'Curiosity' },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header" data-aos="">
          <span className="section-tag">// about me</span>
          <h2 className="section-title">Who Am I?</h2>
        </div>
        <div className="about-grid">
          <div className="about-text" data-aos="">
            <p>
              I'm <strong>Harsha R</strong>, a Decision Scientist and Full Stack Developer with experience at{' '}
              <strong>Mu Sigma Business Solutions</strong>. I thrive at the intersection of data analytics and software
              engineering — transforming complex datasets into actionable intelligence and building robust applications.
            </p>
            <p>
              My toolkit spans from statistical analysis and machine learning to web development and cloud-native
              technologies. I enjoy solving real-world problems — from managing classroom logistics to building
              AI-driven emergency response systems.
            </p>
            <Link to="/resume" target="_blank" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-file-alt" /> View Resume
            </Link>
          </div>
          <div className="about-stats" data-aos="">
            {stats.map(s => (
              <div className="stat-card" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
