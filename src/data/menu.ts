// Hermis Boutique Hotel menüsü (içerik: Üye 2 — askHermis reposundan)
// - Fiyatlar € (euro). Toplam ve asistan bu fiyatı kullanır.
// - image: şimdilik emoji. Gerçek fotoğraf için public/menu/ içine koyup '/menu/dosya.jpg' yazılabilir.
// - keywords: asistanın ürünü tanıması için ek kelimeler (yazım hataları dahil).

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

export const categories: { id: string; name: Text }[] = [
  { id: 'breakfast', name: {"tr": "Kahvaltı", "en": "Breakfast", "el": "Πρωινό"} },
  { id: 'starters', name: {"tr": "Başlangıç & Salata", "en": "Starters & Salads", "el": "Ορεκτικά & Σαλάτες"} },
  { id: 'mains', name: {"tr": "Ana Yemek", "en": "Mains", "el": "Κυρίως"} },
  { id: 'desserts', name: {"tr": "Tatlılar", "en": "Desserts", "el": "Γλυκά"} },
  { id: 'drinks', name: {"tr": "İçecekler", "en": "Drinks", "el": "Ποτά"} },
]

export const menuItems: MenuItem[] = [
  {
    id: 'moussaka', category: 'mains', price: 16.5, image: '🍆',
    tags: ["chef"], allergens: ["gluten", "dairy", "egg"],
    name: {"tr": "Geleneksel Musakka", "en": "Traditional Moussaka", "el": "Παραδοσιακός Μουσακάς"},
    description: {"tr": "Fırınlanmış patlıcan, kıymalı sos ve beşamel.", "en": "Baked eggplant, minced meat sauce and béchamel.", "el": "Ψητή μελιτζάνα, κιμάς και μπεσαμέλ."},
    keywords: ["musakka", "mousaka", "moussaka", "musaka", "μουσακα"],
  },
  {
    id: 'horiatiki', category: 'starters', price: 9, image: '🥗',
    tags: ["vegetarian", "gluten_free"], allergens: ["dairy"],
    name: {"tr": "Yunan Salatası (Horiatiki)", "en": "Greek Salad (Horiatiki)", "el": "Χωριάτικη Σαλάτα"},
    description: {"tr": "Domates, salatalık, kırmızı soğan, feta ve Kalamata zeytini.", "en": "Tomato, cucumber, red onion, feta and Kalamata olives.", "el": "Ντομάτα, αγγούρι, κρεμμύδι, φέτα και ελιές Καλαμών."},
    keywords: ["salata", "salad", "horiatiki", "choriatiki", "σαλατα", "χωριατικη"],
  },
  {
    id: 'souvlaki', category: 'mains', price: 14, image: '🍢',
    tags: [], allergens: ["gluten", "dairy"],
    name: {"tr": "Souvlaki Tabağı", "en": "Souvlaki Plate", "el": "Πιάτο Σουβλάκι"},
    description: {"tr": "Marine edilmiş tavuk şiş, pita ekmeği, patates ve tzatziki.", "en": "Marinated chicken skewers, pita, fries and tzatziki.", "el": "Μαριναρισμένο κοτόπουλο, πίτα, πατάτες και τζατζίκι."},
    keywords: ["souvlaki", "suvlaki", "sufleki", "souvlakı", "σουβλακ"],
  },
  {
    id: 'loukoumades', category: 'desserts', price: 7.5, image: '🍯',
    tags: ["vegetarian"], allergens: ["gluten", "nuts"],
    name: {"tr": "Loukoumades", "en": "Loukoumades", "el": "Λουκουμάδες"},
    description: {"tr": "Bal şerbeti, tarçın ve ceviz ile çıtır lokma.", "en": "Crispy honey puffs with cinnamon and walnuts.", "el": "Τραγανοί λουκουμάδες με μέλι, κανέλα και καρύδι."},
    keywords: ["loukoumades", "lukumades", "lokma", "λουκουμαδες"],
  },
  {
    id: 'hermis-breakfast', category: 'breakfast', price: 12, image: '🍳',
    tags: ["vegetarian"], allergens: ["gluten", "dairy", "egg"],
    name: {"tr": "Hermis Kahvaltı Tabağı", "en": "Hermis Breakfast Plate", "el": "Πιάτο Πρωινού Hermis"},
    description: {"tr": "Yumurta, feta, zeytin, domates, bal ve taze ekmek.", "en": "Eggs, feta, olives, tomato, honey and fresh bread.", "el": "Αυγά, φέτα, ελιές, ντομάτα, μέλι και φρέσκο ψωμί."},
    keywords: ["kahvalti", "kahvaltı", "breakfast", "πρωινο"],
  },
  {
    id: 'yogurt-honey', category: 'breakfast', price: 8, image: '🥣',
    tags: ["vegetarian", "gluten_free"], allergens: ["dairy", "nuts"],
    name: {"tr": "Yoğurt, Bal ve Ceviz", "en": "Greek Yogurt with Honey & Walnuts", "el": "Γιαούρτι με Μέλι και Καρύδια"},
    description: {"tr": "Süzme Yunan yoğurdu, Girit balı ve ceviz.", "en": "Strained Greek yogurt, Cretan honey and walnuts.", "el": "Στραγγιστό γιαούρτι, κρητικό μέλι και καρύδια."},
    keywords: ["yogurt", "yoğurt", "yoghurt", "γιαουρτι"],
  },
  {
    id: 'tzatziki', category: 'starters', price: 6.5, image: '🫓',
    tags: ["vegetarian"], allergens: ["gluten", "dairy"],
    name: {"tr": "Tzatziki ve Pita", "en": "Tzatziki & Pita", "el": "Τζατζίκι με Πίτα"},
    description: {"tr": "Yoğurt, salatalık, sarımsak ve ızgara pita.", "en": "Yogurt, cucumber, garlic and grilled pita.", "el": "Γιαούρτι, αγγούρι, σκόρδο και ψητή πίτα."},
    keywords: ["tzatziki", "cacik", "caciki", "τζατζικι"],
  },
  {
    id: 'dolmadakia', category: 'starters', price: 8.5, image: '🥬',
    tags: ["vegan", "gluten_free"], allergens: [],
    name: {"tr": "Dolmadakia", "en": "Dolmadakia", "el": "Ντολμαδάκια"},
    description: {"tr": "Pirinçli ve otlu asma yaprağı sarması, limon ile.", "en": "Vine leaves stuffed with rice and herbs, with lemon.", "el": "Αμπελόφυλλα γεμιστά με ρύζι και μυρωδικά."},
    keywords: ["sarma", "yaprak sarma", "dolmades", "dolmadakia", "ντολμαδ"],
  },
  {
    id: 'seabass', category: 'mains', price: 19, image: '🐟',
    tags: ["gluten_free"], allergens: ["fish"],
    name: {"tr": "Izgara Levrek", "en": "Grilled Sea Bass", "el": "Λαβράκι Σχάρας"},
    description: {"tr": "Zeytinyağı-limon sos ve mevsim yeşillikleri.", "en": "Olive oil–lemon sauce and seasonal greens.", "el": "Λαδολέμονο και χόρτα εποχής."},
    keywords: ["levrek", "balik", "balık", "fish", "sea bass", "λαβρακι", "ψαρι"],
  },
  {
    id: 'gemista', category: 'mains', price: 13, image: '🫘',
    tags: ["vegan", "gluten_free"], allergens: [],
    name: {"tr": "Gemista (Dolma Sebze)", "en": "Gemista (Stuffed Vegetables)", "el": "Γεμιστά"},
    description: {"tr": "Pirinç ve otlarla doldurulmuş fırın domates ve biber.", "en": "Oven-baked tomatoes and peppers stuffed with rice and herbs.", "el": "Ντομάτες και πιπεριές γεμιστές με ρύζι."},
    keywords: ["gemista", "yemista", "biber dolma", "sebze dolma", "stuffed", "γεμιστ"],
  },
  {
    id: 'baklava', category: 'desserts', price: 6, image: '🥮',
    tags: ["vegetarian"], allergens: ["gluten", "nuts"],
    name: {"tr": "Baklava", "en": "Baklava", "el": "Μπακλαβάς"},
    description: {"tr": "Ceviz ve ballı şerbetli ince yufka.", "en": "Thin filo with walnuts and honey syrup.", "el": "Φύλλο με καρύδια και σιρόπι μελιού."},
    keywords: ["baklava", "μπακλαβας"],
  },
  {
    id: 'greek-coffee', category: 'drinks', price: 3.5, image: '☕',
    tags: ["vegan", "gluten_free"], allergens: [],
    name: {"tr": "Yunan Kahvesi", "en": "Greek Coffee", "el": "Ελληνικός Καφές"},
    description: {"tr": "Geleneksel cezvede pişirilmiş kahve.", "en": "Traditional briki-brewed coffee.", "el": "Παραδοσιακός καφές στο μπρίκι."},
    keywords: ["kahve", "coffee", "καφε", "καφες"],
  },
  {
    id: 'freddo', category: 'drinks', price: 5, image: '🧋',
    tags: ["vegetarian", "gluten_free"], allergens: ["dairy"],
    name: {"tr": "Freddo Cappuccino", "en": "Freddo Cappuccino", "el": "Freddo Cappuccino"},
    description: {"tr": "Yunanistan’ın meşhur soğuk kahvesi, süt köpüklü.", "en": "Greece’s famous iced coffee with milk foam.", "el": "Ο διάσημος κρύος καφές με αφρόγαλα."},
    keywords: ["freddo", "frappe", "soğuk kahve", "iced coffee", "φρεντο"],
  },
  {
    id: 'lemonade', category: 'drinks', price: 4, image: '🍋',
    tags: ["vegan", "gluten_free"], allergens: [],
    name: {"tr": "Ev Yapımı Limonata", "en": "Homemade Lemonade", "el": "Σπιτική Λεμονάδα"},
    description: {"tr": "Taze limon ve nane.", "en": "Fresh lemon and mint.", "el": "Φρέσκο λεμόνι και δυόσμος."},
    keywords: ["limonata", "lemonade", "λεμοναδα"],
  },
]

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

// Fiyatı € biçiminde yazar: 16.5 → 16,50 €  ·  9 → 9 €
export function price(amount: number, lang: string | undefined): string {
  const decimals = Number.isInteger(amount) ? 0 : 2
  return new Intl.NumberFormat(lang ?? 'tr', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: 2,
  }).format(amount)
}
