import { getSession, HOTEL } from '../lib/session'

const day = 24 * 60 * 60 * 1000
const session = getSession()

// Konaklama bilgileri — QR ile giriş yapılan odadan gelir
export const stay = {
  hotelName: session?.hotelName ?? HOTEL.name,
  roomNumber: session?.room ?? '204',
  checkIn: session?.joinedAt ?? Date.now(),
  checkOut: (session?.joinedAt ?? Date.now()) + 5 * day,
}

// Transfer ücretleri (₺) — diğer hizmetler ücretsiz
export const transferPrices: Record<string, number> = {
  airport: 900,
  center: 400,
  marina: 400,
}