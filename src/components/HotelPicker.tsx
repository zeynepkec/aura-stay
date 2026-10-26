import { useState } from 'react'
import { Building2, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { citiesOf, COUNTRIES, hotelById, hotelsIn, type HotelProfile } from '../data/hotels'
import { pick } from '../data/menu'
import '../translations/guestLogin'

// Ülke → şehir → otel seçimi. Misafir ve personel girişinde kullanılır.
export default function HotelPicker({ initial, onSelect }: { initial?: string; onSelect: (hotel: HotelProfile) => void }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  const start = hotelById(initial)
  const [country, setCountry] = useState<string | null>(start?.country ?? null)
  const [city, setCity] = useState<string | null>(start?.city.en ?? null)

  const cities = country ? citiesOf(country) : []
  const hotels = country && city ? hotelsIn(country, city) : []

  const chip = (active: boolean) =>
    `flex h-11 items-center gap-2 rounded-[10px] px-4 font-display text-base font-bold ${active ? 'bg-primary text-card' : 'border border-line bg-card'}`

  return (
    <div className="space-y-5">
      {/* 1. Ülke */}
      <section>
        <p className="mb-2 font-display text-lg font-extrabold">{t('picker.country')}</p>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCountry(c.id)
                const only = citiesOf(c.id)
                setCity(only.length === 1 ? only[0].en : null)
              }}
              className={chip(country === c.id)}
            >
              
              {pick(c.name, lang)}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Şehir */}
      {country && (
        <section>
          <p className="mb-2 font-display text-lg font-extrabold">{t('picker.city')}</p>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <button key={c.en} type="button" onClick={() => setCity(c.en)} className={chip(city === c.en)}>
                {pick(c, lang)}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 3. Otel */}
      {city && (
        <section>
          <p className="mb-2 font-display text-lg font-extrabold">{t('picker.hotel')}</p>
          <ul className="space-y-2.5">
            {hotels.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => onSelect(h)}
                  className={`flex w-full items-center gap-3 rounded-card border bg-card p-4 text-left ${initial === h.id ? 'border-primary ring-2 ring-primary-soft' : 'border-line'}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-card">
                    <Building2 size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-extrabold leading-tight">{h.name}</span>
                    <span className="block text-xs text-muted">
                      {pick(h.area, lang)} · {t('picker.rooms', { count: Object.keys(h.rooms).length })}
                    </span>
                  </span>
                  {initial === h.id && <Check size={18} />}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
