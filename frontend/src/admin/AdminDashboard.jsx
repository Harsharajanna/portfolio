import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function useApi(token) {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  const get = (url) => fetch(`${API}${url}`, { headers }).then(r => r.json())
  const post = (url, body) => fetch(`${API}${url}`, { method: 'POST', headers, body: JSON.stringify(body) }).then(r => r.json())
  const put = (url, body) => fetch(`${API}${url}`, { method: 'PUT', headers, body: JSON.stringify(body) }).then(r => r.json())
  const del = (url) => fetch(`${API}${url}`, { method: 'DELETE', headers }).then(r => r.json())
  const patch = (url) => fetch(`${API}${url}`, { method: 'PATCH', headers }).then(r => r.json())
  return { get, post, put, del, patch }
}

const TABS = ['Experience', 'Projects', 'Certificates', 'Messages']

/* ─── Blank templates for new items ─── */
const BLANK = {
  Experience: { role: '', company: '', date: '', desc: '', tags: '', sort_order: 0 },
  Projects: { title: '', desc: '', icon: 'fas fa-code', badge: '', features: '', tech: '', github: '', demo: '', featured: false, sort_order: 0 },
  Certificates: { title: '', issuer: '', platform: 'Coursera', year: '', icon: 'fas fa-certificate', color: '#f59e0b', verify_url: '', tags: '', description: '', sort_order: 0 },
}

function Modal({ title, onClose, children }) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>{title}</h3>
          <button className="admin-modal-close" onClick={onClose}><i className="fas fa-times" /></button>
        </div>
        <div className="admin-modal-body">{children}</div>
      </div>
    </div>
  )
}

