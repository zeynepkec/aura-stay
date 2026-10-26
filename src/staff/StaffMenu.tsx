import { useTranslation } from 'react-i18next'
import StaffTitle from './StaffTitle'
import { categories, menuItems, pick, price } from '../data/menu'
import { useShared } from '../lib/shared'
import '../translations/soldOut'

export default function StaffMenu() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  // Tükenen ürünlerin listesi: ["menemen", "baklava", ...]
  const [soldOut, setSoldOut] = useShared<string[]>('aura-soldout', [])

  const toggle = (id: string) =>
    setSoldOut((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <div>
      <StaffTitle line="food" label="Y2" title={t('staffMenu.title')} subtitle={t('staffMenu.subtitle')}>
        <span className={`rounded-md px-3 py-1.5 font-display text-base font-bold ${soldOut.length ? 'bg-ink text-card' : 'bg-service'}`}>
          {soldOut.length ? t('staffMenu.count', { count: soldOut.length }) : t('staffMenu.all_available')}
        </span>
      </StaffTitle>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((c) => (
          <section key={c.id} className="rounded-card border border-line bg-card p-4">
            <h2 className="mb-2 text-xl">{pick(c.name, lang)}</h2>
            <ul className="divide-y divide-line">
              {menuItems
                .filter((item) => item.category === c.id)
                .map((item) => {
                  const available = !soldOut.includes(item.id)
                  return (
                    <li key={item.id} className="flex items-center gap-3 py-3">
                      <div className={`flex-1 ${available ? '' : 'opacity-50'}`}>
                        <p className="text-sm font-semibold">{pick(item.name, lang)}</p>
                        <p className="text-xs text-muted">{price(item.price, lang)}</p>
                      </div>
                      <span className={`text-xs font-semibold ${available ? 'text-muted' : ''}`}>
                        {available ? t('staffMenu.available') : t('staffMenu.sold_out')}
                      </span>
                      {/* Açma-kapama düğmesi */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={available}
                        onClick={() => toggle(item.id)}
                        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${available ? 'bg-service' : 'bg-ink'}`}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-card shadow transition-all ${available ? 'left-6' : 'left-1'}`}
                        />
                      </button>
                    </li>
                  )
                })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}