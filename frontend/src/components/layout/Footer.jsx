import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import { services } from '../../data/navigation'
import Button from '../ui/Button'

const company = [
  { label: 'About',      href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Jobs',       href: '/jobs' },
  { label: 'Resources',  href: '/resources' },
  { label: 'Contact',    href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#101828] text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                Ready to build a stronger people system?
              </h3>
              <p className="text-white/60 text-sm">
                Start with a free HR Health Check. No commitment needed.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              href="/hr-health-check"
              iconRight={<ArrowRight size={16} />}
              className="shrink-0"
            >
              Start HR Health Check
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Staffora<span className="text-[#10B981]"> Global</span>
              </span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Staffora Global helps growing businesses build stronger HR systems, hire smarter, improve performance, and retain the right talent longer.
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors duration-200">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X (Twitter)" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors duration-200">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors duration-200">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.href}
                    className="text-sm text-white/60 hover:text-[#10B981] transition-colors duration-150"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    to={c.href}
                    className="text-sm text-white/60 hover:text-[#10B981] transition-colors duration-150"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/privacy-policy"   className="text-sm text-white/60 hover:text-[#10B981] transition-colors duration-150">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use"     className="text-sm text-white/60 hover:text-[#10B981] transition-colors duration-150">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@stafforaglobal.com" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-[#10B981] transition-colors duration-150">
                  <Mail size={14} className="shrink-0 text-[#10B981]" />
                  info@stafforaglobal.com
                </a>
              </li>
              <li>
                <a href="mailto:talent@stafforaglobal.com" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-[#10B981] transition-colors duration-150">
                  <Mail size={14} className="shrink-0 text-[#10B981]" />
                  talent@stafforaglobal.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 mb-2.5">For candidates</p>
              <Button variant="outline" size="sm" href="/jobs" className="w-full justify-center border-white/20 text-white hover:border-[#10B981] hover:text-[#10B981]">
                View Open Roles
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Staffora Global. All rights reserved.
          </p>
          <p className="text-xs text-white/35">
            People systems for businesses ready to grow.
          </p>
        </div>
      </div>
    </footer>
  )
}
