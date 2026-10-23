import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  tasks: {
    title: 'Görevler',
    subtitle: 'Misafir talepleri geliş sırasına göre. Durumu güncellediğinde misafir de anında görür.',
    columns: { pending: 'Bekleyen', in_progress: 'İşlemde', done: 'Tamamlanan' },
    actions: { pending: 'İşe başla', in_progress: 'Tamamlandı' },
    all: 'Tümü',
    empty: 'Görev yok',
    room: 'Oda {{number}}',
    quantity: '{{count}} adet',
    people: '{{count}} kişi',
    just_now: 'Az önce',
    minutes_ago: '{{count}} dk önce',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  tasks: {
    title: 'Tasks',
    subtitle: 'Guest requests in arrival order. When you update a status, the guest sees it instantly.',
    columns: { pending: 'Pending', in_progress: 'In progress', done: 'Done' },
    actions: { pending: 'Start task', in_progress: 'Mark done' },
    all: 'All',
    empty: 'No tasks',
    room: 'Room {{number}}',
    quantity: '{{count}} pcs',
    people: '{{count}} people',
    just_now: 'Just now',
    minutes_ago: '{{count}} min ago',
  },
}, true, true)