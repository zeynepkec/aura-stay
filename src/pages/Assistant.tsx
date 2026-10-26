import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUp, Check, Info, Plus, Star, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { amenityItems, hotel, optionName, tableVenues, transferDestinations } from '../data/hotel'
import { currentHotel } from '../data/hotels'

const currentCity = currentHotel.city
import { menuItems, pick, price } from '../data/menu'
import { routes } from '../data/routes'
import { PRICE_ON_REQUEST } from '../data/stay'
import { reply, type BotMessage, type Chip, type Flow, type PendingRecord } from '../lib/concierge'
import { useShared } from '../lib/shared'
import { useServices } from '../store/ServiceContext'
import { useStay } from '../store/StayContext'
import { routeIcon } from './Explore'
import '../translations/assistant'
import '../translations/explore'
import '../translations/services'

type ChatItem = { id: number; from: 'user'; text: string } | { id: number; from: 'bot'; msg: BotMessage }

let nextId = 1

export default function Assistant() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'en'
  const { placeDirectOrder } = useStay()
  const { sendRequest } = useServices()
  const [soldOut] = useShared<string[]>('aura-soldout', [])
  const [chat, setChat] = useState<ChatItem[]>([])
  const [flow, setFlow] = useState<Flow>(null)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  // Yeni mesaj gelince en alta kaydır
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat, typing])

  const addBot = (messages: BotMessage[]) =>
    setChat((prev) => [...prev, ...messages.map((msg) => ({ id: nextId++, from: 'bot' as const, msg }))])

  // Onay kartını güncelle (yapıldı / iptal)
  const updateConfirm = (id: number, status: 'done' | 'cancelled', resultId?: string) =>
    setChat((prev) =>
      prev.map((c) => (c.id === id && c.from === 'bot' && c.msg.kind === 'confirm' ? { ...c, msg: { ...c.msg, status, resultId } } : c)),
    )

  const lastPendingConfirm = () =>
    [...chat].reverse().find((c) => c.from === 'bot' && c.msg.kind === 'confirm' && c.msg.status === 'pending')

  // Onaylanan siparişi mutfağa / talebi personele gönder
  const execute = (id: number, record: PendingRecord) => {
    if (record.kind === 'order') {
      const available = record.items.filter((i) => !soldOut.includes(i.id))
      const order = placeDirectOrder(available)
      if (!order) return
      updateConfirm(id, 'done', order.id)
      addBot([{ kind: 'text', key: 'order_done' }])
    } else {
      const request = sendRequest(record.service, { ...record.details, note: '' })
      updateConfirm(id, 'done', request.id)
      addBot([{ kind: 'text', key: 'request_done' }])
    }
    setFlow(null)
  }

  const cancel = (id: number) => {
    updateConfirm(id, 'cancelled')
    addBot([{ kind: 'text', key: 'cancelled' }])
    setFlow(null)
  }

  // Mesaj gönder → asistan 0,6 sn sonra cevap verir
  const send = (text: string) => {
    const clean = text.trim()
    if (!clean || typing) return
    setChat((prev) => [...prev, { id: nextId++, from: 'user', text: clean }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const result = reply(clean, lang, flow, soldOut)
      const pending = lastPendingConfirm()
      if (result.action && pending && pending.from === 'bot' && pending.msg.kind === 'confirm') {
        if (result.action === 'confirm') execute(pending.id, pending.msg.record)
        else cancel(pending.id)
      } else {
        addBot(result.messages)
        setFlow(result.flow)
      }
      setTyping(false)
    }, 600)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  // ---------- küçük parçalar ----------
  const chipRow = (chips: Chip[]) => (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((c) => (
        <button key={c.value} type="button" onClick={() => send(c.value)} className="rounded-full border border-line bg-background px-3 py-1.5 text-left text-xs font-medium">
          {c.label}
        </button>
      ))}
    </div>
  )

  const suggestions = (t('assistant.suggestions', { returnObjects: true }) as unknown as string[]).map((s) => ({ label: s, value: s }))

  const dateLabel = (date?: string) => {
    if (!date) return ''
    const today = new Date().toLocaleDateString('sv')
    const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('sv')
    if (date === today) return t('assistant.buttons.today')
    if (date === tomorrow) return t('assistant.buttons.tomorrow')
    return date
  }

  // Talebin ayrıntıları tek satırda: "Atina Havalimanı · Bugün 18:00 · 2 kişi"
  const requestSummary = (record: Extract<PendingRecord, { kind: 'request' }>) => {
    const d = record.details
    const parts: string[] = []
    if (d.slot) parts.push(d.slot === 'now' ? t('services.form.now') : d.slot)
    if (d.items) parts.push(d.items.split(',').map((id) => optionName(amenityItems, id, lang)).join(', '))
    if (d.destination) parts.push(optionName(transferDestinations, d.destination, lang))
    if (d.venue) parts.push(optionName(tableVenues, d.venue, lang))
    if (d.time) parts.push(`${dateLabel(d.date)} ${d.time}`)
    if (d.people) parts.push(`${d.people} 👤`)
    return parts.join(' · ')
  }

  const renderConfirm = (id: number, msg: Extract<BotMessage, { kind: 'confirm' }>) => {
    const { record } = msg
    return (
      <>
        <p>{t(record.kind === 'order' ? 'assistant.ai.confirm_order' : 'assistant.ai.confirm_request')}</p>
        <div className="mt-2 rounded-xl bg-background p-3">
          {record.kind === 'order' ? (
            <ul className="space-y-1">
              {record.items.map((i) => {
                const item = menuItems.find((x) => x.id === i.id)
                return (
                  <li key={i.id} className="flex justify-between gap-2">
                    <span>
                      <b>{i.quantity}×</b> {item ? pick(item.name, lang) : i.id}
                    </span>
                    <span className="text-muted">{price((item?.price ?? 0) * i.quantity, lang)}</span>
                  </li>
                )
              })}
              <li className="flex justify-between border-t border-line pt-1 font-semibold">
                <span>{t('assistant.buttons.total')}</span>
                <span>{price(record.items.reduce((s, i) => s + (menuItems.find((x) => x.id === i.id)?.price ?? 0) * i.quantity, 0), lang)}</span>
              </li>
            </ul>
          ) : (
            <>
              <p className="font-semibold">{t(`services.types.${record.service}.title`)}</p>
              <p className="text-xs text-muted">{requestSummary(record)}</p>
            </>
          )}
        </div>
        {record.kind === 'request' && PRICE_ON_REQUEST.includes(record.service) && (
          <p className="mt-2 flex gap-1.5 text-xs text-muted">
            <Info size={13} className="mt-px shrink-0 text-accent" />
            {t('assistant.ai.price_rule')}
          </p>
        )}

        {msg.status === 'pending' && (
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => cancel(id)} className="flex h-10 flex-1 items-center justify-center gap-1 rounded-[10px] border border-line text-sm font-semibold">
              <X size={15} />
              {t('assistant.buttons.no')}
            </button>
            <button type="button" onClick={() => execute(id, record)} className="flex h-10 flex-[1.4] items-center justify-center gap-1 rounded-[10px] bg-ink text-sm font-semibold text-card">
              <Check size={15} />
              {t('assistant.buttons.yes')}
            </button>
          </div>
        )}
        {msg.status === 'done' && (
          <Link
            to={record.kind === 'order' ? `/orders/${msg.resultId}` : '/services'}
            className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-service px-3 py-2 text-sm font-semibold"
          >
            <span className="flex items-center gap-1.5"><Check size={15} /> #{msg.resultId}</span>
            <span className="underline">{t(record.kind === 'order' ? 'assistant.buttons.track_order' : 'assistant.buttons.see_requests')}</span>
          </Link>
        )}
        {msg.status === 'cancelled' && <p className="mt-2 text-xs font-semibold text-muted">{t('assistant.buttons.cancelled')}</p>}
      </>
    )
  }

  const renderMessage = (id: number, msg: BotMessage): ReactNode => {
    if (msg.kind === 'text') {
      return (
        <>
          {msg.raw ?? t(`assistant.ai.${msg.key}`, msg.params)}
          {msg.chips && chipRow(msg.chips)}
          {msg.suggest && chipRow(suggestions)}
        </>
      )
    }
    if (msg.kind === 'confirm') return renderConfirm(id, msg)
    if (msg.kind === 'menu') {
      return (
        <>
          {t('assistant.ai.menu_hint')}
          <ul className="mt-2 space-y-1.5">
            {msg.itemIds.map((itemId) => {
              const item = menuItems.find((m) => m.id === itemId)
              if (!item) return null
              return (
                <li key={itemId} className="flex items-center gap-2 rounded-xl bg-background p-2">
                  <span className="text-xl">{item.image}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{pick(item.name, lang)}</span>
                    <span className="block text-xs text-muted">{price(item.price, lang)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => send(`1 ${pick(item.name, lang)}`)}
                    aria-label={t('assistant.buttons.add')}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-card"
                  >
                    <Plus size={15} />
                  </button>
                </li>
              )
            })}
          </ul>
          <Link to="/dining" className="mt-2 block text-xs font-semibold text-accent underline">{t('assistant.buttons.open_menu')}</Link>
        </>
      )
    }
    // route
    const route = routes.find((r) => r.id === msg.routeId)
    if (!route) return null
    const Icon = routeIcon(route)
    return (
      <>
        {t('assistant.ai.route_intro')}
        <Link to={`/explore/${route.id}`} className="mt-2 flex items-center gap-3 rounded-xl bg-background p-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-activity">
            <Icon size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold">{pick(route.title, lang)}</span>
            <span className="block text-xs text-muted">{t('explore.min', { count: route.minutes })} · {t('explore.km', { count: route.km })}</span>
          </span>
          <span className="flex items-center gap-0.5 text-xs font-semibold">
            <Star size={12} className="fill-accent text-accent" />
            {route.rating}
          </span>
        </Link>
        <p className="mt-2 text-xs text-ink/70">💡 {pick(route.tip, lang)}</p>
        {chipRow(msg.chips)}
        <Link to="/explore" className="mt-2 block text-xs font-semibold text-accent underline">{t('assistant.buttons.all_routes')}</Link>
      </>
    )
  }

  // Asistan baloncuğu
  const botBubble = (key: number, children: ReactNode) => (
    <div key={key} className="flex gap-2">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-discover">
        <span className="font-display text-base font-extrabold">{hotel.name.charAt(0)}</span>
      </span>
      <div className="max-w-[85%] rounded-card rounded-tl-md border border-line bg-card px-4 py-3 text-sm leading-relaxed">{children}</div>
    </div>
  )

  return (
    <div className="pb-20">
      <header className="mb-4 flex items-center gap-3 bg-primary px-5 pb-5 pt-6 text-card">
        <span className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-card font-display text-[22px] font-extrabold text-primary">K</span>
        <div>
          <h1 className="text-[36px] leading-none">{t('assistant.title')}</h1>
          <p className="mt-1 text-sm text-card/85">{t('assistant.subtitle', { hotel: hotel.name.split(' ')[0] })}</p>
        </div>
      </header>

      <div className="space-y-3 px-5">
        {/* Karşılama mesajı */}
        {botBubble(
          -1,
          <>
            {t('assistant.welcome', { hotel: hotel.name.split(' ')[0], city: pick(currentCity, lang) })}
            {chat.length === 0 && chipRow(suggestions)}
          </>,
        )}

        {/* Sohbet */}
        {chat.map((c) =>
          c.from === 'user' ? (
            <div key={c.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-card rounded-tr-md bg-ink px-4 py-3 text-sm text-card">{c.text}</p>
            </div>
          ) : (
            botBubble(c.id, renderMessage(c.id, c.msg))
          ),
        )}

        {/* Yazıyor… */}
        {typing &&
          botBubble(
            -2,
            <span className="flex gap-1 py-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
            </span>,
          )}
        <div ref={endRef} />
      </div>

      {/* Mesaj yazma alanı */}
      <form onSubmit={onSubmit} className="fixed bottom-[76px] left-1/2 z-10 flex w-full max-w-[430px] -translate-x-1/2 gap-2 bg-background px-5 py-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('assistant.placeholder')}
          className="h-12 flex-1 rounded-[10px] border border-line bg-card px-4 text-base outline-none focus:border-primary"
        />
        <button type="submit" disabled={!input.trim() || typing} aria-label={t('assistant.buttons.send', { defaultValue: 'Gönder' })} className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-primary text-card disabled:opacity-30">
          <ArrowUp size={20} />
        </button>
      </form>
    </div>
  )
}
