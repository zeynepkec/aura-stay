// =============================================================
//  AI ASİSTAN BEYNİ (kural tabanlı, internet / API gerektirmez)
//  askHermis reposundaki asistandan TypeScript'e taşındı ve AURA Stay'in
//  sipariş / talep sistemine bağlandı.
//
//  Davranış kuralları:
//   1. Sipariş ve hizmet taleplerini personele göndermeden ÖNCE onay ister.
//   2. Fiyatı sadece menüden alır; transfer ücretini uydurmaz ("resepsiyon onaylar").
//   3. Eksik bilgi varsa (saat, kişi sayısı, varış yeri) tek tek sorar.
//   4. Anlamadığında tahmin yürütmez, seçenek sunar.
//   5. 1 harflik yazım hatalarını ve Türkçe / Yunanca aksansız yazımı tolere eder.
//   6. Rota önerisini misafirin tercih kelimelerine göre yapar.
//
//  Gerçek bir yapay zekâ bağlanacaksa (veritabanı adımı): reply() yerine API
//  çağrısı konur, bu kurallar da modele sistem talimatı olarak verilir.
// =============================================================
import { amenityItems, cleaningSlots, destinationWords, faq, optionName, tableVenues, transferDestinations } from '../data/hotel'
import { menuItems, pick } from '../data/menu'
import { routes, routeTags, type RouteTag, type TravelRoute } from '../data/routes'
import type { ServiceType } from '../store/ServiceContext'

// ---------- tipler ----------
export type Chip = { label: string; value: string }

export type PendingRecord =
  | { kind: 'order'; items: { id: string; quantity: number }[] }
  | { kind: 'request'; service: ServiceType; details: Record<string, string> }

export type BotMessage =
  | { kind: 'text'; key?: string; params?: Record<string, string>; raw?: string; chips?: Chip[]; suggest?: boolean }
  | { kind: 'confirm'; record: PendingRecord; status: 'pending' | 'done' | 'cancelled'; resultId?: string }
  | { kind: 'menu'; itemIds: string[] }
  | { kind: 'route'; routeId: string; chips: Chip[] }

type FlowData = { slot?: string; items?: string[]; destination?: string; venue?: string; time?: string; people?: number; day?: number }
type FlowField = 'slot' | 'items' | 'destination' | 'venue' | 'time' | 'people'
export type Flow = { service: ServiceType; data: FlowData; asking: FlowField } | { confirming: true } | null

export type Reply = { messages: BotMessage[]; flow: Flow; action?: 'confirm' | 'cancel' }

// ---------- metin eşleştirme ----------
// Metni karşılaştırma için sadeleştirir: küçük harf, Türkçe / Yunanca aksanlar kaldırılır
export const normalize = (s: string) =>
  s
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/ς/g, 'σ')
    .replace(/[^\p{L}\p{N}:.\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// İki kelime arasındaki harf farkı (en fazla 1 fark önemli)
const lev = (a: string, b: string): number => {
  if (Math.abs(a.length - b.length) > 1) return 2
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
  }
  return dp[a.length][b.length]
}

const tokenize = (norm: string) => norm.split(' ').filter(Boolean)

// Mesajda anahtar kelime geçiyor mu? Geçiyorsa kelimenin sırasını, yoksa -1 döndürür
const findKeyword = (norm: string, tokens: string[], keyword: string): number => {
  const k = normalize(keyword)
  if (!k) return -1
  if (k.includes(' ')) {
    const idx = norm.indexOf(k)
    return idx === -1 ? -1 : norm.slice(0, idx).split(' ').filter(Boolean).length
  }
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i]
    if (k.length < 4) {
      if (tok === k) return i // kısa kelimeler birebir eşleşmeli
      continue
    }
    if (tok.startsWith(k)) return i
    if (k.length >= 6 && tok.startsWith(k.slice(0, -1))) return i // ek / ünsüz yumuşaması
    if (k.length >= 5 && tok.length >= 5 && lev(tok, k) <= 1) return i // 1 harf yazım hatası
  }
  return -1
}

const hasAny = (norm: string, tokens: string[], list: string[]) => list.some((kw) => findKeyword(norm, tokens, kw) !== -1)

const NUM_WORDS: Record<string, number> = {
  bir: 1, one: 1, a: 1, an: 1, ενα: 1, μια: 1, iki: 2, two: 2, δυο: 2, uc: 3, three: 3, τρια: 3,
  dort: 4, four: 4, τεσσερα: 4, bes: 5, five: 5, πεντε: 5,
}
const numAt = (tok: string | undefined): number | undefined =>
  tok && /^\d{1,2}$/.test(tok) ? Number(tok) : tok ? NUM_WORDS[tok] : undefined

