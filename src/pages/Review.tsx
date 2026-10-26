import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ReviewSummary from '../components/ReviewSummary'
import { useFeedback, type FeedbackCategory } from '../store/FeedbackContext'
import '../translations/review'
import '../translations/stay'

const criteria = ['cleanliness', 'comfort', 'service'] as const
const categories: FeedbackCategory[] = ['room', 'food', 'staff', 'other']

export default function Review() {
  const { t, i18n } = useTranslation()
  const { review, saveReview, feedbacks, sendFeedback } = useFeedback()

  // Değerlendirme formu (daha önce gönderildiyse o değerlerle başlar)
  const [scores, setScores] = useState({
    cleanliness: review?.cleanliness ?? 0,
    comfort: review?.comfort ?? 0,
    service: review?.service ?? 0,
  })
  const [comment, setComment] = useState(review?.comment ?? '')
  const [saved, setSaved] = useState(false)

  // Geri bildirim formu
  const [category, setCategory] = useState<FeedbackCategory>('room')
  const [message, setMessage] = useState('')

  const canSave = criteria.every((c) => scores[c] > 0)

  const submitReview = () => {
    saveReview({ ...scores, comment: comment.trim() })
    setSaved(true)
  }

  const submitFeedback = () => {
    if (!message.trim()) return
    sendFeedback(category, message.trim())
    setMessage('')
  }

  const time = (ms: number) => new Date(ms).toLocaleString(i18n.resolvedLanguage, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

  return (
    <div>
      <Link to="/stay" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-sm text-muted">
        <ArrowLeft size={18} />
        {t('stay.title')}
      </Link>

      <header className="px-5 pb-4 pt-2">
        <h1 className="text-[36px] leading-tight">{t('review.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('review.subtitle')}</p>
      </header>

      <div className="space-y-4 px-5">
        {/* Yıldızlar */}
        <section className="space-y-4 rounded-card border border-line bg-card p-5">
          {criteria.map((c) => (
            <div key={c} className="flex items-center justify-between">
              <span className="text-sm font-semibold">{t(`review.criteria.${c}`)}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${n}`}
                    onClick={() => {
                      setScores({ ...scores, [c]: n })
                      setSaved(false)
                    }}
                    className="p-0.5"
                  >
                    <Star size={26} className={n <= scores[c] ? 'fill-accent text-accent' : 'text-line'} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Yorum */}
        <section>
          <p className="mb-2 text-sm font-bold">{t('review.comment')}</p>
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
              setSaved(false)
            }}
            rows={3}
            placeholder={t('review.comment_placeholder')}
            className="w-full resize-none rounded-card border border-line bg-card p-4 text-sm outline-none focus:border-accent"
          />
        </section>

        {saved ? (
          <div className="flex items-center gap-3 rounded-card bg-success-tint p-4 text-success-text">
            <CheckCircle2 size={22} />
            <p className="text-sm font-semibold">{t('review.thanks')}</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={submitReview}
            disabled={!canSave}
            className="h-14 w-full rounded-[10px] bg-ink text-sm font-semibold text-card disabled:opacity-30"
          >
            {review ? t('review.update') : t('review.send')}
          </button>
        )}
      </div>

      {/* Yorum özeti ve örnek yorumlar (askHermis) */}
      <div className="mt-10 px-5">
        <ReviewSummary showSamples />
      </div>

      {/* Geri bildirim */}
      <section className="mt-10 px-5">
        <h2 className="text-xl font-bold">{t('review.feedback.title')}</h2>
        <p className="mt-1 text-sm text-muted">{t('review.feedback.subtitle')}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`h-9 rounded-full px-4 text-sm font-medium ${category === c ? 'bg-ink text-card' : 'border border-line bg-card'}`}
            >
              {t(`review.feedback.categories.${c}`)}
            </button>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder={t('review.feedback.placeholder')}
          className="mt-3 w-full resize-none rounded-card border border-line bg-card p-4 text-sm outline-none focus:border-accent"
        />
        <button
          type="button"
          onClick={submitFeedback}
          disabled={!message.trim()}
          className="mt-3 h-12 w-full rounded-[10px] border border-ink text-sm font-semibold disabled:opacity-30"
        >
          {t('review.feedback.send')}
        </button>

        {/* Gönderilen geri bildirimler */}
        {feedbacks.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-bold">{t('review.feedback.sent_list')}</h3>
            <ul className="space-y-2.5">
              {feedbacks.map((f) => (
                <li key={f.id} className="rounded-card border border-line bg-card p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-muted">
                      {t(`review.feedback.categories.${f.category}`)} · {time(f.createdAt)}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        f.status === 'resolved' ? 'bg-success-tint text-success-text' : f.status === 'seen' ? 'bg-primary-soft text-muted' : 'bg-background text-muted'
                      }`}
                    >
                      {t(`review.feedback.status.${f.status}`)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{f.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}