import { ArrowUpRight, BellRing, ChevronRight, Clock, MapPin, Sparkles, UtensilsCrossed, Wine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { stay } from '../data/stay'
const quickActions = [
  { to: '/dining', key: 'action_food', icon: UtensilsCrossed },
  { to: '/services', key: 'action_cleaning', icon: BellRing },
  { to: '/services', key: 'action_table', icon: Wine },
  { to: '/assistant', key: 'action_assistant', icon: Sparkles },
]

const activities = [
  { key: 'act_castle', minutes: 90, km: 1.2 },
  { key: 'act_sunset', minutes: 150, km: 0.8 },
  { key: 'act_windmills', minutes: 60, km: 2.5 },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="space-y-7 pt-6">
      {/* Karşılama + dil seçimi */}
      <header className="flex items-start justify-between gap-3 px-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{stay.hotelName}</p>          <h1 className="mt-1 text-3xl font-bold leading-tight">
            {t('home.welcome')}
            <br />
            {t('home.room', { number: stay.roomNumber })}          </h1>
        </div>
        <LanguageSwitcher />
      </header>

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