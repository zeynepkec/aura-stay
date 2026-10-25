import { useState } from 'react'
import { Clock, Compass, Plus, Footprints, Landmark, MapPin, Palette, Star, Sunset, Trees, Users, Utensils } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { pick } from '../data/menu'
import { routeTags, type RouteTag, type TravelRoute } from '../data/routes'
import { useAllRoutes } from '../lib/routesStore'
import '../translations/addRoute'
import '../translations/explore'
import { Link } from 'react-router-dom'

export const routeIcons: Record<RouteTag, typeof Compass> = {
  history: Landmark,
  food: Utensils,
  sunset: Sunset,
  family: Users,
  easy: Footprints,
  culture: Palette,
  nature: Trees,
}

// Rotanın ikonu: ilk etiketine göre
export const routeIcon = (route: TravelRoute) => routeIcons[route.tags[0]] ?? Compass

const filters: ('all' | RouteTag)[] = ['all', ...(Object.keys(routeTags) as RouteTag[])]

export default function Explore() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const [filter, setFilter] = useState<'all' | RouteTag>('all')

  const { all } = useAllRoutes()
  const visible = filter === 'all' ? all : all.filter((r) => r.tags.includes(filter))

  return (
    <div>
      <header className="px-5 pt-6">
        <h1 className="text-3xl font-bold">{t('explore.hero_title')}</h1>
        <p className="mt-1 text-muted">{t('explore.hero_text')}</p>
        {/* Misafir kendi rotasını ekleyebilir */}
        <Link to="/explore/new" className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-card">
          <Plus size={20} />
          {t('addRoute.button')}
        </Link>
      </header>

      {/* Kategori filtreleri */}
      <nav className="flex gap-2 overflow-x-auto px-5 py-5">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${
              filter === f ? 'bg-primary text-card' : 'border border-line bg-card'
            }`}
          >
            {f === 'all' ? (
              t('explore.categories.all')
            ) : (
              <span className="flex items-center gap-1.5">
                {(() => {
                  const TagIcon = routeIcons[f]
                  return <TagIcon size={16} />
                })()}
                {pick(routeTags[f].name, lang)}
              </span>
            )}
          </button>
        ))}
      </nav>

      <p className="px-5 pb-3 text-sm text-muted">{t('explore.count', { count: visible.length })}</p>

      {/* Rota kartları */}
      <ul className="space-y-3 px-5 pb-6">
        {visible.map((route) => {
          const Icon = routeIcon(route)
          return (
            <li key={route.id}>
              <Link to={`/explore/${route.id}`} className="flex gap-4 rounded-card border border-line bg-card p-3">
              {/* Sol taraf — Peach Salmon */}
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-activity">
                <Icon size={28} strokeWidth={1.6} />
              </span>
              <div className="min-w-0 flex-1 py-0.5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold leading-snug">{pick(route.title, lang)}</h2>
                  <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold">
                    {route.rating > 0 ? (
                      <>
                        <Star size={14} className="fill-primary text-primary" />
                        {route.rating}
                      </>
                    ) : (
                      <span className="rounded-md bg-primary-soft px-2 py-0.5 text-primary">{t('addRoute.new')}</span>
                    )}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{t('explore.shared_by', { name: route.sharedBy })}</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink/70">
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