import { createContext, useContext, useState, type ReactNode } from 'react'
import { menuItems } from '../data/menu'
import { stay } from '../data/stay'
import { useShared } from '../lib/shared'

type CartLine = { id: string; quantity: number; lineTotal: number }

export type OrderStatus = 'received' | 'preparing' | 'on_the_way' | 'delivered'
export const ORDER_STEPS: OrderStatus[] = ['received', 'preparing', 'on_the_way', 'delivered']

export type Order = {
  id: string
  room: string
  lines: { id: string; quantity: number; unitPrice: number }[]
  note: string
  total: number
  status: OrderStatus
  createdAt: number
}

type StayContextType = {
  cart: CartLine[]
  cartCount: number
  cartTotal: number
  note: string
  quantityOf: (id: string) => number
  addToCart: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  setNote: (note: string) => void
  clearCart: () => void
  orders: Order[]
  placeOrder: () => Order | null
  getOrder: (id: string) => Order | undefined
}

const StayContext = createContext<StayContextType | null>(null)

export function StayProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useShared<Record<string, number>>('aura-cart', {})
  const [note, setNote] = useState('')
  // Siparişler ortak hafızada: mutfak durumu değiştirince burası da güncellenir
  const [allOrders, setOrders] = useShared<Order[]>('aura-orders', [])

  // Misafir sadece kendi odasının siparişlerini görür
  const orders = allOrders.filter((o) => o.room === stay.roomNumber)

  const cart: CartLine[] = Object.entries(quantities).map(([id, quantity]) => {
    const item = menuItems.find((m) => m.id === id)
    return { id, quantity, lineTotal: (item?.price ?? 0) * quantity }
  })
  const cartTotal = cart.reduce((sum, l) => sum + l.lineTotal, 0)

  const setQuantity = (id: string, quantity: number) => {
    setQuantities((prev) => {
      const next = { ...prev }
      if (quantity <= 0) delete next[id]
      else next[id] = Math.min(quantity, 20)
      return next
    })
  }

  const clearCart = () => {
    setQuantities({})
    setNote('')
  }

  // Sepetten sipariş oluştur — mutfak ekranına düşer
  const placeOrder = (): Order | null => {
    if (cart.length === 0) return null
    const order: Order = {
      id: 'A' + Math.floor(1000 + Math.random() * 9000),
      room: stay.roomNumber,
      lines: cart.map((l) => ({ id: l.id, quantity: l.quantity, unitPrice: l.lineTotal / l.quantity })),
      note: note.trim(),
      total: cartTotal,
      status: 'received',
      createdAt: Date.now(),
    }
    setOrders((prev) => [order, ...prev])
    clearCart()
    return order
  }

  const value: StayContextType = {
    cart,
    cartCount: cart.reduce((sum, l) => sum + l.quantity, 0),
    cartTotal,
    note,
    quantityOf: (id) => quantities[id] ?? 0,
    addToCart: (id) => setQuantity(id, (quantities[id] ?? 0) + 1),
    setQuantity,
    setNote,
    clearCart,
    orders,
    placeOrder,
    getOrder: (id) => orders.find((o) => o.id === id),
  }

  return <StayContext.Provider value={value}>{children}</StayContext.Provider>
}

export function useStay() {
  const context = useContext(StayContext)
  if (!context) throw new Error('useStay, StayProvider içinde kullanılmalı')
  return context
}