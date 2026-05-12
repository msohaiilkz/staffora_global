import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import Button from '../ui/Button'
import SectionWrapper from '../ui/SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  'Identify gaps in your current HR structure',
  'Understand hiring and retention risks',
  'Get clearer direction before spending more on recruitment',
  'Start building people systems that support growth',
]

const scoreSegments = [
  { label: 'HR Setup',    score: 45, color: '#F87171' },
  { label: 'Recruitment', score: 68, color: '#F4B740' },
  { label: 'Onboarding',  score: 52, color: '#FB923C' },
  { label: 'Performance', score: 38, color: '#F87171' },
  { label: 'Retention',   score: 71, color: '#10B981' },
]

export default function LeadMagnetSection() {
  const barRefs = useRef([])
  const scoreRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate score counter
      const obj = { val: 0 }
      gsap.to(obj, {
        val: 54,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        onUpdate: () => {
          if (scoreRef.current) scoreRef.current.textContent = Math.round(obj.val)
        },
      })

      // Animate each bar
      barRefs.current.forEach((bar, i) => {
        if (!bar) return
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: `${scoreSegments[i].score}%`,
            duration: 0.9,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="hr-health-check" bg="soft-green">
      <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#10B981] text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
          >
            <Zap size={12} /> Free · No commitment
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#101828] leading-tight tracking-tight mb-5"
          >
            Not sure where your{' '}
            <span className="text-[#10B981]">HR problem starts?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base text-[#667085] leading-relaxed mb-6"
          >
            Take the first step with a free HR Health Check. Tell us about your hiring, turnover, onboarding, performance, and HR structure. We will help you understand what may be slowing your team down.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="space-y-3 mb-8"
          >
            {benefits.map((b, i) => (
              <motion.li key={b}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: 0.28 + i * 0.07 }}
                className="flex items-start gap-2.5"
              >
                <CheckCircle2 size={17} className="text-[#10B981] shrink-0 mt-0.5" />
                <span className="text-sm text-[#344054]">{b}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button variant="primary" size="lg" href="/hr-health-check" iconRight={<ArrowRight size={16} />}>
              Get a Free HR Health Check
            </Button>
            <Button variant="outline" size="lg" href="/hiring-readiness-checklist">
              Hiring Readiness Checklist
            </Button>
          </motion.div>
        </div>

        {/* Right: Score Visual with GSAP counters */}
        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl border border-[#EAECF0] shadow-[0_12px_48px_0_rgba(16,24,40,0.12)] p-7 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#ECFDF5]/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />

          {/* Score ring */}
          <div className="flex items-center gap-5 mb-7 pb-7 border-b border-[#EAECF0]">
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#EAECF0" strokeWidth="8" />
                <motion.circle
                  cx="40" cy="40" r="32"
                  fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - 0.54) }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span ref={scoreRef} className="text-lg font-extrabold text-[#101828]">0</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-1">Overall HR Score</p>
              <p className="text-xl font-extrabold text-[#101828]">54 / 100</p>
              <p className="text-xs text-[#F4B740] font-medium">⚠ Moderate risk — action needed</p>
            </div>
          </div>

          {/* GSAP animated bars */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-4">Category Breakdown</p>
            {scoreSegments.map((seg, i) => (
              <div key={seg.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-[#344054]">{seg.label}</span>
                  <span className="text-xs font-bold text-[#101828]">{seg.score}%</span>
                </div>
                <div className="h-2 bg-[#EAECF0] rounded-full overflow-hidden">
                  <div
                    ref={el => barRefs.current[i] = el}
                    className="h-full rounded-full"
                    style={{ width: 0, backgroundColor: seg.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#667085] mt-5 text-center italic">
            * Illustrative example — your actual score is generated after completing the free check.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
