import SEO from '../components/ui/SEO'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/ui/Badge'

const questions = [
  {
    id: 'structure',
    category: 'Structure',
    question: 'How would you describe your current HR structure?',
    options: [
      { value: 'a', label: 'No formal HR — people management is informal', score: 0 },
      { value: 'b', label: 'Some basic policies exist but not consistently applied', score: 1 },
      { value: 'c', label: 'We have HR policies and some documentation in place', score: 2 },
      { value: 'd', label: 'Full HR policies, documented processes, and clear structure', score: 3 },
    ],
  },
  {
    id: 'hiring',
    category: 'Hiring',
    question: 'How structured is your current recruitment process?',
    options: [
      { value: 'a', label: 'We hire based on who is available, no clear process', score: 0 },
      { value: 'b', label: 'We have a basic process but it is inconsistent', score: 1 },
      { value: 'c', label: 'We follow a structured process for most hires', score: 2 },
      { value: 'd', label: 'Full recruitment process with scorecards, structured interviews, and onboarding', score: 3 },
    ],
  },
  {
    id: 'onboarding',
    category: 'Onboarding',
    question: 'What happens when a new employee joins your business?',
    options: [
      { value: 'a', label: 'They figure things out on their own', score: 0 },
      { value: 'b', label: 'Basic induction only — no structured plan', score: 1 },
      { value: 'c', label: 'We have an onboarding checklist and a short plan', score: 2 },
      { value: 'd', label: 'Full onboarding programme with 30/60/90 day milestones', score: 3 },
    ],
  },
  {
    id: 'performance',
    category: 'Performance',
    question: 'How does your business manage employee performance?',
    options: [
      { value: 'a', label: 'No formal system — feedback is informal or reactive', score: 0 },
      { value: 'b', label: 'Occasional reviews but no standard framework', score: 1 },
      { value: 'c', label: 'Regular reviews with some KPIs or targets set', score: 2 },
      { value: 'd', label: 'Structured performance system with scorecards, reviews, and improvement plans', score: 3 },
    ],
  },
  {
    id: 'retention',
    category: 'Retention',
    question: 'How well do you understand why employees leave your business?',
    options: [
      { value: 'a', label: 'We do not track or analyse this', score: 0 },
      { value: 'b', label: 'We have a general sense but no formal data', score: 1 },
      { value: 'c', label: 'We conduct exit interviews and review the feedback', score: 2 },
      { value: 'd', label: 'We have retention tracking, exit data analysis, and action plans', score: 3 },
    ],
  },
  {
    id: 'data',
    category: 'HR Data',
    question: 'How visible is your HR and workforce data?',
    options: [
      { value: 'a', label: 'We have no consistent HR data or reporting', score: 0 },
      { value: 'b', label: 'Basic records exist but are not used for decisions', score: 1 },
      { value: 'c', label: 'We track some HR metrics and review them occasionally', score: 2 },
      { value: 'd', label: 'Regular HR reporting with dashboards and leadership insights', score: 3 },
    ],
  },
]

function getResult(score) {
  const max = questions.length * 3
  const pct = Math.round((score / max) * 100)
  if (pct <= 25) return {
    level: 'Foundation Stage',
    color: '#F97316',
    summary: 'Your HR foundation needs to be built. Most businesses at this stage are running on informal people management. The good news: starting from scratch means you can build it right.',
    recommendation: 'Start with the HR Diagnostic and Setup service to build your people foundation before problems compound.',
    cta: 'Get HR Diagnostic',
    href: '/services/hr-diagnostic-and-setup',
    pct,
  }
  if (pct <= 50) return {
    level: 'Developing Stage',
    color: '#F4B740',
    summary: 'You have the basics in place but consistency and completeness are the main challenges. Some processes exist, but they are not being applied reliably across your business.',
    recommendation: 'Focus on strengthening your hiring, onboarding, and performance systems to move from ad hoc to structured.',
    cta: 'See Recommended Services',
    href: '/services',
    pct,
  }
  if (pct <= 75) return {
    level: 'Progressing Stage',
    color: '#3B82F6',
    summary: 'Your HR systems are functioning but there are clear gaps in specific areas. You are running more consistently than most, but targeted improvements will have high impact.',
    recommendation: 'Identify your weakest areas and address them systematically — performance management and retention are common gaps at this stage.',
    cta: 'Talk to Staffora',
    href: '/contact',
    pct,
  }
  return {
    level: 'Strong Stage',
    color: '#10B981',
    summary: 'Your HR systems are strong. You are ahead of most businesses at your size. The opportunity now is to optimise, build analytics capability, and future-proof your people strategy.',
    recommendation: 'Consider talent management, HR analytics, and advanced retention strategies to maintain your competitive advantage.',
    cta: 'Explore Advanced Services',
    href: '/services',
    pct,
  }
}

