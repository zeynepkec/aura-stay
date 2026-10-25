// Rota türleri ve yardımcılar. Her otelin rotaları kendi dosyasında (src/data/hotels/).
// - minutes: toplam süre, km: yaklaşık yürüme mesafesi
// - tags: filtre ve asistan önerisi için
// - stops[].place: Google Haritalar'da aranan isim; lat/lng: haritadaki yaklaşık konum
// - sharedBy / rating: AURA'nın "misafirlerin paylaştığı rotalar" fikri için demo değerler
// - Not: Süreler, konumlar ve ipuçları demo amaçlı; sunumdan önce kontrol edin.
import { currentHotel } from './hotels'
import type { Text } from './menu'

export type RouteTag = 'history' | 'food' | 'sunset' | 'family' | 'easy' | 'culture' | 'nature'

export type Stop = { name: Text; place: string; minutes: number; lat: number; lng: number }

export type TravelRoute = {
  id: string
  tags: RouteTag[]
  featured?: boolean
  title: Text
  description: Text
  tip: Text
  sharedBy: string
  minutes: number
  km: number
  rating: number          // 0 = yeni paylaşılan rota (henüz puan yok)
  stops: Stop[]
  room?: string           // misafirin eklediği rotalarda: ekleyen oda
  createdAt?: number
}

export const routeTags: Record<RouteTag, { name: Text; emoji: string }> = {
  history: { name: {"tr": "Tarih", "en": "History", "el": "Ιστορία"}, emoji: '🏛️' },
  food: { name: {"tr": "Yemek", "en": "Food", "el": "Φαγητό"}, emoji: '🍽️' },
  sunset: { name: {"tr": "Gün batımı", "en": "Sunset", "el": "Ηλιοβασίλεμα"}, emoji: '🌅' },
  family: { name: {"tr": "Aile", "en": "Family", "el": "Οικογένεια"}, emoji: '👨‍👩‍👧' },
  easy: { name: {"tr": "Az yürüyüş", "en": "Easy walk", "el": "Λίγο περπάτημα"}, emoji: '🚶' },
  culture: { name: {"tr": "Kültür & sanat", "en": "Culture & art", "el": "Πολιτισμός"}, emoji: '🎭' },
  nature: { name: {"tr": "Doğa", "en": "Nature", "el": "Φύση"}, emoji: '🌿' },
}

// Rotalar ve otelin konumu açık olan otelden gelir (src/data/hotels/)
export const routes: TravelRoute[] = currentHotel.routes

export const HOTEL_LOCATION = currentHotel.location

// Google Haritalar linkleri
export const mapsSearchUrl = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`

export function mapsRouteUrl(stops: Stop[]) {
  const enc = (s: Stop) => encodeURIComponent(s.place)
  const origin = enc(stops[0])
  const destination = enc(stops[stops.length - 1])
  const waypoints = stops.slice(1, -1).map(enc).join('|')
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=walking`
}
