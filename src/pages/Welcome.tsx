import { BriefcaseBusiness, ChevronRight, QrCode } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import KeyTag from '../components/KeyTag'
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
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-background px-5 pb-8 pt-5">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold">AURA Stay</p>
        <LanguageSwitcher />
      </div>

      {/* Otel ve anahtar etiketi: odanın anahtarı QR kod */}
      <div className="pt-10">
        <p className="text-lg text-muted">
          {hotel.name}, {pick(hotel.area, i18n.resolvedLanguage)}
        </p>
        <h1 className="mt-1 text-[34px] font-bold leading-tight">{t('join.welcome_title')}</h1>
        <div className="mt-6 w-[280px]">
          <KeyTag caption={t('join.key_caption')}>
            <QrCode size={44} strokeWidth={1.75} />
          </KeyTag>
        </div>
      </div>

      {/* Misafir girişi: QR adımları gerçekten sıralı olduğu için numaralı */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">{t('join.guest_title')}</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary text-sm font-bold text-primary">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        {/* Demo girişi — sunum sırasında QR okutmadan girmek için */}
        <Link to={joinPath('302')} className="mt-6 flex h-14 items-center justify-center rounded-xl bg-primary text-base font-semibold text-card">
          {t('join.demo')}
        </Link>
      </section>

      {/* Personel girişi: ikincil seçenek */}
      <section className="mt-auto pt-10">
        {/* /staff ayrı bir uygulama olduğu için sayfa baştan yüklenir (a etiketi) */}
        <a href="/staff" className="flex min-h-[64px] items-center gap-4 rounded-card border border-line bg-card px-4 py-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-service">
            <BriefcaseBusiness size={20} />
          </span>
          <span className="flex-1">
            <span className="block font-semibold">{t('join.staff_title')}</span>
            <span className="block text-sm text-muted">{t('join.staff_text')}</span>
          </span>
          <ChevronRight size={20} className="text-muted" />
        </a>
        <Link to="/qr" className="mt-4 block py-2 text-center text-sm text-muted underline">
          {t('qr.staff_link')}
        </Link>
      </section>
    </div>
  )
}
