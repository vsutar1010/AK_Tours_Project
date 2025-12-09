import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionLoader from '../components/SectionLoader.jsx'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.username.trim() || !form.password.trim()) {
      setMsg('Please enter username and password')
      return
    }

    // Demo credentials (replace with real auth)
    if (form.username === 'aktourstravels3693@gmail.com' && form.password === 'aktour@3693') {
      setMsg('Admin logged in — redirecting...')
      setTimeout(() => navigate('/admin-dashboard'), 700)
    } else {
      setMsg('Invalid admin credentials')
    }
  }

  return (
    <SectionLoader isLoading={isLoading} height="360px">
      <div className="auth-modal-overlay">
        <div className="auth-modal" role="dialog" aria-labelledby="admin-login-title">
          <header className="auth-header">
            <h2 id="admin-login-title">Admin Access</h2>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Username
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="admin"
                autoComplete="username"
                required
              />
            </label>

            <label>
              Password
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: 8 }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <div className="btn-row" style={{ marginTop: 8 }}>
              <button className="btn-primary" type="submit">Sign In</button>
              <button
                type="button"
                className="btn-link"
                onClick={() => {
                  setForm({ username: 'admin', password: 'admin123' })
                  setMsg('Demo credentials filled')
                }}
                style={{ marginLeft: 8 }}
              >
                Fill demo
              </button>
            </div>

            {msg && <div className="muted" style={{ marginTop: 10 }}>{msg}</div>}
          </form>
        </div>
      </div>
    </SectionLoader>
  )
}
