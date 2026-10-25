import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  sync: {
    live: 'Canlı', connecting: 'Bağlanıyor…', local: 'Yerel mod', error: 'Bağlantı hatası',
    hint: {
      live: 'Veritabanına bağlı: tüm cihazlar aynı verileri görüyor',
      connecting: 'Veritabanına bağlanılıyor',
      local: 'Veritabanı ayarlı değil: veriler sadece bu tarayıcıda',
      error: 'Veritabanına ulaşılamadı: veriler sadece bu tarayıcıda',
    },
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  sync: {
    live: 'Live', connecting: 'Connecting…', local: 'Local mode', error: 'Connection error',
    hint: {
      live: 'Connected to the database: all devices see the same data',
      connecting: 'Connecting to the database',
      local: 'No database configured: data stays in this browser',
      error: 'Database unreachable: data stays in this browser',
    },
  },
}, true, true)

i18n.addResourceBundle('el', 'translation', {
  sync: {
    live: 'Ζωντανά', connecting: 'Σύνδεση…', local: 'Τοπικά', error: 'Σφάλμα σύνδεσης',
    hint: {
      live: 'Συνδεδεμένο με τη βάση δεδομένων',
      connecting: 'Σύνδεση με τη βάση δεδομένων',
      local: 'Χωρίς βάση δεδομένων: τα δεδομένα μένουν σε αυτόν τον browser',
      error: 'Η βάση δεδομένων δεν είναι διαθέσιμη',
    },
  },
}, true, true)
