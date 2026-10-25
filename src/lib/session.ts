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

export type Session = { hotelId: string; hotelName: string; room: string; joinedAt: number }

const KEY = 'aura-session'

// Giriş yapılmış mı? Yapılmışsa oturum bilgisini döndürür
export function getSession(): Session | null {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

// QR linkindeki bilgileri kontrol et, doğruysa oturumu başlat
export function startSession(hotelId: string, room: string, token: string): Session | null {
  if (hotelId !== HOTEL.id || !ROOMS[room] || ROOMS[room] !== token) return null
  const session: Session = { hotelId, hotelName: HOTEL.name, room, joinedAt: Date.now() }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

// Çıkış yap: oturumu ve bu misafire ait tüm verileri temizle
export function endSession() {
  ;['aura-session', 'aura-cart'].forEach((k) => localStorage.removeItem(k))
}

// Bir odanın QR koduna yazılacak link
export function joinPath(room: string) {
  return `/join?hotel=${HOTEL.id}&room=${room}&token=${ROOMS[room]}`
}