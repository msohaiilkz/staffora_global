import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { ExternalLink } from 'lucide-react'

const STATUS_OPTIONS = ['new', 'reviewing', 'shortlisted', 'rejected']
const STATUS_COLORS = {
  new: 'bg-blue-50 text-blue-600',
  reviewing: 'bg-yellow-50 text-yellow-600',
  shortlisted: 'bg-emerald-50 text-emerald-600',
  rejected: 'bg-red-50 text-red-500',
}

export default function AdminApplications() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('job_applications').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setRows(data || []); setLoading(false) })
  }, [])

  async function updateStatus(id, status) {
    await supabase.from('job_applications').update({ status }).eq('id', id)
    setRows(r => r.map(row => row.id === id ? { ...row, status } : row))
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#101828] mb-2">Job Applications</h1>
      <p className="text-sm text-[#667085] mb-8">{rows.length} total applications</p>
      <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8FAFC] border-b border-[#EAECF0]">
            <tr>
              {['Name', 'Email', 'Job Title', 'CV', 'Date', 'Status'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-[#667085] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-[#F8FAFC]">
                <td className="px-5 py-4 font-medium text-[#101828]">{row.name}</td>
                <td className="px-5 py-4 text-[#344054]">{row.email}</td>
                <td className="px-5 py-4 text-[#667085]">{row.job_title}</td>
                <td className="px-5 py-4">
                  {row.cv_url ? (
                    <a href={row.cv_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#10B981] hover:underline font-medium">
                      Download <ExternalLink size={12} />
                    </a>
                  ) : <span className="text-[#98A2B3]">No CV</span>}
                </td>
                <td className="px-5 py-4 text-[#667085]">{new Date(row.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <select
                    value={row.status || 'new'}
                    onChange={e => updateStatus(row.id, e.target.value)}
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[row.status || 'new']}`}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-[#667085]">No applications yet</td></tr>
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
