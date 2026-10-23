import { ArrowLeft, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { price } from '../data/menu'
import { stay, transferPrices } from '../data/stay'
import { useServices } from '../store/ServiceContext'
import { useStay } from '../store/StayContext'
import { serviceIcons } from './Services'
import '../translations/orders'
import '../translations/services'
import '../translations/stay'

export default function Bill() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { orders } = useStay()
  const { requests } = useServices()

  const time = (ms: number) =>
    new Date(ms).toLocaleString(lang, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

  // Hizmet ücreti: sadece transfer ücretli
  const serviceCost = (type: string, details: Record<string, string>) =>
    type === 'transfer' ? transferPrices[details.destination] ?? 0 : 0

  const ordersTotal = orders.reduce((sum, o) => sum + o.total, 0)
  const servicesTotal = requests.reduce((sum, r) => sum + serviceCost(r.type, r.details), 0)
  const total = ordersTotal + servicesTotal

  return (
    <div>
      <Link to="/stay" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-sm text-muted">
        <ArrowLeft size={18} />
        {t('stay.title')}
      </Link>

      <header className="px-5 pb-4 pt-2">
        <h1 className="text-3xl font-bold">{t('stay.bill.title')}</h1>
        <p className="mt-1 text-sm text-muted">
          {t('stay.room', { number: stay.roomNumber })} · {stay.hotelName}
        </p>
      </header>

      <div className="space-y-6 px-5">
        {/* Toplam */}
        <section className="rounded-card border border-line bg-card p-5">
          <p className="text-sm text-muted">{t('stay.bill.total')}</p>
          <p className="mt-1 text-4xl font-bold">{price(total, lang)}</p>
          <p className="mt-3 flex gap-2 text-xs text-muted">
            <Info size={14} className="mt-px shrink-0 text-accent" />
            {t('stay.bill.pay_info')}
          </p>
        </section>

        {/* Yemek siparişleri */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">{t('stay.bill.orders')}</h2>
            <span className="text-sm font-semibold">{price(ordersTotal, lang)}</span>
          </div>
          {orders.length === 0 ? (
            <p className="rounded-card border border-line bg-card p-4 text-center text-sm text-muted">{t('stay.bill.no_items')}</p>
          ) : (
            <ul className="divide-y divide-line rounded-card border border-line bg-card">
              {orders.map((o) => (
                <li key={o.id}>
                  <Link to={`/orders/${o.id}`} className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <p className="text-sm font-semibold">#{o.id}</p>
                      <p className="text-xs text-muted">
                        {time(o.createdAt)} · {t(`orders.status.${o.status}`)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">{price(o.total, lang)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Hizmetler */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">{t('stay.bill.services')}</h2>
            <span className="text-sm font-semibold">{price(servicesTotal, lang)}</span>
          </div>
          {requests.length === 0 ? (
            <p className="rounded-card border border-line bg-card p-4 text-center text-sm text-muted">{t('stay.bill.no_items')}</p>
          ) : (
            <ul className="divide-y divide-line rounded-card border border-line bg-card">
              {requests.map((r) => {
                const Icon = serviceIcons[r.type]
                const cost = serviceCost(r.type, r.details)
                return (
                  <li key={r.id} className="flex items-center gap-3 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-service">
                      <Icon size={16} />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{t(`services.types.${r.type}.title`)}</p>
                      <p className="text-xs text-muted">{time(r.createdAt)}</p>
                    </div>
                    <span className={`text-sm font-semibold ${cost === 0 ? 'text-muted' : ''}`}>
                      {cost === 0 ? t('stay.bill.free') : price(cost, lang)}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}