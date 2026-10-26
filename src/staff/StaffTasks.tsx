import { useEffect, useState } from 'react'
import { Clock, StickyNote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StaffTitle from './StaffTitle'
import { amenityItems, optionName, transferDestinations } from '../data/hotel'
import { getStaff, type StaffRole } from '../lib/staff'
import { useShared } from '../lib/shared'
import LineBadge from '../components/LineBadge'
import { serviceBadge } from '../pages/Services'
import type { RequestStatus, ServiceRequest, ServiceType } from '../store/ServiceContext'
import '../translations/services'
import '../translations/tasks'

// Her rol hangi talep türlerini görür (masa talepleri ayrı sekmede)
export const TYPES_BY_ROLE: Record<StaffRole, ServiceType[]> = {  kitchen: [],
  housekeeping: ['cleaning', 'towels'],
  reception: ['cleaning', 'towels', 'transfer'],
}

const COLUMNS: RequestStatus[] = ['pending', 'in_progress', 'done']
const NEXT: Partial<Record<RequestStatus, RequestStatus>> = { pending: 'in_progress', in_progress: 'done' }
const DOT: Record<string, string> = { pending: 'bg-warning', in_progress: 'bg-ink', done: 'bg-success' }
export default function StaffTasks() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const role = getStaff()?.role ?? 'housekeeping'
  const types = TYPES_BY_ROLE[role]
  const [requests, setRequests] = useShared<ServiceRequest[]>('aura-requests', [])
  const [filter, setFilter] = useState<'all' | ServiceType>('all')

  // "5 dk önce" yazılarını her 30 saniyede güncelle
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(timer)
  }, [])

  const visible = requests.filter((r) => types.includes(r.type) && (filter === 'all' || r.type === filter))

  const advance = (id: string) =>
    setRequests((prev) => prev.map((r) => (r.id === id && NEXT[r.status] ? { ...r, status: NEXT[r.status]! } : r)))

  const ago = (createdAt: number) => {
    const minutes = Math.floor((now - createdAt) / 60000)
    return minutes < 1 ? t('tasks.just_now') : t('tasks.minutes_ago', { count: minutes })
  }

  // Talebin ayrıntısını tek satırda yaz
  const describe = (r: ServiceRequest) => {
    const d = r.details
    if (r.type === 'cleaning') return !d.slot || d.slot === 'now' ? t('services.form.now') : d.slot
    if (r.type === 'towels') {
      const names = (d.items ?? 'towel').split(',').filter(Boolean).map((id) => optionName(amenityItems, id, lang))
      return `${names.join(', ')}, ${t('tasks.quantity', { count: Number(d.quantity ?? 1) })}`
    }
    if (r.type === 'transfer') {
      return `${optionName(transferDestinations, d.destination, lang)}, ${d.date} ${d.time}, ${t('tasks.people', { count: Number(d.people ?? 1) })}`
    }
    return ''
  }

  return (
    <div>
      <StaffTitle line="clean" title={t('tasks.title')} subtitle={t('tasks.subtitle')} />

      {/* Tür filtresi */}
      <div className="mb-5 flex flex-wrap gap-2">
        {(['all', ...types] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`h-9 rounded-[10px] px-4 text-base font-bold font-display ${filter === f ? 'bg-primary text-card' : 'border border-line bg-card'}`}
          >
            {f === 'all' ? t('tasks.all') : t(`services.types.${f}.title`)}
          </button>
        ))}
      </div>

      {/* 3 sütun: Bekleyen / İşlemde / Tamamlanan */}
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((status) => {
          // Açık işler: en eski en üstte. Tamamlananlar: en yeni 6 tanesi
          const list = visible
            .filter((r) => r.status === status)
            .sort((a, b) => (status === 'done' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt))
            .slice(0, status === 'done' ? 6 : undefined)

          return (
            <section key={status} className="overflow-hidden rounded-card border border-line bg-card/60">
              {/* Sütun başlığı: hattın bir durağı */}
              <h2 className="flex items-center gap-2.5 border-b border-line bg-card px-4 py-3 text-xl">
                <span className={`h-4 w-4 rounded-full border-[3px] border-card ring-2 ring-line ${DOT[status]}`} />
                {t(`tasks.columns.${status}`)}
                <span className="ml-auto rounded-md bg-background px-2 py-0.5 font-display text-base">{list.length}</span>
              </h2>
              <div className={`h-1.5 ${DOT[status]}`} />
              <div className="p-3">

              {list.length === 0 ? (
                <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">{t('tasks.empty')}</p>
              ) : (
                <div className="space-y-3">
                  {list.map((r) => {
                    return (
                      <article
                        key={r.id}
                        className={`rounded-card border bg-card p-4 ${
                          status === 'pending' ? 'border-primary ring-2 ring-primary-soft' : 'border-line'
                        } ${status === 'done' ? 'opacity-70' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-title text-[30px] font-extrabold leading-none">{t('tasks.room', { number: r.room ?? '—' })}</p>
                          <LineBadge line={serviceBadge[r.type].line} label={serviceBadge[r.type].label} />
                        </div>
                        <p className="mt-2 font-display text-lg font-extrabold">{t(`services.types.${r.type}.title`)}</p>
                        <p className="text-sm text-ink/70">{describe(r)}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                          #{r.id}, <Clock size={12} /> {ago(r.createdAt)}
                        </p>

                        {/* Misafirin notu */}
                        {r.details.note && (
                          <p className="mt-3 flex gap-2 rounded-xl bg-primary-soft p-3 text-sm">
                            <StickyNote size={16} className="mt-0.5 shrink-0" />
                            {r.details.note}
                          </p>
                        )}

                        {NEXT[status] && (
                          <button
                            type="button"
                            onClick={() => advance(r.id)}
                            className="mt-4 h-11 w-full rounded-[10px] bg-ink text-base font-bold text-card active:scale-[0.99] font-display"
                          >
                            {t(`tasks.actions.${status}`)}
                          </button>
                        )}
                      </article>
                    )
                  })}
                </div>
              )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}