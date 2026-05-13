import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowRight, Building2, Users } from 'lucide-react'
import { mainNav } from '../../data/navigation'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'

export default function Header() {
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const headerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_12px_0_rgba(16,24,40,0.08)] py-3'
            : 'bg-white py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-extrabold text-[#101828] text-lg tracking-tight leading-none">
                Staffora<span className="text-[#10B981]"> Global</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNav.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.dropdown ? (
                    <button
                      className={cn(
                        'flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                        openDropdown === item.label
                          ? 'text-[#10B981] bg-[#ECFDF5]'
                          : 'text-[#667085] hover:text-[#101828] hover:bg-[#F8FAFC]'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          openDropdown === item.label ? 'rotate-180 text-[#10B981]' : ''
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                        location.pathname === item.href
                          ? 'text-[#10B981] bg-[#ECFDF5]'
                          : 'text-[#667085] hover:text-[#101828] hover:bg-[#F8FAFC]'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Panel */}
                  {item.dropdown && openDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72">
                      <div className="bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(16,24,40,0.13)] border border-[#EAECF0] overflow-hidden">
                        <div className="p-2">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm text-[#667085] hover:text-[#101828] hover:bg-[#F8FAFC] transition-colors duration-150 group"
                            >
                              <span>{sub.label}</span>
                              <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 text-[#10B981]" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Button variant="outline" size="sm" href="/jobs">
                View Jobs
              </Button>
              <Button variant="primary" size="sm" href="/hr-health-check">
                Book HR Diagnostic
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#101828] hover:bg-[#F8FAFC] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#101828]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAECF0]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#10B981] flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="font-extrabold text-[#101828] tracking-tight">
              Staffora<span className="text-[#10B981]"> Global</span>
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-[#F8FAFC] text-[#667085]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {mainNav.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#667085] hover:text-[#101828] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform duration-200',
                        mobileExpanded === item.label ? 'rotate-180 text-[#10B981]' : ''
                      )}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="ml-3 mt-0.5 border-l-2 border-[#ECFDF5] pl-3 space-y-0.5">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="block px-3 py-2 rounded-lg text-xs text-[#667085] hover:text-[#10B981] hover:bg-[#ECFDF5] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    'block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    location.pathname === item.href
                      ? 'text-[#10B981] bg-[#ECFDF5]'
                      : 'text-[#667085] hover:text-[#101828] hover:bg-[#F8FAFC]'
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Drawer CTAs */}
        <div className="px-4 py-5 border-t border-[#EAECF0] space-y-2.5">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F8FAFC] rounded-xl">
            <Building2 size={14} className="text-[#10B981] shrink-0" />
            <span className="text-xs text-[#667085] font-medium">For Employers</span>
          </div>
          <Button variant="primary" size="md" href="/hr-health-check" className="w-full justify-center">
            Book HR Diagnostic
          </Button>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F8FAFC] rounded-xl">
            <Users size={14} className="text-[#667085] shrink-0" />
            <span className="text-xs text-[#667085] font-medium">For Job Seekers</span>
          </div>
          <Button variant="outline" size="md" href="/jobs" className="w-full justify-center">
            View Open Roles
          </Button>
        </div>
      </aside>
    </>
  )
}
