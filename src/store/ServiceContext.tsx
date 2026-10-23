import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type ServiceType = 'cleaning' | 'transfer' | 'table' | 'towels'
export type RequestStatus = 'pending' | 'in_progress' | 'done'

export type ServiceRequest = {
  id: string
  type: ServiceType
  details: Record<string, string>
  status: RequestStatus
  createdAt: number
}

type ServiceContextType = {
  requests: ServiceRequest[]
  sendRequest: (type: ServiceType, details: Record<string, string>) => ServiceRequest
}

const ServiceContext = createContext<ServiceContextType | null>(null)

// DEMO: personel paneli gelene kadar durum kendiliğinden ilerler (saniye)
const DEMO_SECONDS = { in_progress: 20, done: 60 }

function loadRequests(): ServiceRequest[] {
  try {
    return JSON.parse(localStorage.getItem('aura-requests') ?? '[]')
  } catch {
    return []
  }
}

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>(loadRequests)

  useEffect(() => localStorage.setItem('aura-requests', JSON.stringify(requests)), [requests])

  // DEMO: her 2 saniyede durumları güncelle
  useEffect(() => {
    const timer = setInterval(() => {
      setRequests((prev) =>
        prev.map((r) => {
          const seconds = (Date.now() - r.createdAt) / 1000
          const status: RequestStatus =
            seconds >= DEMO_SECONDS.done ? 'done' : seconds >= DEMO_SECONDS.in_progress ? 'in_progress' : 'pending'
          return status === r.status ? r : { ...r, status }
        }),
      )
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const sendRequest = (type: ServiceType, details: Record<string, string>) => {
    const request: ServiceRequest = {
      id: 'S' + Math.floor(1000 + Math.random() * 9000),
      type,
      details,
      status: 'pending',
      createdAt: Date.now(),
    }
    setRequests((prev) => [request, ...prev])
    return request
  }

  return <ServiceContext.Provider value={{ requests, sendRequest }}>{children}</ServiceContext.Provider>
}

export function useServices() {
  const context = useContext(ServiceContext)
  if (!context) throw new Error('useServices, ServiceProvider içinde kullanılmalı')
  return context
}