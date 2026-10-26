import { ArrowRight, KeyRound, RotateCcw, UserCog } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { endSession, getSession, markEntered } from '../lib/session'
import '../translations/guestLogin'
import '../translations/join'

// Uygulamanın ilk ekranı: misafir mi, personel mi?
export default function Welcome() {
  const { t } = useTranslation()
  // Bu telefonda daha önce bir odaya giriş yapıldıysa "Devam et" seçeneği
  const saved = getSession()

  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-background">
      {/* Tabela */}
      <header className="bg-primary px-5 pb-8 pt-5 text-card">
        <div className="flex items-center justify-between">
          <span className="font-display text-[17px] font-bold">AURA Stay</span>
          <LanguageSwitcher dark />
        </div>
        <h1 className="mt-10 text-[44px] leading-none">{t('start.title')}</h1>
        <p className="mt-3 text-card/85">{t('start.subtitle')}</p>
      </header>

      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <h2 className="mb-3 text-[22px]">{t('start.question')}</h2>

        {saved && (
          <section className="mb-3 flex items-center gap-3 rounded-card bg-ink p-4 text-card">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card/15">
              <RotateCcw size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-extrabold leading-tight">{t('start.continue_title')}</p>
              <p className="truncate text-sm text-card/80">{t('join.success_text', { room: saved.room, hotel: saved.hotelName })}</p>
              <button
                type="button"
                onClick={() => {
                  endSession()
                  window.location.replace('/')
                }}
                className="mt-0.5 text-xs text-card/75 underline"
              >
                {t('start.not_me')}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                markEntered()
                window.location.replace('/')
              }}
              className="flex h-11 shrink-0 items-center rounded-[10px] bg-card px-4 font-display text-base font-extrabold text-ink"
            >
              {t('start.continue')}
            </button>
          </section>
        )}

        <ul className="divide-y divide-line rounded-card border border-line bg-card">
          <li>
            <Link to="/guest" className="flex min-h-[76px] items-center gap-3.5 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-card">
                <KeyRound size={20} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-xl font-extrabold">{t('start.guest')}</span>
                <span className="block text-sm text-muted">{t('start.guest_text')}</span>
              </span>
              <ArrowRight size={22} />
            </Link>
          </li>
          <li>
            {/* /staff ayrı bir uygulama olduğu için sayfa baştan yüklenir (a etiketi) */}
            <a href="/staff" className="flex min-h-[76px] items-center gap-3.5 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-service">
                <UserCog size={20} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-xl font-extrabold">{t('start.staff')}</span>
                <span className="block text-sm text-muted">{t('start.staff_text')}</span>
              </span>
              <ArrowRight size={22} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
