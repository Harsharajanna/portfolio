const categories = [
  {
    title: 'Languages',
    icon: 'fas fa-code',
    chips: ['Python', 'Java', 'C++', 'C'],
  },
  {
    title: 'Web Development',
    icon: 'fas fa-globe',
    chips: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'React JS'],
  },
  {
    title: 'Databases',
    icon: 'fas fa-database',
    chips: ['MySQL', 'Neo4j', 'MongoDB'],
  },
  {
    title: 'Tools & Platforms',
    icon: 'fas fa-tools',
    chips: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'LLM'],
  },
  {
    title: 'Analytics',
    icon: 'fas fa-chart-bar',
    chips: ['Excel', 'SQL', 'Statistics'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-header" data-aos="">
          <span className="section-tag">// skills</span>
          <h2 className="section-title">My Tech Stack</h2>
        </div>
        <div className="skills-categories" data-aos="">
          {categories.map((cat) => (
            <div className="skill-category" key={cat.title}>
              <h3 className="category-title">
                <i className={cat.icon} /> {cat.title}
              </h3>
              <div className="skills-grid">
                {cat.chips.map((chip) => (
                  <div className="skill-chip" key={chip}>
                    {chip}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
