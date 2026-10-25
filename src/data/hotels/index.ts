// =============================================================
//  OTELLER, ÜLKELER, ŞEHİRLER
//  Uygulama tüm dünya için tasarlandı; şimdilik Türkiye ve Yunanistan.
//  Yeni otel: hotels/ klasörüne bir dosya ekle (pera.ts örnek), aşağıdaki HOTELS listesine yaz.
//  Yeni ülke: COUNTRIES listesine ekle.
// =============================================================
import type { Text } from '../menu'
import { hermis } from './hermis'
import { pera } from './pera'
import type { HotelProfile } from './types'

export type { HotelProfile, Option } from './types'

export const COUNTRIES: { id: string; flag: string; name: Text }[] = [
  { id: 'tr', flag: '🇹🇷', name: { tr: 'Türkiye', en: 'Türkiye', el: 'Τουρκία' } },
  { id: 'gr', flag: '🇬🇷', name: { tr: 'Yunanistan', en: 'Greece', el: 'Ελλάδα' } },
]

export const HOTELS: HotelProfile[] = [pera, hermis]

export const hotelById = (id: string | undefined) => HOTELS.find((h) => h.id === id)

// Bir ülkedeki şehirler (otel listesinden çıkarılır)
export function citiesOf(country: string): Text[] {
  const seen = new Map<string, Text>()
  for (const h of HOTELS) if (h.country === country) seen.set(h.city.en, h.city)
  return [...seen.values()]
}

export const hotelsIn = (country: string, cityEn: string) => HOTELS.filter((h) => h.country === country && h.city.en === cityEn)

const read = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') as { hotelId?: string } | null
  } catch {
    return null
  }
}

// Şu an hangi otelin uygulaması açık?
//  - Personel panelinde: personelin giriş yaptığı otel
//  - Misafir uygulamasında: misafirin giriş yaptığı otel
//  - Giriş yoksa: giriş ekranında seçilen otel
// Otel değişince sayfa baştan yüklenir, böylece tüm ekranlar yeni otelin bilgileriyle açılır.
export function currentHotelId(): string {
  const isStaff = window.location.pathname.startsWith('/staff')
  const fromSession = read(isStaff ? 'aura-staff' : 'aura-session')?.hotelId
  const chosen = localStorage.getItem('aura-hotel-choice') ?? undefined
  return hotelById(fromSession)?.id ?? hotelById(chosen)?.id ?? HOTELS[0].id
}

export const currentHotel: HotelProfile = hotelById(currentHotelId())!

// Giriş ekranında otel seçildiğinde hatırla
export function chooseHotel(id: string) {
  localStorage.setItem('aura-hotel-choice', id)
}