export default function HRHealthCheckPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0 = intro, 1–6 = questions, 7 = result
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)

  const totalSteps = questions.length
  const isIntro = step === 0
  const isResult = step === totalSteps + 1
  const currentQ = questions[step - 1]

  function startQuiz() { setStep(1); setSelected(null) }

  function handleNext() {
    if (!selected) return
    setAnswers(a => ({ ...a, [currentQ.id]: selected }))
    setSelected(null)
    setStep(s => s + 1)
  }

  function handleBack() {
    if (step === 1) { setStep(0); setSelected(null); return }
    const prevQ = questions[step - 2]
    setSelected(answers[prevQ.id] || null)
    setStep(s => s - 1)
  }

  const totalScore = Object.entries(answers).reduce((acc, [id, val]) => {
    const q = questions.find(q => q.id === id)
    const opt = q?.options.find(o => o.value === val)
    return acc + (opt?.score || 0)
  }, 0)

  const result = isResult ? getResult(totalScore) : null
  const progress = isIntro ? 0 : isResult ? 100 : Math.round(((step - 1) / totalSteps) * 100)

  return (
    <>
    <SEO
      title="Free HR Health Check"
      description="Take the free Staffora HR Health Check to assess your people systems in 6 questions and get a personalised recommendation for your business."
      canonical="/hr-health-check"
      noIndex={false}
    />
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/50 blur-[140px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-20">

        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="emerald" className="mb-4">Free HR Health Check</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight">
            {isResult ? 'Your HR Health Score' : 'HR Diagnostic Assessment'}
          </h1>
        </div>

        {/* Progress bar */}
        {!isIntro && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#667085]">
                {isResult ? 'Complete' : `Question ${step} of ${totalSteps}`}
              </span>
              <span className="text-xs font-semibold text-[#10B981]">{progress}%</span>
            </div>
            <div className="h-2 bg-[#EAECF0] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#10B981] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isIntro && (
            <motion.div key="intro"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-[#EAECF0] p-8 md:p-10 shadow-[0_2px_16px_0_rgba(16,24,40,0.06)]"
            >
              <h2 className="text-xl font-bold text-[#101828] mb-4">Understand your HR health in 6 questions.</h2>
              <p className="text-sm text-[#667085] leading-relaxed mb-6">
                This free assessment helps you understand where your people systems are strong and where they need work. It takes under 3 minutes and gives you a personalised recommendation.
              </p>
              <div className="space-y-3 mb-8">
                {['Free, no account needed', '6 questions covering all core HR areas', 'Personalised score and service recommendation', 'No spam — your results stay with you'].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                    <span className="text-sm text-[#344054]">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={startQuiz}
                className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-base rounded-xl px-6 py-3.5 transition-colors duration-200"
              >
                Start Assessment <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {!isIntro && !isResult && currentQ && (
            <motion.div key={`q-${step}`}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl border border-[#EAECF0] p-8 md:p-10 shadow-[0_2px_16px_0_rgba(16,24,40,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#10B981] mb-3">{currentQ.category}</p>
              <h2 className="text-lg sm:text-xl font-bold text-[#101828] mb-6 leading-snug">{currentQ.question}</h2>
              <div className="space-y-3 mb-8">
                {currentQ.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSelected(opt.value)}
                    className={`w-full text-left rounded-xl border p-4 text-sm transition-all duration-200 ${
                      selected === opt.value
                        ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46] font-medium'
                        : 'border-[#EAECF0] text-[#344054] hover:border-[#10B981]/50 hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${selected === opt.value ? 'border-[#10B981] bg-[#10B981]' : 'border-[#D0D5DD]'}`}>
                        {selected === opt.value && <span className="w-2 h-2 bg-white rounded-full" />}
                      </span>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#EAECF0] text-sm font-medium text-[#344054] hover:bg-[#F8FAFC] transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  onClick={handleNext} disabled={!selected}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl px-6 py-2.5 transition-colors duration-200"
                >
                  {step === totalSteps ? 'See My Results' : 'Next'} <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {isResult && result && (
            <motion.div key="result"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              {/* Score circle */}
              <div className="bg-white rounded-3xl border border-[#EAECF0] p-8 md:p-10 shadow-[0_2px_16px_0_rgba(16,24,40,0.06)] mb-5 text-center">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-8 mb-5" style={{ borderColor: result.color }}>
                  <div>
                    <p className="text-2xl font-extrabold" style={{ color: result.color }}>{result.pct}%</p>
                    <p className="text-xs text-[#667085]">score</p>
                  </div>
                </div>
                <h2 className="text-xl font-extrabold text-[#101828] mb-2">{result.level}</h2>
                <p className="text-sm text-[#667085] leading-relaxed max-w-md mx-auto">{result.summary}</p>
              </div>

              {/* Category breakdown */}
              <div className="bg-white rounded-3xl border border-[#EAECF0] p-7 shadow-[0_2px_16px_0_rgba(16,24,40,0.06)] mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Your Scores by Category</p>
                <div className="space-y-3">
                  {questions.map(q => {
                    const ans = answers[q.id]
                    const opt = q.options.find(o => o.value === ans)
                    const score = opt?.score || 0
                    const pct = Math.round((score / 3) * 100)
                    return (
                      <div key={q.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-[#344054]">{q.category}</span>
                          <span className="text-xs text-[#667085]">{score}/3</span>
                        </div>
                        <div className="h-1.5 bg-[#EAECF0] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: result.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-[#F8FAFC] rounded-3xl border border-[#EAECF0] p-7 mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#10B981] mb-2">Recommendation</p>
                <p className="text-sm text-[#344054] leading-relaxed mb-5">{result.recommendation}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={result.href}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm rounded-xl px-5 py-3 transition-colors"
                  >
                    {result.cta} <ArrowRight size={14} />
                  </a>
                  <a
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-2 border border-[#EAECF0] text-[#344054] hover:border-[#10B981] hover:text-[#10B981] font-medium text-sm rounded-xl px-5 py-3 transition-colors bg-white"
                  >
                    Talk to Staffora
                  </a>
                </div>
              </div>

              <button
                onClick={() => { setStep(0); setAnswers({}); setSelected(null) }}
                className="w-full text-center text-xs text-[#667085] hover:text-[#10B981] transition-colors py-2"
              >
                Retake the assessment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    </>
  )
}
