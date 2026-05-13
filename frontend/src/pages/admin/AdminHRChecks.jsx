import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { Activity, ChevronDown, ChevronUp } from 'lucide-react'

function ScoreBadge({ score }) {
  const color = score >= 70 ? 'bg-emerald-50 text-emerald-600' : score >= 40 ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-500'
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${color}`}>{score}%</span>
}

function ScoreBar({ label, value }) {
  const color = value >= 70 ? 'bg-emerald-400' : value >= 40 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[#667085]">{label}</span>
        <span className="text-xs font-bold text-[#344054]">{value}%</span>
      </div>
      <div className="h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

function HRCheckRow({ row, index }) {
  const [expanded, setExpanded] = useState(false)

  const radarData = [
    { subject: 'Hiring', value: row.hiring_score },
    { subject: 'Onboarding', value: row.onboarding_score },
    { subject: 'Performance', value: row.performance_score },
    { subject: 'Retention', value: row.retention_score },
    { subject: 'HR Setup', value: row.hr_setup_score },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden"
    >
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F8FAFC] transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">{row.name?.[0]?.toUpperCase()}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#101828]">{row.name}</p>
            <p className="text-xs text-[#667085]">{row.email} {row.company ? `· ${row.company}` : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-[#98A2B3]">{new Date(row.created_at).toLocaleDateString()}</p>
          </div>
          <ScoreBadge score={row.overall_score} />
          {expanded ? <ChevronUp size={16} className="text-[#98A2B3]" /> : <ChevronDown size={16} className="text-[#98A2B3]" />}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="border-t border-[#F2F4F7] px-6 py-5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scores */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Category Scores</p>
              <div className="space-y-3">
                <ScoreBar label="HR Setup" value={row.hr_setup_score} />
                <ScoreBar label="Hiring" value={row.hiring_score} />
                <ScoreBar label="Onboarding" value={row.onboarding_score} />
                <ScoreBar label="Performance" value={row.performance_score} />
                <ScoreBar label="Retention" value={row.retention_score} />
              </div>
            </div>
            {/* Radar chart */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-2">Radar View</p>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#EAECF0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#667085' }} />
                  <Radar dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={2} dot={{ fill: '#10B981', r: 3 }} />
                  <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: '10px', border: '1px solid #EAECF0', fontSize: '11px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {row.recommendation && (
            <div className="mt-5 bg-[#F8FAFC] rounded-xl border border-[#EAECF0] p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-2">Recommendation</p>
              <p className="text-sm text-[#344054] leading-relaxed">{row.recommendation}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function AdminHRChecks() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('hr_health_checks').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setRows(data || []); setLoading(false) })
  }, [])

  const avgScore = rows.length ? Math.round(rows.reduce((s, r) => s + r.overall_score, 0) / rows.length) : 0

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#101828]">HR Health Checks</h1>
          <p className="text-sm text-[#667085] mt-1">{rows.length} submissions · Average score: <span className="font-semibold text-[#101828]">{avgScore}%</span></p>
        </div>
        <div className="bg-white border border-[#EAECF0] rounded-2xl px-5 py-3 text-center shadow-sm hidden sm:block">
          <p className={`text-2xl font-extrabold ${avgScore >= 70 ? 'text-emerald-500' : avgScore >= 40 ? 'text-yellow-500' : 'text-red-400'}`}>{avgScore}%</p>
          <p className="text-xs text-[#667085]">Avg Score</p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAECF0] p-16 text-center">
          <Activity size={32} className="text-[#D0D5DD] mx-auto mb-3" />
          <p className="text-sm text-[#667085]">No HR Health Check submissions yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((row, i) => <HRCheckRow key={row.id} row={row} index={i} />)}
        </div>
      )}
    </div>
  )
}
