// Metro hattı rozeti: her hizmetin bir harfi ve rengi var (tabela gibi)
export type Line = 'food' | 'clean' | 'table' | 'route' | 'concierge' | 'stay'

export const LINES: Record<Line, { letter: string; className: string }> = {
  food: { letter: 'Y', className: 'bg-discover text-ink' },
  clean: { letter: 'T', className: 'bg-discover-pink text-ink' },
  table: { letter: 'M', className: 'bg-activity text-ink' },
  route: { letter: 'R', className: 'bg-service text-ink' },
  concierge: { letter: 'K', className: 'bg-primary text-card' },
  stay: { letter: 'O', className: 'bg-ink text-card' },
}

export default function LineBadge({ line, label, size = 'md' }: { line: Line; label?: string; size?: 'sm' | 'md' | 'lg' }) {
  const { letter, className } = LINES[line]
  const box = size === 'lg' ? 'h-10 min-w-10 text-[22px] rounded-lg' : size === 'sm' ? 'h-6 min-w-6 text-[15px] rounded-md' : 'h-9 min-w-9 text-[19px] rounded-lg'
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center px-1 font-display font-extrabold ${box} ${className}`}>
      {label ?? letter}
    </span>
  )
}
