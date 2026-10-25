import { createContext, useContext, type ReactNode } from 'react'
import { stay } from '../data/stay'
import { useShared } from '../lib/shared'

export type ServiceType = 'cleaning' | 'transfer' | 'table' | 'towels'
export type RequestStatus = 'pending' | 'in_progress' | 'done' | 'confirmed' | 'declined'
export type ServiceRequest = {
  id: string
  room: string
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

export function ServiceProvider({ children }: { children: ReactNode }) {
  // Talepler ortak hafızada: personel durumu değiştirince burası da güncellenir
  const [allRequests, setRequests] = useShared<ServiceRequest[]>('aura-requests', [])

  // Misafir sadece kendi odasının taleplerini görür
  const requests = allRequests.filter((r) => r.room === stay.roomNumber)

  const sendRequest = (type: ServiceType, details: Record<string, string>) => {
    const request: ServiceRequest = {
      id: 'S' + Math.floor(1000 + Math.random() * 9000),
      room: stay.roomNumber,
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