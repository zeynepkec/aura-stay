import i18n from '../i18n'

// Hermis menüsüyle gelen yeni etiketler, alerjenler ve diyet filtresi
i18n.addResourceBundle('tr', 'translation', {
  dining: {
    tags: { chef: 'Şefin önerisi', spicy: 'Acılı' },
    allergens: 'Alerjen',
    filters: { all: 'Tümü', vegan: 'Vegan', vegetarian: 'Vejetaryen', gluten_free: 'Glutensiz' },
    no_match: 'Bu filtreye uyan ürün yok',
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  dining: {
    tags: { chef: "Chef's pick", spicy: 'Spicy' },
    allergens: 'Allergens',
    filters: { all: 'All', vegan: 'Vegan', vegetarian: 'Vegetarian', gluten_free: 'Gluten-free' },
    no_match: 'No items match this filter',
  },
}, true, true)

i18n.addResourceBundle('el', 'translation', {
  dining: {
    tags: { chef: 'Πρόταση σεφ', spicy: 'Πικάντικο' },
    allergens: 'Αλλεργιογόνα',
    filters: { all: 'Όλα', vegan: 'Vegan', vegetarian: 'Χορτοφαγικά', gluten_free: 'Χωρίς γλουτένη' },
    no_match: 'Κανένα πιάτο δεν ταιριάζει',
  },
}, true, true)
