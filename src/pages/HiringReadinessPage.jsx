import SEO from '../components/ui/SEO'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, ArrowRight, Download } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import SectionWrapper from '../components/ui/SectionWrapper'

const checklist = [
  {
    category: 'Role Definition',
    items: [
      'Job title is clear and aligned to industry standards',
      'Role purpose has been written in one sentence',
      'Key responsibilities are documented (5–8 bullet points)',
      'Reporting line and team structure are defined',
      'Required qualifications and experience are specified',
      'Must-have vs. nice-to-have criteria are separated',
    ],
  },
  {
    category: 'Compensation and Budget',
    items: [
      'Salary range has been approved internally',
      'Total compensation package is defined (salary + benefits)',
      'Budget is signed off before advertising begins',
      'Compensation is benchmarked against market rates',
    ],
  },
  {
    category: 'Recruitment Process',
    items: [
      'Hiring manager and decision-makers are identified',
      'Interview stages are planned (how many, what format)',
      'Interview questions and scoring criteria are prepared',
      'Background verification requirements are confirmed',
      'Reference check process is defined',
      'Timeline from application to offer is set',
    ],
  },
  {
    category: 'Onboarding Readiness',
    items: [
      'Offer letter and contract templates are ready',
      'First day schedule is planned',
      'Equipment and access are provisioned in advance',
      'Onboarding checklist exists for the role',
      '30/60/90 day success expectations are documented',
      'Buddy or mentor assigned for new hire',
    ],
  },
  {
    category: 'Compliance',
    items: [
      'Role does not require any special regulatory clearance',
      'Background check consent process is in place',
      'Employment contract complies with local labour law',
      'Tax and payroll registration is ready for new employee',
    ],
  },
]

export default function HiringReadinessPage() {
  const { ref, isVisible } = useScrollAnimation(0.05)
  const [checked, setChecked] = useState({})

  function toggle(catIdx, itemIdx) {
    const key = `${catIdx}-${itemIdx}`
    setChecked(c => ({ ...c, [key]: !c[key] }))
  }

  const totalItems = checklist.reduce((a, c) => a + c.items.length, 0)
  const checkedCount = Object.values(checked).filter(Boolean).length
  const pct = Math.round((checkedCount / totalItems) * 100)

  function getStatus() {
    if (pct < 40) return { label: 'Not Ready', color: '#F97316', msg: 'Several critical gaps need to be addressed before you start hiring.' }
    if (pct < 70) return { label: 'Partially Ready', color: '#F4B740', msg: 'You have the basics but some important items need attention before starting.' }
    if (pct < 90) return { label: 'Almost Ready', color: '#3B82F6', msg: 'Most foundations are in place. Address the remaining items and you are good to go.' }
    return { label: 'Ready to Hire', color: '#10B981', msg: 'You have done the preparation. You are in a strong position to start your search.' }
  }

  const status = getStatus()

  return (
    <>
      <SEO
        title="Hiring Readiness Checklist"
        description="Use the free Staffora Hiring Readiness Checklist to make sure your role, recruitment process, and onboarding are fully prepared before you start hiring."
        canonical="/hiring-readiness-checklist"
      />
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/50 blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="emerald" className="mb-5">Hiring Readiness Checklist</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-extrabold text-[#101828] leading-[1.1] tracking-tight mb-5"
            >
              Are you actually ready to hire?{' '}
              <span className="text-[#10B981]">Check before you start.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base sm:text-lg text-[#667085] leading-relaxed"
            >
              Most hiring failures happen before the search even begins. Use this checklist to make sure your role, process, and onboarding are ready before you spend time sourcing candidates.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      <SectionWrapper bg="warm-white">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Checklist */}
          <div className="lg:col-span-2 space-y-6">
            {checklist.map((cat, catIdx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_2px_10px_0_rgba(16,24,40,0.04)]"
              >
                <h3 className="text-sm font-bold text-[#101828] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#ECFDF5] text-[#10B981] text-xs font-bold flex items-center justify-center">{catIdx + 1}</span>
                  {cat.category}
                </h3>
                <div className="space-y-3">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`
                    const done = !!checked[key]
                    return (
                      <label key={itemIdx} className="flex items-start gap-3 cursor-pointer group">
                        <button
                          onClick={() => toggle(catIdx, itemIdx)}
                          className="shrink-0 mt-0.5 focus:outline-none"
                          aria-label={done ? 'Uncheck' : 'Check'}
                        >
                          {done
                            ? <CheckCircle2 size={18} className="text-[#10B981]" />
                            : <Circle size={18} className="text-[#D0D5DD] group-hover:text-[#10B981] transition-colors" />
                          }
                        </button>
                        <span className={`text-sm transition-colors leading-snug ${done ? 'line-through text-[#98A2B3]' : 'text-[#344054]'}`}>
                          {item}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sticky progress sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24 space-y-5"
          >
            {/* Score */}
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_2px_10px_0_rgba(16,24,40,0.04)]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Your Readiness Score</p>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 mb-3" style={{ borderColor: status.color }}>
                  <p className="text-xl font-extrabold" style={{ color: status.color }}>{pct}%</p>
                </div>
                <p className="text-sm font-bold" style={{ color: status.color }}>{status.label}</p>
              </div>
              <div className="h-2 bg-[#EAECF0] rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: status.color }}
                />
              </div>
              <p className="text-xs text-[#667085] text-center">{checkedCount} of {totalItems} items complete</p>
              <p className="text-xs text-[#667085] text-center mt-2 leading-relaxed">{status.msg}</p>
            </div>

            {/* CTA */}
            <div className="bg-[#F8FAFC] rounded-2xl border border-[#EAECF0] p-5">
              <p className="text-sm font-bold text-[#101828] mb-2">Need help getting ready?</p>
              <p className="text-xs text-[#667085] leading-relaxed mb-4">Staffora can help you complete the gaps — from role definition to onboarding setup.</p>
              <Button variant="primary" size="sm" href="/services/recruitment-and-onboarding" iconRight={<ArrowRight size={14} />} className="w-full justify-center">
                Get Hiring Support
              </Button>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAECF0] p-5">
              <p className="text-sm font-bold text-[#101828] mb-2">Diagnose your full HR health</p>
              <p className="text-xs text-[#667085] leading-relaxed mb-4">Get a broader view of your people systems with the free HR Health Check.</p>
              <Button variant="outline" size="sm" href="/hr-health-check" className="w-full justify-center">
                Take HR Health Check
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper bg="white">
        <div className="bg-[#101828] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full blur-[80px] bg-[#10B981]/15" />
          </div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Want expert hiring support?</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-7">
              Staffora can handle the full recruitment process — from role definition and candidate sourcing to onboarding your new hire successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" size="lg" href="/services/recruitment-and-onboarding" iconRight={<ArrowRight size={16} />} className="justify-center">
                Request Hiring Support
              </Button>
              <Button variant="white" size="lg" href="/contact" className="justify-center">
                Talk to Staffora
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
