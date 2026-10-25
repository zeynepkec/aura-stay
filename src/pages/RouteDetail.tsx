import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowLeft, Clock, ExternalLink, Lightbulb, MapPin, Navigation, Star } from 'lucide-react'
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { pick } from '../data/menu'
import { mapsRouteUrl, mapsSearchUrl, routes, routeTags } from '../data/routes'
import { routeIcon, routeIcons } from './Explore'
import '../translations/explore'
import '../translations/routeDetail'

// Haritadaki numaralı siyah durak işareti
function numberIcon(n: number) {
  return L.divIcon({
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `<span style="display:flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:9999px;background:#0A0A0A;color:#fff;border:2px solid #fff;font:700 12px Inter,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.3)">${n}</span>`,
  })
}

export default function RouteDetail() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const route = routes.find((r) => r.id === useParams().routeId)

  if (!route) {
    return <h1 className="p-5 text-2xl font-bold">{t('routeDetail.not_found')}</h1>
  }

  const Icon = routeIcon(route)
  const points = route.stops.map((s) => [s.lat, s.lng] as [number, number])

  // Google Haritalar yol tarifi linki: ilk durak → ara duraklar → son durak (yürüyüş)
  const directionsUrl = mapsRouteUrl(route.stops)

  return (
    <div>
      <Link to="/explore" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-sm text-muted">
        <ArrowLeft size={18} />
        {t('routeDetail.back')}
      </Link>

      {/* Başlık kartı — Peach Salmon */}
      <header className="mx-5 rounded-card bg-activity p-5">
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-card/60">
            <Icon size={22} />
          </span>
          <span className="flex items-center gap-1 rounded-full bg-card/60 px-3 py-1 text-xs font-semibold">
            <Star size={13} className="fill-primary text-primary" />
            {route.rating}
          </span>
        </div>
        <h1 className="mt-6 text-2xl font-bold leading-tight">{pick(route.title, lang)}</h1>
        <p className="mt-1 text-sm text-ink/70">{t('explore.shared_by', { name: route.sharedBy })}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
          <span className="flex items-center gap-1 rounded-full bg-card/60 px-3 py-1.5"><Clock size={13} />{t('explore.min', { count: route.minutes })}</span>
          <span className="flex items-center gap-1 rounded-full bg-card/60 px-3 py-1.5"><MapPin size={13} />{t('explore.km', { count: route.km })}</span>
          <span className="rounded-full bg-card/60 px-3 py-1.5">{t('explore.stops', { count: route.stops.length })}</span>
          {route.tags.map((tag) => {
            const TagIcon = routeIcons[tag]
            return (
              <span key={tag} className="flex items-center gap-1 rounded-full bg-card/60 px-3 py-1.5">
                <TagIcon size={13} />
                {pick(routeTags[tag].name, lang)}
              </span>
            )
          })}
        </div>
      </header>

      <div className="space-y-6 px-5 pt-6">
        {/* Açıklama */}
        <section>
          <h2 className="mb-2 text-base font-bold">{t('routeDetail.about')}</h2>
          <p className="text-sm leading-relaxed text-ink/80">{pick(route.description, lang)}</p>
          {/* Yerel ipucu */}
          <p className="mt-3 flex gap-2 rounded-xl bg-primary-soft p-3 text-sm">
            <Lightbulb size={16} className="mt-0.5 shrink-0 text-primary" />
            <span>
              <b>{t('routeDetail.tip')}: </b>
              {pick(route.tip, lang)}
            </span>
          </p>
        </section>

        {/* Harita */}
        <section>
          <h2 className="mb-3 text-base font-bold">{t('routeDetail.map')}</h2>
          <div className="isolate overflow-hidden rounded-card border border-line">
            <MapContainer bounds={points} boundsOptions={{ padding: [30, 30] }} scrollWheelZoom={false} className="h-64 w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline positions={points} pathOptions={{ color: '#7B92BC', weight: 4, dashArray: '6 8' }} />
              {route.stops.map((stop, i) => (
                <Marker key={stop.place} position={[stop.lat, stop.lng]} icon={numberIcon(i + 1)} />
              ))}
            </MapContainer>
          </div>
        </section>

        {/* Duraklar */}
        <section>
          <h2 className="mb-3 text-base font-bold">{t('routeDetail.stops')}</h2>
          <ol className="rounded-card border border-line bg-card p-4">
            {route.stops.map((stop, i) => (
              <li key={stop.place} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-card">{i + 1}</span>
                  {i < route.stops.length - 1 && <span className="my-1 h-6 w-0.5 bg-line" />}
                </div>
                <div className="flex flex-1 items-start justify-between gap-2 pt-1">
                  <div>
                    <p className="text-sm font-semibold">{pick(stop.name, lang)}</p>
                    <p className="text-xs text-muted">{t('explore.min', { count: stop.minutes })}</p>
                  </div>
                  <a
                    href={mapsSearchUrl(stop.place)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t('routeDetail.open_map')}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background text-muted"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Yol tarifi */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-card"
        >
          <Navigation size={18} />
          {t('routeDetail.directions')}
        </a>
      </div>
    </div>
  )
}