import { useState } from 'react'
import { ChevronDown, Lock, Receipt, Unlock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { menuItems, pick, price } from '../data/menu'
import { transferPrices } from '../data/stay'
import { useShared } from '../lib/shared'
import type { ServiceRequest } from '../store/ServiceContext'
import type { Order } from '../store/StayContext'
import '../translations/reception'
import '../translations/services'

type Line = { id: string; label: string; detail: string; time: number; amount: number }

export default function StaffBills() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const [orders] = useShared<Order[]>('aura-orders', [])
  const [requests] = useShared<ServiceRequest[]>('aura-requests', [])
  // Kapatılan hesaplar: { "204": kapatılma zamanı }
  const [closed, setClosed] = useShared<Record<string, number>>('aura-closed-bills', {})
  const [openRoom, setOpenRoom] = useState<string | null>(null)

  // Harcamaları odalara göre grupla
  const rooms: Record<string, Line[]> = {}
  const add = (room: string, line: Line) => {
    rooms[room] = [...(rooms[room] ?? []), line]
  }

  orders.forEach((o) => {
    if (!o.room) return
    const names = o.lines
      .map((l) => {
        const item = menuItems.find((m) => m.id === l.id)
        return `${l.quantity}× ${item ? pick(item.name, lang) : l.id}`
      })
      .join(', ')
    add(o.room, { id: o.id, label: `${t('bills.food_order')} #${o.id}`, detail: names, time: o.createdAt, amount: o.total })
  })

  requests.forEach((r) => {
    if (!r.room || r.type !== 'transfer' || r.status === 'declined') return
    add(r.room, {
      id: r.id,
      label: `${t('bills.transfer')} #${r.id}`,
      detail: `${t(`services.form.${r.details.destination}`)} · ${r.details.date ?? ''} ${r.details.time ?? ''}`,
      time: r.createdAt,
      amount: transferPrices[r.details.destination] ?? 0,
    })
  })

  const list = Object.entries(rooms)
    .map(([room, lines]) => ({
      room,
      lines: lines.sort((a, b) => b.time - a.time),
      total: lines.reduce((sum, l) => sum + l.amount, 0),
      isClosed: Boolean(closed[room]),
    }))
    .sort((a, b) => a.room.localeCompare(b.room))

  const openBills = list.filter((b) => !b.isClosed)
  const openAmount = openBills.reduce((sum, b) => sum + b.total, 0)

  const toggleClosed = (room: string) =>
    setClosed((prev) => {
      const next = { ...prev }
      if (next[room]) delete next[room]
      else next[room] = Date.now()
      return next
    })

  const time = (ms: number) => new Date(ms).toLocaleString(lang, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

  return (
    <div>
      <header className="mb-5">
        <h1 className="text-2xl font-bold">{t('bills.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('bills.subtitle')}</p>
      </header>

      {/* Özet kutuları */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-card border border-line bg-card p-4">
          <p className="text-3xl font-bold">{openBills.length}</p>
          <p className="mt-1 text-xs text-muted">{t('bills.stats.open')}</p>
        </div>
        <div className="rounded-card border border-line bg-card p-4">
          <p className="text-3xl font-bold">{price(openAmount, lang)}</p>
          <p className="mt-1 text-xs text-muted">{t('bills.stats.amount')}</p>
        </div>
        <div className="rounded-card border border-line bg-card p-4">
          <p className="text-3xl font-bold">{list.length - openBills.length}</p>
          <p className="mt-1 text-xs text-muted">{t('bills.stats.closed')}</p>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="rounded-card border border-dashed border-line p-10 text-center text-sm text-muted">{t('bills.empty')}</p>
      ) : (
        <div className="space-y-3">
          {list.map((bill) => {
            const expanded = openRoom === bill.room
            return (
              <section key={bill.room} className={`rounded-card border border-line bg-card ${bill.isClosed ? 'opacity-70' : ''}`}>
                {/* Oda satırı — tıklayınca açılır */}
                <button
                  type="button"
                  onClick={() => setOpenRoom(expanded ? null : bill.room)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background">
                    <Receipt size={20} />
                  </span>
                  <div className="flex-1">
                    <p className="text-lg font-bold">{t('bills.room', { number: bill.room })}</p>
                    <p className="text-xs text-muted">{t('bills.items', { count: bill.lines.length })}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      bill.isClosed ? 'bg-service' : 'bg-accent/15 text-accent'
                    }`}
                  >
                    {t(`bills.status.${bill.isClosed ? 'closed' : 'open'}`)}
                  </span>
                  <span className="w-24 text-right text-lg font-bold">{price(bill.total, lang)}</span>
                  <ChevronDown size={18} className={`text-muted transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Harcama kalemleri */}
                {expanded && (
                  <div className="border-t border-line px-4 pb-4">
                    <ul className="divide-y divide-line">
                      {bill.lines.map((line) => (
                        <li key={line.id} className="flex items-start justify-between gap-4 py-3">
                          <div>
                            <p className="text-sm font-semibold">{line.label}</p>
                            <p className="text-xs text-muted">{line.detail}</p>
                            <p className="text-xs text-muted">{time(line.time)}</p>
                          </div>
                          <span className="text-sm font-semibold">{price(line.amount, lang)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between border-t border-line pt-3">
                      <span className="text-sm font-bold">{t('bills.total')}</span>
                      <span className="text-lg font-bold">{price(bill.total, lang)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleClosed(bill.room)}
                      className={`mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold ${
                        bill.isClosed ? 'border border-line' : 'bg-ink text-card'
                      }`}
                    >
                      {bill.isClosed ? <Unlock size={16} /> : <Lock size={16} />}
                      {bill.isClosed ? t('bills.reopen') : t('bills.close')}
                    </button>
                  </div>
                )}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}