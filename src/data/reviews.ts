// Örnek misafir yorumları (içerik: Üye 2 — askHermis reposundan)
// Demo verisidir; uygulamada "örnek yorum" olarak etiketlenir.
// topics: yorum özetinin hangi konudan bahsedildiğini anlaması için.
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

export const sampleReviews: SampleReview[] = [
  { id: 1, name: "Elif", country: '🇹🇷', rating: 5, lang: 'TR', date: '2026-10-12', topics: ["location", "rooftop", "staff"], text: "Plaka’nın tam ortasında, terastan Akropolis manzarası inanılmaz. Personel çok ilgiliydi." },
  { id: 2, name: "James", country: '🇬🇧', rating: 5, lang: 'EN', date: '2026-10-10', topics: ["breakfast", "concierge"], text: "Best breakfast we had in Athens. The concierge app suggested a sunset route that was perfect." },
  { id: 3, name: "Maria", country: '🇬🇷', rating: 4, lang: 'EL', date: '2026-10-08', topics: ["clean", "noise"], text: "Πολύ καθαρό δωμάτιο, λίγος θόρυβος από τον δρόμο το βράδυ." },
  { id: 4, name: "Lukas", country: '🇩🇪', rating: 5, lang: 'EN', date: '2026-10-05', topics: ["location", "staff", "concierge"], text: "Walking distance to everything. Ordering room service from the app was super easy." },
  { id: 5, name: "Ayşe", country: '🇹🇷', rating: 4, lang: 'TR', date: '2026-10-02', topics: ["breakfast", "smallRoom"], text: "Kahvaltı çok güzeldi, oda biraz küçüktü ama temiz ve şıktı." },
  { id: 6, name: "Sophie", country: '🇫🇷', rating: 5, lang: 'EN', date: '2026-09-28', topics: ["rooftop", "breakfast"], text: "The rooftop at sunset is magical. Greek yogurt with honey every morning!" },
  { id: 7, name: "Nikos", country: '🇬🇷', rating: 3, lang: 'EL', date: '2026-09-25', topics: ["slowService", "location"], text: "Εξαιρετική τοποθεσία, αλλά το room service άργησε λίγο." },
  { id: 8, name: "Can", country: '🇹🇷', rating: 5, lang: 'TR', date: '2026-09-20', topics: ["concierge", "clean", "staff"], text: "Temizlik talebini uygulamadan verdim, 20 dakikada geldiler. Çok pratik." },
]
