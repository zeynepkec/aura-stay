import { getSession, HOTEL } from '../lib/session'

const day = 24 * 60 * 60 * 1000
const session = getSession()

// Konaklama bilgileri — QR ile giriş yapılan odadan gelir
export const stay = {
  hotelName: HOTEL.name,
  roomNumber: session?.room ?? '302',
  checkIn: session?.joinedAt ?? Date.now(),
  checkOut: (session?.joinedAt ?? Date.now()) + 5 * day,
}

// Ücretli hizmetler: transfer ücreti resepsiyon tarafından onaylanır (asistan ve uygulama fiyat uydurmaz).
// Diğer hizmetler ücretsiz. Oda hesabında transfer "Resepsiyon onaylar" olarak görünür.
export const PRICE_ON_REQUEST = ['transfer']
