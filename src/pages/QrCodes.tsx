import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft, Nfc, Printer } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { HOTELS, hotelById } from '../data/hotels'
import { HOTEL, joinPath } from '../lib/session'
import '../translations/qr'

// Web NFC: sadece Android + Chrome. Boş bir NFC karta oda linki yazılır, misafir "Oda kartını okut" ile girer.
type NdefWriter = { write: (message: { records: { recordType: string; data: string }[] }) => Promise<void> }
const NfcWriter = (window as unknown as { NDEFReader?: new () => NdefWriter }).NDEFReader

function WriteCardButton({ link }: { link: string }) {
  const { t } = useTranslation()
  const [state, setState] = useState<'idle' | 'waiting' | 'done' | 'error'>('idle')
  if (!NfcWriter) return null

  const write = async () => {
    setState('waiting')
    try {
      await new NfcWriter().write({ records: [{ recordType: 'url', data: link }] })
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <button type="button" onClick={write} className="mt-3 flex h-9 items-center gap-1.5 rounded-[10px] border border-line px-3 text-xs font-semibold print:hidden">
      <Nfc size={16} />
      {t(state === 'idle' ? 'qr.write_card' : `qr.write_${state}`)}
    </button>
  )
}

export default function QrCodes() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const hotel = hotelById(params.get('hotel') ?? undefined) ?? hotelById(HOTEL.id)!

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
          className="flex h-11 items-center gap-2 rounded-[10px] bg-ink px-5 text-sm font-semibold text-card"
        >
          <Printer size={18} />
          {t('qr.print')}
        </button>
      </div>

      <header className="pb-6 pt-4">
        <h1 className="text-3xl font-bold">{t('qr.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('qr.subtitle')}</p>
        {NfcWriter && <p className="mt-2 text-xs text-muted print:hidden">{t('qr.nfc_hint')}</p>}
        {/* Otel seçimi */}
        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          {HOTELS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setParams({ hotel: h.id })}
              className={`h-9 rounded-full px-4 text-sm font-medium ${h.id === hotel.id ? 'bg-ink text-card' : 'border border-line bg-card'}`}
            >
              {h.name}
            </button>
          ))}
        </div>
      </header>

      {/* Her oda için bir kart: QR kod + oda numarası + giriş kodu */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Object.keys(hotel.rooms).map((room) => {
          const link = window.location.origin + joinPath(room, hotel.id)
          return (
            <div key={room} className="flex flex-col items-center rounded-card border border-line bg-card p-5 text-center break-inside-avoid">
              <p className="text-xs font-semibold text-muted">AURA Stay</p>
              <QRCodeSVG value={link} size={130} className="my-4" />
              <p className="text-xl font-bold">{t('qr.room', { number: room })}</p>
              <p className="mt-1 rounded-full bg-accent/15 px-3 py-0.5 text-sm font-semibold tracking-wider text-accent">{t('qr.code', { code: hotel.rooms[room] })}</p>
              <p className="mt-1 text-xs text-muted">{hotel.name}</p>
              <WriteCardButton link={link} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
