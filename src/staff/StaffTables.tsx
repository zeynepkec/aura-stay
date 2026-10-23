import { useState } from 'react'
import { CalendarDays, Check, StickyNote, Users, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useShared } from '../lib/shared'
import type { RequestStatus, ServiceRequest } from '../store/ServiceContext'
import '../translations/tables'

const VIEWS: RequestStatus[] = ['pending', 'confirmed', 'declined']

export default function StaffTables() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const [requests, setRequests] = useShared<ServiceRequest[]>('aura-requests', [])
  const [view, setView] = useState<RequestStatus>('pending')

  // Sadece masa talepleri, tarih ve saate göre sıralı
  const tables = requests.filter((r) => r.type === 'table')
  const list = tables
    .filter((r) => r.status === view)
    .sort((a, b) => `${a.details.date} ${a.details.time}`.localeCompare(`${b.details.date} ${b.details.time}`))

  const setStatus = (id: string, status: RequestStatus) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))

  // Bugünün tarihi "2026-10-23" biçiminde
  const today = new Date().toLocaleDateString('sv')
  const todayConfirmed = tables.filter((r) => r.status === 'confirmed' && r.details.date === today)
  const guestsToday = todayConfirmed.reduce((sum, r) => sum + Number(r.details.people ?? 0), 0)

  const dateLabel = (date?: string) => {
    if (!date) return '—'
    if (date === today) return t('tables.today')
    return new Date(`${date}T00:00`).toLocaleDateString(lang, { weekday: 'short', day: 'numeric', month: 'short' })
  }

  const stat = (value: number, label: string, highlight = false) => (
    <div className={`rounded-card border p-4 ${highlight && value > 0 ? 'border-accent bg-accent/10' : 'border-line bg-card'}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  )

  return (
    <div>
      <header className="mb-5">
        <h1 className="text-2xl font-bold">{t('tables.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('tables.subtitle')}</p>
      </header>

      {/* Özet kutuları */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {stat(tables.filter((r) => r.status === 'pending').length, t('tables.stats.pending'), true)}
        {stat(todayConfirmed.length, t('tables.stats.today'))}
        {stat(guestsToday, t('tables.stats.guests'))}
      </div>

      {/* Bekleyen / Onaylanan / Reddedilen */}
      <div className="mb-4 flex flex-wrap gap-2">
        {VIEWS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium ${view === v ? 'bg-ink text-card' : 'border border-line bg-card'}`}
          >
            {t(`tables.views.${v}`)}
            <span className={`rounded-full px-1.5 text-xs ${view === v ? 'bg-card/20' : 'bg-background'}`}>
              {tables.filter((r) => r.status === v).length}
            </span>
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="rounded-card border border-dashed border-line p-10 text-center text-sm text-muted">{t('tables.empty')}</p>
      ) : (
        <div className="space-y-3">
          {list.map((r) => (
            <article key={r.id} className="flex flex-col gap-4 rounded-card border border-line bg-card p-4 sm:flex-row sm:items-center">
              {/* Saat ve tarih */}
              <div className="flex w-28 shrink-0 flex-col items-center rounded-2xl bg-background px-3 py-2">
                <p className="text-2xl font-bold">{r.details.time ?? '—'}</p>
                <p className="flex items-center gap-1 text-xs text-muted">
                  <CalendarDays size={12} />
                  {dateLabel(r.details.date)}
                </p>
              </div>

              {/* Oda, kişi sayısı, not */}
              <div className="flex-1">
                <p className="text-lg font-bold">{t('tables.room', { number: r.room ?? '—' })}</p>
                <p className="flex items-center gap-1 text-sm text-ink/70">
                  <Users size={14} />
                  {t('tables.people', { count: Number(r.details.people ?? 1) })}
                </p>
                {r.details.note && (
                  <p className="mt-2 flex gap-2 rounded-2xl bg-activity/40 p-2.5 text-sm">
                    <StickyNote size={16} className="mt-0.5 shrink-0" />
                    {r.details.note}
                  </p>
                )}
              </div>

              {/* Butonlar */}
              {view === 'pending' ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus(r.id, 'declined')}
                    className="flex h-11 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-semibold"
                  >
                    <X size={16} />
                    {t('tables.decline')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(r.id, 'confirmed')}
                    className="flex h-11 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-semibold text-card"
                  >
                    <Check size={16} />
                    {t('tables.confirm')}
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setStatus(r.id, 'pending')} className="h-10 px-4 text-sm font-medium text-muted underline">
                  {t('tables.undo')}
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}