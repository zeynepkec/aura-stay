import { ArrowUpRight, BellRing, ChevronRight, Clock, MapPin, Sparkles, UtensilsCrossed, Wine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { stay } from '../data/stay'
import { useServices } from '../store/ServiceContext'
import { ORDER_STEPS, useStay } from '../store/StayContext'
import { serviceIcons } from './Services'
import '../translations/home'
import '../translations/orders'
import '../translations/services'
import '../translations/tables'

const quickActions = [
  { to: '/dining', key: 'action_food', icon: UtensilsCrossed },
  { to: '/services/cleaning', key: 'action_cleaning', icon: BellRing },
  { to: '/services/table', key: 'action_table', icon: Wine },
  { to: '/assistant', key: 'action_assistant', icon: Sparkles },
]

const activities = [
  { key: 'act_castle', minutes: 90, km: 1.2 },
  { key: 'act_sunset', minutes: 150, km: 0.8 },
  { key: 'act_windmills', minutes: 60, km: 2.5 },
]

export default function Home() {
  const { t } = useTranslation()
  const { orders } = useStay()
  const { requests } = useServices()

  // Teslim edilmemiş en yeni sipariş
  const activeOrder = orders.find((o) => o.status !== 'delivered')
  const step = activeOrder ? ORDER_STEPS.indexOf(activeOrder.status) : -1

  // Bekleyen ya da işlemdeki talepler (en fazla 3)
  const activeRequests = requests.filter((r) => r.status === 'pending' || r.status === 'in_progress').slice(0, 3)

  return (
    <div className="space-y-7 pt-6">
      {/* Karşılama + dil seçimi */}
      <header className="flex items-start justify-between gap-3 px-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{stay.hotelName}</p>
          <h1 className="mt-1 text-3xl font-bold leading-tight">
            {t('home.welcome')}
            <br />
            {t('home.room', { number: stay.roomNumber })}
          </h1>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Aktif sipariş — mutfak durumu değiştirdikçe ilerler */}
      {activeOrder && (
        <section className="px-5">
          <Link to={`/orders/${activeOrder.id}`} className="block rounded-card border border-accent bg-card p-4 ring-2 ring-accent/15">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">
                {t('home.active_order')} · {t('home.order_no', { id: activeOrder.id })}
              </span>
              <ChevronRight size={18} className="text-muted" />
            </div>
            <p className="mt-1 text-lg font-bold">{t(`orders.status.${activeOrder.status}`)}</p>
            <p className="text-xs text-muted">{t(`orders.status_desc.${activeOrder.status}`)}</p>
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              {ORDER_STEPS.map((s, i) => (
                <span key={s} className={`h-1.5 rounded-full ${i <= step ? 'bg-accent' : 'bg-line'}`} />
              ))}
            </div>
          </Link>
        </section>
      )}

      {/* Devam eden hizmet talepleri */}
      {activeRequests.length > 0 && (
        <section className="px-5">
          <h2 className="mb-3 text-base font-bold">{t('home.active_requests')}</h2>
          <div className="space-y-2">
            {activeRequests.map((r) => {
              const Icon = serviceIcons[r.type]
              return (
                <Link key={r.id} to="/services" className="flex items-center gap-3 rounded-card border border-line bg-card p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-service">
                    <Icon size={16} />
                  </span>
                  <span className="flex-1 text-sm font-semibold">{t(`services.types.${r.type}.title`)}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      r.status === 'in_progress' ? 'bg-accent/15 text-accent' : 'bg-background text-muted'
                    }`}
                  >
                    {t(`services.status.${r.status}`)}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Kampanya kartı — Deep Blue */}
      <section className="relative mx-5 overflow-hidden rounded-card bg-campaign p-5 text-card">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-card/70">{t('home.campaign_tag')}</span>
        <h2 className="mt-2 max-w-[80%] text-xl font-bold leading-snug">{t('home.campaign_title')}</h2>
        <p className="mt-1 text-sm text-card/80">{t('home.campaign_text')}</p>
        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-card/15">
          <ArrowUpRight size={18} />
        </span>
        <span className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-accent/40" />
      </section>

      {/* Hızlı işlemler — beyaz kartlar */}
      <section className="px-5">
        <h2 className="mb-3 text-base font-bold">{t('home.quick_actions')}</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ to, key, icon: Icon }) => (
            <Link key={key} to={to} className="flex min-h-[96px] flex-col justify-between rounded-card border border-line bg-card p-4">
              <Icon size={22} />
              <span className="text-sm font-semibold">{t(`home.${key}`)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Aktiviteler — Peach Salmon */}
      <section>
        <div className="mb-3 flex items-center justify-between px-5">
          <h2 className="text-base font-bold">{t('home.today_near')}</h2>
          <Link to="/explore" className="text-sm font-medium text-accent">{t('home.see_all')}</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-1">
          {activities.map((a) => (
            <article key={a.key} className="w-[220px] shrink-0 rounded-card bg-activity p-4">
              <div className="mb-10 h-8 w-8 rounded-full bg-card/60" />
              <h3 className="font-bold leading-snug">{t(`home.${a.key}`)}</h3>
              <div className="mt-2 flex gap-3 text-xs text-ink/70">
                <span className="flex items-center gap-1"><Clock size={13} />{t('home.min', { count: a.minutes })}</span>
                <span className="flex items-center gap-1"><MapPin size={13} />{t('home.km', { count: a.km })}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Konaklamam — lila-pembe geçiş */}
      <section className="px-5">
        <Link to="/stay" className="flex items-center gap-4 rounded-card border border-line bg-card p-4">
          <span className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-discover to-discover-pink" />
          <span className="flex-1">
            <span className="block text-sm font-bold">{t('home.my_stay')}</span>
            <span className="block text-xs text-muted">{t('home.my_stay_text')}</span>
          </span>
          <ChevronRight size={18} className="text-muted" />
        </Link>
      </section>
    </div>
  )
}