import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  services: {
    title: 'Hizmetler',
    subtitle: 'Ne istersen bir dokunuşla',
    types: {
      cleaning: { title: 'Oda temizliği', desc: 'Uygun saati seç' },
      transfer: { title: 'Transfer', desc: 'Havalimanı, Pire Limanı, şehir içi' },
      table: { title: 'Masa talebi', desc: 'Restoran ya da Akropolis manzaralı teras' },
      towels: { title: 'Havlu & malzeme', desc: 'Havlu, yastık, battaniye, banyo seti' },
    },
    my_requests: 'Taleplerim',
    no_requests: 'Henüz bir talebin yok',
    status: { pending: 'Bekliyor', in_progress: 'İşlemde', done: 'Tamamlandı' },
    form: {
      when: 'Ne zaman?', now: 'Hemen',
      where: 'Nereye?', venue: 'Nerede?', items: 'Ne getirelim?',
      price_note: 'Transfer ücreti resepsiyon tarafından onaylanır.',
      date: 'Tarih', time: 'Saat', people: 'Kişi sayısı', quantity: 'Kaç adet?',
      note: 'Not (isteğe bağlı)', send: 'Talebi gönder', sent: 'Talebin iletildi!', back: 'Geri',
    },
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  services: {
    title: 'Services',
    subtitle: 'Anything you need, one tap away',
    types: {
      cleaning: { title: 'Room cleaning', desc: 'Choose a convenient time' },
      transfer: { title: 'Transfer', desc: 'Airport, Piraeus port or city' },
      table: { title: 'Table request', desc: 'Restaurant or the Acropolis-view rooftop' },
      towels: { title: 'Towels & amenities', desc: 'Towels, pillows, blankets, toiletries' },
    },
    my_requests: 'My requests',
    no_requests: 'No requests yet',
    status: { pending: 'Pending', in_progress: 'In progress', done: 'Done' },
    form: {
      when: 'When?', now: 'Right now',
      where: 'Where to?', venue: 'Where?', items: 'What should we bring?',
      price_note: 'The transfer fee is confirmed by reception.',
      date: 'Date', time: 'Time', people: 'Number of people', quantity: 'How many?',
      note: 'Note (optional)', send: 'Send request', sent: 'Your request has been sent!', back: 'Back',
    },
  },
}, true, true)

i18n.addResourceBundle('el', 'translation', {
  services: {
    title: 'Υπηρεσίες',
    subtitle: 'Ό,τι χρειάζεσαι, με ένα άγγιγμα',
    types: {
      cleaning: { title: 'Καθαρισμός δωματίου', desc: 'Διάλεξε την ώρα που σε βολεύει' },
      transfer: { title: 'Μεταφορά', desc: 'Αεροδρόμιο, λιμάνι Πειραιά ή πόλη' },
      table: { title: 'Αίτημα τραπεζιού', desc: 'Εστιατόριο ή ταράτσα με θέα την Ακρόπολη' },
      towels: { title: 'Πετσέτες & είδη', desc: 'Πετσέτες, μαξιλάρια, κουβέρτες, είδη μπάνιου' },
    },
    my_requests: 'Τα αιτήματά μου',
    no_requests: 'Δεν έχεις αιτήματα ακόμα',
    status: { pending: 'Σε αναμονή', in_progress: 'Σε εξέλιξη', done: 'Ολοκληρώθηκε' },
    form: {
      when: 'Πότε;', now: 'Τώρα',
      where: 'Πού;', venue: 'Πού;', items: 'Τι να σας φέρουμε;',
      price_note: 'Η τιμή της μεταφοράς επιβεβαιώνεται από τη ρεσεψιόν.',
      date: 'Ημερομηνία', time: 'Ώρα', people: 'Αριθμός ατόμων', quantity: 'Πόσα;',
      note: 'Σημείωση (προαιρετικό)', send: 'Αποστολή αιτήματος', sent: 'Το αίτημά σου στάλθηκε!', back: 'Πίσω',
    },
  },
}, true, true)