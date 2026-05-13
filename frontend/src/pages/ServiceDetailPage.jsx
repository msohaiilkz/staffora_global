import SEO from '../components/ui/SEO'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { servicesData } from '../data/services'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

const steps = [
  { num: '01', title: 'Discovery',         copy: 'Understand current situation, goals, team structure, and pain points.' },
  { num: '02', title: 'Gap Review',        copy: 'Identify what is missing, weak, duplicated, or slowing the business.' },
  { num: '03', title: 'Solution Design',   copy: 'Recommend the right structure, process, resource, or service model.' },
  { num: '04', title: 'Implementation',    copy: 'Execute with clear timelines, owners, deliverables, and check-ins.' },
  { num: '05', title: 'Reporting',         copy: 'Track progress and provide actionable insights.' },
]

function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white border border-[#EAECF0] rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-[#F8FAFC] transition-colors"
          >
            <span className="text-sm font-semibold text-[#101828]">{faq.q}</span>
            {open === i
              ? <ChevronUp size={16} className="text-[#10B981] shrink-0" />
              : <ChevronDown size={16} className="text-[#667085] shrink-0" />
            }
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 pb-5 text-sm text-[#667085] leading-relaxed">{faq.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = servicesData.find(s => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-[#101828]">Service not found</h1>
        <Button variant="primary" href="/services">Back to Services</Button>
      </div>
    )
  }

  const Icon = service.icon
  const { ref: heroRef } = useScrollAnimation()
  const { ref: delivRef, isVisible: delivVisible } = useScrollAnimation(0.1)
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.1)
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation(0.1)

  return (
    <>
      <SEO
        title={service.seoTitle.replace(' | Staffora Global', '')}
        description={service.seoMeta}
        canonical={`/services/${service.slug}`}
      />

      {/* ── Hero ── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4"
            style={{ background: `${service.accentColor}18` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-18 md:pt-18 md:pb-22">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4 }}
            className="flex items-center gap-2 mb-8 text-xs text-[#667085]"
          >
            <Link to="/services" className="hover:text-[#10B981] transition-colors flex items-center gap-1">
              <ArrowLeft size={12}/> Services
            </Link>
            <span>/</span>
            <span className="text-[#101828] font-medium">{service.eyebrow}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={heroRef}>
              <motion.div initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.45 }}
                className={`w-14 h-14 ${service.iconBg} rounded-2xl flex items-center justify-center mb-5`}
              >
                <Icon size={26} className={service.iconColor} />
              </motion.div>
              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.06 }}>
                <Badge variant="emerald" className="mb-4">{service.eyebrow}</Badge>
              </motion.div>
              <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
                className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#101828] leading-[1.15] tracking-tight mb-4"
              >
                {service.headline}
              </motion.h1>
              <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.18 }}
                className="text-base text-[#667085] leading-relaxed mb-8"
              >
                {service.subheadline}
              </motion.p>
              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.26 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight size={16}/>}>
                  {service.cta}
                </Button>
                <Button variant="outline" size="lg" href="/hr-health-check">
                  Book HR Diagnostic
                </Button>
              </motion.div>
            </div>

            {/* Right: Who this is for */}
            <motion.div initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.65, delay:0.15, ease:[0.22,1,0.36,1] }}
              className="bg-[#F8FAFC] border border-[#EAECF0] rounded-3xl p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Who This Is For</p>
              <ul className="space-y-3">
                {service.whoFor.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#344054]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      {/* ── Deliverables ── */}
      <SectionWrapper bg="warm-white">
        <div ref={delivRef}>
          <div className="max-w-2xl mb-10">
            <motion.p initial={{ opacity:0, y:12 }} animate={delivVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
              className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
            >What We Help With</motion.p>
            <motion.h2 initial={{ opacity:0, y:16 }} animate={delivVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.08 }}
              className="text-2xl sm:text-3xl font-extrabold text-[#101828] leading-tight"
            >
              What Staffora delivers for {service.eyebrow.toLowerCase()}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.deliverables.map((d, i) => (
              <motion.div key={d}
                initial={{ opacity:0, y:20 }} animate={delivVisible ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.45, delay:0.08 + i*0.07 }}
                className="bg-white rounded-2xl border border-[#EAECF0] p-5 flex items-start gap-3 hover:shadow-[0_4px_16px_0_rgba(16,24,40,0.07)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`w-8 h-8 ${service.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                  <CheckCircle2 size={15} className={service.iconColor} />
                </div>
                <p className="text-sm text-[#344054] font-medium leading-snug">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Process ── */}
      <SectionWrapper bg="white">
        <div ref={processRef}>
          <div className="max-w-xl mb-10">
            <motion.p initial={{ opacity:0, y:12 }} animate={processVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
              className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
            >Our Process</motion.p>
            <motion.h2 initial={{ opacity:0, y:16 }} animate={processVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.08 }}
              className="text-2xl sm:text-3xl font-extrabold text-[#101828] leading-tight"
            >
              How we approach every engagement
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((s, i) => (
              <motion.div key={s.num}
                initial={{ opacity:0, y:22 }} animate={processVisible ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.45, delay:0.1 + i*0.09, ease:[0.22,1,0.36,1] }}
                className="bg-[#F8FAFC] border border-[#EAECF0] rounded-2xl p-5"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-4 text-white text-sm font-bold shadow-sm`}
                  style={{ background: service.accentColor }}>
                  {s.num}
                </div>
                <h3 className="text-sm font-bold text-[#101828] mb-1.5">{s.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{s.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── FAQ ── */}
      <SectionWrapper bg="warm-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" ref={faqRef}>
          <motion.div initial={{ opacity:0, x:-20 }} animate={faqVisible ? { opacity:1, x:0 } : {}} transition={{ duration:0.55 }}>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3">FAQs</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] leading-tight mb-4">
              Common questions about {service.eyebrow.toLowerCase()}
            </h2>
            <p className="text-base text-[#667085] leading-relaxed mb-7">
              Not sure if this is right for your business? These answers help clarify what to expect.
            </p>
            <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight size={16}/>}>
              {service.cta}
            </Button>
          </motion.div>
          <motion.div initial={{ opacity:0, x:20 }} animate={faqVisible ? { opacity:1, x:0 } : {}} transition={{ duration:0.55, delay:0.1 }}>
            <FAQAccordion faqs={service.faqs} />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── Bottom CTA ── */}
      <section className="relative bg-[#101828] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full blur-[100px]"
            style={{ background: `${service.accentColor}20` }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to improve {service.eyebrow.toLowerCase()}?
          </h2>
          <p className="text-white/60 text-base mb-8">
            Tell Staffora what you are trying to fix. We will help you understand the right next step before you waste time or money on the wrong solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight size={16}/>} className="justify-center">
              {service.cta}
            </Button>
            <Button variant="white" size="lg" href="/hr-health-check" className="justify-center">
              Book HR Diagnostic
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
