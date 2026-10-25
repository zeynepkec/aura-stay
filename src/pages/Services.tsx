import { Bath, Car, ChevronRight, SprayCan, Wine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useServices, type ServiceType } from '../store/ServiceContext'
import '../translations/services'
import '../translations/tables'

export const serviceIcons: Record<ServiceType, typeof Car> = {
  cleaning: SprayCan,
  transfer: Car,
  table: Wine,
  towels: Bath,
}

const types: ServiceType[] = ['cleaning', 'towels', 'table', 'transfer']

// Talep durumlarının rengi: bekliyor gri, işlemde mavi, tamam yeşil
export const statusStyle = (status: string) =>
  status === 'done' || status === 'confirmed'
    ? 'bg-service text-ink'
    : status === 'in_progress'
      ? 'bg-primary-soft text-primary'
      : 'bg-background text-muted'

export default function Services() {
  const { t, i18n } = useTranslation()
  const { requests } = useServices()

  return (
    <div className="pb-6">
      <header className="px-5 pb-5 pt-6">
        <h1 className="text-3xl font-bold">{t('services.title')}</h1>
        <p className="mt-1 text-muted">{t('services.subtitle')}</p>
      </header>

      {/* Hizmetler — Sage Green ikonlar, büyük satırlar */}
      <ul className="mx-5 divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
        {types.map((type) => {
          const Icon = serviceIcons[type]
          return (
            <li key={type}>
              <Link to={`/services/${type}`} className="flex min-h-[72px] items-center gap-4 px-4 py-3 active:bg-background">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-service">
                  <Icon size={20} />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{t(`services.types.${type}.title`)}</span>
                  <span className="block text-sm text-muted">{t(`services.types.${type}.desc`)}</span>
                </span>
                <ChevronRight size={20} className="text-muted" />
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Taleplerim */}
      <section className="mt-8 px-5">
        <h2 className="mb-3 text-xl font-bold">{t('services.my_requests')}</h2>
        {requests.length === 0 ? (
          <p className="rounded-card border border-dashed border-line p-5 text-center text-muted">{t('services.no_requests')}</p>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
            {requests.map((r) => {
              const Icon = serviceIcons[r.type]
              const time = new Date(r.createdAt).toLocaleTimeString(i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit' })
              return (
                <li key={r.id} className="flex items-center gap-3 p-4">
                  <Icon size={20} className="shrink-0 text-muted" />
                  <div className="flex-1">
                    <p className="font-semibold">{t(`services.types.${r.type}.title`)}</p>
                    <p className="text-sm text-muted">{time}, #{r.id}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyle(r.status)}`}>
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
