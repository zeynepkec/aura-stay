import { BellRing, Compass, KeyRound, MessageCircle, UtensilsCrossed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

// Beş eşit sekme. Konsiyerj de diğerleri gibi normal bir sekme.
const tabs = [
  { to: '/', key: 'home', icon: KeyRound },
  { to: '/dining', key: 'dining', icon: UtensilsCrossed },
  { to: '/services', key: 'services', icon: BellRing },
  { to: '/explore', key: 'explore', icon: Compass },
  { to: '/assistant', key: 'assistant', icon: MessageCircle },
]

export default function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-line bg-card pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {tabs.map(({ to, key, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative flex min-h-[64px] flex-col items-center justify-center gap-1 text-xs font-medium ${
                  isActive ? 'text-primary' : 'text-muted'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Seçili sekmenin üstünde ince çizgi */}
                  <span className={`absolute inset-x-5 top-0 h-[3px] rounded-b-full ${isActive ? 'bg-primary' : ''}`} />
                  <Icon size={22} strokeWidth={isActive ? 2.25 : 1.75} />
                  <span>{t(`nav.${key}`)}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
