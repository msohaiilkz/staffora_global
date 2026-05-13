import SEO from '../components/ui/SEO'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { resourcesData } from '../data/resources'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Button from '../components/ui/Button'
import SectionWrapper from '../components/ui/SectionWrapper'

export default function ResourceDetailPage() {
  const { slug } = useParams()
  const resource = resourcesData.find(r => r.slug === slug)

  if (!resource) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-[#101828]">Article not found</h1>
        <Button variant="primary" href="/resources">Back to Resources</Button>
      </div>
    )
  }

  const related = resourcesData.filter(r => r.slug !== slug && r.category === resource.category).slice(0, 2)
  const { ref, isVisible } = useScrollAnimation(0.05)

  return (
    <>
      <SEO
        title={resource.title}
        description={resource.excerpt}
        canonical={`/resources/${resource.slug}`}
        type="article"
      />
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#ECFDF5]/50 blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-16 md:pb-20">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-7 text-xs text-[#667085]"
          >
            <Link to="/resources" className="hover:text-[#10B981] transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Resources
            </Link>
            <span>/</span>
            <span className="text-[#101828] font-medium truncate max-w-[200px]">{resource.category}</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#065F46]">{resource.category}</span>
              <span className="flex items-center gap-1 text-xs text-[#667085]"><Clock size={10} />{resource.readTime}</span>
              <span className="text-xs text-[#98A2B3]">{new Date(resource.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#101828] leading-[1.15] tracking-tight mb-5"
            >
              {resource.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base sm:text-lg text-[#667085] leading-relaxed"
            >
              {resource.excerpt}
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      {/* Article body */}
      <SectionWrapper bg="warm-white">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}
            className="lg:col-span-2 bg-white rounded-3xl border border-[#EAECF0] p-8 md:p-10 shadow-[0_2px_12px_0_rgba(16,24,40,0.05)]"
          >
            <div className="prose prose-sm max-w-none">
              {resource.body.map((block, i) => {
                if (block.type === 'h2') return (
                  <h2 key={i} className="text-xl font-extrabold text-[#101828] mt-8 mb-3 leading-snug">{block.content}</h2>
                )
                if (block.type === 'p') return (
                  <p key={i} className="text-sm text-[#344054] leading-relaxed mb-4">{block.content}</p>
                )
                return null
              })}
            </div>

            {/* CTA within article */}
            <div className="mt-10 pt-8 border-t border-[#EAECF0]">
              <p className="text-sm font-bold text-[#101828] mb-2">Ready to improve your HR systems?</p>
              <p className="text-sm text-[#667085] mb-5">Staffora can help you implement what you have read about here. Get a free consultation to understand the right next step.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="md" href="/contact" iconRight={<ArrowRight size={14} />}>
                  Talk to Staffora
                </Button>
                <Button variant="outline" size="md" href="/hr-health-check">
                  Take HR Health Check
                </Button>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 lg:sticky lg:top-24"
          >
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Need help with this?</p>
              <p className="text-sm text-[#344054] leading-relaxed mb-4">Staffora can assess your current situation and recommend the right service for your business.</p>
              <Button variant="primary" size="sm" href="/hr-health-check" iconRight={<ArrowRight size={13} />} className="w-full justify-center">
                Free HR Health Check
              </Button>
            </div>

            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#EAECF0] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-4">Related Articles</p>
                <div className="space-y-4">
                  {related.map(r => (
                    <Link key={r.slug} to={`/resources/${r.slug}`}
                      className="block group"
                    >
                      <p className="text-sm font-medium text-[#344054] group-hover:text-[#10B981] transition-colors leading-snug mb-1">{r.title}</p>
                      <span className="text-xs text-[#667085] flex items-center gap-1"><Clock size={10} />{r.readTime}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#F8FAFC] rounded-2xl border border-[#EAECF0] p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#667085] mb-3">Browse all resources</p>
              <Link to="/resources" className="text-sm text-[#10B981] font-semibold hover:underline flex items-center gap-1">
                View all articles <ArrowRight size={12} />
              </Link>
            </div>
          </motion.aside>
        </div>
      </SectionWrapper>
    </>
  )
}
