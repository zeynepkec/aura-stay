import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUp, Sparkles, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { menuItems, pick, price } from '../data/menu'
import { routes } from '../data/routes'
import { understand, type AssistantAction } from '../lib/assistant'
import { useServices } from '../store/ServiceContext'
import { useStay } from '../store/StayContext'
import { routeIcons } from './Explore'
import '../translations/assistant'
import '../translations/explore'
import '../translations/services'

type Message = { id: number; from: 'user' | 'bot'; text: string; action?: AssistantAction; done?: boolean }

export default function Assistant() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { quantityOf, setQuantity } = useStay()
  const { sendRequest } = useServices()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  // Yeni mesaj gelince en alta kaydır
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const replyText = (action: AssistantAction) => {
    if (action.type === 'service' || action.type === 'form') {
      return t(`assistant.replies.${action.type}`, { service: t(`services.types.${action.service}.title`) })
    }
    return t(`assistant.replies.${action.type}`)
  }

  // Mesaj gönder → asistan 0,7 sn sonra cevap verir
  const send = (text: string) => {
    const clean = text.trim()
    if (!clean || typing) return
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text: clean }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const action = understand(clean)
      setMessages((prev) => [...prev, { id: Date.now(), from: 'bot', text: replyText(action), action }])
      setTyping(false)
    }, 700)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const markDone = (id: number) => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, done: true } : m)))

  const suggestions = t('assistant.suggestions', { returnObjects: true }) as unknown as string[]
  const suggestionChips = (
    <div className="mt-3 flex flex-wrap gap-2">
      {suggestions.map((s) => (
        <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-line bg-background px-3 py-1.5 text-left text-xs font-medium">
          {s}
        </button>
      ))}
    </div>
  )

  const button = 'mt-3 flex h-10 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-card'
  const doneBox = 'mt-3 flex items-center justify-between gap-2 rounded-2xl bg-service px-3 py-2 text-sm font-semibold'

  // Asistan cevabının altındaki kart/buton
  const renderAction = (m: Message) => {
    const action = m.action
    if (!action) return null

    if (action.type === 'order') {
      const total = action.items.reduce((sum, i) => sum + (menuItems.find((x) => x.id === i.id)?.price ?? 0) * i.quantity, 0)
      return (
        <div className="mt-2">
          <ul className="space-y-1 rounded-2xl bg-background p-3">
            {action.items.map((i) => {
              const item = menuItems.find((x) => x.id === i.id)
              return (
                <li key={i.id} className="flex justify-between gap-2">
                  <span><b>{i.quantity}×</b> {item ? pick(item.name, lang) : i.id}</span>
                  <span className="text-muted">{price((item?.price ?? 0) * i.quantity, lang)}</span>
                </li>
              )
            })}
            <li className="flex justify-between border-t border-line pt-1 font-semibold">
              <span>{t('assistant.buttons.total')}</span>
              <span>{price(total, lang)}</span>
            </li>
          </ul>
          {m.done ? (
            <div className={doneBox}>
              {t('assistant.buttons.added')}
              <Link to="/cart" className="underline">{t('assistant.buttons.go_cart')}</Link>
            </div>
          ) : (
            <button
              type="button"
              className={button}
              onClick={() => {
                action.items.forEach((i) => setQuantity(i.id, quantityOf(i.id) + i.quantity))
                markDone(m.id)
              }}
            >
              {t('assistant.buttons.add_to_cart')}
            </button>
          )}
        </div>
      )
    }

    if (action.type === 'service') {
      return m.done ? (
        <div className={doneBox}>
          {t('assistant.buttons.request_sent')}
          <Link to="/services" className="underline">{t('assistant.buttons.see_requests')}</Link>
        </div>
      ) : (
        <button
          type="button"
          className={button}
          onClick={() => {
            const note = t('assistant.via')
            sendRequest(action.service, action.service === 'towels' ? { quantity: '2', note } : { slot: 'now', note })
            markDone(m.id)
          }}
        >
          {t('assistant.buttons.send_request')}
        </button>
      )
    }

    if (action.type === 'form') {
      return <Link to={`/services/${action.service}`} className={button}>{t('assistant.buttons.open_form')}</Link>
    }

    if (action.type === 'menu') {
      return <Link to="/dining" className={button}>{t('assistant.buttons.open_menu')}</Link>
    }

    if (action.type === 'routes') {
      return (
        <div className="mt-2 space-y-2">
          {action.routeIds.map((id) => {
            const route = routes.find((r) => r.id === id)
            if (!route) return null
            const Icon = routeIcons[route.category]
            return (
              <Link key={id} to={`/explore/${id}`} className="flex items-center gap-3 rounded-2xl bg-background p-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-activity">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1 truncate font-semibold">{pick(route.title, lang)}</span>
                <span className="flex items-center gap-0.5 text-xs font-semibold">
                  <Star size={12} className="fill-accent text-accent" />
                  {route.rating}
                </span>
              </Link>
            )
          })}
        </div>
      )
    }

    return suggestionChips
  }

  // Asistan baloncuğu
  const botBubble = (key: number, children: React.ReactNode) => (
    <div key={key} className="flex gap-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-discover to-discover-pink">
        <Sparkles size={16} />
      </span>
      <div className="max-w-[85%] rounded-card rounded-tl-md border border-line bg-card px-4 py-3 text-sm leading-relaxed">{children}</div>
    </div>
  )

  return (
    <div className="pb-20">
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-3xl font-bold">{t('assistant.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('assistant.subtitle')}</p>
      </header>

      <div className="space-y-3 px-5">
        {/* Karşılama mesajı */}
        {botBubble(
          -1,
          <>
            {t('assistant.welcome')}
            {messages.length === 0 && suggestionChips}
          </>,
        )}

        {/* Sohbet */}
        {messages.map((m) =>
          m.from === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-card rounded-tr-md bg-ink px-4 py-3 text-sm text-card">{m.text}</p>
            </div>
          ) : (
            botBubble(
              m.id,
              <>
                {m.text}
                {renderAction(m)}
              </>,
            )
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
          className="h-12 flex-1 rounded-full border border-line bg-card px-5 text-sm outline-none focus:border-accent"
        />
        <button type="submit" disabled={!input.trim() || typing} className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-card disabled:opacity-30">
          <ArrowUp size={20} />
        </button>
      </form>
    </div>
  )
}