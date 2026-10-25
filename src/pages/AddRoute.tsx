import { useState, type FormEvent } from 'react'
import 'leaflet/dist/leaflet.css'
import { ArrowLeft, Minus, Plus, X } from 'lucide-react'
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { pick } from '../data/menu'
import { HOTEL_LOCATION, routeTags, type RouteTag, type Stop } from '../data/routes'
import { hotelIcon, numberIcon, pendingIcon } from '../lib/mapIcons'
import { totalMinutes, useAllRoutes, walkingKm } from '../lib/routesStore'
import { getSession } from '../lib/session'
import { routeIcons } from './Explore'
import '../translations/addRoute'
import '../translations/explore'

type Point = { lat: number; lng: number }

// Misafirin yazdığı metin üç dilde de aynı görünür
const same = (text: string) => ({ tr: text, en: text, el: text })

// Haritaya dokunulan yeri seç
function PickPoint({ onPick }: { onPick: (p: Point) => void }) {
  useMapEvents({ click: (e) => onPick({ lat: e.latlng.lat, lng: e.latlng.lng }) })
  return null
}

export default function AddRoute() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const navigate = useNavigate()
  const { setGuestRoutes } = useAllRoutes()
  const room = getSession()?.room ?? ''

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<RouteTag[]>([])
  const [stops, setStops] = useState<Stop[]>([])
  const [tip, setTip] = useState('')
  const [author, setAuthor] = useState('')

  // Eklenmekte olan durak
  const [point, setPoint] = useState<Point | null>(null)
  const [stopName, setStopName] = useState('')
  const [stopMinutes, setStopMinutes] = useState(20)
  const [showMissing, setShowMissing] = useState(false)

  const toggleTag = (tag: RouteTag) => setTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]))

  const addStop = () => {
    if (!point || !stopName.trim()) return
    const label = stopName.trim()
    setStops((prev) => [...prev, { name: same(label), place: `${point.lat.toFixed(5)},${point.lng.toFixed(5)}`, minutes: stopMinutes, ...point }])
    setPoint(null)
    setStopName('')
    setStopMinutes(20)
  }

  const ready = name.trim() && description.trim() && tags.length > 0 && stops.length >= 2

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!ready) {
      setShowMissing(true)
      return
    }
    const id = `guest-${Date.now().toString(36)}`
    setGuestRoutes((prev) => [
      {
        id,
        tags,
        title: same(name.trim()),
        description: same(description.trim()),
        tip: same(tip.trim()),
        sharedBy: author.trim() || t('addRoute.room_name', { room }),
        minutes: totalMinutes(stops),
        km: walkingKm(stops),
        rating: 0,
        stops,
        room,
        createdAt: Date.now(),
      },
      ...prev,
    ])
    navigate(`/explore/${id}`, { replace: true })
  }

  const field = 'w-full rounded-xl border border-line bg-card px-4 text-base outline-none focus:border-primary'
  const linePoints = stops.map((s) => [s.lat, s.lng] as [number, number])

  return (
    <form onSubmit={submit} className="pb-8">
      <Link to="/explore" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-muted">
        <ArrowLeft size={18} />
        {t('addRoute.back')}
      </Link>

      <header className="px-5 pb-5 pt-2">
        <h1 className="text-3xl font-bold">{t('addRoute.title')}</h1>
        <p className="mt-1 text-muted">{t('addRoute.text')}</p>
      </header>

      <div className="space-y-6 px-5">
        <div>
          <label htmlFor="route-name" className="mb-1.5 block font-semibold">{t('addRoute.name')}</label>
          <input id="route-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder={t('addRoute.name_ph')} className={`${field} h-12`} />
        </div>

        <div>
          <label htmlFor="route-desc" className="mb-1.5 block font-semibold">{t('addRoute.description')}</label>
          <textarea id="route-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} maxLength={240} placeholder={t('addRoute.description_ph')} className={`${field} resize-none py-3`} />
        </div>

        {/* Etiketler */}
        <fieldset>
          <legend className="mb-2 font-semibold">{t('addRoute.tags')}</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(routeTags) as RouteTag[]).map((tag) => {
              const Icon = routeIcons[tag]
              const on = tags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={on}
                  className={`flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold ${on ? 'border-primary bg-primary text-card' : 'border-line bg-card'}`}
                >
                  <Icon size={16} />
                  {pick(routeTags[tag].name, lang)}
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Duraklar: haritaya dokun → ad yaz → ekle */}
        <section>
          <h2 className="font-semibold">{t('addRoute.stops')}</h2>
          <p className="mb-3 text-sm text-muted">{t('addRoute.stops_help')}</p>

          <div className="isolate overflow-hidden rounded-card border border-line">
            <MapContainer center={[HOTEL_LOCATION.lat, HOTEL_LOCATION.lng]} zoom={15} scrollWheelZoom={false} className="h-72 w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <PickPoint onPick={setPoint} />
              <Marker position={[HOTEL_LOCATION.lat, HOTEL_LOCATION.lng]} icon={hotelIcon} interactive={false} />
              {linePoints.length > 1 && <Polyline positions={linePoints} pathOptions={{ color: '#3C4C7F', weight: 4, dashArray: '6 8' }} />}
              {stops.map((s, i) => (
                <Marker key={`${s.place}-${i}`} position={[s.lat, s.lng]} icon={numberIcon(i + 1)} />
              ))}
              {point && <Marker position={[point.lat, point.lng]} icon={pendingIcon} interactive={false} />}
            </MapContainer>
          </div>

          {/* Yeni durak bilgileri */}
          <div className="mt-3 space-y-3 rounded-card border border-line bg-card p-4">
            <div>
              <label htmlFor="stop-name" className="mb-1.5 block text-sm font-semibold">{t('addRoute.stop_name')}</label>
              <input
                id="stop-name"
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addStop()
                  }
                }}
                maxLength={50}
                placeholder={t('addRoute.stop_name_ph')}
                className={`${field} h-12`}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">{t('addRoute.stop_minutes')}</span>
              <div className="flex items-center gap-1 rounded-xl border border-line">
                <button type="button" onClick={() => setStopMinutes((m) => Math.max(5, m - 5))} aria-label="-5" className="flex h-11 w-11 items-center justify-center">
                  <Minus size={18} />
                </button>
                <span className="min-w-[64px] text-center font-semibold">{t('explore.min', { count: stopMinutes })}</span>
                <button type="button" onClick={() => setStopMinutes((m) => Math.min(240, m + 5))} aria-label="+5" className="flex h-11 w-11 items-center justify-center">
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={addStop}
              disabled={!point || !stopName.trim()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-primary font-semibold text-primary disabled:border-line disabled:text-muted"
            >
              <Plus size={18} />
              {point ? t('addRoute.stop_add') : t('addRoute.stop_pick')}
            </button>
          </div>

          {/* Eklenen duraklar */}
          {stops.length === 0 ? (
            <p className="mt-3 text-sm text-muted">{t('addRoute.no_stops')}</p>
          ) : (
            <>
              <ol className="mt-3 divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
                {stops.map((s, i) => (
                  <li key={`${s.place}-${i}`} className="flex items-center gap-3 px-4 py-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-card">{i + 1}</span>
                    <span className="flex-1">
                      <span className="block font-medium">{s.name.tr}</span>
                      <span className="block text-sm text-muted">{t('explore.min', { count: s.minutes })}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setStops((prev) => prev.filter((_, j) => j !== i))}
                      aria-label={t('addRoute.stop_remove')}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-muted"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ol>
              {stops.length >= 2 && (
                <p className="mt-2 text-sm text-muted">{t('addRoute.summary', { km: walkingKm(stops), min: totalMinutes(stops) })}</p>
              )}
            </>
          )}
        </section>

        <div>
          <label htmlFor="route-tip" className="mb-1.5 block font-semibold">{t('addRoute.tip')}</label>
          <input id="route-tip" value={tip} onChange={(e) => setTip(e.target.value)} maxLength={140} placeholder={t('addRoute.tip_ph')} className={`${field} h-12`} />
        </div>

        <div>
          <label htmlFor="route-author" className="mb-1.5 block font-semibold">{t('addRoute.your_name')}</label>
          <input id="route-author" value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={30} placeholder={t('addRoute.your_name_ph', { room })} className={`${field} h-12`} />
        </div>

        {showMissing && !ready && <p role="alert" className="rounded-xl bg-activity/50 p-3 text-sm">{t('addRoute.missing')}</p>}

        <button type="submit" className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-card">
          {t('addRoute.submit')}
        </button>
      </div>
    </form>
  )
}
