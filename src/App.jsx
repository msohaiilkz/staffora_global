import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

const HomePage            = lazy(() => import('./pages/HomePage'))
const AboutPage           = lazy(() => import('./pages/AboutPage'))
const ServicesLandingPage = lazy(() => import('./pages/ServicesLandingPage'))
const ServiceDetailPage   = lazy(() => import('./pages/ServiceDetailPage'))
const IndustriesPage      = lazy(() => import('./pages/IndustriesPage'))
const JobsPage            = lazy(() => import('./pages/JobsPage'))
const JobDetailPage       = lazy(() => import('./pages/JobDetailPage'))
const ResourcesPage       = lazy(() => import('./pages/ResourcesPage'))
const ResourceDetailPage  = lazy(() => import('./pages/ResourceDetailPage'))
const ContactPage         = lazy(() => import('./pages/ContactPage'))
const HRHealthCheckPage   = lazy(() => import('./pages/HRHealthCheckPage'))
const HiringReadinessPage = lazy(() => import('./pages/HiringReadinessPage'))
const ThankYouPage        = lazy(() => import('./pages/ThankYouPage'))
const PrivacyPolicyPage   = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfUsePage      = lazy(() => import('./pages/TermsOfUsePage'))
const NotFoundPage        = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#EAECF0] border-t-[#10B981] rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/"                              element={<HomePage />} />
            <Route path="/about"                         element={<AboutPage />} />
            <Route path="/services"                      element={<ServicesLandingPage />} />
            <Route path="/services/:slug"                element={<ServiceDetailPage />} />
            <Route path="/industries"                    element={<IndustriesPage />} />
            <Route path="/jobs"                          element={<JobsPage />} />
            <Route path="/jobs/:slug"                    element={<JobDetailPage />} />
            <Route path="/resources"                     element={<ResourcesPage />} />
            <Route path="/resources/:slug"               element={<ResourceDetailPage />} />
            <Route path="/contact"                       element={<ContactPage />} />
            <Route path="/hr-health-check"               element={<HRHealthCheckPage />} />
            <Route path="/hiring-readiness-checklist"    element={<HiringReadinessPage />} />
            <Route path="/thank-you"                     element={<ThankYouPage />} />
            <Route path="/privacy-policy"                element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use"                  element={<TermsOfUsePage />} />
            <Route path="*"                              element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
