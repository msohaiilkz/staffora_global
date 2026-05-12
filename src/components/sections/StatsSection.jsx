import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from '../ui/SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 200, suffix: '+', label: 'Businesses Supported', color: '#10B981' },
  { value: 85,  suffix: '%', label: 'Staff Retention Rate',  color: '#065F46' },
  { value: 18,  suffix: ' days', label: 'Avg. Time-to-Hire', color: '#F4B740' },
  { value: 40,  suffix: '%', label: 'Faster Hiring Speed',   color: '#101828' },
]

const logos = ['Zenith Bank', 'MTN Nigeria', 'Flutterwave', 'Interswitch', 'Paystack', 'Access Bank']

export default function StatsSection() {
  const counterRefs = useRef([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val) + stat.suffix
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="stats" bg="white">
      <div ref={sectionRef}>
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div
                ref={el => counterRefs.current[i] = el}
                className="text-4xl sm:text-5xl font-extrabold mb-2 leading-none"
                style={{ color: s.color }}
              >
                0{s.suffix}
              </div>
              <p className="text-sm text-[#667085] font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider + Trust logos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="border-t border-[#EAECF0] pt-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] text-center mb-6">
            Trusted by businesses across Nigeria
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((logo, i) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="text-sm font-bold text-[#D0D5DD] hover:text-[#98A2B3] transition-colors duration-200 cursor-default select-none"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
