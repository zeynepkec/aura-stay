// Açık olan otelin bilgileri. Oteller: src/data/hotels/ (Hermis — Atina, Pera Lale — İstanbul)
// Asistan SADECE bu bilgileri kullanır; burada olmayan fiyat / müsaitlik bilgisini uydurmaz.
import { currentHotel as H, type Option } from './hotels'
import type { Text } from './menu'

export const hotel = {
  id: H.id,
  name: H.name,
  area: H.area,
  city: H.city.en,
  checkIn: H.checkIn,
  checkOut: H.checkOut,
  breakfast: H.breakfast,
  restaurant: H.restaurant,
  roomService: H.roomService,
  rooftop: H.rooftop,
  wifi: H.wifi,
  reception: H.reception,
  serviceDesc: H.serviceDesc,
  memory: H.memory,
}

// Asistanın cevaplayabildiği sık sorulan sorular
export const faq = H.faq

// Hizmet seçenekleri (form ve asistan aynı listeyi kullanır)
export const cleaningSlots = ['09:00 – 11:00', '11:00 – 13:00', '13:00 – 15:00', '15:00 – 17:00']

export const amenityItems: Option[] = [
  { id: 'towel', name: { tr: 'Havlu', en: 'Towels', el: 'Πετσέτες' } },
  { id: 'pillow', name: { tr: 'Yastık', en: 'Pillow', el: 'Μαξιλάρι' } },
  { id: 'blanket', name: { tr: 'Battaniye', en: 'Blanket', el: 'Κουβέρτα' } },
  { id: 'toiletries', name: { tr: 'Banyo seti', en: 'Toiletries', el: 'Είδη μπάνιου' } },
]

export const transferDestinations = H.transferDestinations
export const destinationWords = H.destinationWords
export const tableVenues = H.tableVenues

// Ana sayfadaki özel kampanya (Deep Blue)
export const campaign = H.campaign

// Bir listedeki seçeneğin adını bul: optionName(transferDestinations, 'airport', 'tr') → 'Atina Havalimanı'
export function optionName(list: { id: string; name: Text }[], id: string | undefined, lang: string | undefined) {
  const option = list.find((o) => o.id === id)
  if (!option) return id ?? ''
  return option.name[(lang ?? 'en').slice(0, 2) as keyof Text] ?? option.name.en
}
