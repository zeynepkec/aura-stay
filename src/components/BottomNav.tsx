import { BellRing, Compass, Home, Sparkles, UtensilsCrossed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', key: 'home', icon: Home },
  { to: '/dining', key: 'dining', icon: UtensilsCrossed },
  { to: '/assistant', key: 'assistant', icon: Sparkles, center: true },
  { to: '/explore', key: 'explore', icon: Compass },
  { to: '/services', key: 'services', icon: BellRing },
]

export default function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-line bg-card">
      <ul className="grid grid-cols-5">
        {tabs.map(({ to, key, icon: Icon, center }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-h-[64px] flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                  isActive ? 'text-ink' : 'text-muted'
                }`
              }
            >
              {center ? (
                <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-card shadow-lg">
                  <Icon size={22} />
                </span>
              ) : (
                <Icon size={22} />
              )}
              <span>{t(`nav.${key}`)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}