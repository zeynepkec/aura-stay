// Atina rotaları (içerik: Üye 2 — askHermis reposundan)
// - minutes: toplam süre, km: yaklaşık yürüme mesafesi
// - tags: filtre ve asistan önerisi için
// - stops[].place: Google Haritalar'da aranan isim; lat/lng: haritadaki yaklaşık konum
// - sharedBy / rating: AURA'nın "misafirlerin paylaştığı rotalar" fikri için demo değerler
// - Not: Süreler, konumlar ve ipuçları demo amaçlı; sunumdan önce kontrol edin.
import type { Text } from './menu'

export type RouteTag = 'history' | 'food' | 'sunset' | 'family' | 'easy' | 'culture' | 'nature'

export type Stop = { name: Text; place: string; minutes: number; lat: number; lng: number }

export type TravelRoute = {
  id: string
  tags: RouteTag[]
  featured?: boolean
  title: Text
  description: Text
  tip: Text
  sharedBy: string
  minutes: number
  km: number
  rating: number
  stops: Stop[]
}

export const routeTags: Record<RouteTag, { name: Text; emoji: string }> = {
  history: { name: {"tr": "Tarih", "en": "History", "el": "Ιστορία"}, emoji: '🏛️' },
  food: { name: {"tr": "Yemek", "en": "Food", "el": "Φαγητό"}, emoji: '🍽️' },
  sunset: { name: {"tr": "Gün batımı", "en": "Sunset", "el": "Ηλιοβασίλεμα"}, emoji: '🌅' },
  family: { name: {"tr": "Aile", "en": "Family", "el": "Οικογένεια"}, emoji: '👨‍👩‍👧' },
  easy: { name: {"tr": "Az yürüyüş", "en": "Easy walk", "el": "Λίγο περπάτημα"}, emoji: '🚶' },
  culture: { name: {"tr": "Kültür & sanat", "en": "Culture & art", "el": "Πολιτισμός"}, emoji: '🎭' },
  nature: { name: {"tr": "Doğa", "en": "Nature", "el": "Φύση"}, emoji: '🌿' },
}

