import { useState } from 'react'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useServices, type ServiceType } from '../store/ServiceContext'
import { serviceIcons } from './Services'
import '../translations/services'

const today = new Date().toISOString().slice(0, 10)

export default function ServiceRequest() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { sendRequest } = useServices()
  const type = (useParams().type ?? 'cleaning') as ServiceType
  const Icon = serviceIcons[type] ?? serviceIcons.cleaning

  // Form alanları
  const [slot, setSlot] = useState('now')
  const [destination, setDestination] = useState('airport')
  const [date, setDate] = useState(today)
  const [time, setTime] = useState('20:00')
  const [count, setCount] = useState(type === 'towels' ? 2 : 2)
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  const submit = () => {
    const details: Record<string, string> = { note }
    if (type === 'cleaning') details.slot = slot
    if (type === 'transfer') Object.assign(details, { destination, date, time, people: String(count) })
    if (type === 'table') Object.assign(details, { date, time, people: String(count) })
    if (type === 'towels') details.quantity = String(count)
    sendRequest(type, details)
    setSent(true)
    setTimeout(() => navigate('/services'), 1200)
  }

  // Seçilebilir buton (ör. saat dilimi)
  const choice = (value: string, current: string, set: (v: string) => void, label: string) => (
    <button
      key={value}
      type="button"
      onClick={() => set(value)}
      className={`h-10 rounded-full px-4 text-sm font-medium ${current === value ? 'bg-ink text-card' : 'border border-line bg-card'}`}
    >
      {label}
    </button>
  )

  const label = (text: string) => <p className="mb-2 text-sm font-bold">{text}</p>
  const inputClass = 'h-12 w-full rounded-2xl border border-line bg-card px-4 text-sm outline-none focus:border-accent'

  return (
    <div>
      <Link to="/services" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-sm text-muted">
        <ArrowLeft size={18} />
        {t('services.form.back')}
      </Link>

      {/* Başlık kartı — Sage Green */}
      <header className="mx-5 mb-6 flex items-center gap-4 rounded-card bg-service p-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card/70">
          <Icon size={22} />
        </span>
        <div>
          <h1 className="text-xl font-bold">{t(`services.types.${type}.title`)}</h1>
          <p className="text-sm text-ink/70">{t(`services.types.${type}.desc`)}</p>
        </div>
      </header>

      <div className="space-y-6 px-5">
        {/* Temizlik: saat dilimi */}
        {type === 'cleaning' && (
          <section>
            {label(t('services.form.when'))}
            <div className="flex flex-wrap gap-2">
              {choice('now', slot, setSlot, t('services.form.now'))}
              {['11:00–13:00', '13:00–15:00', '15:00–17:00'].map((s) => choice(s, slot, setSlot, s))}
            </div>
          </section>
        )}

        {/* Transfer: nereye */}
        {type === 'transfer' && (
          <section>
            {label(t('services.form.where'))}
            <div className="flex flex-wrap gap-2">
              {['airport', 'center', 'marina'].map((d) => choice(d, destination, setDestination, t(`services.form.${d}`)))}
            </div>
          </section>
        )}

        {/* Transfer ve masa: tarih + saat */}
        {(type === 'transfer' || type === 'table') && (
          <section className="grid grid-cols-2 gap-3">
            <div>
              {label(t('services.form.date'))}
              <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              {label(t('services.form.time'))}
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
            </div>
          </section>
        )}

        {/* Kişi sayısı ya da havlu adedi */}
        {type !== 'cleaning' && (
          <section>
            {label(type === 'towels' ? t('services.form.quantity') : t('services.form.people'))}
            <div className="flex w-fit items-center gap-2 rounded-full border border-line bg-card p-1">
              <button type="button" onClick={() => setCount(Math.max(1, count - 1))} className="flex h-10 w-10 items-center justify-center">
                <Minus size={16} />
              </button>
              <span className="min-w-[24px] text-center font-semibold">{count}</span>
              <button type="button" onClick={() => setCount(Math.min(10, count + 1))} className="flex h-10 w-10 items-center justify-center">
                <Plus size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Not */}
        <section>
          {label(t('services.form.note'))}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-card border border-line bg-card p-4 text-sm outline-none focus:border-accent"
          />
        </section>

        {/* Gönder */}
        <button
          type="button"
          onClick={submit}
          disabled={sent}
          className={`h-14 w-full rounded-full text-sm font-semibold ${sent ? 'bg-service text-ink' : 'bg-ink text-card'}`}
        >
          {sent ? t('services.form.sent') : t('services.form.send')}
        </button>
      </div>
    </div>
  )
}