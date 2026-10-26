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

// Bu sekmede giriş ekranından geçildi mi? (sessionStorage: sekme kapanınca silinir)
// Böylece link her açıldığında önce giriş seçenekleri gelir; kayıtlı oturum "Devam et" olarak sunulur.
const ENTERED = 'aura-entered'
const REDIRECT = 'aura-redirect' // uygulamanın kendi yönlendirmesi (giriş sonrası), yeni açılış sayılmaz

// Link yeniden açıldıysa (yazarak, tıklayarak, ana ekrandan) giriş seçenekleri tekrar gelsin.
// Sayfa yenileme ve uygulamanın kendi yönlendirmeleri bu sayılmaz. Sayfa yüklenirken bir kez çalışır.
export function resetOnFreshOpen(enteredKey: string) {
  try {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const redirect = sessionStorage.getItem(REDIRECT) === '1'
    sessionStorage.removeItem(REDIRECT)
    if (nav?.type === 'navigate' && !redirect) sessionStorage.removeItem(enteredKey)
  } catch {
    // tarayıcı desteklemiyorsa bir şey yapma
  }
}
if (!window.location.pathname.startsWith('/staff')) resetOnFreshOpen(ENTERED)
export function isEntered() {
  try {
    return sessionStorage.getItem(ENTERED) === '1'
  } catch {
    return true
  }
}
export function markEntered() {
  try {
    sessionStorage.setItem(ENTERED, '1')
    sessionStorage.setItem(REDIRECT, '1')
  } catch {
    // sessionStorage kullanılamıyorsa her açılışta oturum doğrudan açılır
  }
}

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
  markEntered()
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
  try {
    sessionStorage.removeItem(ENTERED)
  } catch {
    // yok say
  }
}

// Bir odanın QR koduna yazılacak link
export function joinPath(room: string, hotelId = HOTEL.id) {
  const rooms = hotelById(hotelId)?.rooms ?? ROOMS
  return `/join?hotel=${hotelId}&room=${room}&token=${rooms[room]}`
}