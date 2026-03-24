const STATIC_PROJECTS = [
  {
    id: 1,
    icon: 'fas fa-book',
    badge: 'Web App',
    featured: false,
    title: 'Library Management System',
    desc: 'Automated book inventory and user transactions. Built with HTML, CSS, JavaScript, and PHP to manage book lending, returns, and user records.',
    features: 'Automated book inventory management\nUser borrow & return transactions\nAdmin dashboard for book records\nSearch and filter functionality',
    tech: 'HTML,CSS,JavaScript,PHP',
    github: '',
    demo: '',
  },
  {
    id: 2,
    icon: 'fas fa-chalkboard-teacher',
    badge: 'Web App',
    featured: false,
    title: 'Classroom Management System',
    desc: 'Automated classroom allotment process for colleges. Features a 3-module system for Admin, Class Representatives (CR), and Lecturers.',
    features: 'Admin loads classroom details & availability\nCR & Lecturers can book rooms (max 2 hrs)\nConflict detection with notifications\nAdmin can reserve rooms for exams',
    tech: 'PHP,MySQL,HTML,CSS,JavaScript',
    github: '',
    demo: '',
  },
  {
    id: 3,
    icon: 'fas fa-hospital',
    badge: 'Full Stack',
    featured: true,
    title: 'Hospital Management System',
    desc: 'MERN stack application for managing hospital appointments, patient records, and real-time status tracking for doctors and patients.',
    features: 'Patient appointment booking & tracking\nDoctor availability management\nReal-time status updates\nAdmin control panel',
    tech: 'MongoDB,Express,React,Node.js',
    github: '',
    demo: '',
  },
  {
    id: 4,
    icon: 'fas fa-flask',
    badge: 'Research',
    featured: false,
    title: 'Psoriasis Therapy Study',
    desc: 'Statistical analysis proving the effectiveness of two pharmaceutical drugs based on patient demographics — Topical Therapy vs. BMS compound.',
    features: 'Patient demographic segmentation\nCohort-based drug efficacy comparison\nStatistical significance testing\nData visualization & reporting',
    tech: 'Python,Excel,SQL,Statistics',
    github: '',
    demo: '',
  },
]

function parseTags(str) {
  if (Array.isArray(str)) return str
  if (typeof str === 'string') return str.split(',').map(t => t.trim()).filter(Boolean)
  return []
}

function parseFeatures(str) {
  if (Array.isArray(str)) return str
  if (typeof str === 'string') return str.split('\n').map(t => t.trim()).filter(Boolean)
  return []
}

export default function Projects({ data }) {
  const projects = data && data.length > 0 ? data : STATIC_PROJECTS

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header" data-aos="">
          <span className="section-tag">// projects</span>
          <h2 className="section-title">What I've Built</h2>
        </div>
        <div className="projects-grid">
          {projects.map((p) => (
            <div className={`project-card ${p.featured ? 'featured' : ''}`} key={p.id || p.title} data-aos="">
              <div className="project-header">
                <div className="project-icon"><i className={p.icon || 'fas fa-code'} /></div>
                {p.badge && <span className="project-badge">{p.badge}</span>}
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-features">
                {parseFeatures(p.features).map((f) => (
                  <li key={f}><i className="fas fa-check-circle" />{f}</li>
                ))}
              </ul>
              <div className="project-tech">
                {parseTags(p.tech).map((t) => <span key={t}>{t}</span>)}
              </div>
              {(p.github || p.demo) && (
                <div className="project-links">
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="project-link"><i className="fab fa-github" /> Code</a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="project-link"><i className="fas fa-external-link-alt" /> Demo</a>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
