// =============================================================
//  YORUM ÖZETİ (askHermis reposundan TypeScript'e taşındı)
//  Yorumlardaki konuları sayar, en çok övülen ve şikâyet edilen
//  konulardan kısa bir özet kurar. Kural tabanlıdır; uydurma bilgi
//  eklemez, sadece yorumlarda geçen konuları kullanır.
// =============================================================
import { pick } from '../data/menu'
import { topicLabels, type Topic } from '../data/reviews'
import { normalize } from './concierge'

// Misafirin yazdığı yorumdan konu çıkarmak için kelimeler
const TOPIC_WORDS: Record<Topic, string[]> = {
  location: ['konum', 'merkez', 'yakin', 'location', 'central', 'walking distance', 'τοποθεσια', 'κοντα'],
  breakfast: ['kahvalti', 'breakfast', 'πρωινο'],
  staff: ['personel', 'calisan', 'ilgili', 'staff', 'friendly', 'helpful', 'προσωπικο', 'ευγενικ'],
  rooftop: ['teras', 'rooftop', 'manzara', 'view', 'ταρατσα', 'θεα'],
  clean: ['temiz', 'clean', 'καθαρ'],
  concierge: ['uygulama', 'asistan', 'app', 'concierge', 'εφαρμογη'],
  noise: ['gurultu', 'ses yap', 'noise', 'noisy', 'loud', 'θορυβ'],
  smallRoom: ['kucuk', 'dar', 'small', 'tiny', 'μικρ'],
  slowService: ['gec geldi', 'yavas', 'bekledik', 'slow', 'late', 'αργησ', 'αργο'],
}

export const detectTopics = (text: string): Topic[] => {
  const n = normalize(text)
  return (Object.keys(TOPIC_WORDS) as Topic[]).filter((k) => TOPIC_WORDS[k].some((w) => n.includes(normalize(w))))
}

export type ReviewInput = { rating: number; topics: Topic[] }

// Özet: en çok övülen 3 konu, en çok şikâyet edilen 2 konu ve ortalama puan
export function summarize(reviews: ReviewInput[], lang: string | undefined) {
  const counts: Partial<Record<Topic, number>> = {}
  reviews.forEach((r) => r.topics.forEach((tp) => (counts[tp] = (counts[tp] ?? 0) + 1)))
  const sorted = (Object.entries(counts) as [Topic, number][]).sort((a, b) => b[1] - a[1])
  const praise = sorted.filter(([k]) => topicLabels[k].positive).slice(0, 3).map(([k]) => pick(topicLabels[k].name, lang))
  const complain = sorted.filter(([k]) => !topicLabels[k].positive).slice(0, 2).map(([k]) => pick(topicLabels[k].name, lang))
  const average = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0
  return { praise, complain, average, count: reviews.length }
}
