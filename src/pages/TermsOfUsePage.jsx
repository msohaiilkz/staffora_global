import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using the Staffora Global website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.',
  },
  {
    title: '2. Use of Website',
    body: 'You may use this website for lawful purposes only. You agree not to use the site in any way that may damage, disable, or impair the site or interfere with any other party\'s use. You may not attempt to gain unauthorised access to any part of the website or its related systems.',
  },
  {
    title: '3. Intellectual Property',
    body: 'All content on this website, including text, graphics, logos, and images, is the property of Staffora Global and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this site without our prior written consent.',
  },
  {
    title: '4. Service Information',
    body: 'The information provided on this website about our services is for general informational purposes. While we strive to keep information current and accurate, we make no representations or warranties about the completeness or accuracy of any content. Service offerings, pricing, and availability may change without notice.',
  },
  {
    title: '5. Candidate and Employer Use',
    body: 'Employers using Staffora\'s recruitment services agree to provide accurate job information and to use candidate data responsibly and in compliance with applicable privacy and data protection laws. Candidates submitting applications consent to Staffora processing their information for recruitment purposes.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'To the fullest extent permitted by law, Staffora Global shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.',
  },
  {
    title: '7. Third-Party Services',
    body: 'Our website may link to third-party websites or services. Staffora Global is not responsible for the content, privacy practices, or availability of those services. Links to third-party sites do not constitute endorsement.',
  },
  {
    title: '8. Governing Law',
    body: 'These Terms of Use are governed by the laws of the Federal Republic of Nigeria. Any disputes arising under these terms shall be subject to the jurisdiction of the courts of Nigeria.',
  },
  {
    title: '9. Changes to Terms',
    body: 'We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated date. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.',
  },
  {
    title: '10. Contact',
    body: 'For any questions regarding these Terms of Use, please contact us at info@stafforaglobal.com.',
  },
]

export default function TermsOfUsePage() {
  return (
    <>
      <SEO title="Terms of Use" description="Staffora Global Terms of Use — the terms and conditions governing use of our website and services." canonical="/terms-of-use" />
      <section className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-20 md:pb-20">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="muted" className="mb-5">Legal</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#101828] leading-tight tracking-tight mb-4"
            >
              Terms of Use
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sm text-[#667085]"
            >
              Last updated: May 2025
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAECF0] to-transparent" />
      </section>

      <SectionWrapper bg="warm-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-[#EAECF0] p-7"
          >
            <p className="text-sm text-[#344054] leading-relaxed">
              Please read these Terms of Use carefully before using the Staffora Global website. These terms govern your access to and use of our website and services.
            </p>
          </motion.div>

          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 + i * 0.04 }}
              className="bg-white rounded-2xl border border-[#EAECF0] p-7"
            >
              <h2 className="text-base font-bold text-[#101828] mb-3">{s.title}</h2>
              <p className="text-sm text-[#344054] leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
