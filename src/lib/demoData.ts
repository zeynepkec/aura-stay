import type { Feedback, Review } from '../store/FeedbackContext'
import type { ServiceRequest } from '../store/ServiceContext'
import type { Order } from '../store/StayContext'
import { currentHotel } from '../data/hotels'

// Açık olan otelin menüsünden örnek ürünler (kategori + sıra)
const menu = currentHotel.menuItems
const item = (category: string, n = 0) => menu.filter((m) => m.category === category)[n] ?? menu[0]
const line = (category: string, n: number, quantity: number) => {
  const m = item(category, n)
  return { id: m.id, quantity, unitPrice: m.price }
}
const total = (lines: { quantity: number; unitPrice: number }[]) => lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0)

const min = 60 * 1000

// Sunum için gerçekçi örnek veriler (birkaç farklı oda)
export function buildDemoData(now = Date.now()) {
  const today = new Date().toLocaleDateString('sv') // "2026-10-25" biçiminde

  const o1 = [line('breakfast', 0, 2), line('drinks', 0, 2)]
  const o2 = [line('mains', 3, 1), line('drinks', 2, 1)]
  const o3 = [line('mains', 1, 2)]
  const o4 = [line('desserts', 2, 2)]
  const orders: Order[] = [
    { id: 'A1001', room: '101', status: 'received', createdAt: now - 3 * min, note: '', total: total(o1), lines: o1 },
    { id: 'A1002', room: '203', status: 'preparing', createdAt: now - 12 * min, note: 'Glutensiz olsun lütfen', total: total(o2), lines: o2 },
    { id: 'A1003', room: '105', status: 'on_the_way', createdAt: now - 25 * min, note: '', total: total(o3), lines: o3 },
    { id: 'A1004', room: '302', status: 'delivered', createdAt: now - 90 * min, note: '', total: total(o4), lines: o4 },
  ]

  const requests: ServiceRequest[] = [
    { id: 'S2001', room: '102', type: 'cleaning', status: 'pending', createdAt: now - 5 * min, details: { slot: '13:00 – 15:00', note: '' } },
    { id: 'S2002', room: '203', type: 'towels', status: 'in_progress', createdAt: now - 15 * min, details: { items: 'towel,pillow', quantity: '2', note: '' } },
    {
      id: 'S2003', room: '101', type: 'transfer', status: 'pending', createdAt: now - 20 * min,
      details: { destination: 'airport', date: today, time: '18:30', people: '2', note: '2 büyük bavul' },
    },
    {
      id: 'S2004', room: '205', type: 'table', status: 'pending', createdAt: now - 8 * min,
      details: { venue: 'rooftop', date: today, time: '20:00', people: '4', note: currentHotel.demo.tableNote },
    },
    { id: 'S2005', room: '102', type: 'table', status: 'confirmed', createdAt: now - 60 * min, details: { venue: 'restaurant', date: today, time: '21:00', people: '2', note: '' } },
  ]

  const feedback: Feedback[] = [
    { id: 'F3001', room: '203', category: 'room', message: 'Klima biraz ses yapıyor.', status: 'new', createdAt: now - 30 * min },
    { id: 'F3002', room: '101', category: 'food', message: 'Kahvaltı harikaydı, teşekkürler!', status: 'seen', createdAt: now - 120 * min },
  ]

  const reviews: Review[] = [
    { room: '102', cleanliness: 5, comfort: 5, service: 4, comment: currentHotel.demo.reviewNote, createdAt: now - 180 * min },
    { room: '105', cleanliness: 4, comfort: 4, service: 5, comment: '', createdAt: now - 240 * min },
  ]

  const soldOut = [currentHotel.demo.soldOut]

  return { orders, requests, feedback, reviews, soldOut }
}