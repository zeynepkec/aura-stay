import { currentHotel, hotelById } from '../data/hotels'

// Açık olan otel ve odaları. Odalar ve giriş kodları her otelin kendi dosyasında (src/data/hotels/).
export const HOTEL = { id: currentHotel.id, name: currentHotel.name }

// Her odanın QR koduna gizli bir anahtar (token) koyuyoruz. Böylece kimse
// linkteki oda numarasını değiştirerek başka bir odaya giremez.
export const ROOMS: Record<string, string> = currentHotel.rooms

// Misafir nasıl giriş yaptı: QR kod, oda numarası + kod ya da oda kartı (NFC)
export type LoginMethod = 'qr' | 'code' | 'card'

export type Session = { v: 2; hotelId: string; hotelName: string; room: string; joinedAt: number; method: LoginMethod }

const KEY = 'aura-session'

// Giriş yapılmış mı? Yapılmışsa oturum bilgisini döndürür.
// Eski sürümden kalan (demo) oturumlar geçersiz: uygulama giriş ekranından başlar.
export function getSession(): Session | null {
  try {
    const saved = localStorage.getItem(KEY)
    const session = saved ? (JSON.parse(saved) as Session) : null
    if (session && session.v !== 2) {
      localStorage.removeItem(KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

// Bilgileri kontrol et, doğruysa oturumu başlat
export function startSession(hotelId: string, room: string, token: string, method: LoginMethod = 'qr'): Session | null {
  const code = token.trim().toLowerCase()
  const target = hotelById(hotelId)
  if (!target || !target.rooms[room] || target.rooms[room] !== code) return null
  const session: Session = { v: 2, hotelId, hotelName: target.name, room, joinedAt: Date.now(), method }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

// Oda numarası + giriş kodu ile giriş (kod, oda kartının ve QR kartın üzerinde yazar)
export function startSessionWithCode(hotelId: string, room: string, code: string): Session | null {
  return startSession(hotelId, room.trim(), code, 'code')
}

// QR koddan ya da oda kartından okunan linki çöz: .../join?hotel=..&room=..&token=..
export function startSessionFromLink(text: string, method: LoginMethod): Session | null {
  try {
    const url = new URL(text.trim(), window.location.origin)
    const p = url.searchParams
    return startSession(p.get('hotel') ?? '', p.get('room') ?? '', p.get('token') ?? '', method)
  } catch {
    return null
  }
}

// Çıkış yap: oturumu ve bu misafire ait tüm verileri temizle
export function endSession() {
  ;['aura-session', 'aura-cart'].forEach((k) => localStorage.removeItem(k))
}

// Bir odanın QR koduna yazılacak link
export function joinPath(room: string, hotelId = HOTEL.id) {
  const rooms = hotelById(hotelId)?.rooms ?? ROOMS
  return `/join?hotel=${hotelId}&room=${room}&token=${rooms[room]}`
}