// ---------- kelime listeleri ----------
const W = {
  yes: ['evet', 'tamam', 'onayla', 'onayliyorum', 'olur', 'yes', 'yep', 'ok', 'okay', 'sure', 'confirm', 'ναι', 'ενταξει', 'βεβαια'],
  no: ['hayir', 'iptal', 'vazgec', 'istemiyorum', 'no', 'nope', 'cancel', 'οχι', 'ακυρο', 'ακυρωσ'],
  greet: ['merhaba', 'selam', 'hello', 'hi', 'hey', 'γεια', 'καλημερα', 'καλησπερα'],
  thanks: ['tesekkur', 'sagol', 'thanks', 'thank', 'ευχαριστ'],
  order: ['siparis', 'order', 'getir', 'istiyorum', 'want', 'like', 'yemek', 'food', 'acim', 'hungry', 'παραγγελ', 'φαγητο', 'θελω', 'πειναω'],
  menu: ['menu', 'ne var', 'what do you have', 'μενου'],
  vegan: ['vegan'],
  vegetarian: ['vejetaryen', 'vegetarian', 'χορτοφαγ'],
  glutenFree: ['glutensiz', 'gluten free', 'gluten-free', 'χωρις γλουτενη'],
  dessert: ['tatli', 'dessert', 'sweet', 'γλυκο', 'γλυκα'],
  drinks: ['icecek', 'drink', 'ποτο', 'ποτα'],
  route: ['rota', 'route', 'gezi', 'gezmek', 'gezilecek', 'gezelim', 'tour', 'sightsee', 'visit', 'things to do', 'what to do', 'nereye', 'διαδρομ', 'βολτα', 'αξιοθεατ'],
  price: ['fiyat', 'ucret', 'kac para', 'ne kadar', 'price', 'cost', 'how much', 'τιμη', 'ποσο κοστιζει'],
  tomorrow: ['yarin', 'tomorrow', 'αυριο'],
}

// Hizmet talepleri (sıra önemli: transfer önce, "book a taxi" masa değil)
const SERVICE_KEYWORDS: [ServiceType, string[]][] = [
  ['transfer', ['transfer', 'taksi', 'taxi', 'havalimani', 'airport', 'liman', 'port', 'pire', 'piraeus', 'sabiha', 'ταξι', 'αεροδρομ', 'μεταφορ']],
  ['cleaning', ['temizlik', 'temizle', 'temzlik', 'clean', 'cleaning', 'housekeeping', 'καθαρισ']],
  ['towels', ['havlu', 'yastik', 'battaniye', 'towel', 'pillow', 'blanket', 'πετσετ', 'μαξιλαρ', 'κουβερτ']],
  ['table', ['masa', 'rezervasyon', 'rezerv', 'table', 'book', 'reservation', 'τραπεζι', 'κρατηση']],
]

const TAG_WORDS: Record<RouteTag, string[]> = {
  history: ['tarih', 'antik', 'history', 'historic', 'ancient', 'akropolis', 'acropolis', 'ayasofya', 'saray', 'palace', 'ιστορ', 'αρχαι', 'ακροπολ'],
  food: ['yerel lezzet', 'street food', 'pazar', 'market', 'gastronomi', 'αγορα', 'γαστρονομ'],
  sunset: ['gun batimi', 'gunbatimi', 'sunset', 'manzara', 'view', 'ηλιοβασιλ', 'θεα'],
  family: ['aile', 'cocuk', 'family', 'kids', 'child', 'οικογεν', 'παιδι'],
  easy: ['az yuru', 'kisa', 'yorulmadan', 'easy', 'short', 'λιγο περπατ', 'ευκολ'],
  culture: ['muze', 'museum', 'sanat', 'art', 'kultur', 'culture', 'μουσει', 'πολιτισ', 'τεχνη'],
  nature: ['doga', 'nature', 'park', 'bahce', 'garden', 'φυση', 'παρκο', 'κηπο'],
}

