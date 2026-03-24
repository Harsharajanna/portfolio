export default function Footer() {
  const socials = [
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/harsha-r-2b-pop', label: 'LinkedIn' },
    { icon: 'fab fa-whatsapp', href: 'https://wa.me/918722831505', label: 'WhatsApp' },
    { icon: 'fab fa-telegram-plane', href: 'https://t.me/8722831505', label: 'Telegram' },
    { icon: 'fas fa-envelope', href: 'mailto:harshar9177@gmail.com', label: 'Email' },
  ]
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-brand">HARSHA <span className="logo-accent">/&gt;</span></p>
        <div className="footer-socials">
          {socials.map(s => (
            <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" title={s.label}>
              <i className={s.icon} />
            </a>
          ))}
        </div>
        <p className="footer-copy">&copy; 2025 Harsha R. Crafted with <span style={{ color: 'var(--accent)' }}>♥</span> and code.</p>
      </div>
    </footer>
  )
}
