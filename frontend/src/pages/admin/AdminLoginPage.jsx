import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    if (error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#101828]">Staffora Admin</h1>
          <p className="text-sm text-[#667085] mt-1">Sign in to your dashboard</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#EAECF0] p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-1.5">Email</label>
              <input
                type="email" required placeholder="admin@stafforaglobal.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-1.5">Password</label>
              <input
                type="password" required placeholder="••••••••"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 text-white font-semibold text-sm rounded-xl px-5 py-3 transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
