import { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { LayoutDashboard, Mail, Briefcase, Activity, LogOut } from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/contacts', label: 'Contacts', icon: Mail },
  { to: '/admin/applications', label: 'Applications', icon: Briefcase },
  { to: '/admin/hr-checks', label: 'HR Checks', icon: Activity },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login')
      else setChecking(false)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (checking) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-[#EAECF0] flex flex-col">
        <div className="px-5 py-5 border-b border-[#EAECF0]">
          <p className="text-sm font-extrabold text-[#101828]">Staffora</p>
          <p className="text-xs text-[#667085]">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-[#ECFDF5] text-[#065F46]' : 'text-[#344054] hover:bg-[#F8FAFC]'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-[#EAECF0]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-[#667085] hover:text-red-500 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
