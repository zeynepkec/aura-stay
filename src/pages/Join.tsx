import { useEffect, useMemo } from 'react'
import { XCircle } from 'lucide-react'
import KeyTag from '../components/KeyTag'
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
          <h1 className="text-4xl font-bold">{t('join.success_title')}</h1>
          <div className="mt-6 w-[260px] text-left">
            <KeyTag caption={session.hotelName}>{session.room}</KeyTag>
          </div>
          <p className="mt-6 text-muted">{t('join.connecting')}</p>
        </>
      ) : (
        <>
          <XCircle size={56} strokeWidth={1.5} className="text-muted" />
          <h1 className="mt-6 text-3xl font-bold">{t('join.invalid_title')}</h1>
          <p className="mt-2 text-muted">{t('join.invalid_text')}</p>
          <Link to="/" className="mt-8 flex h-12 items-center rounded-xl bg-primary px-6 font-semibold text-card">
            {t('join.back')}
          </Link>
        </>
      )}
    </div>
  )
}