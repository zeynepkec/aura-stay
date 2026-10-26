import type { TravelRoute } from '../data/routes'
import { getSession } from './session'
import { useShared } from './shared'

// Misafirlerin rotalara verdiği puanlar (1–5 yıldız). Veritabanında paylaşılır.
// Her oda bir rotaya tek puan verir; tekrar puanlarsa eskisi değişir.
export type RouteRating = { id: string; routeId: string; room: string; stars: number; createdAt: number }

export const ROUTE_RATINGS_KEY = 'aura-route-ratings'

export function useRouteRatings() {
  const [ratings, setRatings] = useShared<RouteRating[]>(ROUTE_RATINGS_KEY, [])
  const room = getSession()?.room ?? ''

  // Rotanın puanı: misafir puanı varsa gerçek ortalama, yoksa rotanın başlangıç puanı (0 = yeni rota)
  const ratingOf = (route: TravelRoute) => {
    const list = ratings.filter((r) => r.routeId === route.id)
    if (list.length === 0) return { value: route.rating, count: 0 }
    const avg = list.reduce((s, r) => s + r.stars, 0) / list.length
    return { value: Math.round(avg * 10) / 10, count: list.length }
  }

  // Bu odanın verdiği puan (yoksa 0)
  const myRating = (routeId: string) => ratings.find((r) => r.routeId === routeId && r.room === room)?.stars ?? 0

  const rate = (routeId: string, stars: number) => {
    const id = `${routeId}:${room}`
    setRatings((prev) => [{ id, routeId, room, stars, createdAt: Date.now() }, ...prev.filter((r) => r.id !== id)])
  }

  return { ratingOf, myRating, rate }
}
