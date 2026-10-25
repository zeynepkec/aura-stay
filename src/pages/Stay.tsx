import { ArrowLeft, ChevronRight, Image, LogOut, Receipt, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { stay } from '../data/stay'
import '../translations/stay'
import { endSession } from '../lib/session'
import '../translations/qr'

// ready: false olan satırlar "Yakında" olarak görünür
const rows = [
  { key: 'bill', to: '/stay/bill', icon: Receipt, ready: true },
  { key: 'review', to: '/stay/review', icon: Star, ready: true },
  { key: 'memory', to: '/stay/memory', icon: Image, ready: true },
]

export default function Stay() {
  const { t, i18n } = useTranslation()
  const date = (time: number) => new Date(time).toLocaleDateString(i18n.resolvedLanguage, { day: 'numeric', month: 'short' })
  const nights = Math.round((stay.checkOut - stay.checkIn) / (24 * 60 * 60 * 1000))

  return (
    <div>
      <Link to="/" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-sm text-muted">
        <ArrowLeft size={18} />
        {t('stay.back')}
      </Link>

      {/* Konaklama kartı — lila-pembe geçiş */}
      <header className="mx-5 rounded-card bg-gradient-to-br from-discover to-discover-pink p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-ink/60">{stay.hotelName}</p>
        <h1 className="mt-1 text-3xl font-bold">{t('stay.room', { number: stay.roomNumber })}</h1>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-card/60 p-2">
            <p className="text-[11px] text-ink/60">{t('stay.check_in')}</p>
            <p className="text-sm font-bold">{date(stay.checkIn)}</p>
          </div>
          <div className="rounded-2xl bg-card/60 p-2">
            <p className="text-[11px] text-ink/60">{t('stay.check_out')}</p>
            <p className="text-sm font-bold">{date(stay.checkOut)}</p>
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-card/60 p-2 text-sm font-bold">
            {t('stay.nights', { count: nights })}
          </div>
        </div>
      </header>

      {/* Satırlar */}
      <div className="space-y-3 px-5 pt-6">
        {rows.map(({ key, to, icon: Icon, ready }) => {
          const content = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background">
                <Icon size={20} />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold">{t(`stay.rows.${key}.title`)}</span>
                <span className="block text-xs text-muted">{t(`stay.rows.${key}.desc`)}</span>
              </span>
              {ready ? (
                <ChevronRight size={18} className="text-muted" />
              ) : (
                <span className="rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold text-muted">{t('stay.soon')}</span>
              )}
            </>
          )
          const className = 'flex items-center gap-4 rounded-card border border-line bg-card p-4'
          return ready ? (
            <Link key={key} to={to} className={className}>{content}</Link>
          ) : (
            <div key={key} className={`${className} opacity-60`}>{content}</div>
          )
                })}
      </div>

      {/* Odadan çıkış */}
      <div className="px-5 pt-8">
        <button
          type="button"
          onClick={() => {
            if (window.confirm(t('qr.logout_confirm'))) {
              endSession()
              window.location.replace('/')
            }
          }}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-card text-sm font-semibold text-muted"
        >
          <LogOut size={18} />
          {t('qr.logout')}
        </button>
      </div>
    </div>
  )
}