import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Mail, Briefcase, Activity } from 'lucide-react'

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ contacts: 0, applications: 0, hrChecks: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      const [c, a, h] = await Promise.all([
        supabase.from('contacts').select('id', { count: 'exact', head: true }),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }),
        supabase.from('hr_health_checks').select('id', { count: 'exact', head: true }),
      ])
      setCounts({ contacts: c.count || 0, applications: a.count || 0, hrChecks: h.count || 0 })
      setLoading(false)
    }
    fetchCounts()
  }, [])

  const cards = [
    { label: 'Total Contacts', value: counts.contacts, icon: Mail, color: 'bg-blue-50 text-blue-600' },
    { label: 'Job Applications', value: counts.applications, icon: Briefcase, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'HR Health Checks', value: counts.hrChecks, icon: Activity, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#101828] mb-2">Dashboard</h1>
      <p className="text-sm text-[#667085] mb-8">Overview of all submissions</p>

      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="w-6 h-6 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#EAECF0] p-6">
              <div className={`inline-flex p-2.5 rounded-xl mb-4 ${color}`}>
                <Icon size={20} />
              </div>
              <p className="text-3xl font-extrabold text-[#101828]">{value}</p>
              <p className="text-sm text-[#667085] mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
