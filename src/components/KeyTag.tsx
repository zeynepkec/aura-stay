import type { ReactNode } from 'react'

// Eski otel anahtarlarındaki gibi bir anahtar etiketi.
// Uygulamanın "imzası": oda numarası her zaman bu etiketin üzerinde durur.
type Props = {
  children: ReactNode       // etiketin üstündeki büyük yazı (oda numarası)
  caption?: ReactNode       // altındaki küçük yazı (otel adı, tarih)
  size?: 'md' | 'lg'
  hole?: string            // deliğin rengi = etiketin durduğu zeminin rengi
}

export default function KeyTag({ children, caption, size = 'lg', hole = 'bg-background' }: Props) {
  const big = size === 'lg'
  return (
    <div
      className={`relative flex items-center bg-primary text-card ${
        big ? 'h-[104px] rounded-l-[52px] rounded-r-card pl-[76px] pr-6' : 'h-16 rounded-l-[32px] rounded-r-xl pl-12 pr-4'
      }`}
    >
      {/* Anahtar halkasının geçtiği delik */}
      <span
        aria-hidden
        className={`absolute top-1/2 -translate-y-1/2 rounded-full ring-[3px] ring-card/25 ${hole} ${
          big ? 'left-6 h-7 w-7' : 'left-4 h-4 w-4'
        }`}
      />
      <div className="min-w-0">
        <p className={`font-bold leading-none tabular-nums ${big ? 'text-[52px] tracking-tight' : 'text-2xl'}`}>{children}</p>
        {caption && <p className={`text-card/75 ${big ? 'mt-2 text-sm' : 'mt-1 text-xs'}`}>{caption}</p>}
      </div>
    </div>
  )
}
