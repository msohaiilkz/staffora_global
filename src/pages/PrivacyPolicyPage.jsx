import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import SectionWrapper from '../components/ui/SectionWrapper'

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us, such as when you fill out a contact form, submit a job application, or take the HR Health Check. This may include your name, email address, company name, and any details you provide in your messages. We also collect information automatically when you visit our website, including your IP address, browser type, and pages visited.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to respond to your inquiries, process job applications, deliver our services, and improve our website and offerings. We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our website and services, subject to confidentiality agreements.',
  },
  {
    title: '3. Data Retention',
    body: 'We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Candidate information submitted via job applications is retained for a period of 12 months unless you request earlier deletion. You may contact us at any time to request deletion of your information.',
  },
  {
    title: '4. Cookies',
    body: 'Our website uses cookies to improve your browsing experience. Cookies are small text files placed on your device that help us understand how visitors use our site. You can control cookie settings through your browser preferences. Disabling cookies may affect some functionality of the site.',
  },
  {
    title: '5. Your Rights',
    body: 'You have the right to access, correct, or delete personal information we hold about you. You also have the right to object to processing or request that we restrict processing of your data in certain circumstances. To exercise any of these rights, please contact us at info@stafforaglobal.com.',
  },
  {
    title: '6. Security',
    body: 'We take reasonable measures to protect your personal information from unauthorised access, use, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
  },
  {
    title: '7. Third-Party Links',
    body: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies before providing any personal information.',
  },
  {
    title: '8. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will post any changes on this page with an updated revision date. Your continued use of our website after changes are posted constitutes your acceptance of the revised policy.',
  },
  {
    title: '9. Contact Us',
    body: 'If you have any questions about this Privacy Policy or our data practices, please contact us at info@stafforaglobal.com.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO title="Privacy Policy" description="Staffora Global Privacy Policy — how we collect, use, and protect your personal information." canonical="/privacy-policy" />
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
              Privacy Policy
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
              Staffora Global is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you interact with our website and services. By using our website, you agree to the practices described in this policy.
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
