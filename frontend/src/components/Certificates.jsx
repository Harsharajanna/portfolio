import { useState } from 'react'

// Local certificate PDFs (stored in src/assets/certificates/)
import certAI    from '../assets/certificates/Coursera 2THLEGTWTMSZ.pdf'
import certIoT   from '../assets/certificates/Coursera 95SEUHNQV6CS.pdf'
import certML    from '../assets/certificates/Coursera BPVGWQWEPUZ8.pdf'
import certMean  from '../assets/certificates/Coursera Mean Stack.pdf'
import certKaru  from '../assets/certificates/HARSHA R_iot.pdf'

const STATIC_CERTIFICATES = [
  {
    id: 1,
    title: 'Machine Learning with Python',
    issuer: 'IBM',
    platform: 'Coursera',
    year: '2024',
    icon: 'fas fa-brain',
    color: '#3b82f6',
    certFile: certML,
    verifyUrl: 'https://coursera.org/verify/BPVGWQWEPUZ8',
    tags: 'Python,ML,Scikit-learn,AI',
    description: 'Covers supervised and unsupervised learning algorithms, model evaluation, and real-world ML applications using Python and scikit-learn.',
  },
  {
    id: 2,
    title: 'Introduction to Artificial Intelligence (AI)',
    issuer: 'IBM',
    platform: 'Coursera',
    year: '2024',
    icon: 'fas fa-robot',
    color: '#f59e0b',
    certFile: certAI,
    verifyUrl: 'https://coursera.org/verify/2THLEGTWTMSZ',
    tags: 'AI,Deep Learning,NLP,Machine Learning',
    description: 'Explores the history, applications, and concepts of AI including machine learning, deep learning, and natural language processing.',
  },
  {
    id: 3,
    title: 'IoT – Wireless & Cloud Computing Emerging Technologies',
    issuer: 'YONSEI University',
    platform: 'Coursera',
    year: '2024',
    icon: 'fas fa-microchip',
    color: '#10b981',
    certFile: certIoT,
    verifyUrl: 'https://coursera.org/verify/95SEUHNQV6CS',
    tags: 'IoT,Wireless,Cloud Computing,Sensors',
    description: 'Introduction to IoT concepts, sensor networks, wireless communication, and cloud integration for connected device ecosystems.',
  },
  {
    id: 4,
    title: 'Full-Stack Web Development with MEAN Stack',
    issuer: 'Hong Kong Univ. of Science & Technology',
    platform: 'Coursera',
    year: '2024',
    icon: 'fas fa-layer-group',
    color: '#8b5cf6',
    certFile: certMean,
    verifyUrl: '',
    tags: 'MongoDB,Express,Angular,Node.js',
    description: 'Comprehensive full-stack development covering MongoDB, Express, Angular, Node.js — building and deploying production-grade web applications.',
  },
  {
    id: 5,
    title: 'Introduction to IoT (Internship Completion)',
    issuer: 'Karunadu Technologies Pvt Ltd',
    platform: 'Industry',
    year: '2024',
    icon: 'fas fa-network-wired',
    color: '#ef4444',
    certFile: certKaru,
    verifyUrl: '',
    tags: 'IoT,Embedded Systems,Industry',
    description: 'Internship completion certificate for hands-on IoT development at Karunadu Technologies, covering embedded systems and device integration.',
  },
]

function parseTags(t) {
  if (Array.isArray(t)) return t
  if (typeof t === 'string') return t.split(',').map(x => x.trim()).filter(Boolean)
  return []
}

function CertificateModal({ cert, onClose }) {
  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal" onClick={e => e.stopPropagation()}>
        <div className="cert-modal-header">
          <div className="cert-modal-title-wrap">
            <span className="cert-modal-issuer">{cert.issuer} · {cert.platform}</span>
            <h3 className="cert-modal-title">{cert.title}</h3>
          </div>
          <div className="cert-modal-actions">
            {cert.verifyUrl && (
              <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="cert-modal-verify">
                <i className="fas fa-external-link-alt" /> Verify
              </a>
            )}
            <a href={cert.certFile} download className="cert-modal-download">
              <i className="fas fa-download" /> Download
            </a>
            <button className="cert-modal-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        <div className="cert-modal-body">
          <iframe
            src={cert.certFile + '#toolbar=0&navpanes=0'}
            title={cert.title}
            className="cert-modal-iframe"
          />
        </div>
      </div>
    </div>
  )
}

export default function Certificates({ data }) {
  const certs = data && data.length > 0 ? data : STATIC_CERTIFICATES
  const [active, setActive] = useState(null)

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <div className="section-header" data-aos="">
          <span className="section-tag">// certificates</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Industry-recognized credentials — click any card to view</p>
        </div>

        <div className="certs-grid" data-aos="">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="cert-card"
              onClick={() => setActive(cert)}
              style={{ '--cert-color': cert.color }}
            >
              <div className="cert-card-top">
                <div className="cert-issuer-badge">
                  <span>{cert.issuer}</span>
                </div>
                <span className="cert-year-badge">{cert.year}</span>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-desc">{cert.description || cert.desc || ''}</p>

              <div className="cert-tags">
                {parseTags(cert.tags).map((t) => <span key={t}>{t}</span>)}
              </div>

              <div className="cert-footer">
                <span className="cert-platform">
                  <i className="fas fa-certificate" /> {cert.platform} · {cert.year}
                </span>
                <span className="cert-verify-btn">
                  View Certificate <i className="fas fa-expand-alt" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && <CertificateModal cert={active} onClose={() => setActive(null)} />}
    </section>
  )
}
