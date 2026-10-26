import i18n from '../i18n'

// Personel paneli: Türkçe ve İngilizce (Yunanca seçilirse İngilizce görünür)
i18n.addResourceBundle('tr', 'translation', {
  staff: {
    title: 'Personel paneli',
    login_title: 'Personel girişi',
    login_text: '4 haneli PIN kodunu gir.',
    wrong_pin: 'PIN hatalı, tekrar dene.',
    demo_pins: 'Demo PIN: Mutfak {{kitchen}} · Kat hizmetleri {{housekeeping}} · Resepsiyon {{reception}}',
    back_to_start: 'Giriş ekranına dön',
    change_hotel: 'Otel değiştir',
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
    demo_pins: 'Demo PIN: Kitchen {{kitchen}} · Housekeeping {{housekeeping}} · Reception {{reception}}',
    back_to_start: 'Back to start',
    change_hotel: 'Change hotel',
    qr_codes: 'Room QR codes',
    delete: 'Delete',
    logout: 'Sign out',
    soon: 'This screen is coming in the next step.',
    roles: { kitchen: 'Kitchen', housekeeping: 'Housekeeping', reception: 'Reception' },
    tabs: { kitchen: 'Kitchen orders', tasks: 'Tasks', tables: 'Table requests', bills: 'Room bills', feedback: 'Guest feedback' },
  },
}, true, true)