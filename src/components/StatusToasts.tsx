import { useEffect, useRef, useState } from 'react'
import { Bell, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useFeedback } from '../store/FeedbackContext'
import { useServices } from '../store/ServiceContext'
import { useStay } from '../store/StayContext'
import '../translations/notify'
import '../translations/orders'
import '../translations/services'
import '../translations/tables'

type Toast = { key: string; title: string; text: string; to: string }

export default function StatusToasts() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { orders } = useStay()
  const { requests } = useServices()
  const { feedbacks } = useFeedback()
  const [toasts, setToasts] = useState<Toast[]>([])

  // Her kaydın son bilinen durumu: { "A1234": "preparing", ... }
  const lastStatus = useRef<Record<string, string> | null>(null)

  // Bir durum değiştiyse bildirim oluştur
  useEffect(() => {
    const current: Record<string, string> = {}
    const fresh: Toast[] = []

    const check = (id: string, status: string, make: () => Omit<Toast, 'key'>) => {
      current[id] = status
      const before = lastStatus.current?.[id]
      // İlk açılışta ya da misafirin kendi oluşturduğu yeni kayıtta bildirim yok
      if (before && before !== status) fresh.push({ key: `${id}-${status}`, ...make() })
    }

    orders.forEach((o) =>
      check(o.id, o.status, () => ({
        title: t('notify.order', { id: o.id }),
        text: `${t(`orders.status.${o.status}`)}. ${t(`orders.status_desc.${o.status}`)}`,
        to: `/orders/${o.id}`,
      })),
    )
    requests.forEach((r) =>
      check(r.id, r.status, () => ({
        title: t(`services.types.${r.type}.title`),
        text: t(`notify.request.${r.status}`),
        to: '/services',
      })),
    )
    feedbacks.forEach((f) =>
      check(f.id, f.status, () => ({
        title: t('notify.feedback'),
        text: t(`notify.feedback_status.${f.status}`),
        to: '/stay/review',
      })),
    )

    lastStatus.current = current
    if (fresh.length > 0) {
      setToasts((prev) => [...fresh, ...prev].slice(0, 3))
      navigator.vibrate?.(200)
    }
  }, [orders, requests, feedbacks, t])

  // En eski bildirimi 5 saniye sonra kaldır
  useEffect(() => {
    if (toasts.length === 0) return
    const timer = setTimeout(() => setToasts((prev) => prev.slice(0, -1)), 5000)
    return () => clearTimeout(timer)
  }, [toasts])

  const remove = (key: string) => setToasts((prev) => prev.filter((x) => x.key !== key))

  if (toasts.length === 0) return null

  return (
    <div className="fixed left-1/2 top-0 z-50 w-full max-w-[430px] -translate-x-1/2 space-y-2 px-4 pt-[calc(env(safe-area-inset-top)+12px)]">
      {toasts.map((toast) => (
        <div key={toast.key} className="flex animate-[toast-in_250ms_ease-out] items-center gap-2 rounded-card bg-ink p-2 pr-1 text-card shadow-xl">
          <button
            type="button"
            onClick={() => {
              remove(toast.key)
              navigate(toast.to)
            }}
            className="flex flex-1 items-center gap-3 p-1 text-left"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/15 text-card">
              <Bell size={18} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">{toast.title}</span>
              <span className="block text-xs text-card/75">{toast.text}</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => remove(toast.key)}
            aria-label={t('notify.close')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-card/60"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}