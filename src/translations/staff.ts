import i18n from '../i18n'

// Personel paneli: Türkçe ve İngilizce (Yunanca seçilirse İngilizce görünür)
i18n.addResourceBundle('tr', 'translation', {
  staff: {
    title: 'Personel paneli',
    login_title: 'Personel girişi',
    login_text: '4 haneli PIN kodunu gir.',
    wrong_pin: 'PIN hatalı, tekrar dene.',
    back_to_start: 'Giriş ekranına dön',
    qr_codes: 'Oda QR kodları',
    delete: 'Sil',
    logout: 'Çıkış',
    soon: 'Bu ekran bir sonraki adımda gelecek.',
    roles: { kitchen: 'Mutfak', housekeeping: 'Kat hizmetleri', reception: 'Resepsiyon' },
    tabs: { kitchen: 'Mutfak siparişleri', tasks: 'Görevler', tables: 'Masa talepleri', bills: 'Oda hesapları', feedback: 'Geri bildirimler' },
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  staff: {
    title: 'Staff panel',
    login_title: 'Staff sign-in',
    login_text: 'Enter your 4-digit PIN.',
    wrong_pin: 'Wrong PIN, please try again.',
    back_to_start: 'Back to start',
    qr_codes: 'Room QR codes',
    delete: 'Delete',
    logout: 'Sign out',
    soon: 'This screen is coming in the next step.',
    roles: { kitchen: 'Kitchen', housekeeping: 'Housekeeping', reception: 'Reception' },
    tabs: { kitchen: 'Kitchen orders', tasks: 'Tasks', tables: 'Table requests', bills: 'Room bills', feedback: 'Guest feedback' },
  },
}, true, true)