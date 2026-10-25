import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  join: {
    welcome_title: "AURA Stay'e hoş geldin",
    welcome_text: 'Otelindeki dijital konsiyerjin. Başlamak için odana giriş yap.',
    steps: ['Odandaki QR kodu bul', 'Telefonunun kamerasıyla okut', 'Uygulama odana özel açılır'],
    demo: 'Demo: Oda 302 ile giriş yap',
    success_title: 'Hoş geldin!',
    success_text: 'Oda {{room}} · {{hotel}}',
    connecting: 'Odana bağlanıyorsun…',
    invalid_title: 'QR kod geçersiz',
    invalid_text: 'Lütfen odandaki QR kodu tekrar okut ya da resepsiyona başvur.',
    back: 'Geri dön',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  join: {
    welcome_title: 'Welcome to AURA Stay',
    welcome_text: 'Your digital concierge at the hotel. Sign in to your room to get started.',
    steps: ['Find the QR code in your room', 'Scan it with your phone camera', 'The app opens for your room'],
    demo: 'Demo: sign in as Room 302',
    success_title: 'Welcome!',
    success_text: 'Room {{room}} · {{hotel}}',
    connecting: 'Connecting to your room…',
    invalid_title: 'Invalid QR code',
    invalid_text: 'Please scan the QR code in your room again or contact reception.',
    back: 'Go back',
  },
}, true, true)

i18n.addResourceBundle('el', 'translation', {
  join: {
    welcome_title: 'Καλώς ήρθες στο AURA Stay',
    welcome_text: 'Ο ψηφιακός σου concierge στο ξενοδοχείο. Συνδέσου στο δωμάτιό σου για να ξεκινήσεις.',
    steps: ['Βρες τον κωδικό QR στο δωμάτιό σου', 'Σκάναρέ τον με την κάμερα του κινητού', 'Η εφαρμογή ανοίγει για το δωμάτιό σου'],
    demo: 'Demo: σύνδεση ως Δωμάτιο 302',
    success_title: 'Καλώς ήρθες!',
    success_text: 'Δωμάτιο {{room}} · {{hotel}}',
    connecting: 'Σύνδεση με το δωμάτιό σου…',
    invalid_title: 'Μη έγκυρος κωδικός QR',
    invalid_text: 'Σκάναρε ξανά τον κωδικό QR του δωματίου σου ή επικοινώνησε με τη ρεσεψιόν.',
    back: 'Επιστροφή',
  },
}, true, true)