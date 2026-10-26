import { hotelById } from '../data/hotels'
import { resetOnFreshOpen } from './session'
// Personel rolleri. PIN kodları her otelin kendi profilinde (staffPins): bir otelin PIN'i başka otelde çalışmaz.
export type StaffRole = 'kitchen' | 'housekeeping' | 'reception'

// Otelin PIN listesi: rol → PIN (giriş ekranındaki ipucu için)
export function pinsOf(hotelId: string): Record<StaffRole, string> {
  const pins = hotelById(hotelId)?.staffPins ?? {}
  const out = { kitchen: '', housekeeping: '', reception: '' }
  for (const [pin, role] of Object.entries(pins)) out[role] = pin
  return out
}

// Panel sekmeleri ve her sekmeyi hangi rollerin görebileceği
export const STAFF_TABS: { key: string; roles: StaffRole[] }[] = [
  { key: 'kitchen', roles: ['kitchen', 'reception'] },
    { key: 'menu', roles: ['kitchen', 'reception'] },
  { key: 'tasks', roles: ['housekeeping', 'reception'] },
  { key: 'tables', roles: ['reception'] },
  { key: 'bills', roles: ['reception'] },
  { key: 'feedback', roles: ['reception'] },
  { key: 'demo', roles: ['reception'] },
]

export type StaffSession = { role: StaffRole; loginAt: number; hotelId: string }

const KEY = 'aura-staff'
const ENTERED = 'aura-staff-entered'
// Panel linki yeniden açılınca PIN tekrar sorulur (yenileme sayılmaz)
if (window.location.pathname.startsWith('/staff')) resetOnFreshOpen(ENTERED)

export function getStaff(): StaffSession | null {
  try {
    const saved = localStorage.getItem(KEY)
    const session = saved ? (JSON.parse(saved) as StaffSession) : null
    // Eski sürümden kalan (otelsiz) oturumlar geçersiz.
    // Panel her yeni açılışta PIN ister: PIN bu sekmede girildiyse oturum geçerli.
    if (!session?.hotelId || sessionStorage.getItem(ENTERED) !== '1') return null
    return session
  } catch {
    return null
  }
}

// PIN doğruysa girişi başlat
export function staffLogin(pin: string, hotelId: string): StaffSession | null {
  const role = hotelById(hotelId)?.staffPins[pin]
  if (!role) return null
  const session: StaffSession = { role, loginAt: Date.now(), hotelId }
  localStorage.setItem(KEY, JSON.stringify(session))
  try {
    sessionStorage.setItem(ENTERED, '1')
    sessionStorage.setItem('aura-redirect', '1')
  } catch {
    // yok say
  }
  return session
}

export function staffLogout() {
  localStorage.removeItem(KEY)
  try {
    sessionStorage.removeItem(ENTERED)
  } catch {
    // yok say
  }
}

// Rolün görebildiği sekmeler
export function tabsFor(role: StaffRole) {
  return STAFF_TABS.filter((tab) => tab.roles.includes(role))
}