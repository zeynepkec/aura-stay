import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft, Printer } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { HOTEL, joinPath, ROOMS } from '../lib/session'
import '../translations/qr'

export default function QrCodes() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-background p-5">
      <div className="flex items-center justify-between print:hidden">
        <Link to="/" className="flex h-11 items-center gap-1 text-sm text-muted">
          <ArrowLeft size={18} />
          AURA Stay
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-card"
        >
          <Printer size={18} />
          {t('qr.print')}
        </button>
      </div>

      <header className="pb-6 pt-4">
        <h1 className="text-3xl font-bold">{t('qr.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('qr.subtitle')}</p>
      </header>

      {/* Her oda için bir kart */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Object.keys(ROOMS).map((room) => (
          <div key={room} className="flex flex-col items-center rounded-card border border-line bg-card p-5 text-center break-inside-avoid">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">AURA Stay</p>
            <QRCodeSVG value={window.location.origin + joinPath(room)} size={130} className="my-4" />
            <p className="text-xl font-bold">{t('qr.room', { number: room })}</p>
            <p className="text-xs text-muted">{HOTEL.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}