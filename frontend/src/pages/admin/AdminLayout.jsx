import { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { LayoutDashboard, Mail, Briefcase, Activity, LogOut, Menu, X } from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/contacts', label: 'Contacts', icon: Mail },
  { to: '/admin/applications', label: 'Applications', icon: Briefcase },
  { to: '/admin/hr-checks', label: 'HR Checks', icon: Activity },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  if (checking) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="h-screen overflow-hidden bg-[#F8FAFC] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar — fixed height, never scrolls */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-30
        w-56 xl:w-60 h-screen bg-white border-r border-[#EAECF0]
        flex flex-col shrink-0 overflow-hidden
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#EAECF0] flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#065F46] rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-extrabold text-sm">S</span>
          </div>
          <div>
            <p className="text-sm font-extrabold text-[#101828] leading-none">Staffora</p>
            <p className="text-xs text-[#667085] mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-hidden">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to} to={to} end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] text-[#065F46] shadow-sm'
                    : 'text-[#344054] hover:bg-[#F8FAFC] hover:text-[#101828]'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[#EAECF0] shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#667085] hover:text-red-500 hover:bg-red-50 transition-all w-full"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main — only this area scrolls */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-[#EAECF0] shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[#F8FAFC]">
            <Menu size={18} className="text-[#344054]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#10B981] to-[#065F46] rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">S</span>
            </div>
            <span className="text-sm font-bold text-[#101828]">Staffora Admin</span>
          </div>
        </div>

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
