import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminHRChecks() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('hr_health_checks').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setRows(data || []); setLoading(false) })
  }, [])

  function scoreColor(score) {
    if (score >= 70) return 'text-emerald-600 font-bold'
    if (score >= 40) return 'text-yellow-600 font-bold'
    return 'text-red-500 font-bold'
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#101828] mb-2">HR Health Checks</h1>
      <p className="text-sm text-[#667085] mb-8">{rows.length} total submissions</p>
      <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8FAFC] border-b border-[#EAECF0]">
            <tr>
              {['Name', 'Email', 'Company', 'Overall', 'Hiring', 'Onboarding', 'Performance', 'Retention', 'Date'].map(h => (
                <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-[#667085] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-[#F8FAFC]">
                <td className="px-4 py-4 font-medium text-[#101828]">{row.name}</td>
                <td className="px-4 py-4 text-[#344054]">{row.email}</td>
                <td className="px-4 py-4 text-[#667085]">{row.company || '—'}</td>
                <td className={`px-4 py-4 ${scoreColor(row.overall_score)}`}>{row.overall_score}%</td>
                <td className="px-4 py-4 text-[#667085]">{row.hiring_score}%</td>
                <td className="px-4 py-4 text-[#667085]">{row.onboarding_score}%</td>
                <td className="px-4 py-4 text-[#667085]">{row.performance_score}%</td>
                <td className="px-4 py-4 text-[#667085]">{row.retention_score}%</td>
                <td className="px-4 py-4 text-[#667085]">{new Date(row.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={9} className="px-5 py-10 text-center text-[#667085]">No submissions yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Loader() {
  return <div className="flex items-center justify-center h-40"><div className="w-6 h-6 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" /></div>
}
