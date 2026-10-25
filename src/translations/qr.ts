import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  qr: {
    title: 'Oda QR kodları',
    subtitle: 'Yazdırıp her odaya koyun. Misafir okutunca uygulama o odaya özel açılır.',
    print: 'Yazdır',
    room: 'Oda {{number}}',
    staff_link: 'Oda QR kodlarını göster',
    logout: 'Odadan çıkış yap',
    logout_confirm: 'Çıkış yaparsan bu odaya ait siparişler ve talepler bu cihazdan silinir. Emin misin?',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  qr: {
    title: 'Room QR codes',
    subtitle: 'Print and place one in each room. When a guest scans it, the app opens for that room.',
    print: 'Print',
    room: 'Room {{number}}',
    staff_link: 'Show room QR codes',
    logout: 'Check out of room',
    logout_confirm: 'If you check out, orders and requests for this room will be removed from this device. Are you sure?',
  },
}, true, true)

i18n.addResourceBundle('el', 'translation', {
  qr: {
    title: 'Κωδικοί QR δωματίων',
    subtitle: 'Τυπώστε και τοποθετήστε έναν σε κάθε δωμάτιο. Όταν ο επισκέπτης τον σκανάρει, η εφαρμογή ανοίγει για εκείνο το δωμάτιο.',
    print: 'Εκτύπωση',
    room: 'Δωμάτιο {{number}}',
    staff_link: 'Εμφάνιση κωδικών QR δωματίων',
    logout: 'Αποσύνδεση από το δωμάτιο',
    logout_confirm: 'Αν αποσυνδεθείς, οι παραγγελίες και τα αιτήματα αυτού του δωματίου θα διαγραφούν από αυτή τη συσκευή. Είσαι σίγουρος;',
  },
}, true, true)
// Giriş kodu ve oda kartına (NFC) yazma
i18n.addResourceBundle('tr', 'translation', {
  qr: {
    code: 'Giriş kodu: {{code}}',
    write_card: 'Karta yaz',
    write_waiting: 'Kartı yaklaştır…',
    write_done: 'Yazıldı',
    write_error: 'Yazılamadı',
    nfc_hint: 'Android telefonda Chrome ile, boş bir NFC oda kartına "Karta yaz" diyerek o odanın girişini yazabilirsin.',
  },
}, true, true)
i18n.addResourceBundle('en', 'translation', {
  qr: {
    code: 'Sign-in code: {{code}}',
    write_card: 'Write card',
    write_waiting: 'Hold the card…',
    write_done: 'Written',
    write_error: 'Failed',
    nfc_hint: 'On an Android phone with Chrome, tap "Write card" to put that room’s sign-in on a blank NFC room card.',
  },
}, true, true)
i18n.addResourceBundle('el', 'translation', {
  qr: {
    code: 'Κωδικός: {{code}}',
    write_card: 'Εγγραφή κάρτας',
    write_waiting: 'Ακούμπησε την κάρτα…',
    write_done: 'Έγινε',
    write_error: 'Απέτυχε',
    nfc_hint: 'Σε Android με Chrome, πάτησε «Εγγραφή κάρτας» για να γράψεις τη σύνδεση του δωματίου σε κενή κάρτα NFC.',
  },
}, true, true)
