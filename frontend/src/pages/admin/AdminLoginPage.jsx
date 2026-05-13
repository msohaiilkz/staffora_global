import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { Mail, Lock, ArrowRight, Users, TrendingUp, Shield } from 'lucide-react'

const features = [
  { icon: Users, text: 'Manage all leads in one place' },
  { icon: TrendingUp, text: 'Track applications & HR checks' },
  { icon: Shield, text: 'Secure team-only access' },
]

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (error) { setError('Invalid email or password'); setLoading(false) }
    else navigate('/admin')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#047857] relative overflow-hidden flex-col justify-between p-12">
        {/* Background circles */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-[#10B981]/20" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#065F46] font-extrabold text-lg">S</span>
            </div>
            <span className="text-white font-extrabold text-xl">Staffora Global</span>
          </div>
          <p className="text-emerald-200 text-sm">Admin Dashboard</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Manage your<br />business from<br />one place.
            </h2>
            <p className="text-emerald-200 text-base leading-relaxed">
              Track every inquiry, job application, and HR diagnostic in real time.
            </p>
          </div>
          <div className="space-y-4">
            {features.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-emerald-300" />
                </div>
                <span className="text-emerald-100 text-sm">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div className="flex gap-4">
            {[
              { label: 'Leads', value: 'Live' },
              { label: 'Secure', value: '100%' },
              { label: 'Real-time', value: 'Data' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 rounded-2xl px-4 py-3 text-center">
                <p className="text-white font-bold text-lg">{value}</p>
                <p className="text-emerald-300 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-[#F8FAFC] flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#065F46] rounded-xl flex items-center justify-center">
              <span className="text-white font-extrabold">S</span>
            </div>
            <span className="text-[#101828] font-extrabold">Staffora Global</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#101828] mb-2">Welcome back</h1>
            <p className="text-[#667085]">Sign in to your admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#344054] mb-2">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
                <input
                  type="email" required placeholder="admin@stafforaglobal.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#D0D5DD] bg-white text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#344054] mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
                <input
                  type="password" required placeholder="••••••••"
                  value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#D0D5DD] bg-white text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 text-white font-semibold rounded-xl px-5 py-3.5 transition-colors text-sm mt-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Signing in…</>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-xs text-[#98A2B3] text-center mt-8">
            This portal is restricted to Staffora Global team members only.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