const OPTION_WORDS: Record<'destinations' | 'venues' | 'items', Record<string, string[]>> = {
  destinations: destinationWords, // her otelin kendi varış yerleri (src/data/hotels/)
  venues: {
    rooftop: ['teras', 'rooftop', 'roof', 'cati', 'ταρατσα'],
    restaurant: ['restoran', 'restaurant', 'εστιατοριο'],
  },
  items: {
    towel: ['havlu', 'towel', 'πετσετ'],
    pillow: ['yastik', 'pillow', 'μαξιλαρ'],
    blanket: ['battaniye', 'blanket', 'κουβερτ'],
    toiletries: ['banyo', 'sampuan', 'shampoo', 'toiletr', 'soap', 'sabun', 'μπανιου', 'σαπουν', 'σαμπουαν'],
  },
}

// Hangi hizmette hangi bilgiler sırayla sorulur
const FLOW_FIELDS: Record<ServiceType, FlowField[]> = {
  cleaning: ['slot'],
  towels: ['items'],
  transfer: ['destination', 'time', 'people'],
  table: ['venue', 'time', 'people'],
}

// ---------- ayrıştırıcılar ----------
const parseTime = (norm: string, bareNumberAllowed: boolean): string | undefined => {
  let m = norm.match(/\b(\d{1,2})[:.](\d{2})\b/)
  if (m && Number(m[1]) < 24) return `${m[1].padStart(2, '0')}:${m[2]}`
  m = norm.match(/\b(\d{1,2})\s*(am|pm)\b/)
  if (m) {
    let h = Number(m[1]) % 12
    if (m[2] === 'pm') h += 12
    return `${String(h).padStart(2, '0')}:00`
  }
  m = norm.match(/\b(?:saat|at|στισ)\s*(\d{1,2})\b/)
  if (m && Number(m[1]) < 24) return `${m[1].padStart(2, '0')}:00`
  if (bareNumberAllowed) {
    m = norm.match(/^(\d{1,2})$/)
    if (m && Number(m[1]) < 24) return `${m[1].padStart(2, '0')}:00`
  }
  return undefined
}

const parsePeople = (norm: string, bareNumberAllowed: boolean): number | undefined => {
  let m = norm.match(/\b(\d{1,2})\s*(kisi|kisilik|people|person|persons|pax|guests|ατομα|ατομο)/)
  if (m) return Number(m[1])
  m = norm.match(/\bfor\s*(\d{1,2})\b/)
  if (m) return Number(m[1])
  if (bareNumberAllowed) {
    m = norm.match(/^(\d{1,2})$/)
    if (m) return Number(m[1])
  }
  return undefined
}

const matchOption = (norm: string, tokens: string[], group: keyof typeof OPTION_WORDS) =>
  Object.entries(OPTION_WORDS[group]).find(([, words]) => hasAny(norm, tokens, words))?.[0]

// Bugün + gün sayısı → "2026-10-25"
const dateStr = (offsetDays: number) => {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toLocaleDateString('sv')
}

// Mesajdan hizmet bilgilerini çıkarır (eksik olanları doldurur)
const fillFields = (service: ServiceType, data: FlowData, norm: string, tokens: string[], asking: FlowField | null): FlowData => {
  const next: FlowData = { ...data }
  if (service === 'cleaning' && !next.slot) {
    if (hasAny(norm, tokens, ['hemen', 'simdi', 'now', 'asap', 'τωρα'])) next.slot = 'now'
    const h = norm.match(/\b(\d{1,2})(?::\d{2})?\b/)
    if (h) {
      const hour = Number(h[1])
      const slot = cleaningSlots.find((sl) => {
        const [a, b] = (sl.match(/\d{2}/g) ?? []).filter((_, i) => i % 2 === 0).map(Number)
        return hour >= a && hour < b
      })
      if (slot) next.slot = slot
    }
  }
  if (service === 'towels') {
    const found = Object.entries(OPTION_WORDS.items).filter(([, w]) => hasAny(norm, tokens, w)).map(([id]) => id)
    if (found.length) next.items = [...new Set([...(next.items ?? []), ...found])]
  }
  if (service === 'transfer' && !next.destination) next.destination = matchOption(norm, tokens, 'destinations')
  if (service === 'table' && !next.venue) next.venue = matchOption(norm, tokens, 'venues')
  if (service === 'transfer' || service === 'table') {
    if (!next.time) next.time = parseTime(norm, asking === 'time')
    if (!next.people) next.people = parsePeople(norm, asking === 'people')
    if (hasAny(norm, tokens, W.tomorrow)) next.day = 1
  }
  return next
}

const missingField = (service: ServiceType, data: FlowData) =>
  FLOW_FIELDS[service].find((f) => (f === 'items' ? !data.items?.length : !data[f]))

