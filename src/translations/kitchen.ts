import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  kitchen: {
    title: 'Mutfak siparişleri',
    subtitle: 'Siparişler geliş sırasına göre. Durumu güncellediğinde misafirin ekranı da değişir.',
    columns: { received: 'Yeni', preparing: 'Hazırlanıyor', on_the_way: 'Yolda' },
    actions: { received: 'Hazırlamaya başla', preparing: 'Yola çıkar', on_the_way: 'Teslim edildi' },
    empty: 'Sipariş yok',
    just_now: 'Az önce',
    minutes_ago: '{{count}} dk önce',
    room: 'Oda {{number}}',
    delivered: 'Son teslim edilenler',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  kitchen: {
    title: 'Kitchen orders',
    subtitle: 'Orders in arrival order. When you update a status, the guest sees it instantly.',
    columns: { received: 'New', preparing: 'Preparing', on_the_way: 'On the way' },
    actions: { received: 'Start preparing', preparing: 'Send out', on_the_way: 'Mark delivered' },
    empty: 'No orders',
    just_now: 'Just now',
    minutes_ago: '{{count}} min ago',
    room: 'Room {{number}}',
    delivered: 'Recently delivered',
  },
}, true, true)