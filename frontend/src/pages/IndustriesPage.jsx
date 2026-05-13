import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

const industries = [
  {
    slug: 'hospitality',
    name: 'Hospitality and Tourism',
    description: 'Hotels, restaurants, travel operators, and service businesses that need high-volume, reliable hiring and strong retention in shift-based environments.',
    challenges: ['High staff turnover', 'Seasonal hiring surges', 'Inconsistent service quality', 'Weak onboarding processes'],
    accent: '#10B981',
    bg: 'bg-[#ECFDF5]',
    emoji: '🏨',
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    description: 'Banks, insurance firms, fintechs, and advisory companies that need compliant HR processes, specialist recruitment, and strong people governance.',
    challenges: ['Compliance-heavy hiring', 'Background verification needs', 'Talent pipeline for specialist roles', 'Regulatory HR documentation'],
    accent: '#3B82F6',
    bg: 'bg-blue-50',
    emoji: '🏦',
  },
  {
    slug: 'technology',
    name: 'Technology and Startups',
    description: 'Tech companies and fast-scaling startups that need to hire fast, retain engineers, build culture early, and scale people systems without bloated HR teams.',
    challenges: ['Fast-paced scaling needs', 'Competitive talent market', 'Culture alignment challenges', 'HR systems lagging behind growth'],
    accent: '#A855F7',
    bg: 'bg-purple-50',
    emoji: '💻',
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    description: 'Law firms, consulting firms, accounting practices, and agencies where staff performance directly impacts client outcomes and revenue.',
    challenges: ['Performance accountability gaps', 'Partner/manager development', 'Career path clarity', 'Billable talent retention'],
    accent: '#F4B740',
    bg: 'bg-[#FFFBEB]',
    emoji: '⚖️',
  },
  {
    slug: 'manufacturing-logistics',
    name: 'Manufacturing and Logistics',
    description: 'Production facilities, warehouses, and supply chain businesses that need structured workforce management, compliance, and clear operational HR processes.',
    challenges: ['Workforce compliance', 'Shift and attendance management', 'Safety documentation', 'Large headcount HR admin'],
    accent: '#F97316',
    bg: 'bg-orange-50',
    emoji: '🏭',
  },
  {
    slug: 'education',
    name: 'Education and Training',
    description: 'Schools, universities, training institutes, and edtech companies that need structured staff onboarding, performance clarity, and professional development support.',
    challenges: ['Staff development planning', 'Inconsistent appraisal processes', 'Educator retention', 'Admin HR workload'],
    accent: '#EC4899',
    bg: 'bg-pink-50',
    emoji: '🎓',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare and Pharma',
    description: 'Clinics, hospitals, pharmaceutical companies, and health services businesses needing rigorous verification, compliance, and workforce planning.',
    challenges: ['Strict credential verification', 'Compliance documentation', 'High-stakes onboarding', 'Staff wellbeing and retention'],
    accent: '#14B8A6',
    bg: 'bg-teal-50',
    emoji: '🏥',
  },
  {
    slug: 'fmcg-retail',
    name: 'FMCG and Retail',
    description: 'Consumer goods companies and retail chains that need scalable hiring, structured frontline management, and people data to manage distributed teams.',
    challenges: ['Distributed workforce management', 'Frontline manager capability', 'Seasonal staffing', 'Performance visibility across locations'],
    accent: '#065F46',
    bg: 'bg-[#ECFDF5]',
    emoji: '🛒',
  },
]

const stats = [
  { value: '8+', label: 'Industries Served' },
  { value: '50+', label: 'Engagements Delivered' },
  { value: '3', label: 'Countries Active' },
  { value: '90%', label: 'Client Retention Rate' },
]

function IndustryCard({ industry, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border border-[#EAECF0] p-7 hover:shadow-[0_8px_28px_0_rgba(16,24,40,0.09)] hover:-translate-y-1.5 hover:border-transparent transition-all duration-300 group flex flex-col"
    >
      <div className={`w-12 h-12 ${industry.bg} rounded-xl flex items-center justify-center mb-5 text-2xl group-hover:scale-105 transition-transform duration-300`}>
        {industry.emoji}
      </div>
      <h3 className="text-base font-bold text-[#101828] mb-2">{industry.name}</h3>
      <p className="text-sm text-[#667085] leading-relaxed mb-5 flex-1">{industry.description}</p>
      <div className="space-y-1.5 mb-6">
        {industry.challenges.map(c => (
          <div key={c} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: industry.accent }} />
            <span className="text-xs text-[#344054]">{c}</span>
          </div>
        ))}
      </div>
      <Link
        to="/contact"
        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
        style={{ color: industry.accent }}
      >
        Get Industry Support <ArrowRight size={12} />
      </Link>
    </motion.div>
  )
}

export default function IndustriesPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.05)
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1)
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.05)
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.1)

  return (
    <>
      <SEO
        title="Industries"
        description="Staffora Global provides industry-specific HR support for hospitality, financial services, technology, professional services, manufacturing, education, healthcare, and FMCG sectors."
        canonical="/industries"
      />
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/60 blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="max-w-3xl" ref={heroRef}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="emerald" className="mb-5">Industries</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#101828] leading-[1.1] tracking-tight mb-5"
            >
              HR support built around{' '}
              <span className="text-[#10B981]">how your industry actually works.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base sm:text-lg text-[#667085] leading-relaxed mb-8 max-w-2xl"
            >
              Generic HR advice rarely fits the specific hiring, compliance, and people challenges your business faces. Staffora builds solutions grounded in your sector reality.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight size={16} />}>
                Discuss Your Industry
              </Button>
              <Button variant="outline" size="lg" href="/hr-health-check">
                Start HR Diagnostic
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      {/* Stats */}
      <SectionWrapper bg="soft-green">
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-[#101828] mb-1">{s.value}</p>
              <p className="text-sm text-[#667085]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Industries Grid */}
      <SectionWrapper bg="warm-white" id="industries">
        <div ref={gridRef}>
          <div className="max-w-2xl mb-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={gridVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
            >Sectors We Support</motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={gridVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight"
            >
              Your industry has unique people challenges. We understand them.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((industry, i) => (
              <IndustryCard key={industry.slug} industry={industry} index={i} isVisible={gridVisible} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Cross-industry banner */}
      <SectionWrapper bg="white">
        <div ref={ctaRef} className="bg-[#101828] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 right-0 w-[400px] h-[300px] rounded-full blur-[80px] translate-x-1/3 -translate-y-1/2 bg-[#10B981]/15" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={ctaVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
                className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
              >Not sure if we cover your sector?</motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }} animate={ctaVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.08 }}
                className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4"
              >
                Staffora works across sectors. If your business has people, we can help.
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={ctaVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.16 }}
                className="space-y-2"
              >
                {[
                  'Free consultation to understand your specific industry challenges',
                  'No obligation HR assessment for your sector',
                  'Practical recommendations before you commit to anything',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={ctaVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.2 }}
              className="flex flex-col gap-3 shrink-0 w-full lg:w-auto"
            >
              <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight size={16} />} className="justify-center">
                Talk to Staffora
              </Button>
              <Button variant="white" size="lg" href="/hr-health-check" className="justify-center">
                Start HR Diagnostic
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
