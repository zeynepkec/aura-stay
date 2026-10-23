import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Review = { cleanliness: number; comfort: number; service: number; comment: string; createdAt: number }

export type FeedbackCategory = 'room' | 'food' | 'staff' | 'other'
export type FeedbackStatus = 'new' | 'seen' | 'resolved'
export type Feedback = { id: string; category: FeedbackCategory; message: string; status: FeedbackStatus; createdAt: number }

type FeedbackContextType = {
  review: Review | null
  saveReview: (review: Omit<Review, 'createdAt'>) => void
  feedbacks: Feedback[]
  sendFeedback: (category: FeedbackCategory, message: string) => void
}

const FeedbackContext = createContext<FeedbackContextType | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [review, setReview] = useState<Review | null>(() => load('aura-review', null))
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => load('aura-feedback', []))

  useEffect(() => localStorage.setItem('aura-review', JSON.stringify(review)), [review])
  useEffect(() => localStorage.setItem('aura-feedback', JSON.stringify(feedbacks)), [feedbacks])

  const value: FeedbackContextType = {
    review,
    saveReview: (r) => setReview({ ...r, createdAt: Date.now() }),
    feedbacks,
    sendFeedback: (category, message) =>
      setFeedbacks((prev) => [
        { id: 'F' + Math.floor(1000 + Math.random() * 9000), category, message, status: 'new', createdAt: Date.now() },
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