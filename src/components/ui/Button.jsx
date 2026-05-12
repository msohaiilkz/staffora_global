import { cn } from '../../lib/utils'

const variants = {
  primary:   'bg-[#10B981] text-white hover:bg-[#059669] shadow-sm hover:shadow-md hover:-translate-y-0.5',
  secondary: 'bg-[#101828] text-white hover:bg-[#1D2939] shadow-sm hover:shadow-md hover:-translate-y-0.5',
  outline:   'border border-[#EAECF0] text-[#101828] bg-white hover:border-[#10B981] hover:text-[#10B981] hover:-translate-y-0.5',
  ghost:     'text-[#10B981] hover:bg-[#ECFDF5]',
  white:     'bg-white text-[#101828] hover:bg-[#F8FAFC] shadow-sm hover:shadow-md hover:-translate-y-0.5',
}

const sizes = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-5 py-2.5 text-sm',
  lg:  'px-7 py-3.5 text-base',
  xl:  'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  icon,
  iconRight,
  ...props
}) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all duration-200 cursor-pointer select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#10B981] focus-visible:outline-offset-2',
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <a href={href} className={base}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
        {iconRight && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">{iconRight}</span>}
      </a>
    )
  }

  return (
    <button className={cn(base, 'group')} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">{iconRight}</span>}
    </button>
  )
}
