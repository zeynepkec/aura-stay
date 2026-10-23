import { useState } from 'react'
import { CakeSlice, ChefHat, Coffee, Croissant, Plus, Salad } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { categories, menuItems, pick, price } from '../data/menu'
import { useStay } from '../store/StayContext'
import '../translations/dining'

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
  const [active, setActive] = useState(categories[0].id)

  const goTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={cartCount > 0 ? 'pb-20' : ''}>
      <header className="px-5 pb-2 pt-6">
        <h1 className="text-3xl font-bold">{t('dining.title')}</h1>
        <p className="mt-1 text-sm text-muted">{t('dining.subtitle')}</p>
      </header>

      <nav className="sticky top-0 z-10 flex gap-2 overflow-x-auto bg-background px-5 py-3">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => goTo(c.id)}
            className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium ${
              active === c.id ? 'bg-ink text-card' : 'border border-line bg-card'
            }`}
          >
            {pick(c.name, lang)}
          </button>
        ))}
      </nav>

      <div className="space-y-7 px-5 pt-2">
        {categories.map((c) => {
          const Icon = categoryIcons[c.id]
          return (
            <section key={c.id} id={c.id} className="scroll-mt-16">
              <h2 className="mb-3 text-base font-bold">{pick(c.name, lang)}</h2>
              <div className="space-y-2.5">
                {menuItems
                  .filter((item) => item.category === c.id)
                  .map((item) => {
                    const qty = quantityOf(item.id)
                    return (
                      <article key={item.id} className="flex gap-3 rounded-card border border-line bg-card p-3">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background text-ink/60">
                          <Icon size={24} strokeWidth={1.6} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold">{pick(item.name, lang)}</h3>
                          <p className="mt-0.5 text-xs text-muted">{pick(item.description, lang)}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="mr-1 text-sm font-semibold">{price(item.price, lang)}</span>
                            {item.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                                {t(`dining.tags.${tag}`)}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* + butonu: sepette varsa adedi gösterir */}
                        <button
                          type="button"
                          onClick={() => addToCart(item.id)}
                          aria-label={t('dining.add')}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full ${
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

      {/* Sepet çubuğu — sepette ürün varsa görünür */}
      {cartCount > 0 && (
        <div className="fixed bottom-[76px] left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 px-5">
          <Link to="/cart" className="flex h-14 items-center justify-between rounded-full bg-ink px-5 text-card shadow-lg">
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