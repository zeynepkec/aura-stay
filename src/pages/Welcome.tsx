import { ArrowRight, QrCode, UserCog } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { hotel } from '../data/hotel'
import { pick } from '../data/menu'
import { joinPath } from '../lib/session'
import '../translations/join'
import '../translations/qr'

export default function Welcome() {
  const { t, i18n } = useTranslation()
  const steps = t('join.steps', { returnObjects: true }) as unknown as string[]

  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-gradient-to-br from-discover to-discover-pink px-6 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold uppercase tracking-[0.2em]">AURA Stay</p>
        <LanguageSwitcher />
      </div>

      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">
          {hotel.name} · {pick(hotel.area, i18n.resolvedLanguage)}
        </p>
        <h1 className="mt-2 text-4xl font-bold leading-tight">{t('join.welcome_title')}</h1>
        <p className="mt-3 text-base text-ink/70">{t('join.welcome_text')}</p>
      </div>

      <div className="mt-8 flex flex-1 flex-col gap-4">
        {/* 1. seçenek: Misafir */}
        <section className="rounded-card bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-discover/40">
              <QrCode size={24} strokeWidth={1.75} />
            </span>
            <div>
              <h2 className="text-lg font-bold">{t('join.guest_title')}</h2>
              <p className="text-sm text-muted">{t('join.guest_text')}</p>
            </div>
          </div>

          <ol className="mt-4 space-y-2">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-card">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          {/* Demo girişi — sunum sırasında QR okutmadan girmek için */}
          <Link to={joinPath('302')} className="mt-5 flex h-12 items-center justify-center rounded-full bg-ink text-sm font-semibold text-card">
            {t('join.demo')}
          </Link>
        </section>

        {/* 2. seçenek: Personel */}
        <section className="rounded-card bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-service">
              <UserCog size={24} strokeWidth={1.75} />
            </span>
            <div>
              <h2 className="text-lg font-bold">{t('join.staff_title')}</h2>
              <p className="text-sm text-muted">{t('join.staff_text')}</p>
            </div>
          </div>

          {/* /staff ayrı bir uygulama olduğu için sayfa baştan yüklenir (a etiketi) */}
          <a href="/staff" className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full border border-ink text-sm font-semibold">
            {t('join.staff_button')}
            <ArrowRight size={16} />
          </a>
        </section>
      </div>

      <Link to="/qr" className="mt-6 text-center text-xs font-medium text-ink/60 underline">
        {t('qr.staff_link')}
      </Link>
    </div>
  )
}
