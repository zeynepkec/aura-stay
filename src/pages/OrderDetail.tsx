import { ArrowLeft, Check, CheckCircle2, Clock, Receipt } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useParams } from 'react-router-dom'
import { menuItems, pick, price } from '../data/menu'
import { ORDER_STEPS, useStay } from '../store/StayContext'
import '../translations/orders'

export default function OrderDetail() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { orderId = '' } = useParams()
  const location = useLocation()
  const justPlaced = location.state?.justPlaced === true
  const order = useStay().getOrder(orderId)

  if (!order) {
    return <h1 className="p-5 text-2xl font-bold">{t('orders.not_found')}</h1>
  }

  const current = ORDER_STEPS.indexOf(order.status)
  const time = new Date(order.createdAt).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })

  return (
    <div>
      <Link to="/dining" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-sm text-muted">
        <ArrowLeft size={18} />
        {t('orders.back_to_menu')}
      </Link>

      <header className="flex items-start justify-between gap-3 px-5 pb-4 pt-2">
        <div>
          <h1 className="text-3xl font-bold">{t('orders.title', { id: order.id })}</h1>
          <p className="mt-1 text-sm text-muted">{t('orders.ordered_at', { time })}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            order.status === 'delivered' ? 'bg-service' : 'bg-accent/15 text-accent'
          }`}
        >
          {t(`orders.status.${order.status}`)}
        </span>
      </header>

      <div className="space-y-4 px-5">
        {/* Yeni sipariş verildiyse yeşil onay kutusu — Sage Green */}
        {justPlaced && (
          <div className="flex items-center gap-3 rounded-card bg-service p-4">
            <CheckCircle2 size={22} />
            <p className="text-sm font-semibold">{t('orders.placed')}</p>
          </div>
        )}

        {/* Durum adımları */}
        <section className="rounded-card border border-line bg-card p-5">
          <ol>
            {ORDER_STEPS.map((step, i) => {
              const done = i < current || order.status === 'delivered'
              const active = i === current && order.status !== 'delivered'
              return (
                <li key={step} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                        done ? 'border-ink bg-ink text-card' : active ? 'border-accent bg-accent text-card' : 'border-line bg-card'
                      }`}
                    >
                      {done && <Check size={14} strokeWidth={3} />}
                      {active && <span className="h-2 w-2 animate-pulse rounded-full bg-card" />}
                    </span>
                    {i < ORDER_STEPS.length - 1 && (
                      <span className={`my-1 h-6 w-0.5 ${i < current ? 'bg-ink' : 'bg-line'}`} />
                    )}
                  </div>
                  <div className="pt-0.5">
                    <p className={`text-sm font-semibold ${!done && !active ? 'text-muted' : ''}`}>
                      {t(`orders.status.${step}`)}
                    </p>
                    {active && <p className="text-xs text-muted">{t(`orders.status_desc.${step}`)}</p>}
                  </div>
                </li>
              )
            })}
          </ol>
          {order.status !== 'delivered' && (
            <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm text-muted">
              <Clock size={15} className="text-accent" />
              {t('orders.eta')}
            </p>
          )}
        </section>

        {/* Sipariş içeriği */}
        <section className="rounded-card border border-line bg-card p-5">
          <h2 className="mb-3 text-sm font-bold">{t('orders.content')}</h2>
          <ul className="space-y-2">
            {order.lines.map((line) => {
              const item = menuItems.find((m) => m.id === line.id)
              return (
                <li key={line.id} className="flex justify-between gap-3 text-sm">
                  <span>
                    <span className="mr-2 font-semibold">{line.quantity}×</span>
                    {item ? pick(item.name, lang) : line.id}
                  </span>
                  <span className="text-muted">{price(line.unitPrice * line.quantity, lang)}</span>
                </li>
              )
            })}
          </ul>
          {order.note && (
            <p className="mt-3 rounded-2xl bg-background p-3 text-xs text-muted">
              <span className="font-semibold text-ink">{t('orders.note')}: </span>
              {order.note}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <Receipt size={14} />
              {t('orders.added_to_bill')}
            </span>
            <span className="text-base font-bold">{price(order.total, lang)}</span>
          </div>
        </section>
      </div>
    </div>
  )
}