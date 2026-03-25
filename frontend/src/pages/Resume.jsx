import { Link } from 'react-router-dom'

const RESUME_URL = 'https://drive.google.com/file/d/1820j_iIAsFHmFerx1rtF9GoHJc0l7Ne_/view'
const DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1820j_iIAsFHmFerx1rtF9GoHJc0l7Ne_'
const EMBED_URL = 'https://drive.google.com/file/d/1820j_iIAsFHmFerx1rtF9GoHJc0l7Ne_/preview'

export default function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-header">
        <Link to="/" className="nav-logo" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700 }}>
          HARSHA <span className="logo-accent">/&gt;</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            <i className="fas fa-external-link-alt" /> Open in Drive
          </a>
          <a href={DOWNLOAD_URL} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            <i className="fas fa-download" /> Download
          </a>
        </div>
      </div>
      <iframe
        className="resume-iframe"
        src={EMBED_URL}
        title="Harsha R - Resume"
        allow="autoplay"
      />
    </div>
  )
}
