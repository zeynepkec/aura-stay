// Menü türleri ve yardımcılar. Her otelin menüsü kendi dosyasında (src/data/hotels/).
// - Fiyatlar otelin para biriminde (Hermis €, Pera Lale ₺). Toplam ve asistan bu fiyatı kullanır.
// - image: şimdilik emoji. Gerçek fotoğraf için public/menu/ içine koyup '/menu/dosya.jpg' yazılabilir.
// - keywords: asistanın ürünü tanıması için ek kelimeler (yazım hataları dahil).
import { currentHotel } from './hotels'

export type Text = { tr: string; en: string; el: string }

export type DietTag = 'vegetarian' | 'vegan' | 'gluten_free' | 'spicy' | 'chef'
export type Allergen = 'gluten' | 'dairy' | 'nuts' | 'egg' | 'sesame' | 'fish'

export type MenuItem = {
  id: string
  category: string
  name: Text
  description: Text
  price: number
  image: string
  tags: DietTag[]
  allergens: Allergen[]
  keywords: string[]
}

// Menü açık olan otelden gelir (src/data/hotels/)
export const categories: { id: string; name: Text }[] = currentHotel.categories
export const menuItems: MenuItem[] = currentHotel.menuItems

export const allergenLabels: Record<Allergen, Text> = {
  gluten: {"tr": "Gluten", "en": "Gluten", "el": "Γλουτένη"},
  dairy: {"tr": "Süt", "en": "Dairy", "el": "Γαλακτοκομικά"},
  nuts: {"tr": "Kuruyemiş", "en": "Nuts", "el": "Ξηροί καρποί"},
  egg: {"tr": "Yumurta", "en": "Egg", "el": "Αυγό"},
  sesame: {"tr": "Susam", "en": "Sesame", "el": "Σουσάμι"},
  fish: {"tr": "Balık", "en": "Fish", "el": "Ψάρι"},
}

// Seçili dile göre metni döndürür
export function pick(text: Text, lang: string | undefined): string {
  return text[(lang ?? 'en').slice(0, 2) as keyof Text] ?? text.en
}

// Fiyatı otelin para biriminde yazar: 16.5 → 16,50 €  ·  650 → ₺650
export function price(amount: number, lang: string | undefined): string {
  const decimals = Number.isInteger(amount) ? 0 : 2
  return new Intl.NumberFormat(lang ?? 'tr', {
    style: 'currency',
    currency: currentHotel.currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: 2,
  }).format(amount)
}
