// Hat rozeti: her hizmetin bir harfi var. askHermis kuralı: kategori karoları gri tonlu (tile-*), üzerinde kâğıt beyazı harf
export type Line = 'food' | 'clean' | 'table' | 'route' | 'concierge' | 'stay'

export const LINES: Record<Line, { letter: string; className: string }> = {
  food: { letter: 'Y', className: 'bg-tile-graphite text-card' },
  clean: { letter: 'T', className: 'bg-tile-stone text-card' },
  table: { letter: 'M', className: 'bg-tile-sand text-card' },
  route: { letter: 'R', className: 'bg-tile-silver text-card' },
  concierge: { letter: 'K', className: 'bg-tile-ink text-card' },
  stay: { letter: 'O', className: 'bg-tile-ink text-card' },
}

export default function LineBadge({ line, label, size = 'md' }: { line: Line; label?: string; size?: 'sm' | 'md' | 'lg' }) {
  const { letter, className } = LINES[line]
  const box = size === 'lg' ? 'h-10 min-w-10 text-[22px] rounded-[6px]' : size === 'sm' ? 'h-6 min-w-6 text-[13px] rounded-[6px]' : 'h-[30px] min-w-[30px] text-[15px] rounded-[6px]'
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center px-1 font-sans font-semibold ${box} ${className}`}>
      {label ?? letter}
    </span>
  )
}
