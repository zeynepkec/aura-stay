import { useState } from 'react'
import { Bath, Car, Check, ChevronRight, Copy, MessageCircle, SprayCan, UtensilsCrossed, Wine, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import KeyTag from '../components/KeyTag'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { campaign, hotel } from '../data/hotel'
import { pick } from '../data/menu'
import { routes } from '../data/routes'
import { stay } from '../data/stay'
import { useServices } from '../store/ServiceContext'
import { ORDER_STEPS, useStay } from '../store/StayContext'
import { routeIcon } from './Explore'
import { serviceIcons } from './Services'
import '../translations/home'
import '../translations/orders'
import '../translations/services'
import '../translations/tables'

type Action = { to: string; key: string; icon: LucideIcon; tile: string; desc?: string }

// Ne yapmak istersin? — en sık kullanılanlar üstte
const actions: Action[] = [
  { to: '/dining', key: 'action_food', icon: UtensilsCrossed, tile: 'bg-service', desc: 'action_food_desc' },
  { to: '/services/cleaning', key: 'action_cleaning', icon: SprayCan, tile: 'bg-service' },
  { to: '/services/towels', key: 'action_towels', icon: Bath, tile: 'bg-service' },
  { to: '/services/table', key: 'action_table', icon: Wine, tile: 'bg-service' },
  { to: '/services/transfer', key: 'action_transfer', icon: Car, tile: 'bg-service' },
  { to: '/assistant', key: 'action_assistant', icon: MessageCircle, tile: 'bg-discover', desc: 'action_assistant_desc' },
]

// Günün saatine göre önerilen rotalar: akşamüstü gün batımı rotaları öne çıkar
function suggestedRoutes(hour: number) {
  const sunsetFirst = hour >= 15 && hour < 20
  return [...routes]
    .sort((a, b) => {
      const score = (r: (typeof routes)[number]) => (sunsetFirst && r.tags.includes('sunset') ? 2 : 0) + (r.featured ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, 4)
}

function greetingKey(hour: number) {
  if (hour < 12) return 'home.greeting_morning'
  if (hour < 18) return 'home.greeting_day'
  return 'home.greeting_evening'
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { orders } = useStay()
  const { requests } = useServices()
  const [copied, setCopied] = useState(false)
  const hour = new Date().getHours()

  // Teslim edilmemiş en yeni sipariş
  const activeOrder = orders.find((o) => o.status !== 'delivered')
  const step = activeOrder ? ORDER_STEPS.indexOf(activeOrder.status) : -1

  // Bekleyen ya da işlemdeki talepler (en fazla 3)
  const activeRequests = requests.filter((r) => r.status === 'pending' || r.status === 'in_progress').slice(0, 3)

  const date = (time: number) => new Date(time).toLocaleDateString(lang, { day: 'numeric', month: 'short' })

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(hotel.wifi.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Kopyalama desteklenmiyorsa şifre zaten ekranda yazıyor
    }
  }

  return (
    <div className="pb-6 pt-5">
      <header className="flex items-center justify-between px-5">
        <p className="text-base font-semibold">AURA Stay</p>
        <LanguageSwitcher />
      </header>

      {/* Anahtar etiketi: oda numarası ve konaklama tarihleri */}
      <section className="px-5 pt-6">
        <p className="text-lg text-muted">{t(greetingKey(hour))}</p>
        <div className="mt-3">
          <KeyTag caption={`${hotel.name}, ${date(stay.checkIn)} – ${date(stay.checkOut)}`}>{stay.roomNumber}</KeyTag>
        </div>
      </section>

      {/* Şu an: sipariş ve talep durumları (personel değiştirdikçe canlı güncellenir) */}
      {(activeOrder || activeRequests.length > 0) && (
        <section className="px-5 pt-8">
          <h2 className="mb-3 text-xl font-bold">{t('home.right_now')}</h2>
          <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
            {activeOrder && (
              <Link to={`/orders/${activeOrder.id}`} className="block p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted">{t('home.order_no', { id: activeOrder.id })}</p>
                    <p className="text-lg font-semibold">{t(`orders.status.${activeOrder.status}`)}</p>
                  </div>
                  <ChevronRight size={20} className="text-muted" />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {ORDER_STEPS.map((s, i) => (
                    <span key={s} className={`h-1.5 rounded-full ${i <= step ? 'bg-primary' : 'bg-line'}`} />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted">{t(`orders.status_desc.${activeOrder.status}`)}</p>
              </Link>
            )}
            {activeRequests.map((r) => {
              const Icon = serviceIcons[r.type]
              return (
                <Link key={r.id} to="/services" className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-service">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1 font-medium">{t(`services.types.${r.type}.title`)}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      r.status === 'in_progress' ? 'bg-primary-soft text-primary' : 'bg-background text-muted'
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

      {/* Ne yapmak istersin? — büyük, okunaklı satırlar */}
      <section className="px-5 pt-8">
        <h2 className="mb-3 text-xl font-bold">{t('home.what_need')}</h2>
        <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
          {actions.map(({ to, key, icon: Icon, tile, desc }) => (
            <li key={key}>
              <Link to={to} className="flex min-h-[64px] items-center gap-4 px-4 py-3 active:bg-background">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tile}`}>
                  <Icon size={20} />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{t(`home.${key}`)}</span>
                  {desc && <span className="block text-sm text-muted">{t(`home.${desc}`, { hours: hotel.roomService })}</span>}
                </span>
                <ChevronRight size={20} className="text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Wi-Fi: şifre tek dokunuşla kopyalanır */}
      <section className="px-5 pt-8">
        <div className="flex items-center gap-4 rounded-card border border-line bg-card p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted">{t('home.wifi')}, {hotel.wifi.name}</p>
            <p className="mt-0.5 text-xl font-semibold tracking-wide">{hotel.wifi.password}</p>
          </div>
          <button
            type="button"
            onClick={copyPassword}
            className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? t('home.copied') : t('home.copy')}
          </button>
        </div>
      </section>

      {/* Kampanya — düz koyu mavi şerit */}
      <section className="px-5 pt-4">
        <Link to="/services/table?venue=rooftop" className="block rounded-card bg-campaign p-5 text-card">
          <p className="text-sm text-card/70">{t('home.campaign_tag')}, {hotel.rooftop}</p>
          <h2 className="mt-1 text-xl font-bold leading-snug">{pick(campaign.title, lang)}</h2>
          <p className="mt-1 text-card/80">{pick(campaign.description, lang)}</p>
          <span className="mt-4 inline-flex h-11 items-center rounded-xl bg-card px-4 text-sm font-semibold text-campaign">
            {pick(campaign.cta, lang)}
          </span>
        </Link>
      </section>

      {/* Rotalar — Peach Salmon */}
      <section className="pt-8">
        <div className="mb-3 flex items-baseline justify-between px-5">
          <h2 className="text-xl font-bold">{t('home.today_near')}</h2>
          <Link to="/explore" className="text-sm font-semibold text-primary">{t('home.see_all')}</Link>
        </div>
        <div className="flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-1">
          {suggestedRoutes(hour).map((route) => {
            const Icon = routeIcon(route)
            return (
              <Link key={route.id} to={`/explore/${route.id}`} className="flex w-[232px] shrink-0 snap-start flex-col rounded-card bg-activity p-4">
                <Icon size={24} strokeWidth={1.75} />
                <h3 className="mt-6 text-lg font-semibold leading-snug">{pick(route.title, lang)}</h3>
                <p className="mt-1 text-sm text-ink/70">
                  {t('home.min', { count: route.minutes })}, {t('home.km', { count: route.km })}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Saatler */}
      <section className="px-5 pt-8">
        <h2 className="mb-3 text-xl font-bold">{t('home.hours')}</h2>
        <dl className="divide-y divide-line rounded-card border border-line bg-card">
          {[
            [t('home.breakfast'), hotel.breakfast],
            [t('home.room_service'), hotel.roomService],
            [t('home.rooftop'), hotel.rooftop],
            [t('home.checkout'), hotel.checkOut],
            [t('home.reception'), pick(hotel.reception, lang)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 px-4 py-3">
              <dt className="text-muted">{label}</dt>
              <dd className="text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Konaklamam */}
      <section className="px-5 pt-4">
        <Link to="/stay" className="flex min-h-[64px] items-center gap-4 rounded-card border border-line bg-card px-4 py-3">
          <span className="flex-1">
            <span className="block font-semibold">{t('home.my_stay')}</span>
            <span className="block text-sm text-muted">{t('home.my_stay_text')}</span>
          </span>
          <ChevronRight size={20} className="text-muted" />
        </Link>
      </section>
    </div>
  )
}
