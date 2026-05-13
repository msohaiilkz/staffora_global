import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { Mail, Briefcase, Activity, Clock, ArrowUpRight, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts'

const STATUS_COLORS = {
  new: 'bg-blue-50 text-blue-600',
  contacted: 'bg-yellow-50 text-yellow-600',
  closed: 'bg-emerald-50 text-emerald-600',
  reviewing: 'bg-orange-50 text-orange-500',
  shortlisted: 'bg-emerald-50 text-emerald-600',
  rejected: 'bg-red-50 text-red-500',
}

function buildWeeklyData(rows) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const counts = Array(7).fill(0)
  const now = new Date()
  rows.forEach(r => {
    const d = new Date(r.created_at)
    const diff = Math.floor((now - d) / 86400000)
    if (diff < 7) counts[d.getDay()]++
  })
  return days.map((day, i) => ({ day, count: counts[i] }))
}

export default function AdminDashboard() {
  const [data, setData] = useState({ contacts: [], applications: [], hrChecks: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [c, a, h] = await Promise.all([
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('job_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('hr_health_checks').select('*').order('created_at', { ascending: false }),
      ])
      setData({ contacts: c.data || [], applications: a.data || [], hrChecks: h.data || [] })
      setLoading(false)
    }
    fetchData()
  }, [])

  const stats = [
    { label: 'Total Contacts', value: data.contacts.length, icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', to: '/admin/contacts', trend: '+2 this week' },
    { label: 'Job Applications', value: data.applications.length, icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', to: '/admin/applications', trend: 'Active pipeline' },
    { label: 'HR Diagnostics', value: data.hrChecks.length, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100', to: '/admin/hr-checks', trend: `Avg ${data.hrChecks.length ? Math.round(data.hrChecks.reduce((s, r) => s + r.overall_score, 0) / data.hrChecks.length) : 0}% score` },
  ]

  const weeklyData = buildWeeklyData([...data.contacts, ...data.applications])

  const hrBarData = [
    { name: 'Hiring', value: data.hrChecks.length ? Math.round(data.hrChecks.reduce((s, r) => s + r.hiring_score, 0) / data.hrChecks.length) : 0 },
    { name: 'Onboarding', value: data.hrChecks.length ? Math.round(data.hrChecks.reduce((s, r) => s + r.onboarding_score, 0) / data.hrChecks.length) : 0 },
    { name: 'Performance', value: data.hrChecks.length ? Math.round(data.hrChecks.reduce((s, r) => s + r.performance_score, 0) / data.hrChecks.length) : 0 },
    { name: 'Retention', value: data.hrChecks.length ? Math.round(data.hrChecks.reduce((s, r) => s + r.retention_score, 0) / data.hrChecks.length) : 0 },
    { name: 'HR Setup', value: data.hrChecks.length ? Math.round(data.hrChecks.reduce((s, r) => s + r.hr_setup_score, 0) / data.hrChecks.length) : 0 },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#101828]">Dashboard</h1>
        <p className="text-sm text-[#667085] mt-1">Here is what is happening with your business today</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map(({ label, value, icon: Icon, color, bg, border, to, trend }, i) => (
          <motion.div
            key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link to={to} className={`block bg-white rounded-2xl border ${border} p-6 hover:shadow-lg transition-all group`}>
              <div className="flex items-start justify-between mb-5">
                <div className={`${bg} ${color} p-3 rounded-xl`}>
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={16} className="text-[#D0D5DD] group-hover:text-[#10B981] transition-colors mt-1" />
              </div>
              <p className="text-4xl font-extrabold text-[#101828] mb-1">{value}</p>
              <p className="text-sm font-medium text-[#344054]">{label}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={11} className="text-[#10B981]" />
                <p className="text-xs text-[#10B981]">{trend}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-[#EAECF0] p-6"
        >
          <div className="mb-5">
            <h2 className="text-sm font-bold text-[#101828]">Weekly Activity</h2>
            <p className="text-xs text-[#667085]">Contacts + Applications this week</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #EAECF0', fontSize: '12px' }} />
              <Area type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ fill: '#10B981', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Avg HR Scores */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
          className="bg-white rounded-2xl border border-[#EAECF0] p-6"
        >
          <div className="mb-5">
            <h2 className="text-sm font-bold text-[#101828]">Average HR Scores</h2>
            <p className="text-xs text-[#667085]">Across all diagnostic submissions</p>
          </div>
          {data.hrChecks.length === 0 ? (
            <div className="h-[180px] flex items-center justify-center text-sm text-[#98A2B3]">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={hrBarData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: '12px', border: '1px solid #EAECF0', fontSize: '12px' }} />
                <Bar dataKey="value" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
          className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAECF0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                <Mail size={13} className="text-blue-500" />
              </div>
              <h2 className="text-sm font-bold text-[#101828]">Recent Contacts</h2>
            </div>
            <Link to="/admin/contacts" className="text-xs text-[#10B981] hover:underline font-medium flex items-center gap-1">
              View all <ArrowUpRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[#F2F4F7]">
            {data.contacts.slice(0, 4).length === 0 && (
              <p className="px-6 py-8 text-sm text-[#98A2B3] text-center">No contacts yet</p>
            )}
            {data.contacts.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-[#F8FAFC] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{c.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101828]">{c.name}</p>
                    <p className="text-xs text-[#667085]">{c.inquiry_type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${STATUS_COLORS[c.status || 'new']}`}>{c.status || 'new'}</span>
                  <p className="text-xs text-[#98A2B3] mt-1 flex items-center gap-1 justify-end"><Clock size={9} />{new Date(c.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
          className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAECF0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Briefcase size={13} className="text-emerald-500" />
              </div>
              <h2 className="text-sm font-bold text-[#101828]">Recent Applications</h2>
            </div>
            <Link to="/admin/applications" className="text-xs text-[#10B981] hover:underline font-medium flex items-center gap-1">
              View all <ArrowUpRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[#F2F4F7]">
            {data.applications.slice(0, 4).length === 0 && (
              <p className="px-6 py-8 text-sm text-[#98A2B3] text-center">No applications yet</p>
            )}
            {data.applications.slice(0, 4).map(a => (
              <div key={a.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-[#F8FAFC] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{a.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101828]">{a.name}</p>
                    <p className="text-xs text-[#667085]">{a.job_title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${STATUS_COLORS[a.status || 'new']}`}>{a.status || 'new'}</span>
                  <p className="text-xs text-[#98A2B3] mt-1 flex items-center gap-1 justify-end"><Clock size={9} />{new Date(a.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
