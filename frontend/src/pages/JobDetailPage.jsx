import SEO from '../components/ui/SEO'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { submitApplication } from '../lib/api'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, Briefcase, Clock, CheckCircle2, DollarSign } from 'lucide-react'
import { jobsData } from '../data/jobs'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

export default function JobDetailPage() {
  const { slug } = useParams()
  const job = jobsData.find(j => j.slug === slug)

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-[#101828]">Role not found</h1>
        <Button variant="primary" href="/jobs">Back to Jobs</Button>
      </div>
    )
  }

  const { ref, isVisible } = useScrollAnimation(0.05)

  return (
    <>
      <SEO
        title={job.title}
        description={`${job.title} at ${job.company}. ${job.location} · ${job.type} · ${job.salary}. ${job.summary}`}
        canonical={`/jobs/${job.slug}`}
      />
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#ECFDF5]/50 blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-16 md:pb-20">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-7 text-xs text-[#667085]"
          >
            <Link to="/jobs" className="hover:text-[#10B981] transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Jobs
            </Link>
            <span>/</span>
            <span className="text-[#101828] font-medium">{job.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.featured && <Badge variant="emerald">Featured</Badge>}
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.type === 'Contract' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>{job.type}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F8FAFC] text-[#667085]">{job.level}</span>
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.06 }}
                className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight mb-3"
              >
                {job.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
                className="text-base text-[#667085] mb-5"
              >
                {job.company}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
                className="flex flex-wrap gap-4 text-sm text-[#667085]"
              >
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#10B981]" />{job.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-[#10B981]" />{job.sector}</span>
                <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-[#10B981]" />{job.salary}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#10B981]" />Closes {new Date(job.closes).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </motion.div>
            </div>

            {/* Apply sidebar CTA (visible on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.18 }}
              className="hidden lg:block"
            >
              <ApplyCard job={job} />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      {/* Content */}
      <SectionWrapper bg="warm-white">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <ContentBlock title="About This Role" isVisible={isVisible} delay={0}>
              <p className="text-sm text-[#344054] leading-relaxed">{job.summary}</p>
            </ContentBlock>

            {/* Responsibilities */}
            <ContentBlock title="Key Responsibilities" isVisible={isVisible} delay={0.08}>
              <ul className="space-y-2.5">
                {job.responsibilities.map(r => (
                  <li key={r} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#344054] leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            </ContentBlock>

            {/* Requirements */}
            <ContentBlock title="Requirements" isVisible={isVisible} delay={0.12}>
              <ul className="space-y-2.5">
                {job.requirements.map(r => (
                  <li key={r} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 mt-1.5" />
                    <span className="text-sm text-[#344054] leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            </ContentBlock>

            {/* Benefits */}
            <ContentBlock title="What's on Offer" isVisible={isVisible} delay={0.16}>
              <ul className="space-y-2.5">
                {job.benefits.map(b => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#344054] leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </ContentBlock>

            {/* Mobile apply CTA */}
            <div className="lg:hidden">
              <ApplyCard job={job} />
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block space-y-5 lg:sticky lg:top-24"
          >
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Role Details</p>
              <div className="space-y-3 text-sm">
                <Row label="Location" value={job.location} />
                <Row label="Sector" value={job.sector} />
                <Row label="Type" value={job.type} />
                <Row label="Level" value={job.level} />
                <Row label="Salary" value={job.salary} />
                <Row label="Closes" value={new Date(job.closes).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
              </div>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl border border-[#EAECF0] p-5">
              <p className="text-sm font-bold text-[#101828] mb-2">Looking for a different role?</p>
              <p className="text-xs text-[#667085] mb-3">Browse all open positions or send us your CV directly.</p>
              <Link to="/jobs" className="text-xs font-semibold text-[#10B981] hover:underline flex items-center gap-1">
                View all roles <ArrowRight size={11} />
              </Link>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  )
}

function ApplyCard({ job }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', cv: null, message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('jobTitle', job.title)
      fd.append('jobSlug', job.slug)
      fd.append('coverNote', form.message)
      if (form.cv) fd.append('cv', form.cv)
      await submitApplication(fd)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message)
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#ECFDF5] rounded-2xl border border-[#10B981]/20 p-6 text-center">
        <CheckCircle2 size={32} className="text-[#10B981] mx-auto mb-3" />
        <h3 className="font-bold text-[#101828] mb-2">Application Received</h3>
        <p className="text-sm text-[#667085]">Thank you for applying. A member of our team will be in touch if your profile is a match.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_2px_12px_0_rgba(16,24,40,0.05)]">
      <h3 className="font-bold text-[#101828] mb-1">Apply for this role</h3>
      <p className="text-xs text-[#667085] mb-5">Closes {new Date(job.closes).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text" placeholder="Full name *" required
          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full rounded-xl border border-[#D0D5DD] px-3.5 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
        />
        <input
          type="email" placeholder="Email address *" required
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border border-[#D0D5DD] px-3.5 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
        />
        <input
          type="tel" placeholder="Phone number (optional)"
          value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-xl border border-[#D0D5DD] px-3.5 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
        />
        <div>
          <label className="block text-xs text-[#667085] mb-1.5">CV / Resume</label>
          <input
            type="file" accept=".pdf,.doc,.docx"
            onChange={e => setForm(f => ({ ...f, cv: e.target.files[0] }))}
            className="w-full text-xs text-[#344054] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#ECFDF5] file:text-[#065F46] file:font-medium file:text-xs hover:file:bg-[#D1FAE5] cursor-pointer"
          />
        </div>
        <textarea
          rows={3} placeholder="Brief cover note (optional)"
          value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl border border-[#D0D5DD] px-3.5 py-2.5 text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] resize-none"
        />
        {submitError && <p className="text-xs text-red-500">{submitError}</p>}
        <button
          type="submit" disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm rounded-xl px-5 py-3 transition-colors duration-200 disabled:opacity-60"
        >
          {submitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</> : <>Submit Application <ArrowRight size={14} /></>}
        </button>
      </form>
    </div>
  )
}

function ContentBlock({ title, children, isVisible, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_2px_10px_0_rgba(16,24,40,0.04)]"
    >
      <h2 className="text-base font-bold text-[#101828] mb-4">{title}</h2>
      {children}
    </motion.div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-[#667085]">{label}</span>
      <span className="text-[#344054] font-medium text-right">{value}</span>
    </div>
  )
}
