import { hotel } from '../data/hotel'

// Otel ve odalar — veritabanı adımında veritabanından gelecek
export const HOTEL = { id: hotel.id, name: hotel.name }

// Her odanın QR koduna gizli bir anahtar (token) koyuyoruz. Böylece kimse
// linkteki oda numarasını değiştirerek başka bir odaya giremez.
export const ROOMS: Record<string, string> = {
  '101': 'k7p2', '102': 'm4x9', '103': 'r8d3', '104': 't2v6', '105': 'w5n1',
  '201': 'b3h8', '202': 'c9f4', '203': 'g6j2', '204': 'q1z7', '205': 'y4s5',
  '301': 'd5k3', '302': 'h2p8', '303': 'n7t4', '304': 'v3x6', '305': 'z8m2',
}

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
  if (hotelId !== HOTEL.id || !ROOMS[room] || ROOMS[room] !== code) return null
  const session: Session = { v: 2, hotelId, hotelName: HOTEL.name, room, joinedAt: Date.now(), method }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

// Oda numarası + giriş kodu ile giriş (kod, oda kartının ve QR kartın üzerinde yazar)
export function startSessionWithCode(room: string, code: string): Session | null {
  return startSession(HOTEL.id, room.trim(), code, 'code')
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
export function joinPath(room: string) {
  return `/join?hotel=${HOTEL.id}&room=${room}&token=${ROOMS[room]}`
}