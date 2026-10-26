import { useState } from 'react'
import { ArrowRight, Compass, Plus, Footprints, Landmark, Palette, Star, Sunset, Trees, Users, Utensils } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { pick } from '../data/menu'
import { routeTags, type RouteTag, type TravelRoute } from '../data/routes'
import { useRouteRatings } from '../lib/routeRatings'
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
  const { ratingOf } = useRouteRatings()
  const visible = filter === 'all' ? all : all.filter((r) => r.tags.includes(filter))

  return (
    <div>
      {/* Tabela: rotalar */}
      <header className="bg-service px-5 pb-5 pt-6">
        <div className="flex flex-col items-start gap-4">
          <div>
            <h1 className="text-[34px] leading-[1.15]">{t('explore.hero_title')}</h1>
            <p className="mt-1.5 text-sm">{t('explore.hero_text')}</p>
          </div>
          {/* Misafir kendi rotasını ekleyebilir */}
          <Link to="/explore/new" className="flex h-11 shrink-0 items-center gap-1.5 rounded-[10px] bg-ink px-4 font-display text-base font-semibold text-card">
            <Plus size={18} />
            {t('addRoute.button')}
          </Link>
        </div>
      </header>

      {/* Kategori filtreleri */}
      <nav className="flex gap-2 overflow-x-auto px-5 pb-3 pt-4">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] px-3.5 font-display text-[15px] font-bold ${
              filter === f ? 'bg-primary text-card' : 'border border-line bg-card'
            }`}
          >
            {f === 'all' ? (
              t('explore.categories.all')
            ) : (
              <>
                {(() => {
                  const TagIcon = routeIcons[f]
                  return <TagIcon size={16} />
                })()}
                {pick(routeTags[f].name, lang)}
              </>
            )}
          </button>
        ))}
      </nav>

      <p className="px-5 pb-1 text-sm text-muted">{t('explore.count', { count: visible.length })}</p>

      {/* Rotalar: hat listesi */}
      <ul className="px-5 pb-6">
        {visible.map((route) => {
          const score = ratingOf(route)
          return (
            <li key={route.id}>
              <Link to={`/explore/${route.id}`} className="flex items-center gap-3.5 border-b border-line py-3.5">
                <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[6px] bg-tile-silver px-1.5 font-sans text-[16px] font-semibold text-card">
                  R{all.indexOf(route) + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-[20px] leading-tight">{pick(route.title, lang)}</h2>
                    <span className="flex shrink-0 items-center gap-0.5 pt-0.5 text-sm font-bold">
                      {score.value > 0 ? (
                        <>
                          <Star size={14} className="fill-accent text-accent" />
                          {score.value}
                          {score.count > 0 && <span className="font-medium text-muted">({score.count})</span>}
                        </>
                      ) : (
                        <span className="rounded-md bg-primary-soft px-2 py-0.5 text-xs text-primary">{t('addRoute.new')}</span>
                      )}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {t('explore.min', { count: route.minutes })}, {t('explore.km', { count: route.km })}, {t('explore.stops', { count: route.stops.length })}. {t('explore.shared_by', { name: route.sharedBy })}
                  </p>
                </div>
                <ArrowRight size={20} className="shrink-0" />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}