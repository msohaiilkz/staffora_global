import SEO from '../components/ui/SEO'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Search, MapPin, Briefcase, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { jobsData } from '../data/jobs'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

const sectors = ['All Sectors', ...Array.from(new Set(jobsData.map(j => j.sector)))]
const types = ['All Types', 'Full-time', 'Contract', 'Part-time']
const levels = ['All Levels', 'Entry/Mid', 'Mid-level', 'Senior']

function JobCard({ job, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/jobs/${job.slug}`}
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-2xl border border-[#EAECF0] p-5 sm:p-6 hover:shadow-[0_6px_24px_0_rgba(16,24,40,0.08)] hover:-translate-y-0.5 hover:border-transparent transition-all duration-300"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {job.featured && <span className="text-[10px] font-bold uppercase tracking-widest bg-[#ECFDF5] text-[#065F46] px-2 py-0.5 rounded-full">Featured</span>}
            <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
              job.type === 'Contract' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
            }`}>{job.type}</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest bg-[#F8FAFC] text-[#667085] px-2 py-0.5 rounded-full">{job.level}</span>
          </div>
          <h3 className="text-base font-bold text-[#101828] group-hover:text-[#10B981] transition-colors mb-1 truncate">{job.title}</h3>
          <p className="text-sm text-[#667085] mb-2 truncate">{job.company}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#667085]">
            <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
            <span className="flex items-center gap-1"><Briefcase size={11} />{job.sector}</span>
            <span className="flex items-center gap-1"><Clock size={11} />Closes {new Date(job.closes).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0 w-full sm:w-auto">
          <p className="text-xs font-semibold text-[#344054] text-right">{job.salary}</p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] group-hover:gap-2 transition-all duration-200 whitespace-nowrap">
            View Role <ArrowRight size={11} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function JobsPage() {
  const { ref: heroRef } = useScrollAnimation(0.05)
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation(0.05)

  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('All Sectors')
  const [type, setType] = useState('All Types')
  const [level, setLevel] = useState('All Levels')

  const filtered = useMemo(() => {
    return jobsData.filter(j => {
      const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.location.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
      const matchSector = sector === 'All Sectors' || j.sector === sector
      const matchType = type === 'All Types' || j.type === type
      const matchLevel = level === 'All Levels' || j.level === level
      return matchSearch && matchSector && matchType && matchLevel
    })
  }, [search, sector, type, level])

  const featured = filtered.filter(j => j.featured)
  const regular = filtered.filter(j => !j.featured)

  return (
    <>
      <SEO
        title="Jobs"
        description="Browse open HR and people operations roles placed by Staffora Global across Nigeria and Africa. Find your next career opportunity today."
        canonical="/jobs"
      />
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/50 blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="max-w-3xl" ref={heroRef}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="emerald" className="mb-5">Open Roles</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-extrabold text-[#101828] leading-[1.1] tracking-tight mb-5"
            >
              Find your next career move.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base sm:text-lg text-[#667085] leading-relaxed mb-8 max-w-2xl"
            >
              Staffora matches talented professionals with businesses that are serious about their people. Browse current openings below.
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
              className="relative"
            >
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
              <input
                type="text"
                placeholder="Search by title, location, or company…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-[#EAECF0] bg-white text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] shadow-[0_2px_8px_0_rgba(16,24,40,0.05)] transition-all"
              />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      <SectionWrapper bg="warm-white">
        <div ref={listRef}>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <FilterSelect value={sector} onChange={setSector} options={sectors} />
            <FilterSelect value={type} onChange={setType} options={types} />
            <FilterSelect value={level} onChange={setLevel} options={levels} />
            <span className="ml-auto text-sm text-[#667085] self-center">{filtered.length} role{filtered.length !== 1 ? 's' : ''} found</span>
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={listVisible ? { opacity: 1 } : {}}
              className="text-center py-16 bg-white rounded-2xl border border-[#EAECF0]"
            >
              <p className="text-2xl mb-3">🔍</p>
              <h3 className="text-base font-bold text-[#101828] mb-2">No roles match your search</h3>
              <p className="text-sm text-[#667085] mb-5">Try adjusting your filters or search terms.</p>
              <button onClick={() => { setSearch(''); setSector('All Sectors'); setType('All Types'); setLevel('All Levels') }}
                className="text-sm text-[#10B981] font-semibold hover:underline">Clear all filters</button>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {featured.length > 0 && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-3">Featured</p>
                  {featured.map((job, i) => <JobCard key={job.slug} job={job} index={i} isVisible={listVisible} />)}
                  {regular.length > 0 && <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mt-6 mb-3">All Roles</p>}
                </>
              )}
              {regular.map((job, i) => <JobCard key={job.slug} job={job} index={featured.length + i} isVisible={listVisible} />)}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* Candidate CTA */}
      <SectionWrapper bg="white">
        <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-2">Don't see the right role?</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#101828] mb-2">Send us your CV anyway.</h3>
            <p className="text-[#667085] text-sm max-w-lg">
              Staffora is always building candidate pipelines for our employer clients. If you are open to new opportunities, share your profile and we will reach out when the right role comes up.
            </p>
          </div>
          <Button variant="primary" size="lg" href="mailto:talent@stafforaglobal.com" iconRight={<ArrowRight size={16} />} className="shrink-0 w-full md:w-auto justify-center">
            Send Your CV
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="text-sm border border-[#EAECF0] rounded-xl px-4 py-2 bg-white text-[#344054] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-colors cursor-pointer"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}
