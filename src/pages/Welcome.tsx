import { QrCode } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { joinPath } from '../lib/session'
import '../translations/join'
import '../translations/qr'

export default function Welcome() {
  const { t } = useTranslation()
  const steps = t('join.steps', { returnObjects: true }) as unknown as string[]

  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-gradient-to-br from-discover to-discover-pink px-6 pb-10 pt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold uppercase tracking-[0.2em]">AURA Stay</p>
        <LanguageSwitcher />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        {/* QR ikonu */}
        <span className="flex h-24 w-24 items-center justify-center rounded-card bg-card shadow-sm">
          <QrCode size={48} strokeWidth={1.5} />
        </span>

        <h1 className="mt-8 text-4xl font-bold leading-tight">{t('join.welcome_title')}</h1>
        <p className="mt-3 text-base text-ink/70">{t('join.welcome_text')}</p>

        {/* 3 adım */}
        <ol className="mt-8 space-y-3">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3 rounded-2xl bg-card/60 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-card">{i + 1}</span>
              <span className="text-sm font-medium">{step}</span>
            </li>
          ))}
        </ol>
      </div>

            {/* Demo girişi — sunum sırasında QR okutmadan girmek için */}
      <Link to={joinPath('204')} className="flex h-14 items-center justify-center rounded-full bg-ink text-sm font-semibold text-card">
        {t('join.demo')}
      </Link>
      <Link to="/qr" className="mt-4 text-center text-xs font-medium text-ink/60 underline">
        {t('qr.staff_link')}
      </Link>
    </div>
  )
}