import { useState } from 'react'
import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StaffTitle from './StaffTitle'
import ReviewSummary from '../components/ReviewSummary'
import { useShared } from '../lib/shared'
import type { Feedback, FeedbackStatus, Review } from '../store/FeedbackContext'
import '../translations/reception'
import '../translations/review'

const criteria = ['cleanliness', 'comfort', 'service'] as const

// Küçük yıldız gösterimi: ★★★★☆
function Stars({ value }: { value: number }) {
  return (
    <span className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={14} className={n <= Math.round(value) ? 'fill-accent text-accent' : 'text-line'} />
      ))}
    </span>
  )
}

export default function StaffFeedback() {
  const { t, i18n } = useTranslation()
  const [feedback, setFeedback] = useShared<Feedback[]>('aura-feedback', [])
  const [reviews] = useShared<Review[]>('aura-reviews', [])
  const [view, setView] = useState<'open' | 'resolved'>('open')

  const inView = (f: Feedback, v: 'open' | 'resolved') =>
    Boolean(f.room) && (v === 'resolved' ? f.status === 'resolved' : f.status !== 'resolved')

  const list = feedback.filter((f) => inView(f, view)).sort((a, b) => b.createdAt - a.createdAt)

  const setStatus = (id: string, status: FeedbackStatus) =>
    setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)))

  // Ortalama puanlar
  const avg = (key: (typeof criteria)[number]) =>
    reviews.length ? reviews.reduce((sum, r) => sum + r[key], 0) / reviews.length : 0
  const overall = reviews.length ? criteria.reduce((sum, c) => sum + avg(c), 0) / criteria.length : 0

  const time = (ms: number) =>
    new Date(ms).toLocaleString(i18n.resolvedLanguage, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

  return (
    <div>
      <StaffTitle line="concierge" title={t('feedback.title')} subtitle={t('feedback.subtitle')} />

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        {/* Sol: misafir mesajları */}
        <section>
          <div className="mb-4 flex gap-2">
            {(['open', 'resolved'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`flex h-9 items-center gap-2 rounded-[10px] px-4 text-base font-bold font-display ${view === v ? 'bg-primary text-card' : 'border border-line bg-card'}`}
              >
                {t(`feedback.views.${v}`)}
                <span className={`rounded-md px-1.5 text-xs ${view === v ? 'bg-card/20' : 'bg-background'}`}>
                  {feedback.filter((f) => inView(f, v)).length}
                </span>
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <p className="rounded-card border border-dashed border-line p-10 text-center text-sm text-muted">{t('feedback.empty')}</p>
          ) : (
            <div className="space-y-3">
              {list.map((f) => (
                <article
                  key={f.id}
                  className={`rounded-card border bg-card p-4 ${f.status === 'new' ? 'border-primary ring-2 ring-primary-soft' : 'border-line'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-xl font-extrabold">
                      {t('feedback.room', { number: f.room })}
                      <span className="ml-2 rounded-md bg-background px-2 py-0.5 text-xs font-medium text-muted">
                        {t(`review.feedback.categories.${f.category}`)}
                      </span>
                    </p>
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                        f.status === 'resolved' ? 'bg-service' : f.status === 'seen' ? 'bg-accent/15 text-accent' : 'bg-activity'
                      }`}
                    >
                      {t(`feedback.status.${f.status}`)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{f.message}</p>
                  <p className="mt-1 text-xs text-muted">{time(f.createdAt)}</p>

                  {f.status !== 'resolved' && (
                    <div className="mt-4 flex gap-2">
                      {f.status === 'new' && (
                        <button
                          type="button"
                          onClick={() => setStatus(f.id, 'seen')}
                          className="h-10 flex-1 rounded-[10px] border border-line text-base font-bold font-display"
                        >
                          {t('feedback.mark_seen')}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setStatus(f.id, 'resolved')}
                        className="h-10 flex-1 rounded-[10px] bg-ink text-base font-bold text-card font-display"
                      >
                        {t('feedback.mark_resolved')}
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Sağ: oda değerlendirmeleri */}
        <section>
          <h2 className="mb-4 text-xl">{t('feedback.reviews')}</h2>

          {/* AI yorum özeti (askHermis) */}
          <div className="mb-4">
            <ReviewSummary />
          </div>

          {/* Ortalama puan kartı — lila-pembe geçiş */}
          <div className="mb-4 rounded-card p-5 bg-discover">
            <p className="text-sm text-ink/70">{t('feedback.average')}</p>
            <p className="mt-1 text-4xl font-bold">{reviews.length ? overall.toFixed(1) : '—'}</p>
            <p className="text-xs text-ink/60">{t('feedback.count', { count: reviews.length })}</p>
            <div className="mt-4 space-y-1.5">
              {criteria.map((c) => (
                <div key={c} className="flex items-center justify-between rounded-xl bg-card/60 px-3 py-1.5 text-sm">
                  <span>{t(`feedback.criteria.${c}`)}</span>
                  <span className="flex items-center gap-2 font-semibold">
                    <Stars value={avg(c)} />
                    {reviews.length ? avg(c).toFixed(1) : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {reviews.length === 0 ? (
            <p className="rounded-card border border-dashed border-line p-6 text-center text-sm text-muted">{t('feedback.no_reviews')}</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <article key={r.room} className="rounded-card border border-line bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xl font-extrabold">{t('feedback.room', { number: r.room })}</p>
                    <span className="text-xs text-muted">{time(r.createdAt)}</span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    {criteria.map((c) => (
                      <div key={c} className="flex items-center justify-between">
                        <span className="text-muted">{t(`feedback.criteria.${c}`)}</span>
                        <Stars value={r[c]} />
                      </div>
                    ))}
                  </div>
                  {r.comment && <p className="mt-3 rounded-xl bg-background p-3 text-sm italic">“{r.comment}”</p>}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}