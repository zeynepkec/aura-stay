import { useState } from 'react'
import { Clock, Compass, Landmark, MapPin, Mountain, Sailboat, Star, Utensils } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { pick } from '../data/menu'
import { routes, type RouteCategory } from '../data/routes'
import '../translations/explore'
import { Link } from 'react-router-dom'

export const routeIcons: Record<RouteCategory, typeof Compass> = {
  culture: Landmark,
  nature: Mountain,
  food: Utensils,
  activity: Sailboat,
}

const filters: ('all' | RouteCategory)[] = ['all', 'culture', 'nature', 'food', 'activity']

export default function Explore() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const [filter, setFilter] = useState<'all' | RouteCategory>('all')

  const visible = filter === 'all' ? routes : routes.filter((r) => r.category === filter)

  return (
    <div>
      {/* Başlık alanı — lila-pembe geçiş */}
      <section className="mx-5 mt-6 rounded-card bg-gradient-to-br from-discover to-discover-pink p-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card/60">
          <Compass size={20} />
        </span>
        <h1 className="mt-8 text-3xl font-bold leading-tight">{t('explore.hero_title')}</h1>
        <p className="mt-1 text-sm text-ink/70">{t('explore.hero_text')}</p>
      </section>

      {/* Kategori filtreleri */}
      <nav className="flex gap-2 overflow-x-auto px-5 py-5">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium ${
              filter === f ? 'bg-ink text-card' : 'border border-line bg-card'
            }`}
          >
            {t(`explore.categories.${f}`)}
          </button>
        ))}
      </nav>

      <p className="px-5 pb-3 text-xs text-muted">{t('explore.count', { count: visible.length })}</p>

      {/* Rota kartları */}
      <ul className="space-y-3 px-5">
        {visible.map((route) => {
          const Icon = routeIcons[route.category]
          return (
            <li key={route.id}>
              <Link to={`/explore/${route.id}`} className="flex gap-4 rounded-card border border-line bg-card p-3">              {/* Sol taraf — Peach Salmon */}
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-activity">
                <Icon size={30} strokeWidth={1.6} />
              </span>
              <div className="min-w-0 flex-1 py-0.5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-bold leading-snug">{pick(route.title, lang)}</h2>
                  <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold">
                    <Star size={13} className="fill-accent text-accent" />
                    {route.rating}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted">{t('explore.shared_by', { name: route.sharedBy })}</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink/70">
                  <span className="flex items-center gap-1"><Clock size={13} />{t('explore.min', { count: route.minutes })}</span>
                  <span className="flex items-center gap-1"><MapPin size={13} />{t('explore.km', { count: route.km })}</span>
                  <span>{t('explore.stops', { count: route.stops.length })}</span>
                </div>
              </div>
              </Link>
            </li>          )
        })}
      </ul>
    </div>
  )
}