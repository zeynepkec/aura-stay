import { useState } from 'react'
import { CakeSlice, ChefHat, Coffee, Croissant, Plus, Salad } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { allergenLabels, categories, menuItems, pick, price, type DietTag } from '../data/menu'
import { hotel } from '../data/hotel'
import { useShared } from '../lib/shared'
import { useStay } from '../store/StayContext'
import '../translations/dining'
import '../translations/soldOut'
import '../translations/menuExtra'

const DIET_FILTERS: ('all' | DietTag)[] = ['all', 'vegan', 'vegetarian', 'gluten_free']

export const categoryIcons: Record<string, typeof ChefHat> = {
  breakfast: Croissant,
  starters: Salad,
  mains: ChefHat,
  desserts: CakeSlice,
  drinks: Coffee,
}

export default function Dining() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const { cartCount, cartTotal, quantityOf, addToCart } = useStay()
  const [soldOut] = useShared<string[]>('aura-soldout', [])
  const [active, setActive] = useState(categories[0].id)
  const [diet, setDiet] = useState<'all' | DietTag>('all')

  const goTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={cartCount > 0 ? 'pb-20' : ''}>
      <header className="flex items-center gap-3 bg-discover px-5 pb-5 pt-6">
        <span className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-ink font-title text-[22px] font-extrabold text-card">Y</span>
        <div>
        <h1 className="text-[36px] leading-none">{t('dining.title')}</h1>
        <p className="mt-1 text-sm">{t('dining.subtitle', { hours: hotel.roomService })}</p>
        </div>
      </header>

      <nav className="sticky top-0 z-10 flex gap-2 overflow-x-auto bg-background px-5 py-3">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => goTo(c.id)}
            className={`h-10 shrink-0 rounded-[10px] px-4 font-display text-[15px] font-bold ${
              active === c.id ? 'bg-primary text-card' : 'border border-line bg-card'
            }`}
          >
            {pick(c.name, lang)}
          </button>
        ))}
      </nav>

      {/* Diyet filtresi */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-2">
        {DIET_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setDiet(f)}
            className={`h-8 shrink-0 rounded-md px-3 text-xs font-bold ${
              diet === f ? 'bg-accent text-card' : 'bg-accent/10 text-accent'
            }`}
          >
            {t(`dining.filters.${f}`)}
          </button>
        ))}
      </div>

      <div className="space-y-7 px-5 pt-2">
        {categories.map((c) => {
          const items = menuItems.filter((item) => item.category === c.id && (diet === 'all' || item.tags.includes(diet)))
          if (items.length === 0) return null
          return (
            <section key={c.id} id={c.id} className="scroll-mt-16">
              <h2 className="mb-3 text-xl">{pick(c.name, lang)}</h2>
              <div className="space-y-2.5">
                {items.map((item) => {
                    const qty = quantityOf(item.id)
                    const isSoldOut = soldOut.includes(item.id)
                    return (
                      <article
                        key={item.id}
                        className={`flex gap-3 rounded-card border border-line bg-card p-3 ${isSoldOut ? 'opacity-60' : ''}`}
                      >
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-background text-3xl">{item.image}</span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold">{pick(item.name, lang)}</h3>
                          <p className="mt-0.5 text-xs text-muted">{pick(item.description, lang)}</p>
                          {item.allergens.length > 0 && (
                            <p className="mt-0.5 text-xs text-muted">
                              {t('dining.allergens')}: {item.allergens.map((a) => pick(allergenLabels[a], lang)).join(', ')}
                            </p>
                          )}
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="mr-1 text-sm font-semibold">{price(item.price, lang)}</span>
                            {isSoldOut && (
                              <span className="rounded-full bg-ink px-2 py-0.5 text-xs font-semibold text-card">
                                {t('dining.sold_out')}
                              </span>
                            )}
                            {item.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                                {t(`dining.tags.${tag}`)}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* + butonu: tükendiyse çalışmaz */}
                        <button
                          type="button"
                          onClick={() => addToCart(item.id)}
                          disabled={isSoldOut}
                          aria-label={t('dining.add')}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full disabled:opacity-30 ${
                            qty > 0 ? 'bg-ink text-card' : 'border border-line bg-card'
                          }`}
                        >
                          {qty > 0 ? <span className="text-sm font-semibold">{qty}</span> : <Plus size={18} />}
                        </button>
                      </article>
                    )
                  })}
              </div>
            </section>
          )
        })}
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-[76px] left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 px-5">
          <Link to="/cart" className="flex h-14 items-center justify-between rounded-[10px] bg-ink px-5 text-card shadow-lg">
            <span className="flex items-center gap-3 text-sm">
              <span className="flex h-7 min-w-[28px] items-center justify-center rounded-full bg-card/15 px-2 font-semibold">
                {cartCount}
              </span>
              {t('dining.view_cart')}
            </span>
            <span className="font-semibold">{price(cartTotal, lang)}</span>
          </Link>
        </div>
      )}
    </div>
  )
}