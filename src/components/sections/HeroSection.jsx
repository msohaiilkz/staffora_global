import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, TrendingUp, Users, BarChart3, Clock } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

gsap.registerPlugin(ScrollTrigger)

const bullets = [
  'Fix slow hiring and high turnover',
  'Build HR systems that scale with your business',
  'Improve onboarding, performance, and productivity',
  'Make better people decisions with clearer HR data',
]

const dashboardCards = [
  { icon: <TrendingUp size={16} className="text-[#10B981]" />, label: 'Hiring Speed',      value: '+40%',    sub: 'faster placements',      color: 'bg-[#ECFDF5]' },
  { icon: <Users    size={16} className="text-[#065F46]" />, label: 'Staff Retention',    value: '85%',     sub: '12-month average',       color: 'bg-[#F0FDF4]' },
  { icon: <BarChart3 size={16} className="text-[#F4B740]" />, label: 'HR Health Score',    value: '72/100',  sub: 'post-diagnostic avg',    color: 'bg-[#FFFBEB]' },
  { icon: <Clock    size={16} className="text-[#667085]" />, label: 'Avg. Time-to-Hire',  value: '18 days', sub: 'structured roles',        color: 'bg-[#F8FAFC]' },
]

export default function HeroSection() {
  const orbRef1  = useRef(null)
  const orbRef2  = useRef(null)
  const hLine1   = useRef(null)
  const hLine2   = useRef(null)
  const hLine3   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs
      gsap.to(orbRef1.current, { y: -30, x: 20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(orbRef2.current, { y: 25, x: -15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })

      // h1 line-reveal (3 lines, staggered)
      gsap.from([hLine1.current, hLine2.current, hLine3.current], {
        y: '105%',
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.25,
      })
    })
    return () => ctx.revert()
  }, [])

  const stagger = (i) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 } })

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* GSAP animated orbs */}
      <div ref={orbRef1} className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#ECFDF5]/70 blur-[130px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div ref={orbRef2} className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#D1FAE5]/50 blur-[110px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col items-start">
            <motion.div {...stagger(0)}>
              <Badge variant="emerald" className="mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse inline-block" />
                HR systems and talent solutions for growing businesses
              </Badge>
            </motion.div>

            {/* GSAP line-reveal h1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-extrabold text-[#101828] leading-[1.1] tracking-tight mb-5">
              <span className="block overflow-hidden pb-1">
                <span ref={hLine1} className="block">Build the people system</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span ref={hLine2} className="block">your <span className="text-[#10B981]">business needs</span></span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span ref={hLine3} className="block">to grow.</span>
              </span>
            </h1>

            <motion.p {...stagger(2)}
              className="text-base sm:text-lg text-[#667085] leading-relaxed mb-4 max-w-lg"
            >
              Staffora Global helps Nigerian SMEs and corporates hire smarter, improve HR structure, strengthen performance, and retain the right talent longer.
            </motion.p>

            <motion.p {...stagger(3)}
              className="text-sm font-medium text-[#065F46] bg-[#ECFDF5] px-3 py-1.5 rounded-lg mb-7"
            >
              For businesses that want long-term growth, not temporary recruitment fixes.
            </motion.p>

            <motion.ul {...stagger(4)} className="space-y-2.5 mb-9">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#344054]">{b}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div {...stagger(5)} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="primary" size="lg" href="/hr-health-check" iconRight={<ArrowRight size={17} />} className="w-full sm:w-auto justify-center">
                Book HR Diagnostic
              </Button>
              <Button variant="outline" size="lg" href="/services" className="w-full sm:w-auto justify-center">
                Explore Services
              </Button>
            </motion.div>
          </div>

          {/* ── Right: Dashboard Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="relative hidden lg:flex flex-col gap-4"
          >
            {/* Floating badge top-right */}
            <motion.div
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -top-5 -right-4 z-10 bg-[#101828] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              HR Diagnostic Ready
            </motion.div>

            {/* Main dashboard card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white rounded-2xl border border-[#EAECF0] shadow-[0_12px_40px_0_rgba(16,24,40,0.12)] p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ECFDF5]/60 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-0.5">HR Overview</p>
                  <h3 className="text-lg font-bold text-[#101828]">People System Dashboard</h3>
                </div>
                <span className="flex items-center gap-1.5 bg-[#ECFDF5] text-[#065F46] text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {dashboardCards.map((card, i) => (
                  <motion.div key={card.label}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className={`${card.color} rounded-xl p-4 border border-[#EAECF0] cursor-default`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {card.icon}
                      <span className="text-xs text-[#667085] font-medium">{card.label}</span>
                    </div>
                    <p className="text-2xl font-extrabold text-[#101828] leading-none mb-0.5">{card.value}</p>
                    <p className="text-xs text-[#667085]">{card.sub}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom notification pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              animate2={{ y: [0, 6, 0] }}
              className="flex items-center gap-3 bg-white border border-[#EAECF0] rounded-2xl px-5 py-4 shadow-[0_4px_20px_0_rgba(16,24,40,0.09)] self-center w-full max-w-xs relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ECFDF5]/40 to-transparent pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828] leading-tight">HR Health Check complete</p>
                <p className="text-xs text-[#667085] mt-0.5">3 gaps identified · 5 recommendations ready</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
    </section>
  )
}
