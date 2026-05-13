import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Building2, UserCheck, Heart, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SectionWrapper from '../ui/SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    step: '01',
    Icon: Search,
    iconColor: 'text-[#10B981]',
    title: 'Diagnose First',
    copy: 'We understand your business, team structure, hiring needs, and people challenges before recommending a solution.',
    accent: 'border-l-[#10B981]',
    glowColor: 'rgba(16,185,129,0.08)',
  },
  {
    step: '02',
    Icon: Building2,
    iconColor: 'text-[#065F46]',
    title: 'Build the Structure',
    copy: 'We help put the right HR policies, processes, role definitions, onboarding systems, and performance frameworks in place.',
    accent: 'border-l-[#065F46]',
    glowColor: 'rgba(6,95,70,0.08)',
  },
  {
    step: '03',
    Icon: UserCheck,
    iconColor: 'text-[#F4B740]',
    title: 'Hire with Clarity',
    copy: 'Once the role and business need are clear, we help find talent that fits the work, culture, and growth stage.',
    accent: 'border-l-[#F4B740]',
    glowColor: 'rgba(244,183,64,0.08)',
  },
  {
    step: '04',
    Icon: Heart,
    iconColor: 'text-purple-400',
    title: 'Support Retention',
    copy: 'Hiring is only useful when people perform and stay. We help improve engagement, productivity, and employee experience.',
    accent: 'border-l-purple-400',
    glowColor: 'rgba(168,85,247,0.08)',
  },
]

export default function DifferenceSection() {
  const lineRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="difference" bg="white">
      <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
          >
            Our difference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#101828] leading-tight tracking-tight mb-5"
          >
            We do not start with CVs.{' '}
            <span className="text-[#10B981]">We start with your system.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base text-[#667085] leading-relaxed mb-8"
          >
            Recruitment works better when the business is ready for the people it wants to hire. Staffora Global looks at HR structure, role clarity, culture, onboarding, performance expectations, and retention risks before treating hiring as the only solution.
          </motion.p>

          {/* Animated vertical connector */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <div className="relative w-0.5 h-16 bg-[#EAECF0] overflow-hidden rounded-full">
              <div
                ref={lineRef}
                className="absolute inset-0 bg-gradient-to-b from-[#10B981] to-[#065F46] origin-top"
                style={{ transformOrigin: 'top center' }}
              />
            </div>
            <p className="text-xs text-[#667085] italic">A systematic approach to people — not just placement.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <Button variant="primary" size="lg" href="/hr-health-check" iconRight={<ArrowRight size={16} />}>
              Start with an HR Health Check
            </Button>
          </motion.div>
        </div>

        {/* Right: Image + Pillar Cards */}
        <div className="space-y-4">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden h-48 sm:h-56"
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&auto=format&fit=crop"
              alt="HR team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-semibold text-[#101828]">Systems first, hiring second</span>
            </div>
          </motion.div>

          {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className={`group bg-[#F8FAFC] rounded-2xl border border-[#EAECF0] border-l-4 ${p.accent} p-5 hover:shadow-[0_8px_28px_0_rgba(16,24,40,0.1)] hover:border-transparent hover:border-l-[3px] transition-all duration-300 cursor-default relative overflow-hidden`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${p.glowColor}, transparent 70%)` }}
              />
              <div className="relative flex items-center gap-2.5 mb-3">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-9 h-9 rounded-xl bg-white border border-[#EAECF0] flex items-center justify-center shadow-sm"
                >
                  <p.Icon size={18} className={p.iconColor} />
                </motion.div>
                <span className="text-xs font-bold text-[#667085] tracking-widest">{p.step}</span>
              </div>
              <h3 className="relative text-sm font-bold text-[#101828] mb-1.5">{p.title}</h3>
              <p className="relative text-xs text-[#667085] leading-relaxed">{p.copy}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
