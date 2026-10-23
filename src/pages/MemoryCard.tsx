import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { menuItems, pick } from '../data/menu'
import { stay } from '../data/stay'
import { useFeedback } from '../store/FeedbackContext'
import { useStay } from '../store/StayContext'
import '../translations/memory'
import '../translations/stay'

export default function MemoryCard() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { orders } = useStay()
  const { review } = useFeedback()
  const cardRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  // Kartta gösterilecek bilgiler
  const nights = Math.round((stay.checkOut - stay.checkIn) / (24 * 60 * 60 * 1000))
  const date = (ms: number) => new Date(ms).toLocaleDateString(lang, { day: 'numeric', month: 'short' })

  // Favori lezzet: en çok sipariş edilen ürün
  const counts: Record<string, number> = {}
  orders.forEach((o) => o.lines.forEach((l) => (counts[l.id] = (counts[l.id] ?? 0) + l.quantity)))
  const favoriteId = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]
  const favorite = menuItems.find((m) => m.id === favoriteId)

  const rating = review ? ((review.cleanliness + review.comfort + review.service) / 3).toFixed(1) : null
  const quote = review?.comment || t('memory.default_quote')

  // Kartı PNG resmine çevir
  const makeImage = () => toPng(cardRef.current!, { pixelRatio: 2, cacheBust: true })

  const download = (url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = 'aura-stay-memory.png'
    link.click()
  }

  const onDownload = async () => {
    setBusy(true)
    try {
      download(await makeImage())
    } finally {
      setBusy(false)
    }
  }

  // Telefonda paylaşım menüsünü aç, desteklenmiyorsa indir
  const onShare = async () => {
    setBusy(true)
    try {
      const url = await makeImage()
      const blob = await (await fetch(url)).blob()
      const file = new File([blob], 'aura-stay-memory.png', { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'AURA Stay', text: t('memory.share_text') })
      } else {
        download(url)
      }
    } catch {
      // Kullanıcı paylaşımı iptal ettiyse bir şey yapma
    } finally {
      setBusy(false)
    }
  }

  const stat = (value: string, label: string) => (
    <div className="rounded-2xl bg-card/60 p-3">
      <p className="truncate text-lg font-bold">{value}</p>
      <p className="text-[11px] text-ink/60">{label}</p>
    </div>
  )

  return (
    <div>
      <Link to="/stay" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-sm text-muted">
        <ArrowLeft size={18} />
        {t('stay.title')}
      </Link>

      <header className="px-5 pb-4 pt-2">
        <h1 className="text-3xl font-bold">{t('memory.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('memory.subtitle')}</p>
      </header>

      <div className="px-5">
        {/* Anı kartı — resme çevrilen kısım */}
        <div ref={cardRef} className="relative overflow-hidden rounded-card bg-gradient-to-br from-discover to-discover-pink p-6">
          <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-card/25" />
          <span className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-accent/25" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">AURA Stay</p>
            <h2 className="mt-8 text-3xl font-bold leading-tight">{t('memory.memories_from')}</h2>
            <p className="mt-1 text-sm text-ink/70">
              {stay.hotelName} · {date(stay.checkIn)} – {date(stay.checkOut)}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {stat(String(nights), t('memory.nights'))}
              {stat(String(orders.length), t('memory.orders'))}
              {stat(favorite ? pick(favorite.name, lang) : '—', t('memory.favorite'))}
              {stat(rating ? `${rating} ★` : '—', t('memory.rating'))}
            </div>

            <p className="mt-6 text-base font-medium italic leading-relaxed">“{quote}”</p>
            <p className="mt-6 text-xs text-ink/60">{t('stay.room', { number: stay.roomNumber })}</p>
          </div>
        </div>

        {/* Butonlar */}
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={onShare}
            disabled={busy}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-card disabled:opacity-50"
          >
            <Share2 size={18} />
            {busy ? t('memory.preparing') : t('memory.share')}
          </button>
          <button
            type="button"
            onClick={onDownload}
            disabled={busy}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-card text-sm font-semibold disabled:opacity-50"
          >
            <Download size={18} />
            {t('memory.download')}
          </button>
        </div>
      </div>
    </div>
  )
}