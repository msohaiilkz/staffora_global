import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import ProblemSection from '../components/sections/ProblemSection'
import DifferenceSection from '../components/sections/DifferenceSection'
import ServicesPreview from '../components/sections/ServicesPreview'
import ProcessSection from '../components/sections/ProcessSection'
import EmployerCandidateSplit from '../components/sections/EmployerCandidateSplit'
import LeadMagnetSection from '../components/sections/LeadMagnetSection'
import FinalCTASection from '../components/sections/FinalCTASection'
import SEO from '../components/ui/SEO'

export default function HomePage() {
  return (
    <>
      <SEO
        canonical="/"
        description="Staffora Global helps growing businesses build stronger HR systems, hire smarter, improve performance, and retain the right talent longer."
      />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <DifferenceSection />
      <ServicesPreview />
      <ProcessSection />
      <EmployerCandidateSplit />
      <LeadMagnetSection />
      <FinalCTASection />
    </>
  )
}
