import type { TFunction } from 'i18next'
import { hotel } from '../data/hotel'
import { pick } from '../data/menu'

// Hizmetin kısa açıklaması. Transfer ve masa açıklaması otele göre değişir (havalimanı, manzara…)
export function serviceDesc(type: string, t: TFunction, lang: string | undefined) {
  if (type === 'transfer' || type === 'table') return pick(hotel.serviceDesc[type], lang)
  return t(`services.types.${type}.desc`)
}
