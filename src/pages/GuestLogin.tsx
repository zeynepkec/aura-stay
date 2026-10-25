import { useEffect, useRef, useState, type FormEvent } from 'react'
import QrScanner from 'qr-scanner'
import { ArrowLeft, ChevronRight, Hash, ImageUp, Nfc, QrCode, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import KeyTag from '../components/KeyTag'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { startSessionFromLink, startSessionWithCode, type Session } from '../lib/session'
import '../translations/guestLogin'

type Mode = 'qr' | 'code' | 'card'

const options: { mode: Mode; icon: LucideIcon }[] = [
  { mode: 'qr', icon: QrCode },
  { mode: 'code', icon: Hash },
  { mode: 'card', icon: Nfc },
]

// Giriş başarılı: kısa bir karşılama, sonra uygulama odaya özel açılır
function Success({ session }: { session: Session }) {
  const { t } = useTranslation()
  useEffect(() => {
    const timer = setTimeout(() => window.location.replace('/'), 1500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">{t('guest.welcome')}</h1>
      <div className="mt-6 w-[260px] text-left">
        <KeyTag caption={session.hotelName}>{session.room}</KeyTag>
      </div>
      <p className="mt-6 text-muted">{t('guest.connecting')}</p>
    </div>
  )
}

// 1) QR kod: kamerayla canlı okuma + fotoğraftan okuma (kamera açılmazsa)
function QrPanel({ onDone }: { onDone: (s: Session) => void }) {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<'camera' | 'invalid' | null>(null)

  const handle = (text: string) => {
    const session = startSessionFromLink(text, 'qr')
    if (session) onDone(session)
    else setError('invalid')
  }

  useEffect(() => {
    if (!videoRef.current) return
    const scanner = new QrScanner(videoRef.current, (result) => handle(result.data), {
      preferredCamera: 'environment',
      highlightScanRegion: false,
      returnDetailedScanResult: true,
    })
    scanner.start().catch(() => setError('camera'))
    return () => scanner.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPhoto = async (file?: File) => {
    if (!file) return
    try {
      const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true })
      handle(result.data)
    } catch {
      setError('invalid')
    }
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-card bg-ink">
        <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
        {/* Okuma çerçevesi */}
        <span className="pointer-events-none absolute inset-[18%] rounded-card border-4 border-card/90" />
      </div>
      <p className="mt-3 text-center text-muted">{t('guest.qr_hint')}</p>
      {error && (
        <p role="alert" className="mt-3 rounded-xl bg-activity/50 p-3 text-sm">
          {t(error === 'camera' ? 'guest.qr_no_camera' : 'guest.qr_invalid')}
        </p>
      )}
      <label className="mt-4 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-card font-semibold">
        <ImageUp size={18} />
        {t('guest.qr_photo')}
        <input type="file" accept="image/*" className="sr-only" onChange={(e) => onPhoto(e.target.files?.[0])} />
      </label>
    </div>
  )
}

// 2) Oda numarası + giriş kodu
function CodePanel({ onDone }: { onDone: (s: Session) => void }) {
  const { t } = useTranslation()
  const [room, setRoom] = useState('')
  const [code, setCode] = useState('')
  const [wrong, setWrong] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const session = startSessionWithCode(room, code)
    if (session) onDone(session)
    else setWrong(true)
  }

  const input = 'h-14 w-full rounded-xl border border-line bg-card px-4 text-xl font-semibold tracking-wide outline-none focus:border-primary'

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="room" className="mb-1.5 block font-semibold">{t('guest.room_label')}</label>
        <input
          id="room"
          value={room}
          onChange={(e) => { setRoom(e.target.value.replace(/\D/g, '')); setWrong(false) }}
          inputMode="numeric"
          maxLength={4}
          autoComplete="off"
          placeholder={t('guest.room_placeholder')}
          className={input}
        />
      </div>
      <div>
        <label htmlFor="code" className="mb-1.5 block font-semibold">{t('guest.code_label')}</label>
        <input
          id="code"
          value={code}
          onChange={(e) => { setCode(e.target.value.toLowerCase()); setWrong(false) }}
          maxLength={4}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={t('guest.code_placeholder')}
          className={input}
        />
        <p className="mt-1.5 text-sm text-muted">{t('guest.code_help')}</p>
      </div>
      {wrong && <p role="alert" className="rounded-xl bg-activity/50 p-3 text-sm">{t('guest.code_wrong')}</p>}
      <button
        type="submit"
        disabled={!room || code.length < 4}
        className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-card disabled:opacity-40"
      >
        {t('guest.code_submit')}
      </button>
    </form>
  )
}

// 3) Oda kartı (NFC). Tarayıcılarda sadece Android + Chrome destekliyor (Web NFC).
type NdefRecord = { recordType: string; data?: DataView }
type NdefReader = {
  scan: (options?: { signal?: AbortSignal }) => Promise<void>
  onreading: ((e: { message: { records: NdefRecord[] } }) => void) | null
  onreadingerror: (() => void) | null
}
const NfcReader = (window as unknown as { NDEFReader?: new () => NdefReader }).NDEFReader

function CardPanel({ onDone }: { onDone: (s: Session) => void }) {
  const { t } = useTranslation()
  const [state, setState] = useState<'idle' | 'waiting' | 'error' | 'invalid'>('idle')
  const abort = useRef<AbortController | null>(null)

  useEffect(() => () => abort.current?.abort(), [])

  if (!NfcReader) {
    return <p className="rounded-xl bg-activity/50 p-4">{t('guest.card_unsupported')}</p>
  }

  const start = async () => {
    try {
      abort.current?.abort()
      abort.current = new AbortController()
      const reader = new NfcReader()
      reader.onreading = (e) => {
        const decoder = new TextDecoder()
        for (const record of e.message.records) {
          if ((record.recordType === 'url' || record.recordType === 'text') && record.data) {
            // Metin kayıtlarının başında dil kodu olabilir; linki içinden bul
            const text = decoder.decode(record.data)
            const link = text.slice(Math.max(0, text.search(/https?:\/\/|\/join/)))
            const session = startSessionFromLink(link, 'card')
            if (session) {
              abort.current?.abort()
              onDone(session)
              return
            }
          }
        }
        setState('invalid')
      }
      reader.onreadingerror = () => setState('error')
      await reader.scan({ signal: abort.current.signal })
      setState('waiting')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
      <span className="flex h-32 w-32 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Nfc size={56} strokeWidth={1.5} className={state === 'waiting' ? 'animate-pulse' : ''} />
      </span>
      {state === 'waiting' ? (
        <p className="mt-5 text-lg">{t('guest.card_waiting')}</p>
      ) : (
        <button type="button" onClick={start} className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-card">
          {t('guest.card_start')}
        </button>
      )}
      {(state === 'error' || state === 'invalid') && (
        <p role="alert" className="mt-4 w-full rounded-xl bg-activity/50 p-3 text-sm">
          {t(state === 'error' ? 'guest.card_error' : 'guest.card_invalid')}
        </p>
      )}
    </div>
  )
}

export default function GuestLogin() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<Mode | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-background px-5 pb-8 pt-4">
      <div className="flex items-center justify-between">
        {mode && !session ? (
          <button type="button" onClick={() => setMode(null)} className="-ml-2 flex h-11 items-center gap-1 px-2 text-muted">
            <ArrowLeft size={18} />
            {t('guest.back')}
          </button>
        ) : (
          <Link to="/" className="-ml-2 flex h-11 items-center gap-1 px-2 text-muted">
            <ArrowLeft size={18} />
            {t('guest.back')}
          </Link>
        )}
        <LanguageSwitcher />
      </div>

      {session ? (
        <Success session={session} />
      ) : (
        <>
          <header className="pb-6 pt-6">
            <h1 className="text-3xl font-bold">{mode ? t(`guest.${mode}`) : t('guest.title')}</h1>
            <p className="mt-1 text-muted">{mode ? t(`guest.${mode}_text`) : t('guest.text')}</p>
          </header>

          {/* Üç giriş yolu */}
          {!mode && (
            <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
              {options.map(({ mode: m, icon: Icon }) => (
                <li key={m}>
                  <button type="button" onClick={() => setMode(m)} className="flex min-h-[80px] w-full items-center gap-4 px-4 py-3 text-left active:bg-background">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon size={24} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-semibold">{t(`guest.${m}`)}</span>
                      <span className="block text-sm text-muted">{t(`guest.${m}_text`)}</span>
                    </span>
                    <ChevronRight size={20} className="text-muted" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {mode === 'qr' && <QrPanel onDone={setSession} />}
          {mode === 'code' && <CodePanel onDone={setSession} />}
          {mode === 'card' && <CardPanel onDone={setSession} />}
        </>
      )}
    </div>
  )
}
