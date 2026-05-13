import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import { ArrowRight, Search, PenLine, Rocket, TrendingUp } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionWrapper from '../components/ui/SectionWrapper'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

/* ─── data ─── */
const approach = [
  { step: '01', icon: <Search size={20} className="text-[#10B981]" />, bg: 'bg-[#ECFDF5]', title: 'Diagnose', copy: 'We listen, review, ask questions, and understand the current HR reality before suggesting anything.' },
  { step: '02', icon: <PenLine size={20} className="text-blue-500" />,  bg: 'bg-blue-50',   title: 'Design',   copy: 'We recommend practical structures, processes, and services based on the specific business need.' },
  { step: '03', icon: <Rocket size={20} className="text-[#F4B740]" />,  bg: 'bg-[#FFFBEB]', title: 'Deliver',  copy: 'We support execution across recruitment, onboarding, HR setup, outsourcing, performance, and talent management.' },
  { step: '04', icon: <TrendingUp size={20} className="text-purple-500" />, bg: 'bg-purple-50', title: 'Improve', copy: 'We help businesses keep improving through reporting, feedback, and better people decisions.' },
]

const beliefs = [
  { belief: 'Recruitment without structure creates repeated hiring.',   meaning: 'A business should not keep hiring for the same problem without fixing the system around the role.' },
  { belief: 'People perform better when expectations are clear.',       meaning: 'Clear roles, KPIs, onboarding, and feedback help employees understand what success looks like.' },
  { belief: 'Founders should not carry every people issue alone.',      meaning: 'As a business grows, HR structure must grow with it.' },
  { belief: 'Retention starts before resignation.',                     meaning: 'Employees usually show signs before they leave. Businesses need systems that identify and address those signs early.' },
  { belief: 'HR should be practical, not complicated.',                 meaning: 'Good HR systems should help the business move better, not create unnecessary paperwork.' },
]

/* ─── sub-components ─── */
function HeroBlock() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/70 blur-[110px] translate-x-1/3 -translate-y-1/4" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <Badge variant="emerald" className="mb-5">About Staffora Global</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.08 }}
            className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#101828] leading-[1.1] tracking-tight mb-5"
          >
            We help businesses grow with{' '}
            <span className="text-[#10B981]">stronger people systems.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.16 }}
            className="text-base sm:text-lg text-[#667085] leading-relaxed mb-8 max-w-2xl"
          >
            Staffora Global was built for businesses that want more than quick recruitment fixes. We help companies understand their people challenges, improve HR structure, hire better, and create environments where employees can perform and stay.
          </motion.p>
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.24 }}>
            <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight size={16} />}>
              Talk to Staffora
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
    </section>
  )
}

