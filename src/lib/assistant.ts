import { menuItems } from '../data/menu'
import { routes, type RouteCategory } from '../data/routes'
import type { ServiceType } from '../store/ServiceContext'

// Asistanın yapabileceği işlemler
export type AssistantAction =
  | { type: 'order'; items: { id: string; quantity: number }[] }
  | { type: 'service'; service: ServiceType }
  | { type: 'form'; service: ServiceType }
  | { type: 'routes'; routeIds: string[] }
  | { type: 'menu' }
  | { type: 'help' }

// Küçük harf + aksanları kaldır: "Kahvaltı" → "kahvalti", "Καφές" → "καφες"
function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i')
}

const has = (text: string, words: string[]) => words.some((w) => text.includes(w))

// Anahtar kelimeler (TR / EN / EL, aksansız yazıldı)
const KEYWORDS = {
  cleaning: ['temizl', 'clean', 'καθαρ'],
  towels: ['havlu', 'towel', 'πετσετ'],
  transfer: ['transfer', 'taksi', 'taxi', 'havaliman', 'airport', 'ταξι', 'αεροδρομ', 'μεταφορ'],
  table: ['masa', 'rezervasyon', 'table', 'reserv', 'τραπεζ', 'κρατηση'],
  routes: ['gez', 'rota', 'kesf', 'gorul', 'yerler', 'route', 'visit', 'explore', 'places', 'διαδρομ', 'επισκε', 'εξερευν', 'βολτα', 'μερη'],
  food: ['yemek', 'siparis', 'acik', 'menu', 'food', 'order', 'hungry', 'eat', 'φαγητ', 'παραγγ', 'πειν', 'μενου'],
}

const ROUTE_TOPICS: Record<RouteCategory, string[]> = {
  culture: ['tarih', 'kale', 'kultur', 'muze', 'antik', 'histor', 'culture', 'castle', 'museum', 'ιστορ', 'καστρ', 'πολιτισ', 'μουσει'],
  nature: ['doga', 'yuruyus', 'manzara', 'nature', 'hike', 'view', 'φυση', 'πεζοπορ', 'θεα'],
  food: ['lezzet', 'yerel', 'taste', 'local', 'γευσ', 'τοπικ'],
  activity: ['tekne', 'deniz', 'yuz', 'boat', 'sea', 'swim', 'βαρκα', 'θαλασσ', 'κολυμπ', 'κρουαζ'],
}

// Ürün adlarında geçen ama tek başına bir şey ifade etmeyen kelimeler
const IGNORE = ['izgara', 'grilled', 'σχαρας', 'tava', 'fried', 'τηγανητα', 'yapimi', 'homemade', 'σπιτικη',
  'firin', 'baked', 'φουρνου', 'platter', 'tabagi', 'πιατελα', 'turk', 'turkish', 'τουρκικο', 'τουρκικος', 'with']

// Mesajda geçen menü ürünlerini ve adetlerini bulur: "2 menemen" → { id: 'menemen', quantity: 2 }
function findMenuItems(text: string) {
  const words = text.split(/[^\p{L}\d]+/u).filter(Boolean)
  const found: { id: string; quantity: number }[] = []
  for (const item of menuItems) {
    const nameWords = Object.values(item.name)
      .flatMap((name) => normalize(name).split(/\s+/))
      .filter((w) => w.length >= 4 && !IGNORE.includes(w))
    const index = words.findIndex((w) => w.length >= 4 && nameWords.some((nw) => nw.startsWith(w) || w.startsWith(nw)))
    if (index >= 0) {
      const before = Number(words[index - 1])
      found.push({ id: item.id, quantity: Number.isInteger(before) && before > 0 && before < 20 ? before : 1 })
    }
  }
  return found
}

// Mesajı anla ve ne yapılacağına karar ver
export function understand(message: string): AssistantAction {
  const text = normalize(message)

  const items = findMenuItems(text)
  if (items.length > 0) return { type: 'order', items }

  if (has(text, KEYWORDS.cleaning)) return { type: 'service', service: 'cleaning' }
  if (has(text, KEYWORDS.towels)) return { type: 'service', service: 'towels' }
  if (has(text, KEYWORDS.transfer)) return { type: 'form', service: 'transfer' }
  if (has(text, KEYWORDS.table)) return { type: 'form', service: 'table' }

  const topic = (Object.keys(ROUTE_TOPICS) as RouteCategory[]).find((c) => has(text, ROUTE_TOPICS[c]))
  if (topic || has(text, KEYWORDS.routes)) {
    const list = topic ? routes.filter((r) => r.category === topic) : [...routes].sort((a, b) => b.rating - a.rating)
    return { type: 'routes', routeIds: list.slice(0, 3).map((r) => r.id) }
  }

  if (has(text, KEYWORDS.food)) return { type: 'menu' }
  return { type: 'help' }
}