import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  orders: {
    place_order: 'Siparişi onayla',
    title: 'Sipariş #{{id}}',
    placed: 'Siparişin alındı!',
    ordered_at: 'Sipariş saati {{time}}',
    eta: 'Tahmini teslim: ~30 dk',
    content: 'Sipariş içeriği',
    note: 'Not',
    added_to_bill: 'Oda hesabına eklendi',
    back_to_menu: 'Menüye dön',
    not_found: 'Sipariş bulunamadı',
    status: { received: 'Alındı', preparing: 'Hazırlanıyor', on_the_way: 'Yolda', delivered: 'Teslim edildi' },
    status_desc: {
      received: 'Mutfak siparişini aldı.',
      preparing: 'Şefimiz siparişini hazırlıyor.',
      on_the_way: 'Siparişin odana getiriliyor.',
      delivered: 'Afiyet olsun!',
    },
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  orders: {
    place_order: 'Confirm order',
    title: 'Order #{{id}}',
    placed: 'Your order is in!',
    ordered_at: 'Ordered at {{time}}',
    eta: 'Estimated delivery: ~30 min',
    content: 'Order details',
    note: 'Note',
    added_to_bill: 'Added to room bill',
    back_to_menu: 'Back to menu',
    not_found: 'Order not found',
    status: { received: 'Received', preparing: 'Preparing', on_the_way: 'On the way', delivered: 'Delivered' },
    status_desc: {
      received: 'The kitchen has your order.',
      preparing: 'Our chef is preparing your order.',
      on_the_way: 'Your order is on its way to your room.',
      delivered: 'Enjoy your meal!',
    },
  },
}, true, true)

i18n.addResourceBundle('el', 'translation', {
  orders: {
    place_order: 'Επιβεβαίωση παραγγελίας',
    title: 'Παραγγελία #{{id}}',
    placed: 'Η παραγγελία σου ελήφθη!',
    ordered_at: 'Ώρα παραγγελίας {{time}}',
    eta: 'Εκτιμώμενη παράδοση: ~30 λεπ.',
    content: 'Περιεχόμενο παραγγελίας',
    note: 'Σημείωση',
    added_to_bill: 'Προστέθηκε στον λογαριασμό',
    back_to_menu: 'Πίσω στο μενού',
    not_found: 'Η παραγγελία δεν βρέθηκε',
    status: { received: 'Ελήφθη', preparing: 'Ετοιμάζεται', on_the_way: "Καθ' οδόν", delivered: 'Παραδόθηκε' },
    status_desc: {
      received: 'Η κουζίνα έλαβε την παραγγελία σου.',
      preparing: 'Ο σεφ μας ετοιμάζει την παραγγελία σου.',
      on_the_way: 'Η παραγγελία σου έρχεται στο δωμάτιο.',
      delivered: 'Καλή όρεξη!',
    },
  },
}, true, true)