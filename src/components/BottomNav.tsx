import { BellRing, Compass, Home, MessageCircle, UtensilsCrossed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

// Beş eşit sekme; seçili sekmenin üstünde tabela çizgisi
const tabs = [
  { to: '/', key: 'home', icon: Home },
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
                `relative flex min-h-[66px] flex-col items-center justify-center gap-1 font-display text-[13px] ${
                  isActive ? 'font-extrabold text-primary' : 'font-bold text-muted'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`absolute inset-x-3.5 -top-px h-1 ${isActive ? 'bg-primary' : ''}`} />
                  <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                  {t(`nav.${key}`)}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
