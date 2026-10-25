import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  staff: { tabs: { demo: 'Demo' } },
  demo: {
    title: 'Demo araçları',
    subtitle: 'Sunum için örnek verileri yükle ya da her şeyi sıfırlayıp temiz başla. Sadece bu cihazı etkiler.',
    load_title: 'Örnek verileri yükle',
    load_text: '4 sipariş, 5 hizmet ve masa talebi, 2 geri bildirim, 2 değerlendirme ve 1 tükenmiş ürün ekler. Mevcut verilerin yerini alır.',
    load: 'Örnek verileri yükle',
    reset_title: 'Her şeyi sıfırla',
    reset_text: 'Tüm siparişleri, talepleri, geri bildirimleri, hesapları ve menü durumunu siler.',
    reset: 'Her şeyi sıfırla',
    reset_confirm: 'Tüm veriler silinecek. Emin misin?',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  staff: { tabs: { demo: 'Demo' } },
  demo: {
    title: 'Demo tools',
    subtitle: 'Load sample data for a presentation or reset everything to start clean. Affects this device only.',
    load_title: 'Load sample data',
    load_text: 'Adds 4 orders, 5 service and table requests, 2 feedback messages, 2 reviews and 1 sold-out item. Replaces current data.',
    load: 'Load sample data',
    reset_title: 'Reset everything',
    reset_text: 'Deletes all orders, requests, feedback, bills and menu status.',
    reset: 'Reset everything',
    reset_confirm: 'All data will be deleted. Are you sure?',
  },
}, true, true)