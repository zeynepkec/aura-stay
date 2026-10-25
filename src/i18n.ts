import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  tr: {
    translation: {
      nav: { home: 'Odam', dining: 'Yemek', assistant: 'Konsiyerj', explore: 'Keşfet', services: 'Hizmetler' },
      home: {
        welcome: 'Hoş geldin,',
        room: 'Oda {{number}}',
        campaign_tag: 'Özel kampanya',
        campaign_title: 'Gün batımı teknesi %20 indirimli',
        campaign_text: 'Sadece bu hafta, otel misafirlerine özel.',
        quick_actions: 'Hızlı işlemler',
        action_food: 'Yemek sipariş et',
        action_cleaning: 'Temizlik iste',
        action_table: 'Masa ayırt',
        action_assistant: 'Asistana sor',
        today_near: 'Bugün yakınında',
        see_all: 'Tümü',
        min: '{{count}} dk',
        km: '{{count}} km',
        my_stay: 'Konaklamam',
        my_stay_text: 'Oda hesabı, değerlendirme ve anı kartın',
      },
    },
  },
  en: {
    translation: {
      nav: { home: 'My room', dining: 'Dining', assistant: 'Concierge', explore: 'Explore', services: 'Services' },
      home: {
        welcome: 'Welcome,',
        room: 'Room {{number}}',
        campaign_tag: 'Special offer',
        campaign_title: '20% off the sunset boat tour',
        campaign_text: 'This week only, for hotel guests.',
        quick_actions: 'Quick actions',
        action_food: 'Order food',
        action_cleaning: 'Request cleaning',
        action_table: 'Book a table',
        action_assistant: 'Ask assistant',
        today_near: 'Today near you',
        see_all: 'See all',
        min: '{{count}} min',
        km: '{{count}} km',
        my_stay: 'My stay',
        my_stay_text: 'Room bill, review and your memory card',
      },
    },
  },
  el: {
    translation: {
      nav: { home: 'Δωμάτιο', dining: 'Φαγητό', assistant: 'Κονσιέρζ', explore: 'Βόλτες', services: 'Υπηρεσίες' },
      home: {
        welcome: 'Καλώς ήρθες,',
        room: 'Δωμάτιο {{number}}',
        campaign_tag: 'Ειδική προσφορά',
        campaign_title: '20% έκπτωση στην κρουαζιέρα ηλιοβασιλέματος',
        campaign_text: 'Μόνο αυτή την εβδομάδα, για επισκέπτες του ξενοδοχείου.',
        quick_actions: 'Γρήγορες ενέργειες',
        action_food: 'Παραγγελία φαγητού',
        action_cleaning: 'Αίτημα καθαρισμού',
        action_table: 'Κράτηση τραπεζιού',
        action_assistant: 'Ρώτα τον βοηθό',
        today_near: 'Σήμερα κοντά σου',
        see_all: 'Όλα',
        min: '{{count}} λεπ.',
        km: '{{count}} χλμ.',
        my_stay: 'Η διαμονή μου',
        my_stay_text: 'Λογαριασμός δωματίου, αξιολόγηση και κάρτα αναμνήσεων',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['tr', 'en', 'el'],
    nonExplicitSupportedLngs: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], lookupLocalStorage: 'aura-lang', caches: ['localStorage'] },
  })

export default i18n