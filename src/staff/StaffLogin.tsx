import { useState } from 'react'
import { Delete, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { staffLogin } from '../lib/staff'
import '../translations/staff'

export default function StaffLogin() {
  const { t } = useTranslation()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  // Rakama basınca PIN'e ekle; 4 hane olunca kontrol et
  const press = (digit: string) => {
    if (pin.length >= 4) return
    const next = pin + digit
    setPin(next)
    setError(false)
    if (next.length === 4) {
      if (staffLogin(next)) {
        window.location.replace('/staff')
      } else {
        setError(true)
        setTimeout(() => setPin(''), 500)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="absolute right-5 top-5">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-xs text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-card">
          <Lock size={26} />
        </span>
        <p className="mt-6 font-semibold text-muted">AURA Stay</p>
        <h1 className="mt-1 text-3xl font-bold">{t('staff.login_title')}</h1>
        <p className="mt-2 text-sm text-muted">{t('staff.login_text')}</p>

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
      </div>
    </div>
  )
}