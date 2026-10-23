import { Bath, Car, Sparkles, Wine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useServices, type ServiceType } from '../store/ServiceContext'
import '../translations/services'

export const serviceIcons: Record<ServiceType, typeof Car> = {
  cleaning: Sparkles,
  transfer: Car,
  table: Wine,
  towels: Bath,
}

const types: ServiceType[] = ['cleaning', 'transfer', 'table', 'towels']

export default function Services() {
  const { t, i18n } = useTranslation()
  const { requests } = useServices()

  return (
    <div>
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-3xl font-bold">{t('services.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('services.subtitle')}</p>
      </header>

      {/* Hizmet kartları — Sage Green */}
      <div className="grid grid-cols-2 gap-3 px-5">
        {types.map((type) => {
          const Icon = serviceIcons[type]
          return (
            <Link key={type} to={`/services/${type}`} className="flex min-h-[132px] flex-col justify-between rounded-card bg-service p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card/70">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-sm font-bold">{t(`services.types.${type}.title`)}</span>
                <span className="mt-0.5 block text-xs text-ink/70">{t(`services.types.${type}.desc`)}</span>
              </span>
            </Link>
          )
        })}
      </div>

      {/* Taleplerim */}
      <section className="mt-8 px-5">
        <h2 className="mb-3 text-base font-bold">{t('services.my_requests')}</h2>
        {requests.length === 0 ? (
          <p className="rounded-card border border-line bg-card p-5 text-center text-sm text-muted">{t('services.no_requests')}</p>
        ) : (
          <ul className="space-y-2.5">
            {requests.map((r) => {
              const Icon = serviceIcons[r.type]
              const time = new Date(r.createdAt).toLocaleTimeString(i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit' })
              return (
                <li key={r.id} className="flex items-center gap-3 rounded-card border border-line bg-card p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background">
                    <Icon size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{t(`services.types.${r.type}.title`)}</p>
                    <p className="text-xs text-muted">#{r.id} · {time}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      r.status === 'done' ? 'bg-service' : r.status === 'in_progress' ? 'bg-accent/15 text-accent' : 'bg-background text-muted'
                    }`}
                  >
                    {t(`services.status.${r.status}`)}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}