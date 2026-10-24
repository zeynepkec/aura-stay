import { createContext, useContext, type ReactNode } from 'react'
import { stay } from '../data/stay'
import { useShared } from '../lib/shared'

export type Review = { room: string; cleanliness: number; comfort: number; service: number; comment: string; createdAt: number }

export type FeedbackCategory = 'room' | 'food' | 'staff' | 'other'
export type FeedbackStatus = 'new' | 'seen' | 'resolved'
export type Feedback = { id: string; room: string; category: FeedbackCategory; message: string; status: FeedbackStatus; createdAt: number }

type FeedbackContextType = {
  review: Review | null
  saveReview: (review: Omit<Review, 'createdAt' | 'room'>) => void
  feedbacks: Feedback[]
  sendFeedback: (category: FeedbackCategory, message: string) => void
}

const FeedbackContext = createContext<FeedbackContextType | null>(null)

export function FeedbackProvider({ children }: { children: ReactNode }) {
  // Ortak hafıza: resepsiyon bunları görür ve durumunu değiştirir
  const [allReviews, setReviews] = useShared<Review[]>('aura-reviews', [])
  const [allFeedback, setFeedback] = useShared<Feedback[]>('aura-feedback', [])

  const room = stay.roomNumber

  const value: FeedbackContextType = {
    // Her odanın tek bir değerlendirmesi olur (yeniden gönderilirse güncellenir)
    review: allReviews.find((r) => r.room === room) ?? null,
    saveReview: (r) =>
      setReviews((prev) => [{ ...r, room, createdAt: Date.now() }, ...prev.filter((x) => x.room !== room)]),
    // Misafir sadece kendi odasının mesajlarını görür
    feedbacks: allFeedback.filter((f) => f.room === room),
    sendFeedback: (category, message) =>
      setFeedback((prev) => [
        { id: 'F' + Math.floor(1000 + Math.random() * 9000), room, category, message, status: 'new', createdAt: Date.now() },
        ...prev,
      ]),
  }

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>
}

export function useFeedback() {
  const context = useContext(FeedbackContext)
  if (!context) throw new Error('useFeedback, FeedbackProvider içinde kullanılmalı')
  return context
}