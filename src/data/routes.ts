import type { Text } from './menu'

export type RouteCategory = 'culture' | 'nature' | 'food' | 'activity'

export type Stop = { name: string; lat: number; lng: number }

export type TravelRoute = {
  id: string
  category: RouteCategory
  title: Text
  description: Text
  sharedBy: string
  minutes: number
  km: number
  rating: number
  stops: Stop[]
}

export const routes: TravelRoute[] = [
  {
    id: 'castle',
    category: 'culture',
    sharedBy: 'Elif',
    minutes: 90,
    km: 1.2,
    rating: 4.8,
    title: { tr: 'Bodrum Kalesi ve antik tiyatro', en: 'Bodrum Castle & ancient theatre', el: 'Κάστρο της Αλικαρνασσού & αρχαίο θέατρο' },
    description: {
      tr: 'Kaleden başlayıp marinadan geçerek antik tiyatroya uzanan kısa bir tarih yürüyüşü.',
      en: 'A short history walk from the castle, past the marina, up to the ancient theatre.',
      el: 'Σύντομος ιστορικός περίπατος από το κάστρο, μέσω της μαρίνας, ως το αρχαίο θέατρο.',
    },
    stops: [
      { name: 'Bodrum Kalesi', lat: 37.0319, lng: 27.429 },
      { name: 'Bodrum Marina', lat: 37.0345, lng: 27.4243 },
      { name: 'Antik Tiyatro', lat: 37.0402, lng: 27.4232 },
    ],
  },
  {
    id: 'windmills',
    category: 'nature',
    sharedBy: 'Nikos',
    minutes: 60,
    km: 2.5,
    rating: 4.7,
    title: { tr: 'Yel değirmenlerinde gün batımı', en: 'Sunset at the windmills', el: 'Ηλιοβασίλεμα στους ανεμόμυλους' },
    description: {
      tr: 'Şehir merkezinden tepedeki yel değirmenlerine çıkan, manzarası harika bir yürüyüş.',
      en: 'A walk from the town centre up to the hilltop windmills, with a stunning view.',
      el: 'Περίπατος από το κέντρο ως τους ανεμόμυλους στον λόφο, με υπέροχη θέα.',
    },
    stops: [
      { name: 'Bodrum Merkez', lat: 37.0352, lng: 27.4305 },
      { name: 'Yel Değirmenleri', lat: 37.0391, lng: 27.4167 },
      { name: 'Gümbet Manzara Noktası', lat: 37.0352, lng: 27.41 },
    ],
  },
  {
    id: 'taste',
    category: 'food',
    sharedBy: 'Maria',
    minutes: 120,
    km: 1.8,
    rating: 4.6,
    title: { tr: 'Bodrum lezzet turu', en: 'Bodrum food walk', el: 'Γαστρονομική βόλτα στο Μπόντρουμ' },
    description: {
      tr: 'Balık pazarından çarşıya, yerel tatları deneyebileceğin duraklar.',
      en: 'From the fish market to the bazaar — stops to taste local flavours.',
      el: 'Από την ψαραγορά ως το παζάρι — στάσεις για τοπικές γεύσεις.',
    },
    stops: [
      { name: 'Balık Pazarı', lat: 37.0365, lng: 27.4278 },
      { name: 'Bodrum Çarşı', lat: 37.034, lng: 27.429 },
      { name: 'Barlar Sokağı', lat: 37.0333, lng: 27.432 },
    ],
  },
  {
    id: 'boat',
    category: 'activity',
    sharedBy: 'Can',
    minutes: 150,
    km: 9,
    rating: 4.9,
    title: { tr: 'Gün batımı tekne turu', en: 'Sunset boat tour', el: 'Κρουαζιέρα ηλιοβασιλέματος' },
    description: {
      tr: 'Marinadan kalkıp Karaada kaplıcalarında yüzme molası veren akşam turu.',
      en: 'An evening tour from the marina with a swim stop at the Karaada hot springs.',
      el: 'Βραδινή εκδρομή από τη μαρίνα με στάση για κολύμπι στις ιαματικές πηγές της Καράαντα.',
    },
    stops: [
      { name: 'Marina İskelesi', lat: 37.0347, lng: 27.4256 },
      { name: 'Karaada', lat: 36.9978, lng: 27.4547 },
      { name: 'Karaada Kaplıcaları', lat: 36.9927, lng: 27.4628 },
    ],
  },
  {
    id: 'gumusluk',
    category: 'culture',
    sharedBy: 'Sophie',
    minutes: 180,
    km: 22,
    rating: 4.5,
    title: { tr: 'Myndos Kapısı ve Gümüşlük', en: 'Myndos Gate & Gümüşlük', el: 'Πύλη της Μύνδου & Γκιουμούσλουκ' },
    description: {
      tr: 'Antik Myndos Kapısı\'ndan Gümüşlük\'e, Tavşan Adası manzarasıyla biten bir gün.',
      en: 'From the ancient Myndos Gate to Gümüşlük, ending with a view of Rabbit Island.',
      el: 'Από την αρχαία Πύλη της Μύνδου ως το Γκιουμούσλουκ, με θέα στο Νησί των Κουνελιών.',
    },
    stops: [
      { name: 'Myndos Kapısı', lat: 37.0425, lng: 27.4152 },
      { name: 'Gümüşlük', lat: 37.0544, lng: 27.2318 },
      { name: 'Tavşan Adası', lat: 37.0569, lng: 27.2287 },
    ],
  },
]