function WhyWeExist() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  return (
    <SectionWrapper bg="warm-white" id="why-we-exist">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left visual */}
        <motion.div
          ref={ref}
          initial={{ opacity:0, x:-28 }} animate={isVisible ? { opacity:1, x:0 } : {}}
          transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
          className="relative"
        >
          <div className="bg-[#101828] rounded-3xl p-8 md:p-10">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#10B981] mb-6">The cycle we help break</p>
            {[
              { label: 'Reactive Hiring',      color: 'bg-red-400' },
              { label: 'Poor Onboarding',      color: 'bg-orange-400' },
              { label: 'Low Performance',      color: 'bg-[#F4B740]' },
              { label: 'High Turnover',        color: 'bg-red-400' },
              { label: 'Hire Again',           color: 'bg-[#667085]' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity:0, x:-16 }} animate={isVisible ? { opacity:1, x:0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration:0.45 }}
                className="flex items-center gap-3 mb-3 last:mb-0"
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
                <div className="flex-1 h-9 bg-white/8 rounded-lg border border-white/10 flex items-center px-4">
                  <span className="text-sm text-white/70">{item.label}</span>
                </div>
                {i < 4 && <ArrowRight size={13} className="text-white/25 shrink-0" />}
              </motion.div>
            ))}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 bg-[#10B981]/15 border border-[#10B981]/30 rounded-xl px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-sm font-semibold text-[#10B981]">Staffora breaks this cycle</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right copy */}
        <div>
          <motion.p initial={{ opacity:0, y:12 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
          >
            Why we exist
          </motion.p>
          <motion.h2 initial={{ opacity:0, y:16 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.08 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight mb-5"
          >
            Because many businesses are growing faster than{' '}
            <span className="text-[#10B981]">their HR structure.</span>
          </motion.h2>
          <motion.div initial={{ opacity:0, y:14 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.14 }}
            className="space-y-4 text-[#667085] text-base leading-relaxed"
          >
            <p>Growth is exciting from the outside, but inside many businesses, the founder or management team is still carrying too much. Hiring is reactive. Roles are unclear. Employees join without proper onboarding.</p>
            <p>Performance is discussed only when something goes wrong. Good people leave, and the business starts the hiring cycle again.</p>
            <p className="text-[#101828] font-semibold">Staffora Global exists to help businesses break that cycle.</p>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function OurApproach() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  return (
    <SectionWrapper bg="white" id="our-approach">
      <div ref={ref} className="max-w-2xl mx-auto text-center mb-12">
        <motion.p initial={{ opacity:0, y:12 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
        >Our Approach</motion.p>
        <motion.h2 initial={{ opacity:0, y:16 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.08 }}
          className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight mb-4"
        >
          We look at the system{' '}
          <span className="text-[#10B981]">behind the people problem.</span>
        </motion.h2>
        <motion.p initial={{ opacity:0, y:14 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.14 }}
          className="text-base text-[#667085] leading-relaxed"
        >
          A vacancy is not always just a vacancy. High turnover is not always just a talent problem. Sometimes the real problem is unclear structure, weak onboarding, poor communication, or no performance system.
        </motion.p>
      </div>

      {/* 4-step flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {approach.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity:0, y:24 }} animate={isVisible ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5, delay:0.1 + i*0.1, ease:[0.22,1,0.36,1] }}
            className="relative bg-[#F8FAFC] rounded-2xl border border-[#EAECF0] p-6 hover:shadow-[0_4px_20px_0_rgba(16,24,40,0.08)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* connector arrow */}
            {i < 3 && (
              <div className="hidden lg:flex absolute top-8 -right-3 z-10 w-6 h-6 bg-white border border-[#EAECF0] rounded-full items-center justify-center shadow-sm">
                <ArrowRight size={11} className="text-[#10B981]" />
              </div>
            )}
            <div className={`w-10 h-10 ${a.bg} rounded-xl flex items-center justify-center mb-4`}>{a.icon}</div>
            <span className="text-xs font-bold text-[#667085] tracking-widest">{a.step}</span>
            <h3 className="text-base font-bold text-[#101828] mt-1 mb-2">{a.title}</h3>
            <p className="text-sm text-[#667085] leading-relaxed">{a.copy}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function OurBeliefs() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  return (
    <SectionWrapper bg="warm-white" id="our-beliefs">
      <div className="max-w-2xl mx-auto text-center mb-12" ref={ref}>
        <motion.p initial={{ opacity:0, y:12 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3"
        >Our Beliefs</motion.p>
        <motion.h2 initial={{ opacity:0, y:16 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.08 }}
          className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight"
        >
          What we stand for
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {beliefs.map((b, i) => (
          <motion.div
            key={b.belief}
            initial={{ opacity:0, y:22 }} animate={isVisible ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5, delay:0.08 + i*0.08, ease:[0.22,1,0.36,1] }}
            className="bg-white rounded-2xl border border-[#EAECF0] p-6 hover:border-[#10B981]/40 hover:shadow-[0_4px_20px_0_rgba(16,24,40,0.07)] transition-all duration-300 group"
          >
            <div className="w-1.5 h-8 rounded-full bg-[#10B981] mb-4 group-hover:h-10 transition-all duration-300" />
            <p className="text-sm font-bold text-[#101828] mb-2 leading-snug">{b.belief}</p>
            <p className="text-xs text-[#667085] leading-relaxed">{b.meaning}</p>
          </motion.div>
        ))}
        {/* Last card — CTA */}
        <motion.div
          initial={{ opacity:0, y:22 }} animate={isVisible ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5, delay:0.48 }}
          className="bg-[#101828] rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="w-1.5 h-8 rounded-full bg-[#10B981] mb-4" />
            <p className="text-sm font-bold text-white mb-2">Let us build the HR structure behind your growth.</p>
            <p className="text-xs text-white/55 leading-relaxed">If your team is growing but your people systems are not keeping up, Staffora can help.</p>
          </div>
          <Button variant="primary" size="sm" href="/hr-health-check" iconRight={<ArrowRight size={14}/>} className="mt-5 self-start">
            Book HR Diagnostic
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

function AboutFinalCTA() {
  const { ref, isVisible } = useScrollAnimation(0.15)
  return (
    <section ref={ref} className="relative bg-[#101828] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#10B981]/10 blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
        <motion.h2 initial={{ opacity:0, y:18 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.06 }}
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white leading-tight tracking-tight mb-5"
        >
          Let us build the HR structure{' '}
          <span className="text-[#10B981]">behind your growth.</span>
        </motion.h2>
        <motion.p initial={{ opacity:0, y:14 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay:0.14 }}
          className="text-base text-white/60 leading-relaxed mb-9"
        >
          If your team is growing but your people systems are not keeping up, Staffora Global can help you make the next stage more structured and less stressful.
        </motion.p>
        <motion.div initial={{ opacity:0, y:14 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.5, delay:0.22 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button variant="primary" size="xl" href="/hr-health-check" iconRight={<ArrowRight size={17}/>} className="justify-center">
            Book HR Diagnostic
          </Button>
          <Button variant="white" size="xl" href="/services" className="justify-center">
            Explore Services
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── page ─── */
export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Staffora Global is an HR systems and talent solutions company helping businesses across Africa build stronger people operations, hire better, and retain talent longer."
        canonical="/about"
      />
      <HeroBlock />
      <WhyWeExist />
      <OurApproach />
      <OurBeliefs />
      <AboutFinalCTA />
    </>
  )
}
