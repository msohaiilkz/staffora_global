import { cn } from '../../lib/utils'

const variants = {
  emerald: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
  navy:    'bg-[#101828] text-white',
  gold:    'bg-[#FEF9C3] text-[#854D0E] border border-[#FDE68A]',
  muted:   'bg-[#F8FAFC] text-[#667085] border border-[#EAECF0]',
}

export default function Badge({ children, variant = 'emerald', className }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