function GenericForm({ fields, data, onChange, onSubmit, saving }) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      {fields.map(f => (
        <div className="form-group" key={f.key}>
          <label>{f.label}</label>
          {f.type === 'textarea' ? (
            <textarea rows={3} value={data[f.key] ?? ''} onChange={e => onChange(f.key, e.target.value)} placeholder={f.placeholder || ''} />
          ) : f.type === 'checkbox' ? (
            <label className="admin-checkbox">
              <input type="checkbox" checked={!!data[f.key]} onChange={e => onChange(f.key, e.target.checked)} />
              <span>{f.placeholder}</span>
            </label>
          ) : (
            <input type={f.type || 'text'} value={data[f.key] ?? ''} onChange={e => onChange(f.key, e.target.value)} placeholder={f.placeholder || ''} />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : <><i className="fas fa-save" /> Save</>}
      </button>
    </form>
  )
}

const FIELDS = {
  Experience: [
    { key: 'role', label: 'Role / Position', placeholder: 'Decision Scientist' },
    { key: 'company', label: 'Company', placeholder: 'Mu Sigma Business Solutions' },
    { key: 'date', label: 'Date Range', placeholder: 'Aug 2024 – Nov 2024' },
    { key: 'desc', label: 'Description', type: 'textarea', placeholder: 'What you did...' },
    { key: 'tags', label: 'Tags (comma-separated)', placeholder: 'Python, SQL, Excel' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
  ],
  Projects: [
    { key: 'title', label: 'Project Title', placeholder: 'Library Management System' },
    { key: 'desc', label: 'Description', type: 'textarea', placeholder: 'What the project does...' },
    { key: 'icon', label: 'Icon class', placeholder: 'fas fa-book' },
    { key: 'badge', label: 'Badge label', placeholder: 'Web App' },
    { key: 'features', label: 'Features (one per line)', type: 'textarea', placeholder: 'Book inventory management\nUser authentication' },
    { key: 'tech', label: 'Tech Stack (comma-separated)', placeholder: 'HTML, CSS, PHP, MySQL' },
    { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...' },
    { key: 'demo', label: 'Live Demo URL', placeholder: 'https://...' },
    { key: 'featured', label: 'Featured', type: 'checkbox', placeholder: 'Mark as featured' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
  ],
  Certificates: [
    { key: 'title', label: 'Certificate Title', placeholder: 'Machine Learning with Python' },
    { key: 'issuer', label: 'Issuer', placeholder: 'IBM' },
    { key: 'platform', label: 'Platform', placeholder: 'Coursera' },
    { key: 'year', label: 'Year', placeholder: '2024' },
    { key: 'icon', label: 'Icon class', placeholder: 'fas fa-brain' },
    { key: 'color', label: 'Accent Color (hex)', placeholder: '#3b82f6' },
    { key: 'verify_url', label: 'Verify / Certificate URL', placeholder: 'https://coursera.org/verify/...' },
    { key: 'tags', label: 'Tags (comma-separated)', placeholder: 'Python, ML, AI' },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'What the course covers...' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
  ],
}

const ENDPOINTS = { Experience: '/api/experience', Projects: '/api/projects', Certificates: '/api/certificates' }

function TabSection({ tab, token }) {
  const api = useApi(token)
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({})

  const load = async () => {
    const data = await api.get(ENDPOINTS[tab] + '/')
    setItems(Array.isArray(data) ? data : [])
  }

  useEffect(() => { load() }, [tab])

  const openAdd = () => { setFormData({ ...BLANK[tab] }); setModal({ mode: 'add' }) }
  const openEdit = (item) => { setFormData({ ...item }); setModal({ mode: 'edit', id: item.id }) }
  const closeModal = () => setModal(null)

  const handleChange = (key, value) => setFormData(f => ({ ...f, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (modal.mode === 'add') await api.post(ENDPOINTS[tab] + '/', formData)
      else await api.put(`${ENDPOINTS[tab]}/${modal.id}`, formData)
      await load()
      closeModal()
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    await api.del(`${ENDPOINTS[tab]}/${id}`)
    await load()
  }

  const getLabel = (item) => item.role || item.title || '(untitled)'

  return (
    <div className="admin-tab-section">
      <div className="admin-tab-header">
        <h3 className="admin-tab-title">{tab} <span className="admin-count">{items.length}</span></h3>
        <button className="btn btn-primary" onClick={openAdd}>
          <i className="fas fa-plus" /> Add {tab.slice(0,-1)}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">
          <i className="fas fa-inbox" />
          <p>No {tab.toLowerCase()} yet. Click "Add" to create the first entry.</p>
        </div>
      ) : (
        <div className="admin-table">
          {items.map(item => (
            <div className="admin-row" key={item.id}>
              <div className="admin-row-info">
                <span className="admin-row-title">{getLabel(item)}</span>
                <span className="admin-row-sub">
                  {item.company || item.issuer || item.tech || ''}
                  {item.date ? ` · ${item.date}` : ''}
                  {item.year ? ` · ${item.year}` : ''}
                </span>
              </div>
              <div className="admin-row-actions">
                <button className="admin-btn-edit" onClick={() => openEdit(item)}>
                  <i className="fas fa-edit" /> Edit
                </button>
                <button className="admin-btn-delete" onClick={() => handleDelete(item.id)}>
                  <i className="fas fa-trash" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={`${modal.mode === 'add' ? 'Add' : 'Edit'} ${tab.slice(0,-1)}`} onClose={closeModal}>
          <GenericForm
            fields={FIELDS[tab]}
            data={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
          />
        </Modal>
      )}
    </div>
  )
}

/* ─── Messages Section ─── */
function MessagesSection({ token }) {
  const api = useApi(token)
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)

  const load = async () => {
    try {
      const data = await api.get('/api/messages/')
      setMessages(Array.isArray(data) ? data : [])
    } catch { setMessages([]) }
  }

  useEffect(() => { load() }, [])

  const markRead = async (id) => {
    await api.patch(`/api/messages/${id}/read`)
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, is_read: true } : m))
    if (selected?.id === id) setSelected(m => ({ ...m, is_read: true }))
  }

  const deleteMsg = async (id) => {
    if (!window.confirm('Delete this message?')) return
    await api.del(`/api/messages/${id}`)
    setMessages(msgs => msgs.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const unread = messages.filter(m => !m.is_read).length

  return (
    <div className="admin-messages-section">
      <div className="admin-tab-header">
        <h3 className="admin-tab-title">
          Messages <span className="admin-count">{messages.length}</span>
          {unread > 0 && <span className="admin-unread-badge">{unread} new</span>}
        </h3>
        <button className="btn btn-outline" onClick={load}><i className="fas fa-sync-alt" /> Refresh</button>
      </div>

      {messages.length === 0 ? (
        <div className="admin-empty">
          <i className="fas fa-inbox" />
          <p>No messages yet. Messages from the contact form appear here.</p>
        </div>
      ) : (
        <div className="admin-messages-grid">
          {/* Message List */}
          <div className="admin-msg-list">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`admin-msg-item ${msg.is_read ? '' : 'unread'} ${selected?.id === msg.id ? 'active' : ''}`}
                onClick={() => { setSelected(msg); if (!msg.is_read) markRead(msg.id) }}
              >
                <div className="admin-msg-meta">
                  <span className="admin-msg-name">{msg.name}</span>
                  {!msg.is_read && <span className="admin-msg-dot" />}
                </div>
                <span className="admin-msg-subject">{msg.subject}</span>
                <span className="admin-msg-date">{new Date(msg.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="admin-msg-detail">
            {selected ? (
              <>
                <div className="admin-msg-detail-header">
                  <div>
                    <h4>{selected.subject}</h4>
                    <p className="admin-msg-from">
                      From: <strong>{selected.name}</strong> &lt;{selected.email}&gt;
                    </p>
                    <p className="admin-msg-time">{new Date(selected.created_at).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="admin-msg-actions">
                    <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn btn-outline btn-sm">
                      <i className="fas fa-reply" /> Reply
                    </a>
                    <button className="admin-btn-delete btn-sm" onClick={() => deleteMsg(selected.id)}>
                      <i className="fas fa-trash" /> Delete
                    </button>
                  </div>
                </div>
                <div className="admin-msg-body">{selected.message}</div>
              </>
            ) : (
              <div className="admin-msg-placeholder">
                <i className="fas fa-envelope-open-text" />
                <p>Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('Experience')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    if (!token) { navigate('/admin'); return }
    fetch(`${API}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(r => { if (!r.ok) { localStorage.removeItem('admin_token'); navigate('/admin') } return r.json() })
      .then(d => setUser(d))
      .catch(() => navigate('/admin'))
  }, [])

  const logout = () => { localStorage.removeItem('admin_token'); navigate('/admin') }

  return (
    <div className="admin-dash">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-logo">HARSHA <span style={{ color: 'var(--accent)' }}>/&gt;</span></span>
          <span className="admin-brand-sub">Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {TABS.map(t => (
            <button
              key={t}
              className={`admin-nav-item ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              <i className={
                t === 'Experience' ? 'fas fa-briefcase' :
                t === 'Projects' ? 'fas fa-code' :
                t === 'Certificates' ? 'fas fa-certificate' :
                'fas fa-envelope'
              } />
              {t}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          {user && <span className="admin-user"><i className="fas fa-user-circle" /> {user.username}</span>}
          <Link to="/" className="admin-view-site"><i className="fas fa-external-link-alt" /> View Site</Link>
          <button className="admin-logout" onClick={logout}><i className="fas fa-sign-out-alt" /> Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-main-header">
          <h2 className="admin-main-title">
            {tab === 'Messages' ? 'Contact Messages' : `Manage ${tab}`}
          </h2>
          <p className="admin-main-sub">
            {tab === 'Messages'
              ? 'Messages sent via the portfolio contact form. Reply directly via email.'
              : 'Changes here are reflected immediately on the public portfolio.'}
          </p>
        </div>
        {tab === 'Messages'
          ? <MessagesSection token={token} />
          : <TabSection tab={tab} token={token} />
        }
      </main>
    </div>
  )
}
