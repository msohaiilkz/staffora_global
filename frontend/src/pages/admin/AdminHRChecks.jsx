import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, PieChart, Pie } from 'recharts'
import { Activity, ChevronDown, ChevronUp, TrendingUp, AlertTriangle, Award, Users } from 'lucide-react'

function CircularScore({ score, size = 80 }) {
  const r = size * 0.38
  const circ = 2 * Math.PI * r
  const color = score >= 70 ? '#10B981' : score >= 40 ? '#F4B740' : '#F97316'
  const offset = circ - (score / 100) * circ
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F2F4F7" strokeWidth={size*0.1} />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={size*0.1}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-extrabold leading-none" style={{ color, fontSize: size * 0.22 }}>{score}%</span>
      </div>
    </div>
  )
}

function ScoreBar({ label, value, delay = 0 }) {
  const color = value >= 70 ? '#10B981' : value >= 40 ? '#F4B740' : '#F97316'
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-medium text-[#344054]">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: color }}
          initial={{ width: 0 }} animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay }}
        />
      </div>
    </div>
  )
}

function HRCheckCard({ row, index }) {
  const [expanded, setExpanded] = useState(false)
  const score = row.overall_score
  const scoreColor = score >= 70 ? '#10B981' : score >= 40 ? '#F4B740' : '#F97316'
  const scoreBg = score >= 70 ? 'bg-emerald-50' : score >= 40 ? 'bg-yellow-50' : 'bg-orange-50'
  const radarData = [
    { subject: 'Hiring', value: row.hiring_score },
    { subject: 'Onboarding', value: row.onboarding_score },
    { subject: 'Performance', value: row.performance_score },
    { subject: 'Retention', value: row.retention_score },
    { subject: 'HR Setup', value: row.hr_setup_score },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden hover:shadow-md transition-shadow"
    >
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-5 px-6 py-5 hover:bg-[#FAFAFA] transition-colors text-left"
      >
        <CircularScore score={score} size={56} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#101828]">{row.name}</p>
          <p className="text-xs text-[#667085] truncate">{row.email}{row.company ? ` · ${row.company}` : ''}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              { label: 'Hiring', val: row.hiring_score },
              { label: 'Onboarding', val: row.onboarding_score },
              { label: 'Performance', val: row.performance_score },
            ].map(({ label, val }) => (
              <span key={label} className="text-xs px-2 py-0.5 rounded-full bg-[#F2F4F7] text-[#667085]">
                {label}: <span className="font-semibold">{val}%</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${scoreBg}`} style={{ color: scoreColor }}>
              {score >= 70 ? 'Strong' : score >= 40 ? 'Developing' : 'Needs Work'}
            </span>
            <p className="text-xs text-[#98A2B3] mt-1.5">{new Date(row.created_at).toLocaleDateString()}</p>
          </div>
          {expanded ? <ChevronUp size={16} className="text-[#98A2B3]" /> : <ChevronDown size={16} className="text-[#98A2B3]" />}
        </div>
      </button>

      {expanded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="border-t border-[#F2F4F7] px-6 py-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Score Breakdown</p>
              <ScoreBar label="HR Setup" value={row.hr_setup_score} delay={0} />
              <ScoreBar label="Hiring" value={row.hiring_score} delay={0.08} />
              <ScoreBar label="Onboarding" value={row.onboarding_score} delay={0.16} />
              <ScoreBar label="Performance" value={row.performance_score} delay={0.24} />
              <ScoreBar label="Retention" value={row.retention_score} delay={0.32} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-3">Radar Profile</p>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#EAECF0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#667085' }} />
                  <Radar dataKey="value" stroke={scoreColor} fill={scoreColor} fillOpacity={0.15} strokeWidth={2.5} dot={{ fill: scoreColor, r: 3 }} />
                  <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: '10px', border: '1px solid #EAECF0', fontSize: '11px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {row.recommendation && (
            <div className="mt-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#EAECF0]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#10B981] mb-2">Recommendation</p>
              <p className="text-sm text-[#344054] leading-relaxed">{row.recommendation}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

const SCORE_COLORS = ['#F97316', '#F4B740', '#3B82F6', '#10B981']

export default function AdminHRChecks() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('hr_health_checks').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setRows(data || []); setLoading(false) })
  }, [])

  const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.overall_score, 0) / rows.length) : 0
  const strong = rows.filter(r => r.overall_score >= 70).length
  const developing = rows.filter(r => r.overall_score >= 40 && r.overall_score < 70).length
  const needsWork = rows.filter(r => r.overall_score < 40).length

  const avgBarData = [
    { name: 'Hiring', value: rows.length ? Math.round(rows.reduce((s, r) => s + r.hiring_score, 0) / rows.length) : 0 },
    { name: 'Onboarding', value: rows.length ? Math.round(rows.reduce((s, r) => s + r.onboarding_score, 0) / rows.length) : 0 },
    { name: 'Performance', value: rows.length ? Math.round(rows.reduce((s, r) => s + r.performance_score, 0) / rows.length) : 0 },
    { name: 'Retention', value: rows.length ? Math.round(rows.reduce((s, r) => s + r.retention_score, 0) / rows.length) : 0 },
    { name: 'HR Setup', value: rows.length ? Math.round(rows.reduce((s, r) => s + r.hr_setup_score, 0) / rows.length) : 0 },
  ]

  const pieData = [
    { name: 'Strong (70+)', value: strong, color: '#10B981' },
    { name: 'Developing (40–69)', value: developing, color: '#F4B740' },
    { name: 'Needs Work (<40)', value: needsWork, color: '#F97316' },
  ].filter(d => d.value > 0)

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#101828]">HR Health Checks</h1>
        <p className="text-sm text-[#667085] mt-1">{rows.length} submissions analysed</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Submissions', value: rows.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Average Score', value: `${avg}%`, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Strong (70%+)', value: strong, icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Needs Work', value: needsWork, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-[#EAECF0] p-5"
          >
            <div className={`${bg} ${color} w-9 h-9 rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={17} />
            </div>
            <p className="text-2xl font-extrabold text-[#101828]">{value}</p>
            <p className="text-xs text-[#667085] mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      {rows.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Avg category scores */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-[#EAECF0] p-6"
          >
            <p className="text-sm font-bold text-[#101828] mb-1">Average Category Scores</p>
            <p className="text-xs text-[#667085] mb-5">Across all submissions</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={avgBarData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: '12px', border: '1px solid #EAECF0', fontSize: '11px' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {avgBarData.map((entry, i) => (
                    <Cell key={i} fill={entry.value >= 70 ? '#10B981' : entry.value >= 40 ? '#F4B740' : '#F97316'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Score distribution pie */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            className="bg-white rounded-2xl border border-[#EAECF0] p-6"
          >
            <p className="text-sm font-bold text-[#101828] mb-1">Score Distribution</p>
            <p className="text-xs text-[#667085] mb-5">Breakdown by performance level</p>
            {pieData.length > 0 ? (
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="50%" height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ borderRadius: '10px', border: '1px solid #EAECF0', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {pieData.map(d => (
                    <div key={d.name} className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                      <div>
                        <p className="text-xs font-semibold text-[#344054]">{d.value} users</p>
                        <p className="text-xs text-[#98A2B3]">{d.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[180px] flex items-center justify-center text-sm text-[#98A2B3]">No data yet</div>
            )}
          </motion.div>
        </div>
      )}

      {/* Individual cards */}
      <div>
        <p className="text-sm font-bold text-[#101828] mb-4">All Submissions</p>
        {rows.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#EAECF0] p-16 text-center">
            <Activity size={32} className="text-[#D0D5DD] mx-auto mb-3" />
            <p className="text-sm text-[#667085]">No HR Health Check submissions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((row, i) => <HRCheckCard key={row.id} row={row} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
