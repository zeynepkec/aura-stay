import { BriefcaseBusiness, ChevronRight, KeyRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { hotel } from '../data/hotel'
import { pick } from '../data/menu'
import '../translations/guestLogin'

// Uygulamanın ilk ekranı: misafir mi, personel mi?
export default function Welcome() {
  const { t, i18n } = useTranslation()

  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-background px-5 pb-8 pt-5">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold">AURA Stay</p>
        <LanguageSwitcher />
      </div>

      <div className="pt-12">
        <p className="text-lg text-muted">
          {hotel.name}, {pick(hotel.area, i18n.resolvedLanguage)}
        </p>
        <h1 className="mt-1 text-[34px] font-bold leading-tight">{t('start.title')}</h1>
        <p className="mt-2 text-lg">{t('start.question')}</p>
      </div>

      <div className="mt-8 space-y-3">
        {/* Misafir girişi — ana seçenek, koyu mavi */}
        <Link to="/guest" className="flex min-h-[88px] items-center gap-4 rounded-card bg-primary px-5 py-4 text-card">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card/15">
            <KeyRound size={24} />
          </span>
          <span className="flex-1">
            <span className="block text-lg font-semibold">{t('start.guest')}</span>
            <span className="block text-sm text-card/75">{t('start.guest_text')}</span>
          </span>
          <ChevronRight size={22} className="text-card/75" />
        </Link>

        {/* Personel girişi — /staff ayrı bir uygulama olduğu için sayfa baştan yüklenir (a etiketi) */}
        <a href="/staff" className="flex min-h-[88px] items-center gap-4 rounded-card border border-line bg-card px-5 py-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-service">
            <BriefcaseBusiness size={24} />
          </span>
          <span className="flex-1">
            <span className="block text-lg font-semibold">{t('start.staff')}</span>
            <span className="block text-sm text-muted">{t('start.staff_text')}</span>
          </span>
          <ChevronRight size={22} className="text-muted" />
        </a>
      </div>
    </div>
  )
}
