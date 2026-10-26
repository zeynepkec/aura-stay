import { useEffect, useRef } from 'react'
import { LogOut, QrCode } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import LineBadge, { LINES, type Line } from '../components/LineBadge'
import SyncBadge from '../components/SyncBadge'
import { hotel } from '../data/hotel'
import { useShared } from '../lib/shared'
import { staffLogout, tabsFor, type StaffSession } from '../lib/staff'
import type { Feedback } from '../store/FeedbackContext'
import type { ServiceRequest } from '../store/ServiceContext'
import type { Order } from '../store/StayContext'
import { TYPES_BY_ROLE } from './StaffTasks'
import '../translations/staff'

// Rolün ve sekmelerin hattı (misafir uygulamasıyla aynı renkler)
const ROLE_LINE: Record<StaffSession['role'], Line> = { kitchen: 'food', housekeeping: 'clean', reception: 'concierge' }
const TAB_LINE: Record<string, Line> = { kitchen: 'food', menu: 'food', tasks: 'clean', tables: 'table', bills: 'stay', feedback: 'concierge', demo: 'route' }
const TAB_LABEL: Record<string, string> = { kitchen: 'Y', menu: 'Y2', tasks: 'T', tables: 'M', bills: 'O', feedback: 'K', demo: 'D' }

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
      {/* Tabela: otel ve rol */}
      <header className="bg-primary text-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 min-w-11 items-center justify-center rounded-lg bg-card font-display text-[24px] font-extrabold text-primary">
              {LINES[ROLE_LINE[staff.role]].letter}
            </span>
            <div>
              <p className="font-display text-[26px] font-extrabold leading-none">{t(`staff.roles.${staff.role}`)}</p>
              <p className="mt-1 text-sm text-card/85">{t('staff.title')}, {hotel.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {staff.role === 'reception' && (
              <a href={`/qr?hotel=${hotel.id}`} className="hidden h-10 items-center gap-1.5 rounded-[10px] bg-card/15 px-4 font-display text-base font-bold sm:flex">
                <QrCode size={16} />
                {t('staff.qr_codes')}
              </a>
            )}
            <SyncBadge />
            <LanguageSwitcher dark />
            <button
              type="button"
              onClick={() => {
                staffLogout()
                window.location.replace('/staff')
              }}
              className="flex h-10 items-center gap-1.5 rounded-[10px] bg-card/15 px-4 font-display text-base font-bold"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">{t('staff.logout')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sekmeler: hat rozeti + bekleyen iş sayısı, seçili sekmenin altında çizgi */}
      <nav className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3">
          {tabs.map((tab) => {
            const count = counts[tab.key] ?? 0
            const line = TAB_LINE[tab.key] ?? 'stay'
            return (
              <NavLink
                key={tab.key}
                to={`/staff/${tab.key}`}
                className={({ isActive }) =>
                  `relative flex h-14 shrink-0 items-center gap-2 px-3 font-display text-[17px] ${isActive ? 'font-extrabold text-ink' : 'font-bold text-muted'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <LineBadge line={line} label={TAB_LABEL[tab.key]} size="sm" />
                    {t(`staff.tabs.${tab.key}`)}
                    {count > 0 && (
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-primary px-1.5 text-sm font-extrabold text-card">{count}</span>
                    )}
                    <span className={`absolute inset-x-2 bottom-0 h-1 ${isActive ? 'bg-primary' : ''}`} />
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* Seçili sekmenin içeriği */}
      <main className="mx-auto max-w-6xl p-5">
        <Outlet />
      </main>
    </div>
  )
}