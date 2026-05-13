import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Briefcase, Search, ExternalLink, ChevronDown, ChevronUp, FileText, Users, Star, Eye, XCircle } from 'lucide-react'

const STATUS_OPTIONS = ['new', 'reviewing', 'shortlisted', 'rejected']
const STATUS_COLORS = {
  new: { bg: 'bg-blue-50', text: 'text-blue-600', hex: '#3B82F6' },
  reviewing: { bg: 'bg-yellow-50', text: 'text-yellow-600', hex: '#F4B740' },
  shortlisted: { bg: 'bg-emerald-50', text: 'text-emerald-600', hex: '#10B981' },
  rejected: { bg: 'bg-red-50', text: 'text-red-500', hex: '#F97316' },
}
const AVATAR_GRADIENTS = [
  'from-emerald-400 to-emerald-600', 'from-teal-400 to-teal-600',
  'from-cyan-400 to-cyan-600', 'from-green-400 to-green-600',
  'from-lime-400 to-lime-600',
]

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-[#98A2B3] mb-0.5">{label}</p>
      <p className="text-sm font-medium text-[#344054]">{value}</p>
    </div>
  )
}

function ApplicationCard({ row, index, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]
  const sc = STATUS_COLORS[row.status || 'new']

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.04 }}
      className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden hover:shadow-md transition-shadow"
    >
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAFA] transition-colors text-left"
      >
        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
          <span className="text-white font-bold text-sm">{row.name?.[0]?.toUpperCase()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#101828]">{row.name}</p>
          <p className="text-xs text-[#667085] truncate">{row.job_title}</p>
          <p className="text-xs text-[#98A2B3] mt-0.5">{row.email}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {row.cv_url && (
            <a href={row.cv_url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:underline"
            >
              <FileText size={12} /> CV
            </a>
          )}
          <span className="text-xs text-[#98A2B3] hidden sm:block">{new Date(row.created_at).toLocaleDateString()}</span>
          <select
            value={row.status || 'new'} onClick={e => e.stopPropagation()}
            onChange={e => onStatusChange(row.id, e.target.value)}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none ${sc.bg} ${sc.text}`}
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {expanded ? <ChevronUp size={15} className="text-[#98A2B3]" /> : <ChevronDown size={15} className="text-[#98A2B3]" />}
        </div>
      </button>

      {expanded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
          className="border-t border-[#F2F4F7] px-6 py-5 space-y-4"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <InfoItem label="Email" value={row.email} />
            <InfoItem label="Phone" value={row.phone || '—'} />
            <InfoItem label="Job Slug" value={row.job_slug} />
            <InfoItem label="Applied" value={new Date(row.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} />
          </div>
          {row.cv_url && (
            <a href={row.cv_url} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#ECFDF5] text-[#065F46] text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#D1FAE5] transition-colors"
            >
              <ExternalLink size={14} /> Download CV — {row.cv_file_name}
            </a>
          )}
          {row.cover_note && (
            <div className="bg-[#F8FAFC] rounded-xl border border-[#EAECF0] p-4">
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wide mb-2">Cover Note</p>
              <p className="text-sm text-[#344054] leading-relaxed">{row.cover_note}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function AdminApplications() {
  const [rows, setRows] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    supabase.from('job_applications').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setRows(data || []); setFiltered(data || []); setLoading(false) })
  }, [])

  useEffect(() => {
    let r = rows
    if (statusFilter !== 'all') r = r.filter(x => (x.status || 'new') === statusFilter)
    if (search) r = r.filter(x => x.name?.toLowerCase().includes(search.toLowerCase()) || x.job_title?.toLowerCase().includes(search.toLowerCase()))
    setFiltered(r)
  }, [search, statusFilter, rows])

  async function updateStatus(id, status) {
    await supabase.from('job_applications').update({ status }).eq('id', id)
    setRows(r => r.map(row => row.id === id ? { ...row, status } : row))
  }

  const newCount = rows.filter(r => (r.status || 'new') === 'new').length
  const reviewingCount = rows.filter(r => r.status === 'reviewing').length
  const shortlistedCount = rows.filter(r => r.status === 'shortlisted').length
  const rejectedCount = rows.filter(r => r.status === 'rejected').length

  const pieData = [
    { name: 'New', value: newCount, color: '#3B82F6' },
    { name: 'Reviewing', value: reviewingCount, color: '#F4B740' },
    { name: 'Shortlisted', value: shortlistedCount, color: '#10B981' },
    { name: 'Rejected', value: rejectedCount, color: '#F97316' },
  ].filter(d => d.value > 0)

  const jobData = Object.entries(
    rows.reduce((acc, r) => { acc[r.job_title] = (acc[r.job_title] || 0) + 1; return acc }, {})
  ).map(([name, value]) => ({ name: name.length > 18 ? name.slice(0, 18) + '…' : name, value }))
    .sort((a, b) => b.value - a.value).slice(0, 5)

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold text-[#101828]">Job Applications</h1>
        <p className="text-sm text-[#667085] mt-1">{rows.length} total applications received</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: rows.length, icon: Users, color: 'text-[#667085]', bg: 'bg-[#F8FAFC]' },
          { label: 'Reviewing', value: reviewingCount, icon: Eye, color: 'text-yellow-500', bg: 'bg-yellow-50' },
          { label: 'Shortlisted', value: shortlistedCount, icon: Star, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Rejected', value: rejectedCount, icon: XCircle, color: 'text-red-400', bg: 'bg-red-50' },
        ].map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-[#EAECF0] p-5"
          >
            <div className={`${bg} ${color} w-9 h-9 rounded-xl flex items-center justify-center mb-3`}><Icon size={17} /></div>
            <p className="text-2xl font-extrabold text-[#101828]">{value}</p>
            <p className="text-xs text-[#667085] mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      {rows.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-[#EAECF0] p-6"
          >
            <p className="text-sm font-bold text-[#101828] mb-1">Pipeline Status</p>
            <p className="text-xs text-[#667085] mb-4">Applications by current status</p>
            {pieData.length > 0 ? (
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="55%" height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={48} outerRadius={78} dataKey="value" strokeWidth={0}>
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #EAECF0', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {pieData.map(d => (
                    <div key={d.name} className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                      <div>
                        <p className="text-sm font-bold text-[#101828]">{d.value}</p>
                        <p className="text-xs text-[#98A2B3]">{d.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : <div className="h-[180px] flex items-center justify-center text-sm text-[#98A2B3]">No data yet</div>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            className="bg-white rounded-2xl border border-[#EAECF0] p-6"
          >
            <p className="text-sm font-bold text-[#101828] mb-1">Applications by Role</p>
            <p className="text-xs text-[#667085] mb-4">Most applied positions</p>
            {jobData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={jobData} barSize={24} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#667085' }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #EAECF0', fontSize: '11px' }} />
                  <Bar dataKey="value" fill="#10B981" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="h-[180px] flex items-center justify-center text-sm text-[#98A2B3]">No data yet</div>}
          </motion.div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
          <input placeholder="Search by name or job title…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-sm text-[#344054] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30"
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAECF0] p-16 text-center">
          <Briefcase size={32} className="text-[#D0D5DD] mx-auto mb-3" />
          <p className="text-sm text-[#667085]">No applications found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((row, i) => <ApplicationCard key={row.id} row={row} index={i} onStatusChange={updateStatus} />)}
        </div>
      )}
    </div>
  )
}