export const routes: TravelRoute[] = [
  {
    id: 'ancient-classics',
    tags: ["history", "culture"], featured: true,
    sharedBy: 'Elif', rating: 4.9, minutes: 180, km: 3,
    title: {"tr": "Antik Atina Klasikleri", "en": "Ancient Athens Classics", "el": "Κλασικά της Αρχαίας Αθήνας"},
    description: {"tr": "Akropolis, Akropolis Müzesi ve Dionysiou Areopagitou yürüyüşü.", "en": "Acropolis, Acropolis Museum and the Dionysiou Areopagitou walk.", "el": "Ακρόπολη, Μουσείο Ακρόπολης και Διονυσίου Αρεοπαγίτου."},
    tip: {"tr": "Sıcak ve kalabalıktan kaçmak için Akropolis’e açılış saatinde gidin, su almayı unutmayın.", "en": "Go to the Acropolis at opening time to avoid heat and crowds; bring water.", "el": "Πηγαίνετε στην Ακρόπολη με το άνοιγμα για λιγότερο κόσμο· πάρτε νερό."},
    stops: [
      { name: {"tr": "Akropolis", "en": "Acropolis", "el": "Ακρόπολη"}, place: "Acropolis of Athens", minutes: 90, lat: 37.9715, lng: 23.7257 },
      { name: {"tr": "Dionysiou Areopagitou Yürüyüşü", "en": "Dionysiou Areopagitou Walk", "el": "Διονυσίου Αρεοπαγίτου"}, place: "Dionysiou Areopagitou, Athens", minutes: 20, lat: 37.9702, lng: 23.7232 },
      { name: {"tr": "Akropolis Müzesi", "en": "Acropolis Museum", "el": "Μουσείο Ακρόπολης"}, place: "Acropolis Museum", minutes: 70, lat: 37.9685, lng: 23.7286 },
    ],
  },
  {
    id: 'plaka-streets',
    tags: ["history", "easy", "family"],
    sharedBy: 'James', rating: 4.8, minutes: 150, km: 2.5,
    title: {"tr": "Plaka’nın Tarihi Sokakları", "en": "Historic Streets of Plaka", "el": "Ιστορικά Σοκάκια της Πλάκας"},
    description: {"tr": "Anafiotika evleri, Roma Agorası, Rüzgârlar Kulesi ve Monastiraki.", "en": "Anafiotika houses, Roman Agora, Tower of the Winds and Monastiraki.", "el": "Αναφιώτικα, Ρωμαϊκή Αγορά, Αέρηδες και Μοναστηράκι."},
    tip: {"tr": "Otelimize yürüme mesafesinde. Anafiotika’nın dar merdivenlerinde rahat ayakkabı giyin.", "en": "Walking distance from the hotel. Wear comfy shoes for Anafiotika’s narrow steps.", "el": "Κοντά στο ξενοδοχείο. Φορέστε άνετα παπούτσια στα Αναφιώτικα."},
    stops: [
      { name: {"tr": "Anafiotika", "en": "Anafiotika", "el": "Αναφιώτικα"}, place: "Anafiotika, Athens", minutes: 30, lat: 37.9727, lng: 23.7287 },
      { name: {"tr": "Roma Agorası & Rüzgârlar Kulesi", "en": "Roman Agora & Tower of the Winds", "el": "Ρωμαϊκή Αγορά & Αέρηδες"}, place: "Roman Agora, Athens", minutes: 30, lat: 37.9744, lng: 23.7263 },
      { name: {"tr": "Monastiraki Meydanı ve Bit Pazarı", "en": "Monastiraki Square & Flea Market", "el": "Πλατεία Μοναστηρακίου"}, place: "Monastiraki Square", minutes: 40, lat: 37.976, lng: 23.7255 },
    ],
  },
  {
    id: 'food-markets',
    tags: ["food", "culture"],
    sharedBy: 'Maria', rating: 4.7, minutes: 120, km: 2,
    title: {"tr": "Gastronomi ve Yerel Pazarlar", "en": "Gastronomy & Local Markets", "el": "Γαστρονομία και Αγορές"},
    description: {"tr": "Varvakios Merkez Pazarı, baharatçılar ve Psirri sokak lezzetleri.", "en": "Varvakios Central Market, spice shops and Psirri street food.", "el": "Βαρβάκειος Αγορά, μπαχαράδικα και street food στου Ψυρρή."},
    tip: {"tr": "Pazar sabahları en canlı halinde; pazar günü çoğu tezgâh kapalı olur.", "en": "The market is liveliest in the morning; most stalls close on Sundays.", "el": "Η αγορά είναι πιο ζωντανή το πρωί· Κυριακή είναι κλειστή."},
    stops: [
      { name: {"tr": "Varvakios Merkez Pazarı", "en": "Varvakios Central Market", "el": "Βαρβάκειος Αγορά"}, place: "Varvakios Agora, Athens", minutes: 40, lat: 37.9808, lng: 23.7266 },
      { name: {"tr": "Evripidou Baharat Sokağı", "en": "Evripidou Spice Street", "el": "Οδός Ευριπίδου"}, place: "Evripidou Street, Athens", minutes: 25, lat: 37.9797, lng: 23.7247 },
      { name: {"tr": "Psirri’de Meze ve Souvlaki", "en": "Meze & Souvlaki in Psirri", "el": "Μεζέδες στου Ψυρρή"}, place: "Psyrri, Athens", minutes: 50, lat: 37.9784, lng: 23.723 },
    ],
  },
  {
    id: 'lycabettus-sunset',
    tags: ["sunset", "nature", "easy"],
    sharedBy: 'Sophie', rating: 4.9, minutes: 120, km: 1.5,
    title: {"tr": "Lycabettus Tepesi Gün Batımı", "en": "Lycabettus Hill Sunset", "el": "Ηλιοβασίλεμα στον Λυκαβηττό"},
    description: {"tr": "Kolonaki’den füniküler ile tepeye çıkış ve 360° Atina manzarası.", "en": "Funicular from Kolonaki to the top and a 360° view of Athens.", "el": "Τελεφερίκ από το Κολωνάκι και θέα 360°."},
    tip: {"tr": "Gün batımından 45 dakika önce yukarıda olun, en iyi yerler erken doluyor.", "en": "Be at the top 45 minutes before sunset; the best spots fill up early.", "el": "Ανεβείτε 45 λεπτά πριν τη δύση."},
    stops: [
      { name: {"tr": "Kolonaki Meydanı", "en": "Kolonaki Square", "el": "Πλατεία Κολωνακίου"}, place: "Kolonaki Square", minutes: 30, lat: 37.9773, lng: 23.7406 },
      { name: {"tr": "Lycabettus Füniküleri", "en": "Lycabettus Funicular", "el": "Τελεφερίκ Λυκαβηττού"}, place: "Lycabettus Funicular", minutes: 15, lat: 37.98, lng: 23.7432 },
      { name: {"tr": "Tepe ve Agios Georgios Şapeli", "en": "Summit & St. George Chapel", "el": "Κορυφή & Άγιος Γεώργιος"}, place: "Mount Lycabettus", minutes: 60, lat: 37.9817, lng: 23.7431 },
    ],
  },
  {
    id: 'agora-philopappos',
    tags: ["history", "sunset", "nature"],
    sharedBy: 'Nikos', rating: 4.6, minutes: 180, km: 4,
    title: {"tr": "Antik Agora ve Filopappos Tepesi", "en": "Ancient Agora & Philopappos Hill", "el": "Αρχαία Αγορά & Φιλοπάππου"},
    description: {"tr": "Hephaistos Tapınağı, Areopagus kayası ve Akropolis manzaralı tepe.", "en": "Temple of Hephaestus, Areopagus rock and a hill facing the Acropolis.", "el": "Ναός Ηφαίστου, Άρειος Πάγος και λόφος με θέα."},
    tip: {"tr": "Areopagus kayası kaygan olabilir; Akropolis fotoğrafı için en iyi açı Filopappos’tan.", "en": "Areopagus rock can be slippery; Philopappos gives the best Acropolis photo angle.", "el": "Ο Άρειος Πάγος γλιστράει· η καλύτερη φωτογραφία είναι από τον Φιλοπάππου."},
    stops: [
      { name: {"tr": "Antik Agora & Hephaistos Tapınağı", "en": "Ancient Agora & Temple of Hephaestus", "el": "Αρχαία Αγορά & Ηφαίστειο"}, place: "Ancient Agora of Athens", minutes: 75, lat: 37.9747, lng: 23.7224 },
      { name: {"tr": "Areopagus Kayası", "en": "Areopagus Hill", "el": "Άρειος Πάγος"}, place: "Areopagus Hill", minutes: 20, lat: 37.9724, lng: 23.7236 },
      { name: {"tr": "Filopappos Tepesi", "en": "Philopappos Hill", "el": "Λόφος Φιλοπάππου"}, place: "Philopappos Hill", minutes: 45, lat: 37.968, lng: 23.7193 },
    ],
  },
  {
    id: 'syntagma-garden',
    tags: ["family", "nature", "easy", "history"],
    sharedBy: 'Lukas', rating: 4.5, minutes: 150, km: 3,
    title: {"tr": "Syntagma, Ulusal Bahçe ve Panathenaic Stadı", "en": "Syntagma, National Garden & Panathenaic Stadium", "el": "Σύνταγμα, Εθνικός Κήπος & Καλλιμάρμαρο"},
    description: {"tr": "Evzon nöbet değişimi, gölgeli bahçe yürüyüşü ve ilk modern olimpiyat stadı.", "en": "Evzones guard change, a shady garden walk and the first modern Olympic stadium.", "el": "Αλλαγή φρουράς, βόλτα στον κήπο και το Καλλιμάρμαρο."},
    tip: {"tr": "Nöbet değişimi her saat başı; pazar sabahı törensel versiyonu yapılır.", "en": "The guard changes every hour on the hour, with a ceremonial version on Sunday mornings.", "el": "Η αλλαγή φρουράς γίνεται κάθε ώρα· επίσημη την Κυριακή το πρωί."},
    stops: [
      { name: {"tr": "Syntagma – Nöbet Değişimi", "en": "Syntagma – Changing of the Guard", "el": "Σύνταγμα – Αλλαγή Φρουράς"}, place: "Tomb of the Unknown Soldier, Athens", minutes: 20, lat: 37.9755, lng: 23.7367 },
      { name: {"tr": "Ulusal Bahçe & Zappeion", "en": "National Garden & Zappeion", "el": "Εθνικός Κήπος & Ζάππειο"}, place: "National Garden, Athens", minutes: 45, lat: 37.9729, lng: 23.7375 },
      { name: {"tr": "Panathenaic Stadı", "en": "Panathenaic Stadium", "el": "Καλλιμάρμαρο Στάδιο"}, place: "Panathenaic Stadium", minutes: 45, lat: 37.9683, lng: 23.7411 },
    ],
  },
  {
    id: 'snfcc-seaside',
    tags: ["culture", "nature", "family", "sunset"],
    sharedBy: 'Ayşe', rating: 4.7, minutes: 180, km: 2,
    title: {"tr": "Stavros Niarchos Kültür Merkezi ve Sahil", "en": "Stavros Niarchos Cultural Center & Seaside", "el": "ΚΠΙΣΝ & Παραλία"},
    description: {"tr": "Modern mimari, çatı manzarası, park ve Flisvos marinasında akşam yürüyüşü.", "en": "Modern architecture, rooftop views, a park and an evening walk at Flisvos Marina.", "el": "Σύγχρονη αρχιτεκτονική, πάρκο και βόλτα στο Φλοίσβο."},
    tip: {"tr": "Merkeze ulaşım için resepsiyondan taksi veya transfer isteyebilirsiniz.", "en": "Ask reception for a taxi or transfer to get there.", "el": "Ζητήστε ταξί ή μεταφορά από τη ρεσεψιόν."},
    stops: [
      { name: {"tr": "SNFCC & Çatı Terası", "en": "SNFCC & Lighthouse terrace", "el": "ΚΠΙΣΝ & Φάρος"}, place: "Stavros Niarchos Foundation Cultural Center", minutes: 90, lat: 37.9398, lng: 23.6913 },
      { name: {"tr": "Stavros Niarchos Parkı", "en": "Stavros Niarchos Park", "el": "Πάρκο Σταύρος Νιάρχος"}, place: "Stavros Niarchos Park", minutes: 40, lat: 37.9417, lng: 23.6935 },
      { name: {"tr": "Flisvos Marinası", "en": "Flisvos Marina", "el": "Μαρίνα Φλοίσβου"}, place: "Flisvos Marina", minutes: 40, lat: 37.931, lng: 23.682 },
    ],
  },
]

// Otelin konumu (Plaka) — harita ve yol tarifi için
export const HOTEL_LOCATION = { lat: 37.9726, lng: 23.7303 }

// Google Haritalar linkleri
export const mapsSearchUrl = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`

export function mapsRouteUrl(stops: Stop[]) {
  const enc = (s: Stop) => encodeURIComponent(s.place)
  const origin = enc(stops[0])
  const destination = enc(stops[stops.length - 1])
  const waypoints = stops.slice(1, -1).map(enc).join('|')
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=walking`
}
