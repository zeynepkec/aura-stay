// Hermis Boutique Hotel bilgileri (içerik: Üye 2 — askHermis reposundan)
// Asistan SADECE buradaki bilgileri kullanır; burada olmayan fiyat / müsaitlik bilgisini uydurmaz.
import type { Text } from './menu'

export const hotel = {
  id: 'hermis',
  name: 'Hermis Boutique Hotel',
  area: {"tr": "Plaka, Atina", "en": "Plaka, Athens", "el": "Πλάκα, Αθήνα"} as Text,
  city: 'Athens',
  checkIn: '14:00',
  checkOut: '11:00',
  breakfast: '07:30 – 10:30',
  restaurant: '12:00 – 23:00',
  roomService: '07:00 – 23:00',
  rooftop: '17:00 – 00:00',
  wifi: { name: 'Hermis-Guest', password: 'athens2026' },
  reception: {"tr": "7/24 açık, odadan 9’u tuşla", "en": "Open 24/7, dial 9 from your room", "el": "Ανοιχτή 24/7, καλέστε το 9"} as Text,
}

// Asistanın cevaplayabildiği sık sorulan sorular
export const faq: { id: string; keywords: string[]; answer: Text }[] = [
  {
    id: 'wifi',
    keywords: ["wifi", "wi-fi", "wi fi", "internet", "sifre", "şifre", "password", "κωδικο", "ιντερνετ"],
    answer: {"tr": "Wi-Fi ağı: Hermis-Guest · Şifre: athens2026", "en": "Wi-Fi network: Hermis-Guest · Password: athens2026", "el": "Δίκτυο Wi-Fi: Hermis-Guest · Κωδικός: athens2026"},
  },
  {
    id: 'breakfast',
    keywords: ["kahvalti saat", "kahvaltı saat", "kahvalti ne zaman", "breakfast time", "breakfast hours", "when is breakfast", "πρωινο ωρα", "τι ωρα πρωινο"],
    answer: {"tr": "Kahvaltı her gün 07:30 – 10:30 arası restoranımızda servis edilir.", "en": "Breakfast is served daily 07:30 – 10:30 in our restaurant.", "el": "Το πρωινό σερβίρεται καθημερινά 07:30 – 10:30."},
  },
  {
    id: 'checkout',
    keywords: ["check out", "checkout", "cikis saat", "çıkış saat", "gec cikis", "geç çıkış", "late checkout", "αναχωρηση"],
    answer: {"tr": "Check-out saati 11:00. Geç çıkış müsaitliğe bağlıdır; isterseniz resepsiyona talep iletebilirim.", "en": "Check-out is at 11:00. Late check-out depends on availability; I can forward a request to reception.", "el": "Η αναχώρηση είναι στις 11:00. Η καθυστερημένη αναχώρηση εξαρτάται από τη διαθεσιμότητα."},
  },
  {
    id: 'checkin',
    keywords: ["check in", "checkin", "giris saat", "giriş saat", "αφιξη"],
    answer: {"tr": "Check-in saati 14:00.", "en": "Check-in is from 14:00.", "el": "Η άφιξη είναι από τις 14:00."},
  },
  {
    id: 'rooftop',
    keywords: ["teras", "rooftop", "roof", "bar", "ταρατσα", "μπαρ"],
    answer: {"tr": "Çatı terasımız 17:00 – 00:00 arası açık ve Akropolis manzaralı. Masa ayırtmak ister misiniz?", "en": "Our rooftop is open 17:00 – 00:00 with an Acropolis view. Would you like to book a table?", "el": "Η ταράτσα μας είναι ανοιχτή 17:00 – 00:00 με θέα την Ακρόπολη."},
  },
  {
    id: 'luggage',
    keywords: ["bavul", "valiz", "esya", "eşya", "luggage", "bags", "αποσκευ", "βαλιτσ"],
    answer: {"tr": "Check-out sonrası bavullarınızı resepsiyonda ücretsiz saklayabiliriz.", "en": "We can store your luggage at reception free of charge after check-out.", "el": "Φυλάσσουμε δωρεάν τις αποσκευές σας στη ρεσεψιόν."},
  },
]

// Hizmet seçenekleri (form ve asistan aynı listeyi kullanır)
export const cleaningSlots = ["09:00 – 11:00", "11:00 – 13:00", "13:00 – 15:00", "15:00 – 17:00"]

export const amenityItems: { id: string; name: Text }[] = [
    { id: 'towel', name: {"tr": "Havlu", "en": "Towels", "el": "Πετσέτες"} },
    { id: 'pillow', name: {"tr": "Yastık", "en": "Pillow", "el": "Μαξιλάρι"} },
    { id: 'blanket', name: {"tr": "Battaniye", "en": "Blanket", "el": "Κουβέρτα"} },
    { id: 'toiletries', name: {"tr": "Banyo seti", "en": "Toiletries", "el": "Είδη μπάνιου"} },
  ]

export const transferDestinations: { id: string; name: Text }[] = [
    { id: 'airport', name: {"tr": "Atina Havalimanı", "en": "Athens Airport", "el": "Αεροδρόμιο Αθηνών"} },
    { id: 'piraeus', name: {"tr": "Pire Limanı", "en": "Piraeus Port", "el": "Λιμάνι Πειραιά"} },
    { id: 'city', name: {"tr": "Şehir içi", "en": "City", "el": "Εντός πόλης"} },
  ]

export const tableVenues: { id: string; name: Text }[] = [
    { id: 'restaurant', name: {"tr": "Restoran", "en": "Restaurant", "el": "Εστιατόριο"} },
    { id: 'rooftop', name: {"tr": "Çatı Terası", "en": "Rooftop", "el": "Ταράτσα"} },
  ]

// Ana sayfadaki özel kampanya (Deep Blue)
export const campaign = {
  title: {"tr": "Terasta Gün Batımı Saati", "en": "Rooftop Sunset Hour", "el": "Ώρα Ηλιοβασιλέματος στην Ταράτσα"} as Text,
  description: {"tr": "Her akşam 18:00 – 20:00 arası Akropolis manzarasıyla ikinci kokteyl bizden.", "en": "Every evening 18:00 – 20:00, your second cocktail is on us with an Acropolis view.", "el": "Κάθε βράδυ 18:00 – 20:00, το δεύτερο κοκτέιλ κερασμένο."} as Text,
  cta: {"tr": "Masa ayırt", "en": "Book a table", "el": "Κράτηση"} as Text,
}

// Bir listedeki seçeneğin adını bul: optionName(transferDestinations, 'airport', 'tr') → 'Atina Havalimanı'
export function optionName(list: { id: string; name: Text }[], id: string | undefined, lang: string | undefined) {
  const option = list.find((o) => o.id === id)
  if (!option) return id ?? ''
  return option.name[(lang ?? 'en').slice(0, 2) as keyof Text] ?? option.name.en
}
