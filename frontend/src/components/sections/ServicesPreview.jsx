import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Stethoscope, Users, Building, Star, Target, Heart, BarChart3, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { Icon: Stethoscope, iconColor: 'text-[#10B981]',   iconBg: 'bg-[#ECFDF5]',  glowColor: 'rgba(16,185,129,0.14)', title: 'HR Diagnostic and Setup',     copy: 'Review current HR structure, identify gaps, and build the policies, processes, and workflows needed.',         href: '/services/hr-diagnostic-and-setup',          cta: 'Audit My HR Setup' },
  { Icon: Users,       iconColor: 'text-blue-500',     iconBg: 'bg-blue-50',     glowColor: 'rgba(59,130,246,0.14)', title: 'Recruitment and Onboarding',  copy: 'Define roles, source candidates, screen talent, and create onboarding experiences for new hires.',            href: '/services/recruitment-and-onboarding',        cta: 'Request Hiring Support' },
  { Icon: Building,    iconColor: 'text-purple-500',   iconBg: 'bg-purple-50',   glowColor: 'rgba(168,85,247,0.14)', title: 'HR Outsourcing',              copy: 'Support day-to-day HR operations so your business can focus on growth while people processes are managed.',    href: '/services/hr-outsourcing',                   cta: 'Discuss Outsourcing' },
  { Icon: Star,        iconColor: 'text-[#F4B740]',    iconBg: 'bg-[#FFFBEB]',  glowColor: 'rgba(244,183,64,0.14)', title: 'Talent Management',           copy: 'Identify, develop, and retain employees with strong potential through structured talent frameworks.',          href: '/services/talent-management',                cta: 'Improve Talent Systems' },
  { Icon: Target,      iconColor: 'text-orange-500',   iconBg: 'bg-orange-50',   glowColor: 'rgba(249,115,22,0.14)', title: 'Performance Management',      copy: 'Set up KPIs, OKRs, review cycles, feedback systems, and performance improvement structures.',               href: '/services/performance-management',            cta: 'Build Performance Framework' },
  { Icon: Heart,       iconColor: 'text-pink-500',     iconBg: 'bg-pink-50',     glowColor: 'rgba(236,72,153,0.14)', title: 'Employee Engagement',         copy: 'Understand why employees leave, what affects productivity, and how to build a better employee experience.',   href: '/services/employee-engagement-and-retention', cta: 'Reduce Turnover' },
  { Icon: BarChart3,   iconColor: 'text-[#065F46]',    iconBg: 'bg-[#ECFDF5]',  glowColor: 'rgba(6,95,70,0.14)',    title: 'HR Analytics and Reporting',  copy: 'Track hiring speed, turnover, onboarding success, performance, and workforce productivity with clear data.',  href: '/services/hr-analytics-and-reporting',        cta: 'Build HR Dashboard' },
  { Icon: ShieldCheck, iconColor: 'text-[#667085]',    iconBg: 'bg-[#F8FAFC]',  glowColor: 'rgba(102,112,133,0.1)', title: 'Background Verification',     copy: 'Support more confident hiring decisions through structured checks and verification where required.',          href: '/services/background-verification',           cta: 'Verify Candidates' },
]

export default function ServicesPreview() {
  const pinRef   = useRef(null)
  const trackRef = useRef(null)
  const progRef  = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const hdgRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading line-reveal ──────────────────────────────────
      gsap.from([line1Ref.current, line2Ref.current], {
        y: '105%',
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: hdgRef.current, start: 'top 82%', once: true },
      })

      // ── Horizontal pin + scrub — desktop only ─────────────
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current
        const pin   = pinRef.current
        if (!track || !pin) return

        // Total translation needed so last card reaches viewport right
        const getDist = () => track.scrollWidth - window.innerWidth

        const st = ScrollTrigger.create({
          trigger: pin,
          start: 'top top',
          end: () => `+=${getDist()}`,
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(track, { x: -(self.progress * getDist()) })
            if (progRef.current) gsap.set(progRef.current, { scaleX: self.progress })
          },
        })

        return () => st.kill()
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div id="services">
      <div ref={pinRef} className="w-full bg-[#F8FAFC] py-16 md:py-20 lg:py-24">

        {/* ── Section header ───────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={hdgRef} className="max-w-2xl mx-auto text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
              className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
            >
              Our Services
            </motion.p>

            {/* GSAP line-reveal */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#101828] leading-tight tracking-tight mb-5">
              <span className="block overflow-hidden pb-1">
                <span ref={line1Ref} className="block">HR support from</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span ref={line2Ref} className="block text-[#10B981]">structure to talent acquisition.</span>
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-[#667085] leading-relaxed"
            >
              Whether you need to set up HR from scratch, improve performance, outsource operations, or hire better talent — Staffora gives your business the people systems to grow with less chaos.
            </motion.p>
          </div>
        </div>

        {/* ── Card track ───────────────────────────────────── */}
        {/* Mobile: native swipe  |  Desktop: GSAP x-transform  */}
        <div className="overflow-x-auto lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 py-3 will-change-transform"
            style={{
              width: 'max-content',
              paddingLeft:  'max(1rem, calc((100vw - 80rem) / 2 + 1rem))',
              paddingRight: '3rem',
            }}
          >
            {services.map((s) => (
              <div
                key={s.title}
                className="w-[min(276px,78vw)] flex-shrink-0 group bg-white rounded-2xl border border-[#EAECF0] p-6
                           shadow-[0_2px_12px_0_rgba(16,24,40,0.05)]
                           hover:shadow-[0_16px_40px_0_rgba(16,24,40,0.13)]
                           hover:border-transparent
                           transition-all duration-300 flex flex-col relative overflow-hidden cursor-default"
                style={{ minHeight: '252px' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${s.glowColor}, transparent 70%)` }}
                />
                <div className={`relative w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <s.Icon size={22} className={s.iconColor} />
                </div>
                <h3 className="relative text-sm font-bold text-[#101828] mb-2 leading-snug">{s.title}</h3>
                <p className="relative text-xs text-[#667085] leading-relaxed flex-1 mb-4">{s.copy}</p>
                <Link
                  to={s.href}
                  className="relative inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B981] group-hover:gap-2.5 transition-all duration-200"
                >
                  {s.cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll progress bar — desktop only ──────────── */}
        <div className="hidden lg:flex items-center justify-center gap-3 mt-6">
          <div className="relative h-0.5 w-36 bg-[#EAECF0] rounded-full overflow-hidden">
            <div
              ref={progRef}
              className="absolute inset-0 bg-[#10B981] origin-left rounded-full"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <p className="text-xs text-[#98A2B3] select-none">Scroll to explore all services →</p>
        </div>

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="secondary" size="lg" href="/services" iconRight={<ArrowRight size={16} />}>
              Explore All Services
            </Button>
            <Button variant="ghost" size="lg" href="/hr-health-check">
              Not sure? Start with HR Diagnostic →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
