import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/Button'
import SectionWrapper from '../ui/SectionWrapper'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Understand the Business',  copy: 'We learn how your business works, how your team is structured, and where people challenges are slowing growth.',                                             color: 'bg-[#10B981]',  light: 'bg-[#ECFDF5]',  border: 'border-[#A7F3D0]', dot: '#10B981' },
  { num: '02', title: 'Diagnose HR Gaps',          copy: 'We review hiring, onboarding, performance, documentation, reporting, employee experience, and retention risks.',                                         color: 'bg-[#065F46]',  light: 'bg-[#F0FDF4]',  border: 'border-[#BBF7D0]', dot: '#065F46' },
  { num: '03', title: 'Design the Right Solution', copy: 'We recommend the right mix of HR setup, outsourcing, recruitment, talent management, performance systems, or analytics.',                                 color: 'bg-[#F4B740]',  light: 'bg-[#FFFBEB]',  border: 'border-[#FDE68A]', dot: '#F4B740' },
  { num: '04', title: 'Execute with Structure',    copy: 'We help implement the agreed solution with clear ownership, timelines, workflows, and communication.',                                                     color: 'bg-[#101828]',  light: 'bg-[#F8FAFC]',  border: 'border-[#EAECF0]', dot: '#101828' },
  { num: '05', title: 'Improve Continuously',      copy: 'We track outcomes, collect feedback, and improve the system so your HR structure keeps supporting growth.',                                              color: 'bg-purple-500', light: 'bg-purple-50',  border: 'border-purple-200', dot: '#A855F7' },
]

export default function ProcessSection() {
  const lineRef  = useRef(null)
  const sectionRef = useRef(null)
  const hdgRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading line-reveal ──────────────────────────────
      if (hdgRef.current) {
        gsap.from(hdgRef.current.querySelectorAll('.reveal-line'), {
          y: '105%',
          stagger: 0.1,
          duration: 0.78,
          ease: 'power3.out',
          scrollTrigger: { trigger: hdgRef.current, start: 'top 82%', once: true },
        })
      }

      // ── Connector line scrub ─────────────────────────────
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 25%',
            scrub: 1.2,
          },
        }
      )

      // ── Step dots pop in sequence (back.out bounce) ──────
      const dots = gsap.utils.toArray('[data-step-dot]')
      gsap.from(dots, {
        scale: 0,
        opacity: 0,
        stagger: 0.13,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      })

      // ── Step cards: stagger reveal tied to scrub ─────────
      const cards = gsap.utils.toArray('[data-step-card]')
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          delay: i * 0.07,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="process" bg="white">
      <div ref={hdgRef} className="max-w-2xl mx-auto text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
        >
          How We Work
        </motion.p>

        {/* GSAP line-reveal heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#101828] leading-tight tracking-tight mb-5">
          <span className="block overflow-hidden pb-1">
            <span className="reveal-line block">How <span className="text-[#10B981]">Staffora works</span></span>
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-base text-[#667085] leading-relaxed"
        >
          A structured five-step approach that diagnoses first, designs second, and delivers with clarity.
        </motion.p>
      </div>

      <div ref={sectionRef} className="relative">
        {/* Base track line */}
        <div className="hidden lg:block absolute top-[22px] left-[10%] right-[10%] h-0.5 bg-[#EAECF0] z-0" />
        {/* GSAP animated progress line */}
        <div
          ref={lineRef}
          className="hidden lg:block absolute top-[22px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#10B981] via-[#065F46] to-purple-500 z-0 origin-left"
          style={{ transformOrigin: 'left center' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex flex-col items-center text-center">
              <motion.div
                data-step-dot
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`w-11 h-11 rounded-full ${s.color} flex items-center justify-center mb-4 shadow-lg ring-4 ring-white`}
              >
                <span className="text-white text-sm font-bold">{s.num}</span>
              </motion.div>
              <motion.div
                data-step-card
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`${s.light} border ${s.border} rounded-2xl p-5 w-full shadow-[0_2px_10px_0_rgba(16,24,40,0.05)]`}
              >
                <h3 className="text-sm font-bold text-[#101828] mb-2 leading-snug">{s.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{s.copy}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-12"
      >
        <Button variant="primary" size="lg" href="/hr-health-check" iconRight={<ArrowRight size={16} />}>
          Book Your Diagnostic Call
        </Button>
      </motion.div>
    </SectionWrapper>
  )
}
