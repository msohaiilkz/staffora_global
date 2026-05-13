import SEO from '../components/ui/SEO'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resourcesData } from '../data/resources'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

const categories = ['All', ...Array.from(new Set(resourcesData.map(r => r.category)))]

function ResourceCard({ resource, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/resources/${resource.slug}`}
        className="group flex flex-col h-full bg-white rounded-2xl border border-[#EAECF0] p-6 hover:shadow-[0_8px_28px_0_rgba(16,24,40,0.09)] hover:-translate-y-1.5 hover:border-transparent transition-all duration-300"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#065F46]">{resource.category}</span>
          <span className="flex items-center gap-1 text-xs text-[#667085]"><Clock size={10} />{resource.readTime}</span>
        </div>
        <h3 className="text-base font-bold text-[#101828] group-hover:text-[#10B981] transition-colors leading-snug mb-3 flex-1">{resource.title}</h3>
        <p className="text-sm text-[#667085] leading-relaxed mb-5 line-clamp-3">{resource.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#98A2B3]">{new Date(resource.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] group-hover:gap-2 transition-all duration-200">
            Read <ArrowRight size={11} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ResourcesPage() {
  const { ref, isVisible } = useScrollAnimation(0.05)
  const [active, setActive] = useState('All')

  const featured = resourcesData.filter(r => r.featured)
  const filtered = active === 'All'
    ? resourcesData.filter(r => !r.featured)
    : resourcesData.filter(r => r.category === active && !r.featured)
  const featuredFiltered = active === 'All' ? featured : featured.filter(r => r.category === active)
  const allFiltered = active === 'All' ? resourcesData : resourcesData.filter(r => r.category === active)

  return (
    <>
      <SEO
        title="HR Resources"
        description="Practical HR articles and guides for growing businesses. Learn how to build HR systems, hire better, manage performance, and retain your best people."
        canonical="/resources"
      />
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ECFDF5]/50 blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="emerald" className="mb-5">HR Resources</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-extrabold text-[#101828] leading-[1.1] tracking-tight mb-5"
            >
              Practical HR guidance for{' '}
              <span className="text-[#10B981]">growing businesses.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base sm:text-lg text-[#667085] leading-relaxed"
            >
              Actionable articles and guides to help you build stronger HR systems, hire better, and retain the right people.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      <SectionWrapper bg="warm-white">
        <div ref={ref}>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 ${
                  active === cat
                    ? 'bg-[#101828] text-white'
                    : 'bg-white border border-[#EAECF0] text-[#344054] hover:border-[#10B981] hover:text-[#10B981]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured row */}
          {featuredFiltered.length > 0 && (
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Featured</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {featuredFiltered.map((r, i) => (
                  <ResourceCard key={r.slug} resource={r} index={i} isVisible={isVisible} />
                ))}
              </div>
            </div>
          )}

          {/* All articles */}
          {filtered.length > 0 && (
            <>
              {featuredFiltered.length > 0 && <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">More Articles</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((r, i) => (
                  <ResourceCard key={r.slug} resource={r} index={i} isVisible={isVisible} />
                ))}
              </div>
            </>
          )}

          {allFiltered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#EAECF0]">
              <p className="text-sm text-[#667085]">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* Newsletter / CTA */}
      <SectionWrapper bg="white">
        <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-2">Go deeper</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#101828] mb-2">Start with a free HR Diagnostic.</h3>
            <p className="text-[#667085] text-sm max-w-lg">
              If reading these articles makes you wonder where your business actually stands, take the free HR Health Check for a personalised assessment.
            </p>
          </div>
          <Button variant="primary" size="lg" href="/hr-health-check" iconRight={<ArrowRight size={16} />} className="shrink-0 w-full md:w-auto justify-center">
            Take HR Health Check
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}
