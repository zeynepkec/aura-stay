import type { MenuItem, Text } from '../menu'
import type { SampleReview } from '../reviews'
import type { TravelRoute } from '../routes'

export type Option = { id: string; name: Text }

// Bir otelin uygulamada kullanılan tüm bilgileri.
// Yeni otel eklemek için: bu yapıda bir dosya yaz, hotels/index.ts içindeki HOTELS listesine ekle.
export type HotelProfile = {
  id: string
  name: string
  country: string // COUNTRIES içindeki kod: 'tr', 'gr'…
  city: Text
  area: Text
  currency: 'EUR' | 'TRY'
  location: { lat: number; lng: number }
  rooms: Record<string, string> // oda numarası → giriş kodu
  checkIn: string
  checkOut: string
  breakfast: string
  restaurant: string
  roomService: string
  rooftop: string
  wifi: { name: string; password: string }
  reception: Text
  serviceDesc: { transfer: Text; table: Text }
  memory: { title: Text; quote: Text }
  faq: { id: string; keywords: string[]; answer: Text }[]
  transferDestinations: Option[]
  destinationWords: Record<string, string[]> // asistanın varış yerini tanıması için
  tableVenues: Option[]
  campaign: { title: Text; description: Text; cta: Text }
  categories: Option[]
  menuItems: MenuItem[]
  routes: TravelRoute[]
  sampleReviews: SampleReview[]
  demo: { soldOut: string; tableNote: string; reviewNote: string }
}
