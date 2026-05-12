import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useSearchParams, Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function ThankYouPage() {
  const [params] = useSearchParams()
  const type = params.get('type') || 'employer'
  const isCandidate = type === 'candidate'

  return (
    <>
    <SEO title="Thank You" noIndex={true} />
    <section className="relative min-h-[75vh] bg-white flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/50 blur-[140px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={32} className="text-[#10B981]" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight leading-tight mb-4"
        >
          {isCandidate ? 'Application received.' : 'Message received.'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
          className="text-base text-[#667085] leading-relaxed mb-8 max-w-md mx-auto"
        >
          {isCandidate
            ? 'Thank you for applying. A member of our team will review your application and reach out if your profile matches a current opportunity.'
            : 'Thank you for getting in touch. A member of our team will review your message and respond within 1 business day.'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {isCandidate ? (
            <>
              <Button variant="primary" size="lg" href="/jobs" iconRight={<ArrowRight size={16} />}>Browse More Roles</Button>
              <Button variant="outline" size="lg" href="/">Back to Home</Button>
            </>
          ) : (
            <>
              <Button variant="primary" size="lg" href="/services" iconRight={<ArrowRight size={16} />}>Explore Services</Button>
              <Button variant="outline" size="lg" href="/hr-health-check">Take HR Health Check</Button>
            </>
          )}
        </motion.div>
      </div>
    </section>
    </>
  )
}
