import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { Mail, Search, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'

const STATUS_OPTIONS = ['new', 'contacted', 'closed']
const STATUS_COLORS = {
  new: 'bg-blue-50 text-blue-600',
  contacted: 'bg-yellow-50 text-yellow-600',
  closed: 'bg-emerald-50 text-emerald-600',
}
const AVATAR_COLORS = [
  'from-blue-400 to-blue-600', 'from-purple-400 to-purple-600',
  'from-orange-400 to-orange-500', 'from-pink-400 to-pink-600',
  'from-teal-400 to-teal-600',
]

function ContactCard({ row, index, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-[#F8FAFC] transition-colors text-left"
      >
        <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-full flex items-center justify-center shrink-0`}>
          <span className="text-white font-bold">{row.name?.[0]?.toUpperCase()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#101828] truncate">{row.name}</p>
          <p className="text-xs text-[#667085] truncate">{row.email} {row.company ? `· ${row.company}` : ''}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[#98A2B3] hidden sm:block">{new Date(row.created_at).toLocaleDateString()}</span>
          <select
            value={row.status || 'new'}
            onClick={e => e.stopPropagation()}
            onChange={e => onStatusChange(row.id, e.target.value)}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[row.status || 'new']}`}
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {expanded ? <ChevronUp size={15} className="text-[#98A2B3]" /> : <ChevronDown size={15} className="text-[#98A2B3]" />}
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
          className="border-t border-[#F2F4F7] px-6 py-5 space-y-4"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <InfoItem label="Inquiry Type" value={row.inquiry_type} />
            <InfoItem label="Phone" value={row.phone || '—'} />
            <InfoItem label="Company" value={row.company || '—'} />
            <InfoItem label="Date" value={new Date(row.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} />
          </div>
          {row.message && (
            <div className="bg-[#F8FAFC] rounded-xl border border-[#EAECF0] p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <MessageSquare size={12} className="text-[#667085]" />
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wide">Message</p>
              </div>
              <p className="text-sm text-[#344054] leading-relaxed">{row.message}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-[#98A2B3] mb-0.5">{label}</p>
      <p className="text-sm font-medium text-[#344054]">{value}</p>
    </div>
  )
}

export default function AdminContacts() {
  const [rows, setRows] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    supabase.from('contacts').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setRows(data || []); setFiltered(data || []); setLoading(false) })
  }, [])

  useEffect(() => {
    let r = rows
    if (statusFilter !== 'all') r = r.filter(x => (x.status || 'new') === statusFilter)
    if (search) r = r.filter(x => x.name?.toLowerCase().includes(search.toLowerCase()) || x.email?.toLowerCase().includes(search.toLowerCase()))
    setFiltered(r)
  }, [search, statusFilter, rows])

  async function updateStatus(id, status) {
    await supabase.from('contacts').update({ status }).eq('id', id)
    setRows(r => r.map(row => row.id === id ? { ...row, status } : row))
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#101828]">Contacts</h1>
        <p className="text-sm text-[#667085] mt-1">{rows.length} total inquiries</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
          <input
            placeholder="Search by name or email…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
          />
        </div>
        <select
          value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-sm text-[#344054] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30"
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAECF0] p-16 text-center">
          <Mail size={32} className="text-[#D0D5DD] mx-auto mb-3" />
          <p className="text-sm text-[#667085]">No contacts found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((row, i) => <ContactCard key={row.id} row={row} index={i} onStatusChange={updateStatus} />)}
        </div>
      )}
    </div>
  )
}
