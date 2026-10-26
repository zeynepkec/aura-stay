import { Fragment } from 'react'
import 'leaflet/dist/leaflet.css'
import { ArrowLeft, Clock, Lightbulb, MapPin, Navigation, Star, Trash2 } from 'lucide-react'
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { pick } from '../data/menu'
import { HOTEL_LOCATION, mapsRouteUrl, mapsSearchUrl } from '../data/routes'
import { stay } from '../data/stay'
import { numberIcon } from '../lib/mapIcons'
import { useRouteRatings } from '../lib/routeRatings'
import { useAllRoutes, walkMinutes } from '../lib/routesStore'
import { getSession } from '../lib/session'
import '../translations/addRoute'
import '../translations/metro'
import '../translations/rateRoute'
import '../translations/explore'
import '../translations/routeDetail'

export default function RouteDetail() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const navigate = useNavigate()
  const { all, setGuestRoutes } = useAllRoutes()
  const { ratingOf, myRating, rate } = useRouteRatings()
  const route = all.find((r) => r.id === useParams().routeId)

  if (!route) {
    return <h1 className="p-5 text-2xl font-bold">{t('routeDetail.not_found')}</h1>
  }

  const score = ratingOf(route)
  const mine = myRating(route.id)
  const points = route.stops.map((s) => [s.lat, s.lng] as [number, number])

  // Google Haritalar yol tarifi linki: ilk durak → ara duraklar → son durak (yürüyüş)
  const directionsUrl = mapsRouteUrl(route.stops)

  return (
    <div>
      {/* Başlık: rotanın hattı — Sage */}
      <header className="bg-service px-5 pb-5 pt-3">
        <Link to="/explore" className="-ml-1 flex h-10 w-fit items-center gap-1 text-sm">
          <ArrowLeft size={18} />
          {t('routeDetail.back')}
        </Link>
        <div className="mt-1 flex items-center gap-3">
          <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-lg bg-ink px-1.5 font-title text-[20px] font-extrabold text-card">
            R{all.indexOf(route) + 1}
          </span>
          <h1 className="text-[30px] leading-none">{pick(route.title, lang)}</h1>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5 text-sm font-bold">
          <span className="flex items-center gap-1 rounded-md bg-card px-2.5 py-1"><Clock size={14} />{t('explore.min', { count: route.minutes })}</span>
          <span className="flex items-center gap-1 rounded-md bg-card px-2.5 py-1"><MapPin size={14} />{t('explore.km', { count: route.km })}</span>
          <span className="rounded-md bg-card px-2.5 py-1">{t('explore.stops', { count: route.stops.length })}</span>
          <span className="flex items-center gap-1 rounded-md bg-card px-2.5 py-1">
            {score.value > 0 ? (
              <>
                <Star size={14} className="fill-accent text-accent" />
                {score.value}
                {score.count > 0 && <span className="font-medium text-muted">({t('rateRoute.count', { count: score.count })})</span>}
              </>
            ) : (
              t('addRoute.new')
            )}
          </span>
          <span className="rounded-md bg-card/55 px-2.5 py-1 font-medium">{t('explore.shared_by', { name: route.sharedBy })}</span>
        </div>
      </header>

      <div className="space-y-6 px-5 pb-6 pt-5">
        {/* Açıklama ve yerel ipucu */}
        <section>
          <p className="leading-relaxed text-ink/85">{pick(route.description, lang)}</p>
          {pick(route.tip, lang) && (
            <p className="mt-3 flex gap-2 rounded-card bg-primary-soft p-3 text-sm">
              <Lightbulb size={16} className="mt-0.5 shrink-0" />
              <span>
                <b>{t('routeDetail.tip')}: </b>
                {pick(route.tip, lang)}
              </span>
            </p>
          )}
        </section>

        {/* Hat şeması: otelden başlayıp duraklar, aralarda yürüyüş */}
        <section>
          <h2 className="mb-3 text-[22px]">{t('routeDetail.stops')}</h2>
          <ol>
            {/* Başlangıç: otel */}
            <li className="flex min-h-[50px] gap-3.5">
              <span className="relative w-10 shrink-0">
                <span className="absolute bottom-0 left-[17px] top-3 w-1.5 bg-accent" />
                <span className="absolute left-[10px] top-1 h-5 w-5 rounded-[4px] bg-ink" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold">{stay.hotelName}</p>
                <p className="text-[13px] text-muted">{t('metro.start')}</p>
              </div>
            </li>
            {route.stops.map((stop, i) => {
              const prev = i === 0 ? HOTEL_LOCATION : route.stops[i - 1]
              const last = i === route.stops.length - 1
              return (
                <Fragment key={`${stop.place}-${i}`}>
                  {/* Yürüyüş: kesik çizgi */}
                  <li className="flex min-h-[34px] gap-3.5">
                    <span className="relative w-10 shrink-0">
                      <span className="absolute inset-y-0 left-[17px] w-1.5 bg-[repeating-linear-gradient(#8A8A8A_0_6px,transparent_6px_11px)]" />
                    </span>
                    <p className="self-center text-sm text-muted">{t('metro.walk', { count: walkMinutes(prev, stop) })}</p>
                  </li>
                  {/* Durak */}
                  <li className="flex min-h-[72px] gap-3.5">
                    <span className="relative w-10 shrink-0">
                      <span className={`absolute left-[17px] top-0 w-1.5 bg-accent ${last ? 'h-2.5' : 'bottom-0'}`} />
                      <span className="absolute left-[7px] top-1 h-[26px] w-[26px] rounded-full border-[6px] border-ink bg-card" />
                    </span>
                    <div className="flex flex-1 items-start justify-between gap-2 pt-1">
                      <div>
                        <p className="font-title text-xl font-extrabold leading-tight">{pick(stop.name, lang)}</p>
                        <p className="text-sm text-muted">
                          {t('explore.min', { count: stop.minutes })}
                          {last ? `, ${t('metro.last_stop')}` : ''}
                        </p>
                      </div>
                      <a
                        href={mapsSearchUrl(stop.place)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${t('metro.open_map')}: ${pick(stop.name, lang)}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-line bg-card"
                      >
                        <MapPin size={18} />
                      </a>
                    </div>
                  </li>
                </Fragment>
              )
            })}
          </ol>
        </section>

        {/* Harita */}
        <section>
          <h2 className="mb-3 text-[22px]">{t('routeDetail.map')}</h2>
          <div className="isolate overflow-hidden rounded-card border border-line">
            <MapContainer bounds={points} boundsOptions={{ padding: [30, 30] }} scrollWheelZoom={false} className="h-60 w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline positions={points} pathOptions={{ color: '#0A0A0A', weight: 6 }} />
              {route.stops.map((stop, i) => (
                <Marker key={`${stop.place}-${i}`} position={[stop.lat, stop.lng]} icon={numberIcon(i + 1)} />
              ))}
            </MapContainer>
          </div>
        </section>

        {/* Yol tarifi */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-[10px] bg-ink font-display text-lg font-extrabold text-card"
        >
          <Navigation size={18} />
          {t('routeDetail.directions')}
        </a>

        {/* Rotayı puanla */}
        <section className="rounded-card border border-line bg-card p-4 text-center">
          <h2 className="text-xl">{t(mine ? 'rateRoute.thanks' : 'rateRoute.title')}</h2>
          <p className="mt-0.5 text-xs text-muted">{t(mine ? 'rateRoute.change' : 'rateRoute.text')}</p>
          <div className="mt-3 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => rate(route.id, n)}
                aria-label={t('rateRoute.star', { count: n })}
                aria-pressed={mine === n}
                className="flex h-11 w-11 items-center justify-center"
              >
                <Star size={30} className={n <= mine ? 'fill-accent text-accent' : 'text-line'} />
              </button>
            ))}
          </div>
        </section>

        {/* Misafir kendi eklediği rotayı silebilir */}
        {route.room && route.room === getSession()?.room && (
          <button
            type="button"
            onClick={() => {
              if (!window.confirm(t('addRoute.delete_confirm'))) return
              setGuestRoutes((prev) => prev.filter((r) => r.id !== route.id))
              navigate('/explore', { replace: true })
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-line bg-card text-sm font-semibold text-muted"
          >
            <Trash2 size={18} />
            {t('addRoute.delete')}
          </button>
        )}
      </div>
    </div>
  )
}