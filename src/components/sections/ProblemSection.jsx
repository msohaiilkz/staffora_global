import { motion } from 'framer-motion'
import { Clock, TrendingDown, UserX, BarChart2, Layers, Eye, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SectionWrapper from '../ui/SectionWrapper'

const problems = [
  { icon: Clock,       iconColor: 'text-[#F4B740]',  iconBg: 'bg-[#FFFBEB]',    title: 'Slow Hiring',           copy: 'Important roles stay open too long, and growth depends on whoever is available instead of whoever is right.' },
  { icon: TrendingDown,iconColor: 'text-red-400',     iconBg: 'bg-red-50',        title: 'High Turnover',         copy: 'Employees leave, the business re-hires, and the real cost keeps rising without fixing the root cause.' },
  { icon: UserX,       iconColor: 'text-orange-400',  iconBg: 'bg-orange-50',     title: 'Weak Onboarding',       copy: 'New hires join without structure or clarity, then struggle to perform even when they have the right skills.' },
  { icon: BarChart2,   iconColor: 'text-purple-400',  iconBg: 'bg-purple-50',     title: 'No Performance System', copy: 'People are working, but output, accountability, and growth are not properly tracked or improved.' },
  { icon: Layers,      iconColor: 'text-[#10B981]',   iconBg: 'bg-[#ECFDF5]',    title: 'Founder Overload',      copy: 'The business grows, but every people issue still depends on one person — the founder.' },
  { icon: Eye,         iconColor: 'text-[#667085]',   iconBg: 'bg-[#F8FAFC]',    title: 'Poor HR Visibility',    copy: 'You cannot improve what you cannot measure. Most teams run without clear HR data or workforce insights.' },
]

export default function ProblemSection() {
  return (
    <SectionWrapper id="problems" bg="warm-white">
      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
        >
          The real problem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#101828] leading-tight tracking-tight mb-5"
        >
          Your business may not have a growth problem.{' '}
          <span className="text-[#10B981]">It may have an HR problem.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-base sm:text-lg text-[#667085] leading-relaxed"
        >
          Many businesses try to solve people issues by hiring again and again. But if roles are unclear, onboarding is weak, performance is unmeasured, and employees feel unsupported — the same problems return.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {problems.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_2px_16px_0_rgba(16,24,40,0.05)] hover:shadow-[0_12px_36px_0_rgba(16,24,40,0.11)] hover:border-transparent transition-shadow duration-300 cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-[#F8FAFC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className={`relative w-11 h-11 rounded-xl ${p.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className={p.iconColor} />
              </div>
              <h3 className="relative text-base font-bold text-[#101828] mb-2">{p.title}</h3>
              <p className="relative text-sm text-[#667085] leading-relaxed">{p.copy}</p>
            </motion.div>
          )
        })}
      </div>

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
