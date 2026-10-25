import { Sparkles, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { sampleReviews } from '../data/reviews'
import { useShared } from '../lib/shared'
import { detectTopics, summarize } from '../lib/reviewSummary'
import type { Review } from '../store/FeedbackContext'
import '../translations/reviewSummary'

// "a, b ve c" biçiminde birleştir
const joinList = (items: string[], and: string) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`

// Örnek yorumlar + bu oteldeki misafirlerin değerlendirmelerinden kısa özet
export default function ReviewSummary({ showSamples = false }: { showSamples?: boolean }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const [guestReviews] = useShared<Review[]>('aura-reviews', [])

  const all = [
    ...sampleReviews.map((r) => ({ rating: r.rating, topics: r.topics })),
    ...guestReviews.map((r) => ({
      rating: Math.round((r.cleanliness + r.comfort + r.service) / 3),
      topics: detectTopics(r.comment ?? ''),
    })),
  ]
  const summary = summarize(all, lang)
  const and = t('reviewSummary.and')

  return (
    <div className="space-y-3">
      {/* Özet kartı — lila-pembe geçiş */}
      <section className="rounded-card bg-gradient-to-br from-discover to-discover-pink p-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-sm font-bold">
            <Sparkles size={16} />
            {t('reviewSummary.title')}
          </p>
          <p className="flex items-center gap-1 text-sm font-bold">
            <Star size={15} className="fill-ink" />
            {summary.average.toFixed(1)}
            <span className="font-medium text-ink/60">· {t('reviewSummary.count', { count: summary.count })}</span>
          </p>
        </div>
        {summary.praise.length > 0 && <p className="mt-3 text-sm">{t('reviewSummary.praise', { list: joinList(summary.praise, and) })}</p>}
        {summary.complain.length > 0 && <p className="mt-1 text-sm">{t('reviewSummary.complain', { list: joinList(summary.complain, and) })}</p>}
        <p className="mt-3 text-[11px] text-ink/60">{t('reviewSummary.note')}</p>
      </section>

      {/* Örnek yorumlar */}
      {showSamples && (
        <>
          <h3 className="pt-2 text-sm font-bold">{t('reviewSummary.guests_say')}</h3>
          <ul className="space-y-2.5">
            {sampleReviews.slice(0, 4).map((r) => (
              <li key={r.id} className="rounded-card border border-line bg-card p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {r.country} {r.name}
                  </p>
                  <span className="flex">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={13} className={n <= r.rating ? 'fill-accent text-accent' : 'text-line'} />
                    ))}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-ink/80">{r.text}</p>
                <p className="mt-1.5 text-[11px] text-muted">{t('reviewSummary.sample')} · {r.date}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
