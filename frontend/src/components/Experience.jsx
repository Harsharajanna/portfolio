const STATIC_EXPERIENCES = [
  {
    id: 1,
    role: 'Decision Scientist',
    company: 'Mu Sigma Business Solutions Pvt Ltd',
    date: 'Aug 2025 – Nov 2025',
    desc: 'Helped customers make data-driven decisions using advanced analytical tools and methodologies. Worked as a bridge between raw data and strategic business outcomes, delivering insights using Excel, SQL, Python, and statistical models.',
    tags: 'Excel,SQL,Python,Statistics,Analytics',
  },
  {
    id: 2,
    role: 'IoT Intern',
    company: 'Karunadu Technologies Pvt Ltd',
    date: '2024',
    desc: 'Introduction to IoT – Worked on Internet of Things concepts, sensor integration, and device connectivity under industry mentorship.',
    tags: 'IoT,Embedded Systems,Sensors,Python',
  },
]

function parseTags(tags) {
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string') return tags.split(',').map(t => t.trim()).filter(Boolean)
  return []
}

export default function Experience({ data }) {
  const experiences = data && data.length > 0 ? data : STATIC_EXPERIENCES

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-header" data-aos="">
          <span className="section-tag">// experience</span>
          <h2 className="section-title">Work Experience</h2>
        </div>
        <div className="timeline" data-aos="">
          {experiences.map((e) => (
            <div className="timeline-item" key={e.id || e.role}>
              <div className="timeline-dot">
                <i className="fas fa-briefcase" />
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-role">{e.role}</h3>
                  <span className="timeline-date">{e.date}</span>
                </div>
                <h4 className="timeline-company">{e.company}</h4>
                <p className="timeline-desc">{e.desc}</p>
                <div className="timeline-tags">
                  {parseTags(e.tags).map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
