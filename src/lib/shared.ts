import { useCallback, useEffect, useRef, useState } from 'react'

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
// 2) başka sekme aynı değeri değiştirirse kendini günceller
export function useShared<T>(key: string, fallback: T) {
  const fallbackRef = useRef(fallback)
  const [value, setValue] = useState<T>(() => readShared(key, fallback))

  // Başka sekmede değişiklik olunca haber al
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setValue(e.newValue ? (JSON.parse(e.newValue) as T) : fallbackRef.current)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  // Değeri değiştir ve kaydet
  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        localStorage.setItem(key, JSON.stringify(resolved))
        return resolved
      })
    },
    [key],
  )

  return [value, update] as const
}