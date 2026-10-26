import type { ReactNode } from 'react'
import LineBadge, { type Line } from '../components/LineBadge'

// Personel ekranlarının başlığı: hat rozeti + tabela yazısı
export default function StaffTitle({ line, label, title, subtitle, children }: { line: Line; label?: string; title: string; subtitle: string; children?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-5">
      <div className="flex items-center gap-3">
        <LineBadge line={line} label={label} size="lg" />
        <div>
          <h1 className="text-[32px] leading-none">{title}</h1>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </header>
  )
}