// ---------- mesaj oluşturucular ----------
const text = (key: string, chips?: Chip[]): BotMessage => ({ kind: 'text', key, chips })
const chipsOf = (values: string[]): Chip[] => values.map((v) => ({ label: v, value: v }))

const askFor = (service: ServiceType, field: FlowField, lang: string): BotMessage => {
  switch (field) {
    case 'slot':
      return text('cleaning_slot', chipsOf(cleaningSlots))
    case 'items':
      return text('amenities_which', chipsOf(amenityItems.map((i) => optionName(amenityItems, i.id, lang))))
    case 'destination':
      return text('transfer_where', chipsOf(transferDestinations.map((d) => optionName(transferDestinations, d.id, lang))))
    case 'venue':
      return text('table_where', chipsOf(tableVenues.map((v) => optionName(tableVenues, v.id, lang))))
    case 'time':
      return text('what_time', chipsOf(service === 'table' ? ['19:00', '20:00', '21:00'] : ['08:00', '12:00', '18:00']))
    case 'people':
      return text('how_many', chipsOf(['1', '2', '3', '4']))
  }
}

// Toplanan bilgileri AURA Stay'in talep biçimine çevir
const buildRequest = (service: ServiceType, data: FlowData): PendingRecord => {
  const details: Record<string, string> = {}
  if (data.slot) details.slot = data.slot
  if (data.items) Object.assign(details, { items: data.items.join(','), quantity: '1' })
  if (data.destination) details.destination = data.destination
  if (data.venue) details.venue = data.venue
  if (data.time) Object.assign(details, { date: dateStr(data.day ?? 0), time: data.time })
  if (data.people) details.people = String(data.people)
  return { kind: 'request', service, details }
}

const confirm = (record: PendingRecord): BotMessage => ({ kind: 'confirm', record, status: 'pending' })

const continueService = (service: ServiceType, data: FlowData, lang: string): Reply => {
  const missing = missingField(service, data)
  if (missing) return { messages: [askFor(service, missing, lang)], flow: { service, data, asking: missing } }
  return { messages: [confirm(buildRequest(service, data))], flow: { confirming: true } }
}

const menuPicks = (soldOut: string[], filter?: { tag?: string; category?: string }): BotMessage => {
  let items = menuItems.filter((i) => !soldOut.includes(i.id))
  if (filter?.tag) items = items.filter((i) => (i.tags as string[]).includes(filter.tag!))
  if (filter?.category) items = items.filter((i) => i.category === filter.category)
  if (!filter) items = [...items.filter((i) => i.tags.includes('chef')), ...items.filter((i) => !i.tags.includes('chef'))]
  return { kind: 'menu', itemIds: items.slice(0, filter ? 5 : 4).map((i) => i.id) }
}

// Misafirin tercihlerine göre en uygun rotayı seçer
export const recommendRoute = (prefTags: RouteTag[]): TravelRoute => {
  if (!prefTags.length) return routes.find((r) => r.featured) ?? routes[0]
  const scored = routes.map((r) => ({ r, score: prefTags.filter((tg) => r.tags.includes(tg)).length }))
  scored.sort((a, b) => b.score - a.score)
  return scored[0].r
}

const ROUTE_WORD: Record<string, string> = { tr: 'rotası', en: 'route', el: 'διαδρομή' }

