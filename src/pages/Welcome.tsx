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
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-gradient-to-br from-discover to-discover-pink px-6 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold uppercase tracking-[0.2em]">AURA Stay</p>
        <LanguageSwitcher />
      </div>

      <div className="mt-12">
        <h1 className="text-4xl font-bold leading-tight">{t('start.title')}</h1>
        <p className="mt-3 text-base text-ink/70">{t('start.subtitle')}</p>
        <p className="mt-6 text-sm font-semibold">{t('start.question')}</p>
      </div>

      {saved && (
        <section className="mt-4 flex items-center gap-3 rounded-card bg-ink p-4 text-card">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-card/15">
            <RotateCcw size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{t('start.continue_title')}</p>
            <p className="truncate text-xs text-card/75">{t('join.success_text', { room: saved.room, hotel: saved.hotelName })}</p>
            <button
              type="button"
              onClick={() => {
                endSession()
                window.location.replace('/')
              }}
              className="mt-1 text-xs text-card/75 underline"
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
            className="flex h-11 shrink-0 items-center rounded-full bg-card px-4 text-sm font-semibold text-ink"
          >
            {t('start.continue')}
          </button>
        </section>
      )}

      <div className="mt-4 flex flex-col gap-4">
        {/* 1. seçenek: Misafir */}
        <section className="rounded-card bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-discover/40">
              <KeyRound size={24} strokeWidth={1.75} />
            </span>
            <div>
              <h2 className="text-lg font-bold">{t('start.guest')}</h2>
              <p className="text-sm text-muted">{t('start.guest_text')}</p>
            </div>
          </div>
          <Link to="/guest" className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-card">
            {t('start.guest')}
            <ArrowRight size={16} />
          </Link>
        </section>

        {/* 2. seçenek: Personel — /staff ayrı bir uygulama olduğu için sayfa baştan yüklenir (a etiketi) */}
        <section className="rounded-card bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-service">
              <UserCog size={24} strokeWidth={1.75} />
            </span>
            <div>
              <h2 className="text-lg font-bold">{t('start.staff')}</h2>
              <p className="text-sm text-muted">{t('start.staff_text')}</p>
            </div>
          </div>
          <a href="/staff" className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full border border-ink text-sm font-semibold">
            {t('start.staff')}
            <ArrowRight size={16} />
          </a>
        </section>
      </div>
    </div>
  )
}
