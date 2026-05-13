import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Building2, Users, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import SectionWrapper from '../ui/SectionWrapper'

const employerPoints = [
  'Review your HR structure and identify gaps',
  'Hire the right people with role clarity',
  'Improve onboarding and performance systems',
  'Outsource HR operations and reduce chaos',
]

const candidatePoints = [
  'Browse verified current job openings',
  'Submit your CV even if no role fits yet',
  'Get clear application process and next steps',
  'Access practical career resources',
]

export default function EmployerCandidateSplit() {
  const orbRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        y: -20,
        x: 12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="choose-path" bg="warm-white">
      {/* Header */}
      <div className="max-w-xl mx-auto text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
        >
          Choose Your Path
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight"
        >
          Who are you here for?
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Employer Card */}
        <motion.div
          initial={{ opacity: 0, x: -32, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
          className="group relative bg-[#101828] rounded-3xl p-8 md:p-10 overflow-hidden cursor-default"
        >
          {/* Animated orb */}
          <div ref={orbRef} className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 via-transparent to-[#065F46]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

          <div className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-12 h-12 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center mb-5"
            >
              <Building2 size={24} className="text-[#10B981]" />
            </motion.div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#10B981] mb-3 block">For Employers</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
              Need better people systems or better hires?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Tell us what your business is struggling with. We can help you review your HR structure, hire the right people, improve onboarding, strengthen performance, or outsource HR operations.
            </p>
            <ul className="space-y-2.5 mb-8">
              {employerPoints.map((pt, i) => (
                <motion.li
                  key={pt}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/75">{pt}</span>
                </motion.li>
              ))}
            </ul>
            <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight size={16} />} className="w-full sm:w-auto justify-center">
              I Need HR Support
            </Button>
          </div>
        </motion.div>

        {/* Candidate Card */}
        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
          className="group relative bg-white rounded-3xl border border-[#EAECF0] p-8 md:p-10 overflow-hidden shadow-[0_4px_24px_0_rgba(16,24,40,0.07)] hover:shadow-[0_16px_48px_0_rgba(16,24,40,0.12)] transition-shadow duration-300 cursor-default"
        >
          {/* Background glow */}
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#ECFDF5] blur-3xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles size={16} className="text-[#10B981]" />
          </div>

          <div className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center mb-5"
            >
              <Users size={24} className="text-[#065F46]" />
            </motion.div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-3 block">For Job Seekers</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101828] leading-tight mb-3">
              Looking for your next opportunity?
            </h3>
            <p className="text-[#667085] text-sm leading-relaxed mb-6">
              Explore current roles, submit your CV, and access practical career resources that help you show up prepared and professional.
            </p>
            <ul className="space-y-2.5 mb-8">
              {candidatePoints.map((pt, i) => (
                <motion.li
                  key={pt}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#344054]">{pt}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" size="lg" href="/jobs" iconRight={<ArrowRight size={16} />} className="justify-center">
                View Open Roles
              </Button>
              <Button variant="outline" size="lg" href="/jobs#submit-cv" className="justify-center">
                Submit Your CV
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
