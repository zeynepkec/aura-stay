import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  services: {
    title: 'Hizmetler',
    subtitle: 'Ne istersen bir dokunuşla',
    types: {
      cleaning: { title: 'Oda temizliği', desc: 'Uygun saati seç' },
      transfer: { title: 'Transfer', desc: 'Havalimanı ve şehir içi' },
      table: { title: 'Masa talebi', desc: 'Restoranda yer ayırt' },
      towels: { title: 'Ekstra havlu', desc: 'Odana getirilsin' },
    },
    my_requests: 'Taleplerim',
    no_requests: 'Henüz bir talebin yok',
    status: { pending: 'Bekliyor', in_progress: 'İşlemde', done: 'Tamamlandı' },
    form: {
      when: 'Ne zaman?', now: 'Hemen',
      where: 'Nereye?', airport: 'Havalimanı', center: 'Şehir merkezi', marina: 'Marina',
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
      transfer: { title: 'Transfer', desc: 'Airport and city rides' },
      table: { title: 'Table request', desc: 'Reserve at the restaurant' },
      towels: { title: 'Extra towels', desc: 'Delivered to your room' },
    },
    my_requests: 'My requests',
    no_requests: 'No requests yet',
    status: { pending: 'Pending', in_progress: 'In progress', done: 'Done' },
    form: {
      when: 'When?', now: 'Right now',
      where: 'Where to?', airport: 'Airport', center: 'City centre', marina: 'Marina',
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
      transfer: { title: 'Μεταφορά', desc: 'Αεροδρόμιο και πόλη' },
      table: { title: 'Αίτημα τραπεζιού', desc: 'Κράτηση στο εστιατόριο' },
      towels: { title: 'Επιπλέον πετσέτες', desc: 'Στο δωμάτιό σου' },
    },
    my_requests: 'Τα αιτήματά μου',
    no_requests: 'Δεν έχεις αιτήματα ακόμα',
    status: { pending: 'Σε αναμονή', in_progress: 'Σε εξέλιξη', done: 'Ολοκληρώθηκε' },
    form: {
      when: 'Πότε;', now: 'Τώρα',
      where: 'Πού;', airport: 'Αεροδρόμιο', center: 'Κέντρο πόλης', marina: 'Μαρίνα',
      date: 'Ημερομηνία', time: 'Ώρα', people: 'Αριθμός ατόμων', quantity: 'Πόσες;',
      note: 'Σημείωση (προαιρετικό)', send: 'Αποστολή αιτήματος', sent: 'Το αίτημά σου στάλθηκε!', back: 'Πίσω',
    },
  },
}, true, true)