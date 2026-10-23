import i18n from '../i18n'

// Personel ekranı (TR / EN)
i18n.addResourceBundle('tr', 'translation', {
  tables: {
    title: 'Masa talepleri',
    subtitle: 'Misafirlerin restoran rezervasyon talepleri. Onayladığında ya da reddettiğinde misafir anında görür.',
    views: { pending: 'Bekleyen', confirmed: 'Onaylanan', declined: 'Reddedilen' },
    stats: { pending: 'Onay bekleyen', today: 'Bugünkü rezervasyon', guests: 'Bugün gelecek kişi' },
    confirm: 'Onayla',
    decline: 'Reddet',
    undo: 'Geri al',
    today: 'Bugün',
    room: 'Oda {{number}}',
    people: '{{count}} kişi',
    empty: 'Bu listede talep yok',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  tables: {
    title: 'Table requests',
    subtitle: 'Restaurant reservation requests from guests. When you confirm or decline, the guest sees it instantly.',
    views: { pending: 'Pending', confirmed: 'Confirmed', declined: 'Declined' },
    stats: { pending: 'Awaiting approval', today: "Today's reservations", guests: 'Guests today' },
    confirm: 'Confirm',
    decline: 'Decline',
    undo: 'Undo',
    today: 'Today',
    room: 'Room {{number}}',
    people: '{{count}} people',
    empty: 'No requests in this list',
  },
}, true, true)

// Misafirin "Taleplerim" listesi için yeni durumlar (TR / EN / EL)
i18n.addResourceBundle('tr', 'translation', { services: { status: { confirmed: 'Onaylandı', declined: 'Reddedildi' } } }, true, true)
i18n.addResourceBundle('en', 'translation', { services: { status: { confirmed: 'Confirmed', declined: 'Declined' } } }, true, true)
i18n.addResourceBundle('el', 'translation', { services: { status: { confirmed: 'Επιβεβαιώθηκε', declined: 'Απορρίφθηκε' } } }, true, true)