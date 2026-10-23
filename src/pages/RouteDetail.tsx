import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowLeft, Clock, MapPin, Navigation, Star } from 'lucide-react'
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { pick } from '../data/menu'
import { routes } from '../data/routes'
import { routeIcons } from './Explore'
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

  const Icon = routeIcons[route.category]
  const points = route.stops.map((s) => [s.lat, s.lng] as [number, number])

  // Google Haritalar yol tarifi linki: ilk durak → ara duraklar → son durak
  const first = route.stops[0]
  const last = route.stops[route.stops.length - 1]
  const middle = route.stops.slice(1, -1).map((s) => `${s.lat},${s.lng}`).join('|')
  const directionsUrl =
    `https://www.google.com/maps/dir/?api=1&origin=${first.lat},${first.lng}` +
    `&destination=${last.lat},${last.lng}&waypoints=${middle}&travelmode=walking`

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
            <Star size={13} className="fill-accent text-accent" />
            {route.rating}
          </span>
        </div>
        <h1 className="mt-6 text-2xl font-bold leading-tight">{pick(route.title, lang)}</h1>
        <p className="mt-1 text-sm text-ink/70">{t('explore.shared_by', { name: route.sharedBy })}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
          <span className="flex items-center gap-1 rounded-full bg-card/60 px-3 py-1.5"><Clock size={13} />{t('explore.min', { count: route.minutes })}</span>
          <span className="flex items-center gap-1 rounded-full bg-card/60 px-3 py-1.5"><MapPin size={13} />{t('explore.km', { count: route.km })}</span>
          <span className="rounded-full bg-card/60 px-3 py-1.5">{t('explore.stops', { count: route.stops.length })}</span>
        </div>
      </header>

      <div className="space-y-6 px-5 pt-6">
        {/* Açıklama */}
        <section>
          <h2 className="mb-2 text-base font-bold">{t('routeDetail.about')}</h2>
          <p className="text-sm leading-relaxed text-ink/80">{pick(route.description, lang)}</p>
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
                <Marker key={stop.name} position={[stop.lat, stop.lng]} icon={numberIcon(i + 1)} />
              ))}
            </MapContainer>
          </div>
        </section>

        {/* Duraklar */}
        <section>
          <h2 className="mb-3 text-base font-bold">{t('routeDetail.stops')}</h2>
          <ol className="rounded-card border border-line bg-card p-4">
            {route.stops.map((stop, i) => (
              <li key={stop.name} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-bold text-card">{i + 1}</span>
                  {i < route.stops.length - 1 && <span className="my-1 h-5 w-0.5 bg-line" />}
                </div>
                <p className="pt-1 text-sm font-semibold">{stop.name}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Yol tarifi */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-card"
        >
          <Navigation size={18} />
          {t('routeDetail.directions')}
        </a>
      </div>
    </div>
  )
}