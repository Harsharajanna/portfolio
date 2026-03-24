import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'http://localhost:8000'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('admin_token', data.access_token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon"><i className="fas fa-lock" /></div>
          <h1>Admin Panel</h1>
          <p>Sign in to manage your portfolio content</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="admin"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          {error && <div className="admin-error"><i className="fas fa-exclamation-circle" /> {error}</div>}
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin" /> Signing in…</> : <><i className="fas fa-sign-in-alt" /> Sign In</>}
          </button>
        </form>
        <a href="/" className="admin-back-link"><i className="fas fa-arrow-left" /> Back to Portfolio</a>
      </div>
    </div>
  )
}
