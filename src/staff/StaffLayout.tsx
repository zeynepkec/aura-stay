import { useEffect, useRef } from 'react'
import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { hotel } from '../data/hotel'
import { useShared } from '../lib/shared'
import { staffLogout, tabsFor, type StaffSession } from '../lib/staff'
import type { Feedback } from '../store/FeedbackContext'
import type { ServiceRequest } from '../store/ServiceContext'
import type { Order } from '../store/StayContext'
import { TYPES_BY_ROLE } from './StaffTasks'
import '../translations/staff'

// Kısa "ding-dong" sesi (ses dosyası gerekmez, tarayıcı kendisi üretir)
function playChime() {
  try {
    const ctx = new AudioContext()
    ;[880, 1320].forEach((freq, i) => {
      const start = ctx.currentTime + i * 0.18
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.25, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35)
      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.35)
    })
  } catch {
    // Tarayıcı sese izin vermezse sessizce devam et
  }
}

export default function StaffLayout({ staff }: { staff: StaffSession }) {
  const { t } = useTranslation()
  const [orders] = useShared<Order[]>('aura-orders', [])
  const [requests] = useShared<ServiceRequest[]>('aura-requests', [])
  const [feedback] = useShared<Feedback[]>('aura-feedback', [])

  // Her sekmedeki bekleyen iş sayısı
  const taskTypes = TYPES_BY_ROLE[staff.role]
  const counts: Record<string, number> = {
    kitchen: orders.filter((o) => o.status === 'received').length,
    tasks: requests.filter((r) => taskTypes.includes(r.type) && r.status === 'pending').length,
    tables: requests.filter((r) => r.type === 'table' && r.status === 'pending').length,
    bills: 0,
    feedback: feedback.filter((f) => f.room && f.status === 'new').length,
  }

  const tabs = tabsFor(staff.role)
  const total = tabs.reduce((sum, tab) => sum + (counts[tab.key] ?? 0), 0)

  // Yeni iş gelince ses çal + sekme başlığını güncelle
  const previous = useRef(total)
  useEffect(() => {
    if (total > previous.current) playChime()
    previous.current = total
    document.title = total > 0 ? `(${total}) ${t('staff.title')}` : t('staff.title')
  }, [total, t])

  return (
    <div className="min-h-screen bg-background">
      {/* Üst çubuk */}
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl bg-ink p-2">
              <span className="block h-full w-full rounded-full bg-gradient-to-br from-discover to-discover-pink" />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">{t('staff.title')}</p>
              <p className="text-xs text-muted">{hotel.name} · {t(`staff.roles.${staff.role}`)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => {
                staffLogout()
                window.location.replace('/staff')
              }}
              className="flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">{t('staff.logout')}</span>
            </button>
          </div>
        </div>

        {/* Sekmeler + bekleyen iş rozetleri */}
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 pb-3">
          {tabs.map((tab) => {
            const count = counts[tab.key] ?? 0
            return (
              <NavLink
                key={tab.key}
                to={`/staff/${tab.key}`}
                className={({ isActive }) =>
                  `flex h-9 shrink-0 items-center rounded-full px-4 text-sm font-medium ${
                    isActive ? 'bg-ink text-card' : 'text-muted hover:bg-background'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t(`staff.tabs.${tab.key}`)}
                    {count > 0 && (
                      <span
                        className={`ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                          isActive ? 'bg-card text-ink' : 'bg-accent text-card'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </header>

      {/* Seçili sekmenin içeriği */}
      <main className="mx-auto max-w-6xl p-5">
        <Outlet />
      </main>
    </div>
  )
}