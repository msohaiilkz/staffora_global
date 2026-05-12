import { motion } from 'framer-motion'
import { ArrowRight, Stethoscope, Users, Building, Star, Target, Heart, BarChart3, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import SectionWrapper from '../ui/SectionWrapper'

const services = [
  { Icon: Stethoscope, iconColor: 'text-[#10B981]',   iconBg: 'bg-[#ECFDF5]',    glowColor: 'rgba(16,185,129,0.12)', title: 'HR Diagnostic and Setup',        copy: 'Review current HR structure, identify gaps, and build the policies, processes, and workflows needed.',         href: '/services/hr-diagnostic-and-setup',           cta: 'Audit My HR Setup' },
  { Icon: Users,       iconColor: 'text-blue-500',     iconBg: 'bg-blue-50',       glowColor: 'rgba(59,130,246,0.12)',  title: 'Recruitment and Onboarding',     copy: 'Define roles, source candidates, screen talent, and create onboarding experiences for new hires.',            href: '/services/recruitment-and-onboarding',         cta: 'Request Hiring Support' },
  { Icon: Building,    iconColor: 'text-purple-500',   iconBg: 'bg-purple-50',     glowColor: 'rgba(168,85,247,0.12)', title: 'HR Outsourcing',                 copy: 'Support day-to-day HR operations so your business can focus on growth while people processes are managed.',    href: '/services/hr-outsourcing',                    cta: 'Discuss Outsourcing' },
  { Icon: Star,        iconColor: 'text-[#F4B740]',    iconBg: 'bg-[#FFFBEB]',    glowColor: 'rgba(244,183,64,0.12)', title: 'Talent Management',              copy: 'Identify, develop, and retain employees with strong potential through structured talent frameworks.',          href: '/services/talent-management',                 cta: 'Improve Talent Systems' },
  { Icon: Target,      iconColor: 'text-orange-500',   iconBg: 'bg-orange-50',     glowColor: 'rgba(249,115,22,0.12)', title: 'Performance Management',         copy: 'Set up KPIs, OKRs, review cycles, feedback systems, and performance improvement structures.',               href: '/services/performance-management',             cta: 'Build Performance Framework' },
  { Icon: Heart,       iconColor: 'text-pink-500',     iconBg: 'bg-pink-50',       glowColor: 'rgba(236,72,153,0.12)', title: 'Employee Engagement',            copy: 'Understand why employees leave, what affects productivity, and how to build a better employee experience.',   href: '/services/employee-engagement-and-retention',  cta: 'Reduce Turnover' },
  { Icon: BarChart3,   iconColor: 'text-[#065F46]',    iconBg: 'bg-[#ECFDF5]',    glowColor: 'rgba(6,95,70,0.12)',    title: 'HR Analytics and Reporting',     copy: 'Track hiring speed, turnover, onboarding success, performance, and workforce productivity with clear data.',  href: '/services/hr-analytics-and-reporting',         cta: 'Build HR Dashboard' },
  { Icon: ShieldCheck, iconColor: 'text-[#667085]',    iconBg: 'bg-[#F8FAFC]',    glowColor: 'rgba(102,112,133,0.1)', title: 'Background Verification',        copy: 'Support more confident hiring decisions through structured checks and verification where required.',          href: '/services/background-verification',            cta: 'Verify Candidates' },
]

export default function ServicesPreview() {
  return (
    <SectionWrapper id="services" bg="warm-white">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
        >
          Our Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#101828] leading-tight tracking-tight mb-5"
        >
          HR support from{' '}
          <span className="text-[#10B981]">structure to talent acquisition.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-base text-[#667085] leading-relaxed"
        >
          Whether you need to set up HR from scratch, improve performance, outsource operations, or hire better talent — Staffora gives your business the people systems to grow with less chaos.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
            className="group bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_2px_12px_0_rgba(16,24,40,0.05)] hover:shadow-[0_16px_40px_0_rgba(16,24,40,0.12)] hover:border-transparent transition-shadow transition-border duration-300 flex flex-col relative overflow-hidden cursor-default"
          >
            {/* Hover glow bg */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              style={{ background: `radial-gradient(ellipse at top left, ${s.glowColor}, transparent 70%)` }}
            />
            <motion.div
              whileHover={{ scale: 1.12, rotate: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className={`relative w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}
            >
              <s.Icon size={22} className={s.iconColor} />
            </motion.div>
            <h3 className="relative text-sm font-bold text-[#101828] mb-2 leading-snug">{s.title}</h3>
            <p className="relative text-xs text-[#667085] leading-relaxed flex-1 mb-4">{s.copy}</p>
            <Link
              to={s.href}
              className="relative inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B981] group-hover:gap-2.5 transition-all duration-200"
            >
              {s.cta} <ArrowRight size={13} />
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Button variant="secondary" size="lg" href="/services" iconRight={<ArrowRight size={16} />}>
          Explore All Services
        </Button>
        <Button variant="ghost" size="lg" href="/hr-health-check">
          Not sure? Start with HR Diagnostic →
        </Button>
      </motion.div>
    </SectionWrapper>
  )
}
