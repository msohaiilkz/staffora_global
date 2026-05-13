import { cn } from '../../lib/utils'

export default function SectionWrapper({ children, className, id, bg }) {
  const bgMap = {
    white:      'bg-white',
    'warm-white': 'bg-[#F8FAFC]',
    navy:       'bg-[#101828]',
    'soft-green': 'bg-[#ECFDF5]',
    transparent: 'bg-transparent',
  }

  return (
    <section
      id={id}
      className={cn('w-full py-16 md:py-20 lg:py-24', bgMap[bg] ?? bgMap['warm-white'], className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
