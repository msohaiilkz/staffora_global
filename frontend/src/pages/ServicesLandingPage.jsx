import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { servicesData } from '../data/services'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

export default function ServicesLandingPage() {
  const { ref, isVisible } = useScrollAnimation(0.08)

  return (
    <>
      <SEO
        title="HR Services"
        description="Staffora Global offers HR diagnostic, recruitment, outsourcing, talent management, performance management, engagement, analytics, and background verification services."
        canonical="/services"
      />
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/60 blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
              <Badge variant="emerald" className="mb-5">Staffora Services</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.08 }}
              className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#101828] leading-[1.1] tracking-tight mb-5"
            >
              HR services that connect{' '}
              <span className="text-[#10B981]">structure, hiring, performance, and retention.</span>
            </motion.h1>
            <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.16 }}
              className="text-base sm:text-lg text-[#667085] leading-relaxed mb-8 max-w-2xl"
            >
              Staffora Global helps businesses move from scattered people management to practical HR systems that support growth.
            </motion.p>
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.24 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button variant="primary" size="lg" href="/hr-health-check" iconRight={<ArrowRight size={16}/>}>
                Find the Right Service
              </Button>
              <Button variant="outline" size="lg" href="#services-grid">
                Browse All Services
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      {/* Services Grid */}
      <SectionWrapper id="services-grid" bg="warm-white">
        <div ref={ref} className="max-w-xl mb-12">
          <motion.p initial={{ opacity:0, y:12 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
          >All Services</motion.p>
          <motion.h2 initial={{ opacity:0, y:16 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.08 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight"
          >
            Choose the right support for your business
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesData.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.slug}
                initial={{ opacity:0, y:24 }} animate={isVisible ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.5, delay:0.05 + i*0.07, ease:[0.22,1,0.36,1] }}
              >
                <Link to={`/services/${s.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_2px_12px_0_rgba(16,24,40,0.05)] hover:shadow-[0_8px_28px_0_rgba(16,24,40,0.10)] hover:-translate-y-1.5 hover:border-transparent transition-all duration-300"
                  style={{ '--hover-border': s.accentColor }}
                >
                  <div className={`w-11 h-11 ${s.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={22} className={s.iconColor} />
                  </div>
                  <h3 className="text-sm font-bold text-[#101828] mb-2 leading-snug flex-1">{s.eyebrow}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed mb-4 line-clamp-3">{s.subheadline}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B981] group-hover:gap-2.5 transition-all duration-200">
                    Learn more <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Not Sure Banner */}
      <SectionWrapper bg="white">
        <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-2">Not sure where to start?</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#101828] mb-2">
              Start with the HR Diagnostic.
            </h3>
            <p className="text-[#667085] text-sm max-w-lg">
              Staffora can review your current people structure and recommend the right path before you spend money on the wrong solution.
            </p>
          </div>
          <Button variant="primary" size="lg" href="/hr-health-check" iconRight={<ArrowRight size={16}/>} className="shrink-0 w-full md:w-auto justify-center">
            Start with HR Diagnostic
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}
