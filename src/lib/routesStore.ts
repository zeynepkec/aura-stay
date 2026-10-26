import { routes as hotelRoutes, type Stop, type TravelRoute } from '../data/routes'
import { useShared } from './shared'

// Misafirlerin eklediği rotalar veritabanında 'aura-routes' listesinde tutulur (tüm cihazlarda görünür)
export const GUEST_ROUTES_KEY = 'aura-routes'

// Otelin rotaları + misafirlerin eklediği rotalar (yeniler önce)
export function useAllRoutes() {
  const [guestRoutes, setGuestRoutes] = useShared<TravelRoute[]>(GUEST_ROUTES_KEY, [])
  const all = [...guestRoutes, ...hotelRoutes]
  return { all, guestRoutes, setGuestRoutes }
}

// İki nokta arası kuş uçuşu mesafe (km)
function distanceKm(a: Stop, b: Stop) {
  const rad = (d: number) => (d * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

// Yürüme mesafesi tahmini: duraklar arası mesafe × 1,3 (sokaklar düz değil), 0,5 km'ye yuvarlanır
export function walkingKm(stops: Stop[]) {
  let total = 0
  for (let i = 1; i < stops.length; i++) total += distanceKm(stops[i - 1], stops[i])
  return Math.max(0.5, Math.round(total * 1.3 * 2) / 2)
}

// Toplam süre: duraklarda geçen süre + yürüyüş (km başına 15 dk)
export const totalMinutes = (stops: Stop[]) => stops.reduce((s, x) => s + x.minutes, 0) + Math.round(walkingKm(stops) * 15)

// İki nokta arası yürüme süresi (dk): kuş uçuşu × 1,3, km başına 15 dk, en az 5 dk, 5'e yuvarlanır
export function walkMinutes(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const km = distanceKm(a as Stop, b as Stop) * 1.3
  return Math.max(5, Math.round((km * 15) / 5) * 5)
}
