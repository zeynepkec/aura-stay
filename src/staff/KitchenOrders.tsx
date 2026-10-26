import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, StickyNote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StaffTitle from './StaffTitle'
import { menuItems, pick, price } from '../data/menu'
import { useShared } from '../lib/shared'
import type { Order, OrderStatus } from '../store/StayContext'
import '../translations/kitchen'

const COLUMNS: OrderStatus[] = ['received', 'preparing', 'on_the_way']

// Butona basınca sipariş hangi duruma geçer
const NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  received: 'preparing',
  preparing: 'on_the_way',
  on_the_way: 'delivered',
}

// Sütun başlığındaki renkli nokta
const DOT: Record<string, string> = {
  received: 'bg-warning',
  preparing: 'bg-ink',
  on_the_way: 'bg-tile-silver',
}

export default function KitchenOrders() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const [orders, setOrders] = useShared<Order[]>('aura-orders', [])

  // "5 dk önce" yazılarını her 30 saniyede güncelle
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(timer)
  }, [])

  const advance = (id: string) =>
    setOrders((prev) => prev.map((o) => (o.id === id && NEXT[o.status] ? { ...o, status: NEXT[o.status]! } : o)))

  const ago = (createdAt: number) => {
    const minutes = Math.floor((now - createdAt) / 60000)
    return minutes < 1 ? t('kitchen.just_now') : t('kitchen.minutes_ago', { count: minutes })
  }

  const delivered = orders.filter((o) => o.status === 'delivered').slice(0, 5)

  return (
    <div>
      <StaffTitle line="food" title={t('kitchen.title')} subtitle={t('kitchen.subtitle')} />

      {/* 3 sütun: Yeni / Hazırlanıyor / Yolda */}
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((status) => {
          // En eski sipariş en üstte
          const list = orders.filter((o) => o.status === status).sort((a, b) => a.createdAt - b.createdAt)
          return (
            <section key={status} className="overflow-hidden rounded-card border border-line bg-card/60">
              {/* Sütun başlığı: hattın bir durağı */}
              <h2 className="flex items-center gap-2.5 border-b border-line bg-card px-4 py-3 text-xl">
                <span className={`h-4 w-4 rounded-full border-[3px] border-card ring-2 ring-line ${DOT[status]}`} />
                {t(`kitchen.columns.${status}`)}
                <span className="ml-auto rounded-md bg-background px-2 py-0.5 font-display text-base">{list.length}</span>
              </h2>
              <div className={`h-1.5 ${DOT[status]}`} />
              <div className="p-3">

              {list.length === 0 ? (
                <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">{t('kitchen.empty')}</p>
              ) : (
                <div className="space-y-3">
                  {list.map((o) => (
                    <article
                      key={o.id}
                      className={`rounded-card border bg-card p-4 ${status === 'received' ? 'border-primary ring-2 ring-primary-soft' : 'border-line'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-title text-[30px] font-extrabold leading-none">{t('kitchen.room', { number: o.room ?? '—' })}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                            #{o.id}, <Clock size={12} /> {ago(o.createdAt)}
                          </p>
                        </div>
                        <span className="font-display text-lg font-extrabold">{price(o.total, lang)}</span>
                      </div>

                      <ul className="mt-3 space-y-1 text-sm">
                        {o.lines.map((line) => {
                          const item = menuItems.find((m) => m.id === line.id)
                          return (
                            <li key={line.id}>
                              <b className="mr-1.5">{line.quantity}×</b>
                              {item ? pick(item.name, lang) : line.id}
                            </li>
                          )
                        })}
                      </ul>

                      {/* Misafirin notu — Peach Salmon ile vurgulu */}
                      {o.note && (
                        <p className="mt-3 flex gap-2 rounded-xl bg-primary-soft p-3 text-sm">
                          <StickyNote size={16} className="mt-0.5 shrink-0" />
                          {o.note}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => advance(o.id)}
                        className="mt-4 h-12 w-full rounded-[10px] bg-ink font-display text-lg font-extrabold text-card active:scale-[0.99]"
                      >
                        {t(`kitchen.actions.${status}`)}
                      </button>
                    </article>
                  ))}
                </div>
              )}
              </div>
            </section>
          )
        })}
      </div>

      {/* Son teslim edilenler */}
      {delivered.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-xl">{t('kitchen.delivered')}</h2>
          <ul className="divide-y divide-line rounded-card border border-line bg-card">
            {delivered.map((o) => (
              <li key={o.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                <CheckCircle2 size={16} className="text-muted" />
                <span className="font-semibold">{t('kitchen.room', { number: o.room ?? '—' })}</span>
                <span className="text-muted">#{o.id}</span>
                <span className="ml-auto text-muted">{price(o.total, lang)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}