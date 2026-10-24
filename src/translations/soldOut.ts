import i18n from '../i18n'

// Personel ekranı (TR / EN)
i18n.addResourceBundle('tr', 'translation', {
  staff: { tabs: { menu: 'Menü durumu' } },
  staffMenu: {
    title: 'Menü durumu',
    subtitle: 'Biten bir ürünü "Tükendi" yap. Misafirlerin menüsünde anında görünür ve sipariş edilemez.',
    available: 'Mevcut',
    sold_out: 'Tükendi',
    count: '{{count}} ürün tükendi',
    all_available: 'Tüm ürünler mevcut',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  staff: { tabs: { menu: 'Menu status' } },
  staffMenu: {
    title: 'Menu status',
    subtitle: 'Mark an item as "Sold out" when it runs out. Guests see it instantly and cannot order it.',
    available: 'Available',
    sold_out: 'Sold out',
    count: '{{count}} items sold out',
    all_available: 'All items available',
  },
}, true, true)

// Misafir ekranı (TR / EN / EL)
i18n.addResourceBundle('tr', 'translation', {
  dining: { sold_out: 'Tükendi', remove: 'Çıkar', sold_out_warning: 'Sepetinde tükenen ürünler var. Sipariş vermek için onları çıkar.' },
}, true, true)
i18n.addResourceBundle('en', 'translation', {
  dining: { sold_out: 'Sold out', remove: 'Remove', sold_out_warning: 'Some items in your cart are sold out. Remove them to place your order.' },
}, true, true)
i18n.addResourceBundle('el', 'translation', {
  dining: { sold_out: 'Εξαντλήθηκε', remove: 'Αφαίρεση', sold_out_warning: 'Κάποια προϊόντα στο καλάθι σου έχουν εξαντληθεί. Αφαίρεσέ τα για να παραγγείλεις.' },
}, true, true)