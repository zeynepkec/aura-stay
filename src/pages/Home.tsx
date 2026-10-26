import { ArrowRight, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import LineBadge, { type Line } from '../components/LineBadge'
import OrderLine from '../components/OrderLine'
import { campaign, hotel } from '../data/hotel'
import { pick } from '../data/menu'
import { stay } from '../data/stay'
import { useAllRoutes } from '../lib/routesStore'
import { useServices } from '../store/ServiceContext'
import { ORDER_STEPS, useStay } from '../store/StayContext'
import '../translations/home'
import '../translations/metro'
import '../translations/orders'
import '../translations/services'
import '../translations/tables'

// Hizmet "hatları": harfli rozet + başlık + açıklama
const lines: { to: string; line: Line; key: string }[] = [
  { to: '/dining', line: 'food', key: 'food' },
  { to: '/services/cleaning', line: 'clean', key: 'clean' },
  { to: '/services/table', line: 'table', key: 'table' },
  { to: '/explore', line: 'route', key: 'route' },
  { to: '/assistant', line: 'concierge', key: 'concierge' },
  { to: '/stay', line: 'stay', key: 'stay' },
]

// Talep türünün hattı
export const serviceLine: Record<string, Line> = { cleaning: 'clean', towels: 'clean', table: 'table', transfer: 'table' }

export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { orders } = useStay()
  const { requests } = useServices()
  const { all } = useAllRoutes()

  // Teslim edilmemiş en yeni sipariş
  const activeOrder = orders.find((o) => o.status !== 'delivered')
  const step = activeOrder ? ORDER_STEPS.indexOf(activeOrder.status) : -1

  // Bekleyen ya da işlemdeki talepler (en fazla 3)
  const activeRequests = requests.filter((r) => r.status === 'pending' || r.status === 'in_progress').slice(0, 3)

  const date = (time: number) => new Date(time).toLocaleDateString(lang, { day: 'numeric', month: 'short' })

  return (
    <div className="pb-8">
      {/* Yön tabelası: büyük oda numarası */}
      <header className="bg-primary px-5 pb-6 pt-5 text-card">
        <div className="flex items-center justify-between">
          <span className="font-display text-[17px] font-bold">AURA Stay</span>
          <LanguageSwitcher dark />
        </div>
        <div className="mt-5 flex items-end gap-4">
          <span className="font-title text-[92px] font-extrabold leading-[0.85] tracking-tight">{stay.roomNumber}</span>
          <div className="pb-1">
            <p className="text-[15px] font-bold">{stay.hotelName}</p>
            <p className="text-sm text-card/85">
              {t('metro.floor', { floor: stay.roomNumber.charAt(0) })}, {date(stay.checkIn)} – {date(stay.checkOut)}
            </p>
          </div>
        </div>
      </header>

      {/* Aktif sipariş: metro hattı */}
      {activeOrder && (
        <Link to={`/orders/${activeOrder.id}`} className="block border-b border-line bg-card px-5 pb-5 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2 font-display text-[19px] font-extrabold">
              <LineBadge line="food" size="sm" />
              {t('metro.order_title', { id: activeOrder.id })}
            </span>
            <ChevronRight size={20} className="text-muted" />
          </div>
          <OrderLine step={step} />
        </Link>
      )}

      {/* Devam eden talepler */}
      {activeRequests.length > 0 && (
        <section className="border-b border-line bg-card px-5 py-3">
          <h2 className="mb-1 text-xl">{t('metro.requests')}</h2>
          <ul>
            {activeRequests.map((r) => (
              <li key={r.id}>
                <Link to="/services" className="flex min-h-[48px] items-center gap-3">
                  <LineBadge line={serviceLine[r.type] ?? 'clean'} size="sm" />
                  <span className="flex-1 font-semibold">{t(`services.types.${r.type}.title`)}</span>
                  <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${r.status === 'in_progress' ? 'bg-primary-soft text-primary' : 'bg-background text-muted'}`}>
                    {t(`services.status.${r.status}`)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Hatlar */}
      <section className="px-5 pt-5">
        <h2 className="mb-1 text-[22px]">{t('metro.lines_title')}</h2>
        <ul>
          {lines.map(({ to, line, key }, i) => (
            <li key={key}>
              <Link to={to} className={`flex min-h-[62px] items-center gap-3.5 ${i < lines.length - 1 ? 'border-b border-line' : ''}`}>
                <LineBadge line={line} />
                <span className="flex-1">
                  <span className="block text-[17px] font-bold">{t(`metro.line_${key}`)}</span>
                  <span className="block text-[13px] text-muted">{t(`metro.line_${key}_desc`, { hours: hotel.roomService, count: all.length })}</span>
                </span>
                <ArrowRight size={22} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Bu akşam: kampanya */}
      <section className="px-5 pt-5">
        <div className="rounded-card bg-campaign p-5 text-card">
          <p className="text-sm text-card/80">{t('metro.tonight')}, {hotel.rooftop}</p>
          <h2 className="mt-1 text-2xl leading-tight">{pick(campaign.title, lang)}</h2>
          <p className="mt-1 text-sm text-card/85">{pick(campaign.description, lang)}</p>
          <Link to="/services/table?venue=rooftop" className="mt-4 inline-flex h-11 items-center rounded-[10px] bg-card px-4 font-display text-base font-extrabold text-campaign">
            {pick(campaign.cta, lang)}
          </Link>
        </div>
      </section>

      {/* Bilgi panosu */}
      <section className="px-5 pt-5">
        <h2 className="mb-2 text-[22px]">{t('metro.board')}</h2>
        <dl className="divide-y divide-line rounded-card border border-line bg-card">
          {[
            [t('metro.wifi'), `${hotel.wifi.name}, ${hotel.wifi.password}`],
            [t('metro.breakfast'), hotel.breakfast],
            [t('metro.room_service'), hotel.roomService],
            [t('metro.checkout'), hotel.checkOut],
            [t('metro.reception'), pick(hotel.reception, lang)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 px-4 py-3">
              <dt className="text-muted">{label}</dt>
              <dd className="text-right font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
