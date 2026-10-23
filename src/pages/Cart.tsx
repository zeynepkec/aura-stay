import { ArrowLeft, Info, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { menuItems, pick, price } from '../data/menu'
import { useStay } from '../store/StayContext'
import { categoryIcons } from './Dining'
import '../translations/dining'
import '../translations/orders'

export default function Cart() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { cart, cartCount, cartTotal, note, setNote, setQuantity, placeOrder } = useStay()
  const navigate = useNavigate()

  const confirmOrder = () => {
    const order = placeOrder()
    if (order) navigate(`/orders/${order.id}`, { state: { justPlaced: true } })
  }
  return (
    <div>
      <Link to="/dining" className="ml-3 mt-4 flex h-11 w-fit items-center gap-1 px-2 text-sm text-muted">
        <ArrowLeft size={18} />
        {t('dining.back')}
      </Link>

      <header className="px-5 pb-4 pt-2">
        <h1 className="text-3xl font-bold">{t('dining.cart_title')}</h1>
        {cartCount > 0 && <p className="mt-1 text-sm text-muted">{t('dining.items', { count: cartCount })}</p>}
      </header>

      {/* Sepet boşsa */}
      {cart.length === 0 ? (
        <div className="mx-5 flex flex-col items-center rounded-card border border-line bg-card px-6 py-14 text-center">
          <ShoppingBag size={28} className="text-muted" />
          <p className="mt-3 text-sm text-muted">{t('dining.empty_cart')}</p>
          <Link to="/dining" className="mt-5 flex h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-card">
            {t('dining.browse_menu')}
          </Link>
        </div>
      ) : (
        <>
          {/* Ürünler */}
          <ul className="space-y-2.5 px-5">
            {cart.map((line) => {
              const item = menuItems.find((m) => m.id === line.id)
              if (!item) return null
              const Icon = categoryIcons[item.category]
              return (
                <li key={line.id} className="flex items-center gap-3 rounded-card border border-line bg-card p-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-ink/60">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{pick(item.name, lang)}</p>
                    <p className="text-sm text-muted">{price(line.lineTotal, lang)}</p>
                  </div>
                  {/* Adet: − 2 + */}
                  <div className="flex items-center gap-1 rounded-full border border-line p-0.5">
                    <button type="button" onClick={() => setQuantity(line.id, line.quantity - 1)} className="flex h-9 w-9 items-center justify-center">
                      <Minus size={16} />
                    </button>
                    <span className="min-w-[20px] text-center text-sm font-semibold">{line.quantity}</span>
                    <button type="button" onClick={() => setQuantity(line.id, line.quantity + 1)} className="flex h-9 w-9 items-center justify-center">
                      <Plus size={16} />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Mutfağa not */}
          <section className="mt-6 px-5">
            <label htmlFor="note" className="mb-2 block text-sm font-bold">{t('dining.note_label')}</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder={t('dining.note_placeholder')}
              className="w-full resize-none rounded-card border border-line bg-card p-4 text-sm outline-none focus:border-accent"
            />
          </section>

          {/* Toplam */}
          <section className="mx-5 mt-6 rounded-card border border-line bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{t('dining.total')}</span>
              <span className="text-lg font-bold">{price(cartTotal, lang)}</span>
            </div>
            <p className="mt-2 flex gap-2 text-xs text-muted">
              <Info size={14} className="mt-px shrink-0 text-accent" />
              {t('dining.room_charge_info')}
            </p>
                    </section>

          {/* Siparişi onayla butonu */}
          <div className="h-20" />
          <div className="fixed bottom-[76px] left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 px-5">
            <button
              type="button"
              onClick={confirmOrder}
              className="flex h-14 w-full items-center justify-between rounded-full bg-ink px-6 text-card shadow-lg"
            >
              <span className="text-sm font-semibold">{t('orders.place_order')}</span>
              <span className="font-semibold">{price(cartTotal, lang)}</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}