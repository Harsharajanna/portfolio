import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const contactItems = [
  { icon: 'fas fa-envelope', label: 'Email', value: 'harshar9177@gmail.com', href: 'mailto:harshar9177@gmail.com' },
  { icon: 'fab fa-whatsapp', label: 'WhatsApp', value: '+91 87228 31505', href: 'https://wa.me/918722831505' },
  { icon: 'fab fa-telegram-plane', label: 'Telegram', value: '+91 87228 31505', href: 'https://t.me/8722831505' },
  { icon: 'fas fa-phone', label: 'Phone', value: '+91 87228 31505', href: 'tel:+918722831505' },
  { icon: 'fab fa-linkedin-in', label: 'LinkedIn', value: 'harsha-r-2b-pop', href: 'https://www.linkedin.com/in/harsha-r-2b-pop' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [feedback, setFeedback] = useState({ msg: '', type: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setFeedback({ msg: '', type: '' })
    try {
      const res = await fetch(`${API}/api/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setFeedback({ msg: '✓ Message sent! I will get back to you soon.', type: 'success' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setFeedback({ msg: '✗ Failed to send. Please email me directly at harshar9177@gmail.com', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header" data-aos="">
          <span className="section-tag">// contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have an idea or opportunity? Let's talk!</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info" data-aos="">
            <h3>Contact Details</h3>
            {contactItems.map((c) => (
              <div className="contact-item" key={c.label}>
                <div className="contact-item-icon"><i className={c.icon} /></div>
                <div>
                  <span className="contact-label">{c.label}</span>
                  <a href={c.href} className="contact-value" target={c.href.startsWith('mailto') || c.href.startsWith('tel') ? undefined : '_blank'} rel="noreferrer">
                    {c.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-wrapper" data-aos="">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="Project Collaboration" value={form.subject} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Sending...' : <><span>Send Message</span> <i className="fas fa-paper-plane" /></>}
              </button>
              {feedback.msg && (
                <div className={`form-feedback ${feedback.type}`}>{feedback.msg}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
