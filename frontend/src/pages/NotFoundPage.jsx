import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <>
    <SEO title="Page Not Found" noIndex={true} />
    <section className="relative min-h-[75vh] bg-white flex items-center overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ECFDF5]/50 blur-[120px] -translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center w-full">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="text-[80px] sm:text-[100px] font-extrabold text-[#EAECF0] leading-none mb-4 select-none"
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
          className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight mb-4"
        >
          This page does not exist.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
          className="text-base text-[#667085] leading-relaxed mb-8 max-w-md mx-auto"
        >
          The page you are looking for may have moved or the URL may be incorrect.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button variant="primary" size="lg" href="/" iconRight={<ArrowRight size={16} />}>Back to Home</Button>
          <Button variant="outline" size="lg" href="/services">View Services</Button>
        </motion.div>
      </div>
    </section>
    </>
  )
}
