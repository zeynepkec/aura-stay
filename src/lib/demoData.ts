import type { Feedback, Review } from '../store/FeedbackContext'
import type { ServiceRequest } from '../store/ServiceContext'
import type { Order } from '../store/StayContext'

const min = 60 * 1000

// Sunum için gerçekçi örnek veriler (birkaç farklı oda)
export function buildDemoData(now = Date.now()) {
  const today = new Date().toLocaleDateString('sv') // "2026-10-25" biçiminde

  const orders: Order[] = [
    {
      id: 'A1001', room: '101', status: 'received', createdAt: now - 3 * min, note: '', total: 1540,
      lines: [{ id: 'serpme', quantity: 2, unitPrice: 650 }, { id: 'coffee', quantity: 2, unitPrice: 120 }],
    },
    {
      id: 'A1002', room: '203', status: 'preparing', createdAt: now - 12 * min, note: 'Glutensiz olsun lütfen', total: 850,
      lines: [{ id: 'seabass', quantity: 1, unitPrice: 720 }, { id: 'lemonade', quantity: 1, unitPrice: 130 }],
    },
    {
      id: 'A1003', room: '105', status: 'on_the_way', createdAt: now - 25 * min, note: '', total: 960,
      lines: [{ id: 'kofte', quantity: 2, unitPrice: 480 }],
    },
    {
      id: 'A1004', room: '102', status: 'delivered', createdAt: now - 90 * min, note: '', total: 480,
      lines: [{ id: 'baklava', quantity: 2, unitPrice: 240 }],
    },
  ]

  const requests: ServiceRequest[] = [
    { id: 'S2001', room: '102', type: 'cleaning', status: 'pending', createdAt: now - 5 * min, details: { slot: '13:00–15:00', note: '' } },
    { id: 'S2002', room: '203', type: 'towels', status: 'in_progress', createdAt: now - 15 * min, details: { quantity: '3', note: '' } },
    {
      id: 'S2003', room: '101', type: 'transfer', status: 'pending', createdAt: now - 20 * min,
      details: { destination: 'airport', date: today, time: '18:30', people: '2', note: '2 büyük bavul' },
    },
    {
      id: 'S2004', room: '205', type: 'table', status: 'pending', createdAt: now - 8 * min,
      details: { date: today, time: '20:00', people: '4', note: 'Pencere kenarı olursa sevinirim' },
    },
    { id: 'S2005', room: '102', type: 'table', status: 'confirmed', createdAt: now - 60 * min, details: { date: today, time: '21:00', people: '2', note: '' } },
  ]

  const feedback: Feedback[] = [
    { id: 'F3001', room: '203', category: 'room', message: 'Klima biraz ses yapıyor.', status: 'new', createdAt: now - 30 * min },
    { id: 'F3002', room: '101', category: 'food', message: 'Kahvaltı harikaydı, teşekkürler!', status: 'seen', createdAt: now - 120 * min },
  ]

  const reviews: Review[] = [
    { room: '102', cleanliness: 5, comfort: 5, service: 4, comment: 'Personel çok ilgiliydi, manzara harika.', createdAt: now - 180 * min },
    { room: '105', cleanliness: 4, comfort: 4, service: 5, comment: '', createdAt: now - 240 * min },
  ]

  const soldOut = ['calamari']

  return { orders, requests, feedback, reviews, soldOut }
}