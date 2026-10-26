import { useState } from 'react'
import { ArrowLeft, Info, Minus, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { amenityItems, cleaningSlots, optionName, tableVenues, transferDestinations } from '../data/hotel'
import { PRICE_ON_REQUEST } from '../data/stay'
import { useServices, type ServiceType } from '../store/ServiceContext'
import { serviceBadge } from './Services'
import { serviceDesc } from '../lib/serviceDesc'
import '../translations/services'

// Bugünün tarihi "2026-10-25" biçiminde (yerel saate göre)
const today = new Date().toLocaleDateString('sv')

export default function ServiceRequest() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { sendRequest } = useServices()
  const type = (useParams().type ?? 'cleaning') as ServiceType

  // Form alanları (kampanya linki ?venue=rooftop ile gelebilir)
  const [slot, setSlot] = useState('now')
  const [items, setItems] = useState<string[]>(['towel'])
  const [destination, setDestination] = useState(transferDestinations[0].id)
  const [venue, setVenue] = useState(params.get('venue') ?? tableVenues[0].id)
  const [date, setDate] = useState(today)
  const [time, setTime] = useState(type === 'table' ? '20:00' : '12:00')
  const [count, setCount] = useState(2)
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  const toggleItem = (id: string) =>
    setItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const canSend = type !== 'towels' || items.length > 0

  const submit = () => {
    const details: Record<string, string> = { note: note.trim() }
    if (type === 'cleaning') details.slot = slot
    if (type === 'towels') Object.assign(details, { items: items.join(','), quantity: String(count) })
    if (type === 'transfer') Object.assign(details, { destination, date, time, people: String(count) })
    if (type === 'table') Object.assign(details, { venue, date, time, people: String(count) })
    sendRequest(type, details)
    setSent(true)
    setTimeout(() => navigate('/services'), 1200)
  }

  // Seçilebilir buton (ör. saat dilimi)
  const choice = (value: string, active: boolean, onClick: () => void, text: string) => (
    <button
      key={value}
      type="button"
      onClick={onClick}
      className={`h-11 rounded-[10px] px-4 font-display text-base font-bold ${active ? 'bg-primary text-card' : 'border border-line bg-card'}`}
    >
      {text}
    </button>
  )

  const label = (text: string) => <p className="mb-2 font-display text-lg font-extrabold">{text}</p>
  const inputClass = 'h-12 w-full rounded-[10px] border border-line bg-card px-4 text-base outline-none focus:border-primary'

  return (
    <div>
      {/* Başlık: hizmetin hattı */}
      <header className={`mb-6 px-5 pb-5 pt-3 ${serviceBadge[type].line === 'clean' ? 'bg-discover-pink' : 'bg-activity'}`}>
        <Link to="/services" className="-ml-1 flex h-10 w-fit items-center gap-1 text-sm">
          <ArrowLeft size={18} />
          {t('services.form.back')}
        </Link>
        <div className="mt-1 flex items-center gap-3">
        <span className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-ink px-1.5 font-title text-[20px] font-extrabold text-card">
          {serviceBadge[type].label}
        </span>
        <div>
          <h1 className="text-[30px] leading-none">{t(`services.types.${type}.title`)}</h1>
          <p className="mt-1 text-sm">{serviceDesc(type, t, i18n.resolvedLanguage)}</p>
        </div>
        </div>
      </header>

      <div className="space-y-6 px-5">
        {/* Temizlik: saat dilimi */}
        {type === 'cleaning' && (
          <section>
            {label(t('services.form.when'))}
            <div className="flex flex-wrap gap-2">
              {choice('now', slot === 'now', () => setSlot('now'), t('services.form.now'))}
              {cleaningSlots.map((s) => choice(s, slot === s, () => setSlot(s), s))}
            </div>
          </section>
        )}

        {/* Havlu ve malzeme: birden fazla seçilebilir */}
        {type === 'towels' && (
          <section>
            {label(t('services.form.items'))}
            <div className="flex flex-wrap gap-2">
              {amenityItems.map((item) =>
                choice(item.id, items.includes(item.id), () => toggleItem(item.id), optionName(amenityItems, item.id, lang)),
              )}
            </div>
          </section>
        )}

        {/* Transfer: nereye */}
        {type === 'transfer' && (
          <section>
            {label(t('services.form.where'))}
            <div className="flex flex-wrap gap-2">
              {transferDestinations.map((d) =>
                choice(d.id, destination === d.id, () => setDestination(d.id), optionName(transferDestinations, d.id, lang)),
              )}
            </div>
          </section>
        )}

        {/* Masa: restoran mı teras mı */}
        {type === 'table' && (
          <section>
            {label(t('services.form.venue'))}
            <div className="flex flex-wrap gap-2">
              {tableVenues.map((v) => choice(v.id, venue === v.id, () => setVenue(v.id), optionName(tableVenues, v.id, lang)))}
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

        {/* Kişi sayısı ya da adet */}
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

        {/* Ücret bilgisi: transfer ücretini resepsiyon onaylar */}
        {PRICE_ON_REQUEST.includes(type) && (
          <p className="flex gap-2 rounded-2xl bg-accent/10 p-3 text-xs text-ink/80">
            <Info size={14} className="mt-px shrink-0 text-accent" />
            {t('services.form.price_note')}
          </p>
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
          disabled={sent || !canSend}
          className={`h-14 w-full rounded-full text-sm font-semibold disabled:opacity-40 ${sent ? 'bg-success-tint text-success-text' : 'bg-ink text-card'}`}
        >
          {sent ? t('services.form.sent') : t('services.form.send')}
        </button>
      </div>
    </div>
  )
}
