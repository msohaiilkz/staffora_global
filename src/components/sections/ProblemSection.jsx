import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, TrendingDown, UserX, BarChart2, Layers, Eye, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SectionWrapper from '../ui/SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  { Icon: Clock,        iconColor: 'text-[#F4B740]', iconBg: 'bg-[#FFFBEB]', title: 'Slow Hiring',           copy: 'Important roles stay open too long, and growth depends on whoever is available instead of whoever is right.' },
  { Icon: TrendingDown, iconColor: 'text-red-400',    iconBg: 'bg-red-50',    title: 'High Turnover',         copy: 'Employees leave, the business re-hires, and the real cost keeps rising without fixing the root cause.' },
  { Icon: UserX,        iconColor: 'text-orange-400', iconBg: 'bg-orange-50', title: 'Weak Onboarding',       copy: 'New hires join without structure or clarity, then struggle to perform even when they have the right skills.' },
  { Icon: BarChart2,    iconColor: 'text-purple-400', iconBg: 'bg-purple-50', title: 'No Performance System', copy: 'People are working, but output, accountability, and growth are not properly tracked or improved.' },
  { Icon: Layers,       iconColor: 'text-[#10B981]',  iconBg: 'bg-[#ECFDF5]', title: 'Founder Overload',      copy: 'The business grows, but every people issue still depends on one person — the founder.' },
  { Icon: Eye,          iconColor: 'text-[#667085]',  iconBg: 'bg-[#F8FAFC]', title: 'Poor HR Visibility',    copy: 'You cannot improve what you cannot measure. Most teams run without clear HR data or workforce insights.' },
]

export default function ProblemSection() {
  const hdgRef   = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Label + para fade ────────────────────────────────
      gsap.from(hdgRef.current.querySelectorAll('.fade-up'), {
        y: 16,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: hdgRef.current, start: 'top 80%', once: true },
      })

      // ── h2 line-reveal ───────────────────────────────────
      gsap.from([line1Ref.current, line2Ref.current], {
        y: '105%',
        stagger: 0.11,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: hdgRef.current, start: 'top 82%', once: true },
      })

      // ── Cards: individual ScrollTrigger per card ─────────
      const cards = gsap.utils.toArray('.problem-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: card, start: 'top 89%', once: true },
        })
      })

      // ── Subtle parallax scrub on second row of cards ─────
      gsap.to(gsap.utils.toArray('.problem-card').slice(3), {
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="problems" bg="warm-white">

      {/* ── Section header ─────────────────────────────────── */}
      <div ref={hdgRef} className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <p className="fade-up text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3">
          The real problem
        </p>

        {/* GSAP line-reveal */}
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#101828] leading-tight tracking-tight mb-5">
          <span className="block overflow-hidden pb-1">
            <span ref={line1Ref} className="block">Your business may not have a growth problem.</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span ref={line2Ref} className="block text-[#10B981]">It may have an HR problem.</span>
          </span>
        </h2>

        <p className="fade-up text-base sm:text-lg text-[#667085] leading-relaxed">
          Many businesses try to solve people issues by hiring again and again. But if roles are unclear, onboarding is weak, performance is unmeasured, and employees feel unsupported — the same problems return.
        </p>
      </div>

      {/* ── Cards ──────────────────────────────────────────── */}
      <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {problems.map((p) => (
          <div
            key={p.title}
            className="problem-card group bg-white rounded-2xl border border-[#EAECF0] p-6
                       shadow-[0_2px_16px_0_rgba(16,24,40,0.05)]
                       hover:shadow-[0_12px_36px_0_rgba(16,24,40,0.11)]
                       hover:border-transparent hover:-translate-y-1.5
                       transition-all duration-300 cursor-default relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#F8FAFC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className={`relative w-11 h-11 rounded-xl ${p.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <p.Icon size={22} className={p.iconColor} />
            </div>
            <h3 className="relative text-base font-bold text-[#101828] mb-2">{p.title}</h3>
            <p className="relative text-sm text-[#667085] leading-relaxed">{p.copy}</p>
          </div>
        ))}
      </div>

      {/* ── CTA ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <Button variant="secondary" size="lg" href="/services" iconRight={<ArrowRight size={16} />}>
          See How Staffora Helps
        </Button>
      </motion.div>
    </SectionWrapper>
  )
}
