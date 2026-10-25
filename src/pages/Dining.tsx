import { useState } from 'react'
import { CakeSlice, ChefHat, Coffee, Croissant, Plus, Salad } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { allergenLabels, categories, menuItems, pick, price, type DietTag } from '../data/menu'
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
    <div className={cartCount > 0 ? 'pb-24' : 'pb-6'}>
      <header className="px-5 pb-2 pt-6">
        <h1 className="text-3xl font-bold">{t('dining.title')}</h1>
        <p className="mt-1 text-muted">{t('dining.subtitle')}</p>
      </header>

      {/* Kategoriler — kaydırınca üstte kalır */}
      <nav className="sticky top-0 z-10 flex gap-2 overflow-x-auto border-b border-line bg-background px-5 py-3">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => goTo(c.id)}
            className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${
              active === c.id ? 'bg-primary text-card' : 'border border-line bg-card'
            }`}
          >
            {pick(c.name, lang)}
          </button>
        ))}
      </nav>

      {/* Diyet filtresi */}
      <div className="flex items-center gap-2 overflow-x-auto px-5 pt-4">
        {DIET_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setDiet(f)}
            aria-pressed={diet === f}
            className={`h-9 shrink-0 rounded-full border px-3 text-sm font-medium ${
              diet === f ? 'border-primary bg-primary-soft text-primary' : 'border-line text-muted'
            }`}
          >
            {t(`dining.filters.${f}`)}
          </button>
        ))}
      </div>

      {/* Menü: restoran menüsü gibi sade satırlar */}
      <div className="space-y-8 px-5 pt-6">
        {categories.map((c) => {
          const items = menuItems.filter((item) => item.category === c.id && (diet === 'all' || item.tags.includes(diet)))
          if (items.length === 0) return null
          return (
            <section key={c.id} id={c.id} className="scroll-mt-20">
              <h2 className="mb-2 text-xl font-bold">{pick(c.name, lang)}</h2>
              <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
                {items.map((item) => {
                  const qty = quantityOf(item.id)
                  const isSoldOut = soldOut.includes(item.id)
                  return (
                    <li key={item.id} className={`flex gap-4 p-4 ${isSoldOut ? 'opacity-55' : ''}`}>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-semibold">{pick(item.name, lang)}</h3>
                          <span className="shrink-0 font-semibold tabular-nums">{price(item.price, lang)}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted">{pick(item.description, lang)}</p>
                        {(item.tags.length > 0 || isSoldOut) && (
                          <p className="mt-2 flex flex-wrap gap-1.5">
                            {isSoldOut && (
                              <span className="rounded-md bg-ink px-2 py-0.5 text-xs font-semibold text-card">{t('dining.sold_out')}</span>
                            )}
                            {item.tags.map((tag) => (
                              <span key={tag} className="rounded-md bg-service/60 px-2 py-0.5 text-xs font-medium">
                                {t(`dining.tags.${tag}`)}
                              </span>
                            ))}
                          </p>
                        )}
                        {item.allergens.length > 0 && (
                          <p className="mt-1.5 text-xs text-muted">
                            {t('dining.allergens')}: {item.allergens.map((a) => pick(allergenLabels[a], lang)).join(', ')}
                          </p>
                        )}
                      </div>
                      {/* Ekle düğmesi: tükendiyse çalışmaz */}
                      <button
                        type="button"
                        onClick={() => addToCart(item.id)}
                        disabled={isSoldOut}
                        aria-label={`${t('dining.add')}: ${pick(item.name, lang)}`}
                        className={`flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-xl disabled:opacity-30 ${
                          qty > 0 ? 'bg-primary text-card' : 'border border-line'
                        }`}
                      >
                        {qty > 0 ? <span className="font-semibold">{qty}</span> : <Plus size={20} />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-[76px] left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 px-5">
          <Link to="/cart" className="flex h-14 items-center justify-between rounded-xl bg-primary px-5 text-card shadow-lg">
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