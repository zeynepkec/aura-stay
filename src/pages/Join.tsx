import { useEffect, useMemo } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { startSession } from '../lib/session'
import '../translations/join'

export default function Join() {
  const { t } = useTranslation()
  const [params] = useSearchParams()

  // Linkteki otel, oda ve anahtarı kontrol et
  const session = useMemo(
    () => startSession(params.get('hotel') ?? '', params.get('room') ?? '', params.get('token') ?? ''),
    [params],
  )

  // Doğruysa 1,5 sn sonra uygulamayı odaya özel olarak aç
  useEffect(() => {
    if (!session) return
    const timer = setTimeout(() => window.location.replace('/'), 1500)
    return () => clearTimeout(timer)
  }, [session])

  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col items-center justify-center bg-background px-6 text-center">
      {session ? (
        <>
          <CheckCircle2 size={64} strokeWidth={1.5} />
          <h1 className="mt-6 text-4xl font-bold">{t('join.success_title')}</h1>
          <p className="mt-2 text-lg font-semibold">{t('join.success_text', { room: session.room, hotel: session.hotelName })}</p>
          <p className="mt-6 animate-pulse text-sm text-ink/60">{t('join.connecting')}</p>
        </>
      ) : (
        <>
          <XCircle size={64} strokeWidth={1.5} />
          <h1 className="mt-6 text-3xl font-bold">{t('join.invalid_title')}</h1>
          <p className="mt-2 text-sm text-ink/70">{t('join.invalid_text')}</p>
          <Link to="/" className="mt-8 flex h-12 items-center rounded-[10px] bg-ink px-6 text-sm font-semibold text-card">
            {t('join.back')}
          </Link>
        </>
      )}
    </div>
  )
}