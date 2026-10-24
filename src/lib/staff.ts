// Personel rolleri ve demo PIN kodları — Adım 23'te gerçek kullanıcı girişiyle değişecek
export type StaffRole = 'kitchen' | 'housekeeping' | 'reception'

const PINS: Record<string, StaffRole> = {
  '1111': 'kitchen',
  '2222': 'housekeeping',
  '3333': 'reception',
}

// Panel sekmeleri ve her sekmeyi hangi rollerin görebileceği
export const STAFF_TABS: { key: string; roles: StaffRole[] }[] = [
  { key: 'kitchen', roles: ['kitchen', 'reception'] },
    { key: 'menu', roles: ['kitchen', 'reception'] },
  { key: 'tasks', roles: ['housekeeping', 'reception'] },
  { key: 'tables', roles: ['reception'] },
  { key: 'bills', roles: ['reception'] },
  { key: 'feedback', roles: ['reception'] },
]

export type StaffSession = { role: StaffRole; loginAt: number }

const KEY = 'aura-staff'

export function getStaff(): StaffSession | null {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

// PIN doğruysa girişi başlat
export function staffLogin(pin: string): StaffSession | null {
  const role = PINS[pin]
  if (!role) return null
  const session: StaffSession = { role, loginAt: Date.now() }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

export function staffLogout() {
  localStorage.removeItem(KEY)
}

// Rolün görebildiği sekmeler
export function tabsFor(role: StaffRole) {
  return STAFF_TABS.filter((tab) => tab.roles.includes(role))
}