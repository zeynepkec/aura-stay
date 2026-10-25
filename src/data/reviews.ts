// Örnek misafir yorumları (içerik: Üye 2 — askHermis reposundan)
// Demo verisidir; uygulamada "örnek yorum" olarak etiketlenir.
// topics: yorum özetinin hangi konudan bahsedildiğini anlaması için.
import { currentHotel } from './hotels'
import type { Text } from './menu'

export type Topic = 'location' | 'breakfast' | 'staff' | 'rooftop' | 'clean' | 'concierge' | 'noise' | 'smallRoom' | 'slowService'

export type SampleReview = { id: number; name: string; country: string; rating: number; lang: string; date: string; topics: Topic[]; text: string }

export const topicLabels: Record<Topic, { name: Text; positive: boolean }> = {
  location: { name: {"tr": "konum", "en": "location", "el": "τοποθεσία"}, positive: true },
  breakfast: { name: {"tr": "kahvaltı", "en": "breakfast", "el": "πρωινό"}, positive: true },
  staff: { name: {"tr": "personel", "en": "staff", "el": "προσωπικό"}, positive: true },
  rooftop: { name: {"tr": "çatı terası", "en": "rooftop", "el": "ταράτσα"}, positive: true },
  clean: { name: {"tr": "temizlik", "en": "cleanliness", "el": "καθαριότητα"}, positive: true },
  concierge: { name: {"tr": "AI asistan", "en": "AI concierge", "el": "AI θυρωρός"}, positive: true },
  noise: { name: {"tr": "sokak gürültüsü", "en": "street noise", "el": "θόρυβος"}, positive: false },
  smallRoom: { name: {"tr": "oda büyüklüğü", "en": "room size", "el": "μέγεθος δωματίου"}, positive: false },
  slowService: { name: {"tr": "servis hızı", "en": "service speed", "el": "ταχύτητα σέρβις"}, positive: false },
}

// Örnek yorumlar açık olan otelden gelir
export const sampleReviews: SampleReview[] = currentHotel.sampleReviews
