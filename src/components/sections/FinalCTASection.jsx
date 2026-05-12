import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import Button from '../ui/Button'

export default function FinalCTASection() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, { y: -25, x: 15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(orb2Ref.current, { y: 20, x: -18, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 })
      gsap.to(orb3Ref.current, { y: -15, x: -10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#101828]">
      {/* Animated orbs */}
      <div ref={orb1Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#10B981]/10 blur-[120px] pointer-events-none" />
      <div ref={orb2Ref} className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-[#065F46]/20 blur-[90px] pointer-events-none" />
      <div ref={orb3Ref} className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-[#10B981]/8 blur-[80px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-28 text-center">

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold px-4 py-2 rounded-full mb-6"
        >
          <Sparkles size={12} />
          Take the first step
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5"
        >
          Ready to stop replacing people and{' '}
          <span className="text-[#10B981]">start fixing the system?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Let us look at your HR structure, hiring challenges, performance gaps, and retention risks together. No commitment, no pressure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Button
              variant="primary"
              size="xl"
              href="/hr-health-check"
              iconRight={<ArrowRight size={18} />}
              className="w-full sm:w-auto justify-center text-base shadow-[0_8px_32px_0_rgba(16,185,129,0.4)]"
            >
              Book HR Diagnostic
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Button
              variant="white"
              size="xl"
              href="/contact"
              icon={<Mail size={17} />}
              className="w-full sm:w-auto justify-center text-base"
            >
              Send an Inquiry
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust line with dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="h-px w-12 bg-white/10" />
          <p className="text-sm text-white/30">
            People systems for businesses ready to grow · No spam, ever.
          </p>
          <div className="h-px w-12 bg-white/10" />
        </motion.div>
      </div>
    </section>
  )
}
