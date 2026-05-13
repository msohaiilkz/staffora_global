export const services = [
  { label: 'HR Diagnostic and Setup',           href: '/services/hr-diagnostic-and-setup' },
  { label: 'Recruitment and Onboarding',         href: '/services/recruitment-and-onboarding' },
  { label: 'HR Outsourcing',                     href: '/services/hr-outsourcing' },
  { label: 'Talent Management',                  href: '/services/talent-management' },
  { label: 'Performance Management',             href: '/services/performance-management' },
  { label: 'Employee Engagement and Retention',  href: '/services/employee-engagement-and-retention' },
  { label: 'HR Analytics and Reporting',         href: '/services/hr-analytics-and-reporting' },
  { label: 'Background Verification',            href: '/services/background-verification' },
]

export const industries = [
  { label: 'SMEs and Founder-Led Businesses', href: '/industries/smes-and-founder-led' },
  { label: 'Corporates',                      href: '/industries/corporates' },
  { label: 'Hospitality and Retail',          href: '/industries/hospitality-and-retail' },
  { label: 'Energy and Industrial',           href: '/industries/energy-and-industrial' },
  { label: 'Professional Services',           href: '/industries/professional-services' },
  { label: 'Startups and Growth Companies',   href: '/industries/startups-and-growth' },
]

export const mainNav = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Services',   href: '/services',    dropdown: services },
  { label: 'Industries', href: '/industries',  dropdown: industries },
  { label: 'Jobs',       href: '/jobs' },
  { label: 'Resources',  href: '/resources' },
  { label: 'Contact',    href: '/contact' },
]
