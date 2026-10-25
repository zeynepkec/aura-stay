import { useCallback, useEffect, useRef, useState } from 'react'
import { pushChange } from './sync'

// Aynı sekmedeki diğer ekranlara "bu değer değişti" haberi
const SAME_TAB_EVENT = 'aura-shared-change'

// Tarayıcı hafızasından oku
export function readShared<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as T) : fallback
  } catch {
    return fallback
  }
}

// useState gibi çalışır, ama:
// 1) değeri tarayıcı hafızasına kaydeder
// 2) başka sekme, aynı sekmedeki başka ekran YA DA başka cihaz (veritabanı) değiştirirse kendini günceller
export function useShared<T>(key: string, fallback: T) {
  const fallbackRef = useRef(fallback)
  const [value, setValue] = useState<T>(() => readShared(key, fallback))

  useEffect(() => {
    // Başka sekmede değişiklik
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setValue(readShared(key, fallbackRef.current))
    }
    // Aynı sekmede değişiklik
    const onLocal = (e: Event) => {
      if ((e as CustomEvent<string>).detail === key) setValue(readShared(key, fallbackRef.current))
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener(SAME_TAB_EVENT, onLocal)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(SAME_TAB_EVENT, onLocal)
    }
  }, [key])

  // Değeri değiştir, kaydet ve herkese haber ver
  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = readShared(key, fallbackRef.current)
      const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
      localStorage.setItem(key, JSON.stringify(resolved))
      setValue(resolved)
      window.dispatchEvent(new CustomEvent(SAME_TAB_EVENT, { detail: key }))
      // Paylaşılan veriyse veritabanına da gönder (başka cihazlar görsün)
      pushChange(key, prev, resolved)
    },
    [key],
  )

  return [value, update] as const
}
