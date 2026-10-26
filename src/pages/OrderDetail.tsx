import { ArrowLeft, CheckCircle2, Receipt } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useParams } from 'react-router-dom'
import LineBadge from '../components/LineBadge'
import { menuItems, pick, price } from '../data/menu'
import { stay } from '../data/stay'
import { ORDER_STEPS, useStay } from '../store/StayContext'
import '../translations/metro'
import '../translations/orders'

export default function OrderDetail() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { orderId = '' } = useParams()
  const location = useLocation()
  const justPlaced = location.state?.justPlaced === true
  const order = useStay().getOrder(orderId)

  if (!order) {
    return <h1 className="p-5 text-2xl">{t('orders.not_found')}</h1>
  }

  const delivered = order.status === 'delivered'
  const current = ORDER_STEPS.indexOf(order.status)
  const time = new Date(order.createdAt).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="pb-8">
      <header className="border-b border-line bg-card px-5 pb-5 pt-3">
        <Link to="/dining" className="-ml-1 flex h-10 w-fit items-center gap-1 text-sm text-muted">
          <ArrowLeft size={18} />
          {t('orders.back_to_menu')}
        </Link>
        <div className="mt-1 flex items-center gap-3">
          <LineBadge line="food" size="lg" />
          <div>
            <h1 className="text-[28px] leading-none">{t('orders.title', { id: order.id })}</h1>
            <p className="mt-1 text-sm text-muted">
              {t('home.room', { number: stay.roomNumber })}, {t('orders.ordered_at', { time })}
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-4 px-5 pt-5">
        {justPlaced && (
          <div className="flex items-center gap-3 rounded-card bg-success-tint p-4 text-success-text">
            <CheckCircle2 size={22} />
            <p className="font-bold">{t('orders.placed')}</p>
          </div>
        )}

        {/* Dikey metro hattı: duraklar */}
        <ol>
          {ORDER_STEPS.map((step, i) => {
            const done = i < current || delivered
            const active = i === current && !delivered
            const last = i === ORDER_STEPS.length - 1
            return (
              <li key={step} className="flex gap-4">
                {/* Hat ve durak */}
                <div className="relative w-10 shrink-0">
                  {!last && <span className={`absolute left-[17px] top-4 h-full w-1.5 ${i < current || delivered ? 'bg-ink' : 'bg-line'}`} />}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 rounded-full ${
                      active
                        ? 'top-0 h-[26px] w-[26px] border-[7px] border-primary bg-card ring-[6px] ring-primary-soft'
                        : done
                          ? 'top-1 h-5 w-5 border-4 border-background bg-ink'
                          : `top-1 h-4 w-4 border-4 border-line bg-card ${last ? 'rounded-[3px]' : ''}`
                    }`}
                  />
                </div>
                <div className={`pb-7 ${last ? 'pb-2' : ''}`}>
                  <p className={`font-title font-extrabold ${active ? 'text-2xl text-primary' : done ? 'text-[19px]' : 'text-[19px] text-muted'}`}>
                    {t(`orders.status.${step}`)}
                  </p>
                  <p className="text-sm text-muted">{t(`orders.status_desc.${step}`)}</p>
                  {active && <p className="mt-1 text-sm font-semibold">{t('orders.eta')}</p>}
                </div>
              </li>
            )
          })}
        </ol>

        {/* Sipariş içeriği */}
        <section className="rounded-card border border-line bg-card p-4">
          <h2 className="mb-2 text-xl">{t('orders.content')}</h2>
          <ul className="space-y-2">
            {order.lines.map((line) => {
              const item = menuItems.find((m) => m.id === line.id)
              return (
                <li key={line.id} className="flex justify-between gap-3">
                  <span>
                    <span className="mr-2 font-bold">{line.quantity}×</span>
                    {item ? pick(item.name, lang) : line.id}
                  </span>
                  <span>{price(line.unitPrice * line.quantity, lang)}</span>
                </li>
              )
            })}
          </ul>
          {order.note && (
            <p className="mt-3 rounded-lg bg-background p-3 text-sm">
              <span className="font-bold">{t('orders.note')}: </span>
              {order.note}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3 font-bold">
            <span className="flex items-center gap-1.5">
              <Receipt size={16} />
              {t('orders.added_to_bill')}
            </span>
            <span>{price(order.total, lang)}</span>
          </div>
        </section>
      </div>
    </div>
  )
}
