import { useState } from 'react'
import { ArrowLeft, Building2, Delete, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import HotelPicker from '../components/HotelPicker'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { hotelById, type HotelProfile } from '../data/hotels'
import { pick } from '../data/menu'
import { staffLogin } from '../lib/staff'
import '../translations/staff'
import '../translations/guestLogin'

export default function StaffLogin() {
  const { t, i18n } = useTranslation()
  // Personel önce otelini seçer (bu cihazda hatırlanır), sonra PIN girer
  const [hotel, setHotel] = useState<HotelProfile | null>(() => hotelById(localStorage.getItem('aura-staff-hotel') ?? undefined) ?? null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  // Rakama basınca PIN'e ekle; 4 hane olunca kontrol et
  const press = (digit: string) => {
    if (pin.length >= 4) return
    const next = pin + digit
    setPin(next)
    setError(false)
    if (next.length === 4) {
      if (hotel && staffLogin(next, hotel.id)) {
        window.location.replace('/staff')
      } else {
        setError(true)
        setTimeout(() => setPin(''), 500)
      }
    }
  }

  if (!hotel) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background px-6 pb-10 pt-6">
        <div className="flex items-center justify-between">
          <a href="/" className="-ml-2 flex h-11 items-center gap-1 px-2 text-sm text-muted">
            <ArrowLeft size={18} />
            {t('staff.back_to_start')}
          </a>
          <LanguageSwitcher />
        </div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-muted">AURA Stay</p>
        <h1 className="mt-1 text-3xl font-bold">{t('staff.login_title')}</h1>
        <p className="mb-6 mt-2 text-sm text-muted">{t('picker.text')}</p>
        <HotelPicker
          onSelect={(h) => {
            localStorage.setItem('aura-staff-hotel', h.id)
            setHotel(h)
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="absolute right-5 top-5">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-xs text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-card">
          <Lock size={26} />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted">AURA Stay</p>
        <h1 className="mt-1 text-3xl font-bold">{t('staff.login_title')}</h1>
        <p className="mt-2 text-sm text-muted">{t('staff.login_text')}</p>

        {/* Seçilen otel */}
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('aura-staff-hotel')
            setHotel(null)
          }}
          title={t('staff.change_hotel')}
          className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm"
        >
          <Building2 size={16} />
          <span className="font-semibold">{hotel.name}</span>
          <span className="text-muted">· {pick(hotel.city, i18n.resolvedLanguage)}</span>
        </button>


        {/* PIN noktaları */}
        <div className="my-8 flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-4 w-4 rounded-full transition-colors ${
                error ? 'bg-red-400' : i < pin.length ? 'bg-ink' : 'bg-line'
              }`}
            />
          ))}
        </div>
        <p className={`-mt-4 mb-4 h-5 text-sm font-medium text-red-500 ${error ? '' : 'invisible'}`}>{t('staff.wrong_pin')}</p>

        {/* Tuş takımı */}
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button key={d} type="button" onClick={() => press(d)} className="h-16 rounded-2xl border border-line bg-card text-2xl font-semibold active:bg-background">
              {d}
            </button>
          ))}
          <span />
          <button type="button" onClick={() => press('0')} className="h-16 rounded-2xl border border-line bg-card text-2xl font-semibold active:bg-background">
            0
          </button>
          <button type="button" onClick={() => setPin(pin.slice(0, -1))} aria-label={t('staff.delete')} className="flex h-16 items-center justify-center rounded-2xl text-muted">
            <Delete size={24} />
          </button>
        </div>

        <p className="mt-8 text-xs text-muted">{t('staff.demo_pins')}</p>
        <a href="/" className="mt-4 inline-flex h-11 items-center gap-1 px-2 text-sm text-muted">
          <ArrowLeft size={16} />
          {t('staff.back_to_start')}
        </a>
      </div>
    </div>
  )
}