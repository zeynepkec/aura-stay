export type Text = { tr: string; en: string; el: string }

export type MenuItem = {
  id: string
  category: string
  name: Text
  description: Text
  price: number
  tags: string[]
}

export const categories: { id: string; name: Text }[] = [
  { id: 'breakfast', name: { tr: 'Kahvaltı', en: 'Breakfast', el: 'Πρωινό' } },
  { id: 'starters', name: { tr: 'Mezeler', en: 'Starters', el: 'Ορεκτικά' } },
  { id: 'mains', name: { tr: 'Ana yemekler', en: 'Mains', el: 'Κυρίως πιάτα' } },
  { id: 'desserts', name: { tr: 'Tatlılar', en: 'Desserts', el: 'Γλυκά' } },
  { id: 'drinks', name: { tr: 'İçecekler', en: 'Drinks', el: 'Ποτά' } },
]

export const menuItems: MenuItem[] = [
  {
    id: 'serpme', category: 'breakfast', price: 650, tags: ['vegetarian'],
    name: { tr: 'Serpme kahvaltı', en: 'Turkish breakfast platter', el: 'Τουρκικό πρωινό πλατό' },
    description: { tr: 'Peynirler, zeytin, bal, kaymak, yumurta', en: 'Cheeses, olives, honey, clotted cream, eggs', el: 'Τυριά, ελιές, μέλι, καϊμάκι, αυγά' },
  },
  {
    id: 'menemen', category: 'breakfast', price: 280, tags: ['vegetarian'],
    name: { tr: 'Menemen', en: 'Menemen', el: 'Μενεμέν' },
    description: { tr: 'Domates, biber ve yumurta', en: 'Eggs with tomato and pepper', el: 'Αυγά με ντομάτα και πιπεριά' },
  },
  {
    id: 'avocado', category: 'breakfast', price: 320, tags: ['vegan'],
    name: { tr: 'Avokadolu tost', en: 'Avocado toast', el: 'Τοστ με αβοκάντο' },
    description: { tr: 'Ekşi mayalı ekmek, cherry domates', en: 'Sourdough, cherry tomatoes', el: 'Προζυμένιο ψωμί, ντοματίνια' },
  },
  {
    id: 'meze', category: 'starters', price: 380, tags: ['vegetarian'],
    name: { tr: 'Meze tabağı', en: 'Meze platter', el: 'Πιατέλα μεζέδων' },
    description: { tr: 'Haydari, acılı ezme, patlıcan', en: 'Yoghurt dip, spicy dip, aubergine', el: 'Γιαούρτι, πικάντικο ντιπ, μελιτζάνα' },
  },
  {
    id: 'hummus', category: 'starters', price: 180, tags: ['vegan', 'gluten_free'],
    name: { tr: 'Humus', en: 'Hummus', el: 'Χούμους' },
    description: { tr: 'Nohut, tahin, zeytinyağı', en: 'Chickpeas, tahini, olive oil', el: 'Ρεβίθια, ταχίνι, ελαιόλαδο' },
  },
  {
    id: 'calamari', category: 'starters', price: 360, tags: [],
    name: { tr: 'Kalamar tava', en: 'Fried calamari', el: 'Καλαμαράκια τηγανητά' },
    description: { tr: 'Tarator sos ile', en: 'With tarator sauce', el: 'Με σάλτσα ταρατόρ' },
  },
  {
    id: 'seabass', category: 'mains', price: 720, tags: ['gluten_free'],
    name: { tr: 'Izgara levrek', en: 'Grilled sea bass', el: 'Λαβράκι σχάρας' },
    description: { tr: 'Roka ve mevsim sebzeleri ile', en: 'With rocket and seasonal vegetables', el: 'Με ρόκα και λαχανικά εποχής' },
  },
  {
    id: 'kofte', category: 'mains', price: 480, tags: [],
    name: { tr: 'Izgara köfte', en: 'Grilled meatballs', el: 'Κεφτεδάκια σχάρας' },
    description: { tr: 'Piyaz ve közlenmiş biber ile', en: 'With bean salad and roasted pepper', el: 'Με φασολοσαλάτα και ψητή πιπεριά' },
  },
  {
    id: 'risotto', category: 'mains', price: 420, tags: ['vegetarian'],
    name: { tr: 'Sebzeli risotto', en: 'Vegetable risotto', el: 'Ριζότο λαχανικών' },
    description: { tr: 'Mantar, kuşkonmaz, parmesan', en: 'Mushroom, asparagus, parmesan', el: 'Μανιτάρια, σπαράγγια, παρμεζάνα' },
  },
  {
    id: 'baklava', category: 'desserts', price: 240, tags: ['vegetarian'],
    name: { tr: 'Fıstıklı baklava', en: 'Pistachio baklava', el: 'Μπακλαβάς με φιστίκι' },
    description: { tr: 'Dondurma ile', en: 'Served with ice cream', el: 'Με παγωτό' },
  },
  {
    id: 'sutlac', category: 'desserts', price: 180, tags: ['vegetarian', 'gluten_free'],
    name: { tr: 'Fırın sütlaç', en: 'Baked rice pudding', el: 'Ρυζόγαλο φούρνου' },
    description: { tr: 'Tarçın ile', en: 'With cinnamon', el: 'Με κανέλα' },
  },
  {
    id: 'coffee', category: 'drinks', price: 120, tags: ['vegan'],
    name: { tr: 'Türk kahvesi', en: 'Turkish coffee', el: 'Τούρκικος καφές' },
    description: { tr: 'Lokum ile', en: 'With Turkish delight', el: 'Με λουκούμι' },
  },
  {
    id: 'lemonade', category: 'drinks', price: 130, tags: ['vegan', 'gluten_free'],
    name: { tr: 'Ev yapımı limonata', en: 'Homemade lemonade', el: 'Σπιτική λεμονάδα' },
    description: { tr: 'Nane ile', en: 'With mint', el: 'Με δυόσμο' },
  },
]

// Seçili dile göre metni döndürür
export function pick(text: Text, lang: string | undefined): string {
  return text[(lang ?? 'en') as keyof Text] ?? text.en
}

// Fiyatı ₺ formatında yazar: 650 → ₺650
export function price(amount: number, lang: string | undefined): string {
  return new Intl.NumberFormat(lang ?? 'tr', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(amount)
}