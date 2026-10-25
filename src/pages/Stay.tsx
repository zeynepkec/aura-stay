import { ArrowLeft, ChevronRight, Image, LogOut, Receipt, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import KeyTag from '../components/KeyTag'
import { stay } from '../data/stay'
import '../translations/stay'
import '../translations/home'
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

      {/* Anahtar etiketi ve tarihler */}
      <header className="px-5 pt-2">
        <h1 className="mb-4 text-3xl font-bold">{t('home.my_stay')}</h1>
        <KeyTag caption={stay.hotelName}>{stay.roomNumber}</KeyTag>
        <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-card border border-line bg-card text-center">
          <div className="p-3">
            <dt className="text-sm text-muted">{t('stay.check_in')}</dt>
            <dd className="font-semibold">{date(stay.checkIn)}</dd>
          </div>
          <div className="p-3">
            <dt className="text-sm text-muted">{t('stay.check_out')}</dt>
            <dd className="font-semibold">{date(stay.checkOut)}</dd>
          </div>
          <div className="flex items-center justify-center p-3 font-semibold">{t('stay.nights', { count: nights })}</div>
        </dl>
      </header>

      {/* Satırlar */}
      <div className="mx-5 mt-6 divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
        {rows.map(({ key, to, icon: Icon, ready }) => {
          const content = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background">
                <Icon size={20} />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">{t(`stay.rows.${key}.title`)}</span>
                <span className="block text-sm text-muted">{t(`stay.rows.${key}.desc`)}</span>
              </span>
              {ready ? (
                <ChevronRight size={18} className="text-muted" />
              ) : (
                <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted">{t('stay.soon')}</span>
              )}
            </>
          )
          const className = 'flex min-h-[72px] items-center gap-4 px-4 py-3'
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
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-line bg-card text-sm font-semibold text-muted"
        >
          <LogOut size={18} />
          {t('qr.logout')}
        </button>
      </div>
    </div>
  )
}