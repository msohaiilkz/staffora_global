import SEO from '../components/ui/SEO'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Clock, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

const inquiryTypes = [
  { value: 'hr-diagnostic', label: 'HR Diagnostic and Setup' },
  { value: 'recruitment', label: 'Recruitment and Onboarding' },
  { value: 'hr-outsourcing', label: 'HR Outsourcing' },
  { value: 'talent-management', label: 'Talent Management' },
  { value: 'performance-management', label: 'Performance Management' },
  { value: 'engagement-retention', label: 'Employee Engagement and Retention' },
  { value: 'hr-analytics', label: 'HR Analytics and Reporting' },
  { value: 'background-verification', label: 'Background Verification' },
  { value: 'general', label: 'General Inquiry' },
]

const companySizes = [
  '1–10 employees',
  '11–50 employees',
  '51–200 employees',
  '201–500 employees',
  '500+ employees',
]

const faqs = [
  { q: 'How quickly will you respond?', a: 'We aim to respond to all inquiries within 1 business day. For urgent matters, email us directly at info@stafforaglobal.com.' },
  { q: 'Is there a cost for the initial consultation?', a: 'No. The initial consultation is complimentary. We use it to understand your situation and recommend the right path forward.' },
  { q: 'Do you work with businesses outside Nigeria?', a: 'Yes. Staffora Global works with businesses across Africa and internationally. Our services are designed to be delivered remotely or in person depending on the engagement.' },
  { q: 'What happens after I send a message?', a: 'A member of our team will review your inquiry, reach out within 1 business day, and schedule a discovery call to understand your needs before recommending next steps.' },
]

export default function ContactPage() {
  const navigate = useNavigate()
  const { ref, isVisible } = useScrollAnimation(0.08)
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation(0.08)

  const [form, setForm] = useState({
    name: '', email: '', company: '', size: '', inquiry: '', message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.inquiry) e.inquiry = 'Please select an inquiry type'
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Please describe your situation (min 20 characters)'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    navigate('/thank-you?type=employer')
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Staffora Global. Tell us what HR challenge you are facing and we will recommend the right solution for your business."
        canonical="/contact"
      />
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/60 blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="emerald" className="mb-5">Contact Staffora</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-extrabold text-[#101828] leading-[1.1] tracking-tight mb-5"
            >
              Tell us what you are trying to fix.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base sm:text-lg text-[#667085] leading-relaxed"
            >
              We will review your situation and recommend the right next step — before you spend time or money on the wrong solution.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      {/* Form + Sidebar */}
      <SectionWrapper bg="warm-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Form */}
          <div ref={ref} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}
              className="bg-white rounded-3xl border border-[#EAECF0] p-7 md:p-10 shadow-[0_2px_16px_0_rgba(16,24,40,0.05)]"
            >
              <h2 className="text-xl font-extrabold text-[#101828] mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name *" error={errors.name}>
                    <input
                      type="text" placeholder="e.g. Amaka Osei"
                      value={form.name} onChange={e => handleChange('name', e.target.value)}
                      className={inputCls(errors.name)}
                    />
                  </Field>
                  <Field label="Work Email *" error={errors.email}>
                    <input
                      type="email" placeholder="you@company.com"
                      value={form.email} onChange={e => handleChange('email', e.target.value)}
                      className={inputCls(errors.email)}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Company Name">
                    <input
                      type="text" placeholder="Your company"
                      value={form.company} onChange={e => handleChange('company', e.target.value)}
                      className={inputCls()}
                    />
                  </Field>
                  <Field label="Company Size">
                    <select
                      value={form.size} onChange={e => handleChange('size', e.target.value)}
                      className={inputCls()}
                    >
                      <option value="">Select size…</option>
                      {companySizes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="What can we help with? *" error={errors.inquiry}>
                  <select
                    value={form.inquiry} onChange={e => handleChange('inquiry', e.target.value)}
                    className={inputCls(errors.inquiry)}
                  >
                    <option value="">Select inquiry type…</option>
                    {inquiryTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </Field>
                <Field label="Describe your situation *" error={errors.message}>
                  <textarea
                    rows={5} placeholder="Tell us what is happening with your people, what you have tried, and what outcome you are hoping for…"
                    value={form.message} onChange={e => handleChange('message', e.target.value)}
                    className={`${inputCls(errors.message)} resize-none`}
                  />
                </Field>
                <button
                  type="submit" disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-base rounded-xl px-6 py-3.5 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <ArrowRight size={16} /></>
                  )}
                </button>
                <p className="text-xs text-[#667085] text-center">We typically respond within 1 business day.</p>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.12 }}
            className="space-y-5"
          >
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Contact Details</p>
              <div className="space-y-3">
                <a href="mailto:info@stafforaglobal.com" className="flex items-center gap-3 text-sm text-[#344054] hover:text-[#10B981] transition-colors">
                  <Mail size={15} className="text-[#10B981] shrink-0" />
                  info@stafforaglobal.com
                </a>
                <a href="mailto:talent@stafforaglobal.com" className="flex items-center gap-3 text-sm text-[#344054] hover:text-[#10B981] transition-colors">
                  <Mail size={15} className="text-[#10B981] shrink-0" />
                  talent@stafforaglobal.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Response Time</p>
              <div className="flex items-start gap-3">
                <Clock size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                <p className="text-sm text-[#344054] leading-relaxed">We respond to all inquiries within <strong>1 business day</strong>. For urgent matters, email us directly.</p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl border border-[#EAECF0] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Not sure where to start?</p>
              <p className="text-sm text-[#344054] leading-relaxed mb-4">Take the free HR Diagnostic to identify your biggest people challenges before we speak.</p>
              <Button variant="primary" size="sm" href="/hr-health-check" iconRight={<ArrowRight size={14} />} className="w-full justify-center">
                Start HR Diagnostic
              </Button>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Looking for a job?</p>
              <p className="text-sm text-[#344054] leading-relaxed mb-4">Candidate applications go through our Jobs board, not this form.</p>
              <Button variant="outline" size="sm" href="/jobs" className="w-full justify-center">
                View Open Roles
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper bg="white">
        <div ref={faqRef} className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={faqVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-3">FAQs</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] leading-tight">Common questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} animate={faqVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.07 }}
                className="bg-[#F8FAFC] rounded-2xl border border-[#EAECF0] p-6"
              >
                <h3 className="text-sm font-bold text-[#101828] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#667085] leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#344054] mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function inputCls(hasError) {
  return `w-full rounded-xl border ${hasError ? 'border-red-400' : 'border-[#D0D5DD]'} bg-white px-4 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-colors`
}
