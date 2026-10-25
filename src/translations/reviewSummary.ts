import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  reviewSummary: {
    title: 'AI Yorum Özeti',
    note: 'Misafir yorumlarından otomatik özetlendi',
    praise: 'Misafirler en çok {{list}} konusunu övüyor.',
    complain: 'Geliştirilebilecek alan: {{list}}.',
    and: 've',
    count: '{{count}} yorum',
    guests_say: 'Misafirler ne diyor?',
    sample: 'Örnek yorum',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  reviewSummary: {
    title: 'AI Review Summary',
    note: 'Automatically summarised from guest reviews',
    praise: 'Guests praise the {{list}} the most.',
    complain: 'Room for improvement: {{list}}.',
    and: 'and',
    count: '{{count}} reviews',
    guests_say: 'What guests say',
    sample: 'Sample review',
  },
}, true, true)

i18n.addResourceBundle('el', 'translation', {
  reviewSummary: {
    title: 'Σύνοψη Κριτικών AI',
    note: 'Αυτόματη σύνοψη από κριτικές επισκεπτών',
    praise: 'Οι επισκέπτες επαινούν κυρίως: {{list}}.',
    complain: 'Προς βελτίωση: {{list}}.',
    and: 'και',
    count: '{{count}} κριτικές',
    guests_say: 'Τι λένε οι επισκέπτες',
    sample: 'Δείγμα κριτικής',
  },
}, true, true)
