import { ArrowRight, Bath, Car, Sparkles, Wine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LineBadge, { type Line } from '../components/LineBadge'
import { useServices, type ServiceType } from '../store/ServiceContext'
import { serviceDesc } from '../lib/serviceDesc'
import '../translations/services'
import '../translations/tables'

export const serviceIcons: Record<ServiceType, typeof Car> = {
  cleaning: Sparkles,
  transfer: Car,
  table: Wine,
  towels: Bath,
}

// Her hizmetin hattı ve kodu (tabela gibi): T1 temizlik, T2 havlu, M1 masa, M2 transfer
export const serviceBadge: Record<ServiceType, { line: Line; label: string }> = {
  cleaning: { line: 'clean', label: 'T1' },
  towels: { line: 'clean', label: 'T2' },
  table: { line: 'table', label: 'M1' },
  transfer: { line: 'table', label: 'M2' },
}

const types: ServiceType[] = ['cleaning', 'towels', 'table', 'transfer']

export default function Services() {
  const { t, i18n } = useTranslation()
  const { requests } = useServices()

  return (
    <div className="pb-8">
      <header className="bg-discover-pink px-5 pb-5 pt-6">
        <h1 className="text-[36px] leading-none">{t('services.title')}</h1>
        <p className="mt-1.5 text-sm">{t('services.subtitle')}</p>
      </header>

      {/* Hizmet hatları */}
      <ul className="px-5 pt-2">
        {types.map((type) => (
          <li key={type}>
            <Link to={`/services/${type}`} className="flex min-h-[68px] items-center gap-3.5 border-b border-line py-2">
              <LineBadge line={serviceBadge[type].line} label={serviceBadge[type].label} />
              <span className="flex-1">
                <span className="block text-[17px] font-bold">{t(`services.types.${type}.title`)}</span>
                <span className="block text-[13px] text-muted">{serviceDesc(type, t, i18n.resolvedLanguage)}</span>
              </span>
              <ArrowRight size={22} />
            </Link>
          </li>
        ))}
      </ul>

      {/* Taleplerim */}
      <section className="mt-6 px-5">
        <h2 className="mb-2 text-[22px]">{t('services.my_requests')}</h2>
        {requests.length === 0 ? (
          <p className="rounded-card border border-dashed border-line p-5 text-center text-muted">{t('services.no_requests')}</p>
        ) : (
          <ul className="divide-y divide-line rounded-card border border-line bg-card">
            {requests.map((r) => {
              const time = new Date(r.createdAt).toLocaleTimeString(i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit' })
              return (
                <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                  <LineBadge line={serviceBadge[r.type].line} label={serviceBadge[r.type].label} size="sm" />
                  <div className="flex-1">
                    <p className="font-bold">{t(`services.types.${r.type}.title`)}</p>
                    <p className="text-xs text-muted">{time}, #{r.id}</p>
                  </div>
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                      r.status === 'done' || r.status === 'confirmed'
                        ? 'bg-service'
                        : r.status === 'in_progress'
                          ? 'bg-primary-soft text-primary'
                          : 'bg-background text-muted'
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