// ---------- ANA FONKSİYON ----------
// flow: önceki adımdan kalan durum (eksik bilgi soruluyor ya da onay bekleniyor)
export function reply(input: string, lang: string, flow: Flow, soldOut: string[] = []): Reply {
  const norm = normalize(input)
  const tokens = tokenize(norm)

  // 1) Onay bekleniyorsa evet / hayır
  if (flow && 'confirming' in flow) {
    if (hasAny(norm, tokens, W.yes)) return { action: 'confirm', messages: [], flow: null }
    if (hasAny(norm, tokens, W.no)) return { action: 'cancel', messages: [], flow: null }
  }
  if (flow && 'service' in flow && hasAny(norm, tokens, W.no) && tokens.length <= 2) {
    return { messages: [text('cancelled')], flow: null }
  }

  // 2) Eksik bilgi soruluyorsa cevabı o alana yerleştir
  if (flow && 'service' in flow) {
    const filled = fillFields(flow.service, flow.data, norm, tokens, flow.asking)
    if (JSON.stringify(filled) !== JSON.stringify(flow.data)) return continueService(flow.service, filled, lang)
  }

  // 3) Hizmet talepleri
  const service = SERVICE_KEYWORDS.find(([, words]) => hasAny(norm, tokens, words))?.[0]
  if (service && !(service === 'table' && hasAny(norm, tokens, W.route))) {
    if (service === 'transfer' && hasAny(norm, tokens, W.price) && tokens.length < 6) {
      return { messages: [text('price_rule')], flow: null }
    }
    return continueService(service, fillFields(service, {}, norm, tokens, null), lang)
  }

  // 4) Sık sorulan sorular (Wi-Fi, kahvaltı saati, check-out...)
  const question = faq.find((q) => hasAny(norm, tokens, q.keywords))
  if (question) return { messages: [{ kind: 'text', raw: pick(question.answer, lang) }], flow: null }

  // 5) Yemek siparişi: menüdeki ürünleri ve adetleri bul
  const found: { id: string; quantity: number }[] = []
  for (const item of menuItems) {
    for (const kw of [...item.keywords, ...Object.values(item.name)]) {
      const idx = findKeyword(norm, tokens, kw)
      if (idx !== -1) {
        const quantity =
          numAt(tokens[idx - 1]) ?? (/^(tane|adet|porsiyon)$/.test(tokens[idx + 2] ?? '') ? numAt(tokens[idx + 1]) : undefined) ?? 1
        if (!found.some((x) => x.id === item.id)) found.push({ id: item.id, quantity: Math.min(quantity, 20) })
        break
      }
    }
  }
  if (found.length) {
    const unavailable = found.filter((f) => soldOut.includes(f.id))
    const available = found.filter((f) => !soldOut.includes(f.id))
    const messages: BotMessage[] = unavailable.map((f) => ({
      kind: 'text',
      key: 'sold_out_item',
      params: { name: pick(menuItems.find((m) => m.id === f.id)!.name, lang) },
    }))
    if (available.length === 0) return { messages: [...messages, menuPicks(soldOut)], flow: null }
    return { messages: [...messages, confirm({ kind: 'order', items: available })], flow: { confirming: true } }
  }

  // 6) Menü / diyet soruları
  if (hasAny(norm, tokens, W.vegan)) return { messages: [menuPicks(soldOut, { tag: 'vegan' })], flow: null }
  if (hasAny(norm, tokens, W.glutenFree)) return { messages: [menuPicks(soldOut, { tag: 'gluten_free' })], flow: null }
  if (hasAny(norm, tokens, W.vegetarian)) return { messages: [menuPicks(soldOut, { tag: 'vegetarian' })], flow: null }
  if (hasAny(norm, tokens, W.dessert)) return { messages: [menuPicks(soldOut, { category: 'desserts' })], flow: null }
  if (hasAny(norm, tokens, W.drinks)) return { messages: [menuPicks(soldOut, { category: 'drinks' })], flow: null }

  // 7) Rota önerisi
  const prefTags = (Object.keys(TAG_WORDS) as RouteTag[]).filter((tag) => hasAny(norm, tokens, TAG_WORDS[tag]))
  if (hasAny(norm, tokens, W.route) || prefTags.length) {
    const route = recommendRoute(prefTags)
    const chips = (Object.keys(routeTags) as RouteTag[])
      .filter((tag) => !prefTags.includes(tag))
      .slice(0, 3)
      .map((tag) => {
        const name = pick(routeTags[tag].name, lang)
        return { label: name, value: `${name} ${ROUTE_WORD[lang.slice(0, 2)] ?? 'route'}` }
      })
    return { messages: [{ kind: 'route', routeId: route.id, chips }], flow: null }
  }

  // 8) Genel sipariş isteği ama ürün yok
  if (hasAny(norm, tokens, W.order) || hasAny(norm, tokens, W.menu)) {
    return { messages: [text(/\d/.test(norm) ? 'unknown_item' : 'order_needs_item'), menuPicks(soldOut)], flow: null }
  }

  // 9) Selam / teşekkür
  if (hasAny(norm, tokens, W.thanks)) return { messages: [text('thanks')], flow: null }
  if (hasAny(norm, tokens, W.greet)) return { messages: [{ kind: 'text', key: 'greeting', suggest: true }], flow: null }

  // 10) Anlaşılamadı: tahmin etme, seçenek sun
  return { messages: [{ kind: 'text', key: 'fallback', suggest: true }], flow: flow && 'service' in flow ? flow : null }
}
