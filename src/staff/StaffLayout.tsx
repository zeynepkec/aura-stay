import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { staffLogout, tabsFor, type StaffSession } from '../lib/staff'
import '../translations/staff'

export default function StaffLayout({ staff }: { staff: StaffSession }) {
  const { t } = useTranslation()

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
              <p className="text-xs text-muted">Aegean Bay Hotel · {t(`staff.roles.${staff.role}`)}</p>
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

        {/* Sekmeler — sadece rolün görebildikleri */}
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 pb-3">
          {tabsFor(staff.role).map((tab) => (
            <NavLink
              key={tab.key}
              to={`/staff/${tab.key}`}
              className={({ isActive }) =>
                `h-9 shrink-0 rounded-full px-4 text-sm font-medium leading-9 ${isActive ? 'bg-ink text-card' : 'text-muted hover:bg-background'}`
              }
            >
              {t(`staff.tabs.${tab.key}`)}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Seçili sekmenin içeriği */}
      <main className="mx-auto max-w-6xl p-5">
        <Outlet />
      </main>
    </div>
  )
}