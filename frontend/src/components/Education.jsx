const education = [
  {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science & Engineering',
    institution: 'The National Institute of Engineering',
    location: 'Mysuru, Karnataka',
    affiliated: 'VTU Affiliated',
    date: '2021 – 2025',
    grade: 'CGPA: 8.78 / 10',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/NIE_University_logo.svg/960px-NIE_University_logo.svg.png',
    icon: 'fas fa-university',
    tags: ['C/C++', 'Java', 'DBMS', 'Data Structures', 'OS', 'Machine Learning', 'Python'],
    highlights: [
      'Specialization in AI & Data Science electives',
      'Developed capstone projects in ML & Web',
      'Member of the technical club',
    ],
  },
  {
    degree: 'Diploma in Engineering',
    field: 'Computer Science & Engineering',
    institution: 'Govt. CPC Polytechnic',
    location: 'Mysuru, Karnataka',
    affiliated: 'DTE Karnataka',
    date: '2018 – 2021',
    grade: 'Percentage: 89.67%',
    logo: 'https://cache.careers360.mobi/media/colleges/social-media/logo/Logo_of_Government_CPC_Polytechnic_Mysore_Logo.png',
    icon: 'fas fa-tools',
    tags: ['C', 'C++', 'Electronics', 'Networking', 'DBMS'],
    highlights: [
      'Scored 89.67% consistently across semesters',
      'Hands-on labs in networking and electronics',
      'Graduated with distinction',
    ],
  },
  {
    degree: 'SSLC – Secondary School Leaving Certificate',
    field: 'State Board Karnataka',
    institution: 'JSS Public School',
    location: 'Siddarthanagar, Mysuru',
    affiliated: 'KSEEB',
    date: '2017 – 2018',
    grade: 'Percentage: 74%',
    logo: 'https://www.google.com/s2/favicons?domain=jsspssnmys.com&sz=128',
    icon: 'fas fa-school',
    tags: ['Mathematics', 'Science', 'English', 'Kannada', 'Social Studies'],
    highlights: [
      'Completed SSLC under Karnataka State Board',
      'Managed by JSS Mahavidyapeetha Trust',
      'Active in school extracurriculars',
    ],
  },
]

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section-header" data-aos="">
          <span className="section-tag">// education</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">My educational journey that laid the technical foundation</p>
        </div>

        <div className="education-timeline" data-aos="">
          {education.map((edu, idx) => (
            <div className="edu-card" key={idx}>
              {idx < education.length - 1 && <div className="edu-connector" />}

              <div className="edu-card-inner">
                {/* 3-Circle Logo Stack */}
                <div className="edu-logo-col">
                  <div className="edu-triple-ring">
                    <div className="edu-ring edu-ring-3" />
                    <div className="edu-ring edu-ring-2" />
                    <div className="edu-ring edu-ring-1">
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="edu-logo-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = `<i class="${edu.icon}" style="font-size:1.6rem;color:var(--accent)"></i>`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="edu-content">
                  <div className="edu-header">
                    <div className="edu-title-block">
                      <h3 className="edu-degree">{edu.degree}</h3>
                      <span className="edu-field">{edu.field}</span>
                    </div>
                    <span className="edu-date">
                      <i className="far fa-calendar-alt" /> {edu.date}
                    </span>
                  </div>

                  <div className="edu-institution">
                    <i className={edu.icon} />
                    <div>
                      <span className="edu-inst-name">{edu.institution}</span>
                      <span className="edu-college">{edu.location} &middot; {edu.affiliated}</span>
                    </div>
                  </div>

                  <div className="edu-grade">
                    <i className="fas fa-award" />
                    <span>{edu.grade}</span>
                  </div>

                  <ul className="edu-highlights">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>
                        <i className="fas fa-check-circle" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="edu-tags">
                    {edu.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
