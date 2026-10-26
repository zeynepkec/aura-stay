// Pera Lale Otel — Beyoğlu, İstanbul
// DEMO otel: isim ve bilgiler hayalidir, sunumda çoklu otel / ülke özelliğini göstermek için.
// Konumlar yaklaşık, süreler tahminidir; sunumdan önce kontrol edin.
import type { HotelProfile } from './types'

export const pera: HotelProfile = {
  id: 'pera',
  name: 'Pera Lale Otel',
  country: 'tr',
  city: { tr: 'İstanbul', en: 'Istanbul', el: 'Κωνσταντινούπολη' },
  area: { tr: 'Beyoğlu, İstanbul', en: 'Beyoğlu, Istanbul', el: 'Μπέγιογλου, Κωνσταντινούπολη' },
  currency: 'TRY',
  location: { lat: 41.0284, lng: 28.9747 },
  rooms: {
    '101': 'p4a7', '102': 'e8l2', '103': 'r3a9', '104': 'l6e1', '105': 'a2l5',
    '201': 'g7t3', '202': 'k1m8', '203': 's5b4', '204': 'f9d2', '205': 'u3c6',
    '301': 'j8h1', '302': 'x2w7', '303': 'o6q3', '304': 'i4n9', '305': 'y7v2',
  },
  // Personel PIN kodları (yalnızca bu otelde geçerli)
  staffPins: { '4141': 'kitchen', '5252': 'housekeeping', '6363': 'reception' },
  checkIn: '14:00',
  checkOut: '12:00',
  breakfast: '07:00 – 10:30',
  restaurant: '12:00 – 23:30',
  roomService: '07:00 – 00:00',
  rooftop: '17:00 – 01:00',
  wifi: { name: 'PeraLale-Guest', password: 'istanbul2026' },
  reception: { tr: '7/24 açık · Odadan 0’ı tuşlayın', en: 'Open 24/7 · Dial 0 from your room', el: 'Ανοιχτή 24/7 · Καλέστε 0' },
  serviceDesc: {
    transfer: { tr: 'İstanbul Havalimanı, Sabiha Gökçen, şehir içi', en: 'Istanbul Airport, Sabiha Gökçen or city', el: 'Αεροδρόμιο Κωνσταντινούπολης, Σαμπίχα Γκιοκτσέν ή πόλη' },
    table: { tr: 'Restoran ya da Haliç manzaralı teras', en: 'Restaurant or the Golden Horn-view rooftop', el: 'Εστιατόριο ή ταράτσα με θέα τον Κεράτιο' },
  },
  memory: {
    title: { tr: "İstanbul'dan anılar", en: 'Memories from Istanbul', el: 'Αναμνήσεις από την Κωνσταντινούπολη' },
    quote: { tr: 'Galata’da gün batımı, vapurda çay… Yine görüşmek üzere!', en: 'Sunset at Galata, tea on the ferry… See you again!', el: 'Ηλιοβασίλεμα στον Γαλατά, τσάι στο πλοίο… Τα ξαναλέμε!' },
  },
  faq: [
    {
      id: 'wifi',
      keywords: ['wifi', 'wi-fi', 'wi fi', 'internet', 'sifre', 'şifre', 'password', 'κωδικο', 'ιντερνετ'],
      answer: { tr: 'Wi-Fi ağı: PeraLale-Guest · Şifre: istanbul2026', en: 'Wi-Fi network: PeraLale-Guest · Password: istanbul2026', el: 'Δίκτυο Wi-Fi: PeraLale-Guest · Κωδικός: istanbul2026' },
    },
    {
      id: 'breakfast',
      keywords: ['kahvalti saat', 'kahvaltı saat', 'kahvalti ne zaman', 'breakfast time', 'breakfast hours', 'when is breakfast', 'πρωινο ωρα', 'τι ωρα πρωινο'],
      answer: { tr: 'Kahvaltı her gün 07:00 – 10:30 arası restoranımızda, serpme olarak servis edilir.', en: 'Breakfast is served daily 07:00 – 10:30 in our restaurant, Turkish style.', el: 'Το πρωινό σερβίρεται καθημερινά 07:00 – 10:30, τουρκικού τύπου.' },
    },
    {
      id: 'checkout',
      keywords: ['check out', 'checkout', 'cikis saat', 'çıkış saat', 'gec cikis', 'geç çıkış', 'late checkout', 'αναχωρηση'],
      answer: { tr: 'Check-out saati 12:00. Geç çıkış müsaitliğe bağlıdır; isterseniz resepsiyona talep iletebilirim.', en: 'Check-out is at 12:00. Late check-out depends on availability; I can forward a request to reception.', el: 'Η αναχώρηση είναι στις 12:00. Η καθυστερημένη αναχώρηση εξαρτάται από τη διαθεσιμότητα.' },
    },
    {
      id: 'checkin',
      keywords: ['check in', 'checkin', 'giris saat', 'giriş saat', 'αφιξη'],
      answer: { tr: 'Check-in saati 14:00.', en: 'Check-in is from 14:00.', el: 'Η άφιξη είναι από τις 14:00.' },
    },
    {
      id: 'rooftop',
      keywords: ['teras', 'rooftop', 'roof', 'bar', 'ταρατσα', 'μπαρ'],
      answer: { tr: 'Terasımız 17:00 – 01:00 arası açık ve Haliç manzaralı. Masa ayırtmak ister misiniz?', en: 'Our rooftop is open 17:00 – 01:00 with a Golden Horn view. Would you like to book a table?', el: 'Η ταράτσα μας είναι ανοιχτή 17:00 – 01:00 με θέα τον Κεράτιο.' },
    },
    {
      id: 'luggage',
      keywords: ['bavul', 'valiz', 'esya', 'eşya', 'luggage', 'bags', 'αποσκευ', 'βαλιτσ'],
      answer: { tr: 'Check-out sonrası bavullarınızı resepsiyonda ücretsiz saklayabiliriz.', en: 'We can store your luggage at reception free of charge after check-out.', el: 'Φυλάσσουμε δωρεάν τις αποσκευές σας στη ρεσεψιόν.' },
    },
    {
      id: 'ferry',
      keywords: ['vapur', 'ferry', 'istanbulkart', 'ulasim', 'ulaşım', 'metro', 'tram', 'πλοιο', 'μετρο'],
      answer: { tr: 'Karaköy iskelesi 10 dakika yürüme mesafesinde. Vapur, metro ve tramvay için resepsiyondan İstanbulkart alabilirsiniz.', en: 'Karaköy ferry pier is a 10-minute walk. You can get an Istanbulkart for ferry, metro and tram at reception.', el: 'Η αποβάθρα του Καράκιοϊ απέχει 10 λεπτά με τα πόδια. Istanbulkart διαθέσιμη στη ρεσεψιόν.' },
    },
  ],
  // Sıra önemli: "Sabiha Gökçen havalimanı" önce Sabiha Gökçen olarak tanınsın
  transferDestinations: [
    { id: 'saw', name: { tr: 'Sabiha Gökçen Havalimanı', en: 'Sabiha Gökçen Airport', el: 'Αεροδρόμιο Σαμπίχα Γκιοκτσέν' } },
    { id: 'airport', name: { tr: 'İstanbul Havalimanı', en: 'Istanbul Airport', el: 'Αεροδρόμιο Κωνσταντινούπολης' } },
    { id: 'city', name: { tr: 'Şehir içi', en: 'City', el: 'Εντός πόλης' } },
  ],
  destinationWords: {
    saw: ['sabiha', 'gokcen', 'anadolu yakasi', 'asian side', 'σαμπιχα'],
    airport: ['havalimani', 'havaalani', 'airport', 'ucak', 'ist', 'αεροδρομ'],
    city: ['sehir', 'city', 'merkez', 'center', 'centre', 'πολη', 'κεντρο'],
  },
  tableVenues: [
    { id: 'restaurant', name: { tr: 'Restoran', en: 'Restaurant', el: 'Εστιατόριο' } },
    { id: 'rooftop', name: { tr: 'Teras', en: 'Rooftop', el: 'Ταράτσα' } },
  ],
  campaign: {
    title: { tr: 'Terasta Haliç Akşamı', en: 'Golden Horn Evenings', el: 'Βράδια στον Κεράτιο' },
    description: { tr: 'Her akşam 18:00 – 20:00 arası terasta Türk kahvesi ve lokum bizden.', en: 'Every evening 18:00 – 20:00, Turkish coffee and delight on the rooftop are on us.', el: 'Κάθε βράδυ 18:00 – 20:00, τούρκικος καφές και λουκούμι στην ταράτσα κερασμένα.' },
    cta: { tr: 'Masa ayırt', en: 'Book a table', el: 'Κράτηση' },
  },
  categories: [
    { id: 'breakfast', name: { tr: 'Kahvaltı', en: 'Breakfast', el: 'Πρωινό' } },
    { id: 'starters', name: { tr: 'Çorba & Meze', en: 'Soups & Meze', el: 'Σούπες & Μεζέδες' } },
    { id: 'mains', name: { tr: 'Ana Yemek', en: 'Mains', el: 'Κυρίως' } },
    { id: 'desserts', name: { tr: 'Tatlılar', en: 'Desserts', el: 'Γλυκά' } },
    { id: 'drinks', name: { tr: 'İçecekler', en: 'Drinks', el: 'Ποτά' } },
  ],
  menuItems: [
    {
      id: 'serpme', category: 'breakfast', price: 650, image: '🍳', tags: ['vegetarian', 'chef'], allergens: ['gluten', 'dairy', 'egg', 'nuts'],
      name: { tr: 'Serpme Kahvaltı', en: 'Turkish Breakfast Spread', el: 'Τουρκικό Πρωινό' },
      description: { tr: 'Peynirler, zeytin, bal-kaymak, reçeller, yumurta, simit (2 kişilik).', en: 'Cheeses, olives, honey and clotted cream, jams, eggs, simit (for 2).', el: 'Τυριά, ελιές, μέλι με καϊμάκι, μαρμελάδες, αυγά, κουλούρι (για 2).' },
      keywords: ['serpme', 'kahvalti', 'breakfast', 'spread', 'πρωινο'],
    },
    {
      id: 'menemen', category: 'breakfast', price: 280, image: '🍅', tags: ['vegetarian', 'gluten_free'], allergens: ['egg'],
      name: { tr: 'Menemen', en: 'Menemen', el: 'Μενεμέν' },
      description: { tr: 'Domates, biber ve yumurta, bakır sahanda.', en: 'Tomatoes, peppers and eggs in a copper pan.', el: 'Ντομάτα, πιπεριά και αυγά σε χάλκινο τηγάνι.' },
      keywords: ['menemen', 'yumurta', 'eggs', 'μενεμεν'],
    },
    {
      id: 'simit', category: 'breakfast', price: 220, image: '🥯', tags: ['vegetarian'], allergens: ['gluten', 'dairy', 'sesame'],
      name: { tr: 'Simit Tabağı', en: 'Simit Plate', el: 'Πιάτο με Κουλούρι' },
      description: { tr: 'Taze simit, beyaz peynir, domates ve salatalık.', en: 'Fresh simit, white cheese, tomato and cucumber.', el: 'Φρέσκο κουλούρι, λευκό τυρί, ντομάτα και αγγούρι.' },
      keywords: ['simit', 'bagel', 'κουλουρι'],
    },
    {
      id: 'mercimek', category: 'starters', price: 180, image: '🥣', tags: ['vegan', 'gluten_free'], allergens: [],
      name: { tr: 'Mercimek Çorbası', en: 'Red Lentil Soup', el: 'Σούπα Φακής' },
      description: { tr: 'Limon ve pul biberle.', en: 'With lemon and chili flakes.', el: 'Με λεμόνι και νιφάδες πιπεριάς.' },
      keywords: ['mercimek', 'corba', 'çorba', 'soup', 'lentil', 'σουπα', 'φακη'],
    },
    {
      id: 'coban', category: 'starters', price: 200, image: '🥗', tags: ['vegan', 'gluten_free'], allergens: [],
      name: { tr: 'Çoban Salata', en: 'Shepherd’s Salad', el: 'Σαλάτα του Βοσκού' },
      description: { tr: 'Domates, salatalık, biber, soğan, maydanoz, nar ekşisi.', en: 'Tomato, cucumber, pepper, onion, parsley, pomegranate molasses.', el: 'Ντομάτα, αγγούρι, πιπεριά, κρεμμύδι, μαϊντανός, ρόδι.' },
      keywords: ['coban', 'çoban', 'salata', 'salad', 'σαλατα'],
    },
    {
      id: 'meze', category: 'starters', price: 380, image: '🫒', tags: ['vegetarian'], allergens: ['dairy', 'sesame', 'nuts'],
      name: { tr: 'Meze Tabağı', en: 'Meze Platter', el: 'Πιάτο Μεζέδων' },
      description: { tr: 'Humus, haydari, acılı ezme, fava ve muhammara.', en: 'Hummus, haydari, spicy ezme, fava and muhammara.', el: 'Χούμους, χαϊντάρι, πικάντικο έζμε, φάβα και μουχαμάρα.' },
      keywords: ['meze', 'humus', 'hummus', 'μεζε'],
    },
    {
      id: 'iskender', category: 'mains', price: 520, image: '🥙', tags: ['chef'], allergens: ['gluten', 'dairy'],
      name: { tr: 'İskender Kebap', en: 'İskender Kebab', el: 'Ισκεντέρ Κεμπάπ' },
      description: { tr: 'Döner, tereyağlı pide, domates sosu ve yoğurt.', en: 'Döner over buttered pide with tomato sauce and yogurt.', el: 'Ντονέρ πάνω σε πίτα με βούτυρο, σάλτσα ντομάτας και γιαούρτι.' },
      keywords: ['iskender', 'kebap', 'kebab', 'doner', 'döner', 'κεμπαπ'],
    },
    {
      id: 'hunkar', category: 'mains', price: 560, image: '🍖', tags: [], allergens: ['gluten', 'dairy'],
      name: { tr: 'Hünkâr Beğendi', en: 'Hünkâr Beğendi', el: 'Χουνκάρ Μπεγεντί' },
      description: { tr: 'Közlenmiş patlıcan beğendi üzerinde kuzu güveç.', en: 'Lamb stew on smoky aubergine purée.', el: 'Αρνί κοκκινιστό πάνω σε πουρέ μελιτζάνας.' },
      keywords: ['hunkar', 'hünkar', 'begendi', 'beğendi', 'kuzu', 'lamb', 'αρνι'],
    },
    {
      id: 'imam', category: 'mains', price: 300, image: '🍆', tags: ['vegan', 'gluten_free'], allergens: [],
      name: { tr: 'İmam Bayıldı', en: 'İmam Bayıldı', el: 'Ιμάμ Μπαϊλντί' },
      description: { tr: 'Zeytinyağlı, soğan ve domates dolgulu patlıcan.', en: 'Aubergine stuffed with onion and tomato, in olive oil.', el: 'Μελιτζάνα γεμιστή με κρεμμύδι και ντομάτα, λαδερή.' },
      keywords: ['imam', 'bayildi', 'bayıldı', 'patlican', 'aubergine', 'eggplant', 'μελιτζανα'],
    },
    {
      id: 'levrek', category: 'mains', price: 690, image: '🐟', tags: ['gluten_free'], allergens: ['fish'],
      name: { tr: 'Izgara Levrek', en: 'Grilled Sea Bass', el: 'Λαβράκι Σχάρας' },
      description: { tr: 'Roka, kırmızı soğan ve limonla.', en: 'With rocket, red onion and lemon.', el: 'Με ρόκα, κόκκινο κρεμμύδι και λεμόνι.' },
      keywords: ['levrek', 'balik', 'balık', 'fish', 'sea bass', 'ψαρι', 'λαβρακι'],
    },
    {
      id: 'kunefe', category: 'desserts', price: 280, image: '🧀', tags: ['vegetarian', 'chef'], allergens: ['gluten', 'dairy', 'nuts'],
      name: { tr: 'Künefe', en: 'Künefe', el: 'Κιουνεφέ' },
      description: { tr: 'Sıcak, peynirli, Antep fıstıklı.', en: 'Warm, with melted cheese and pistachio.', el: 'Ζεστό, με λιωμένο τυρί και φιστίκι.' },
      keywords: ['kunefe', 'künefe', 'κιουνεφε'],
    },
    {
      id: 'sutlac', category: 'desserts', price: 160, image: '🍮', tags: ['vegetarian', 'gluten_free'], allergens: ['dairy'],
      name: { tr: 'Fırın Sütlaç', en: 'Baked Rice Pudding', el: 'Ρυζόγαλο Φούρνου' },
      description: { tr: 'Tarçınla.', en: 'With cinnamon.', el: 'Με κανέλα.' },
      keywords: ['sutlac', 'sütlaç', 'rice pudding', 'ρυζογαλο'],
    },
    {
      id: 'baklava-tr', category: 'desserts', price: 300, image: '🍯', tags: ['vegetarian'], allergens: ['gluten', 'dairy', 'nuts'],
      name: { tr: 'Fıstıklı Baklava', en: 'Pistachio Baklava', el: 'Μπακλαβάς με Φιστίκι' },
      description: { tr: '4 dilim, kaymakla.', en: '4 pieces, with clotted cream.', el: '4 κομμάτια, με καϊμάκι.' },
      keywords: ['baklava', 'μπακλαβα'],
    },
    {
      id: 'turk-kahvesi', category: 'drinks', price: 110, image: '☕', tags: ['vegan', 'gluten_free'], allergens: [],
      name: { tr: 'Türk Kahvesi', en: 'Turkish Coffee', el: 'Τούρκικος Καφές' },
      description: { tr: 'Lokum ile.', en: 'Served with Turkish delight.', el: 'Με λουκούμι.' },
      keywords: ['kahve', 'turk kahvesi', 'türk kahvesi', 'coffee', 'καφε'],
    },
    {
      id: 'cay', category: 'drinks', price: 50, image: '🫖', tags: ['vegan', 'gluten_free'], allergens: [],
      name: { tr: 'Çay', en: 'Turkish Tea', el: 'Τσάι' },
      description: { tr: 'İnce belli bardakta.', en: 'In a tulip glass.', el: 'Σε ποτήρι τουλίπα.' },
      keywords: ['cay', 'çay', 'tea', 'τσαι'],
    },
    {
      id: 'ayran', category: 'drinks', price: 70, image: '🥛', tags: ['vegetarian', 'gluten_free'], allergens: ['dairy'],
      name: { tr: 'Ayran', en: 'Ayran', el: 'Αϊράνι' },
      description: { tr: 'Köpüklü, ev yapımı.', en: 'Frothy, homemade yogurt drink.', el: 'Σπιτικό ρόφημα γιαουρτιού.' },
      keywords: ['ayran', 'αιρανι'],
    },
  ],
  routes: [
    {
      id: 'sultanahmet-classics', tags: ['history', 'culture'], featured: true,
      sharedBy: 'Maria', rating: 4.9, minutes: 240, km: 3,
      title: { tr: 'Sultanahmet Klasikleri', en: 'Sultanahmet Classics', el: 'Τα Κλασικά του Σουλτανάχμετ' },
      description: { tr: 'Ayasofya, Sultanahmet Camii, Yerebatan Sarnıcı ve Topkapı Sarayı.', en: 'Hagia Sophia, the Blue Mosque, Basilica Cistern and Topkapı Palace.', el: 'Αγία Σοφία, Μπλε Τζαμί, Βασιλική Κινστέρνα και Τοπκαπί.' },
      tip: { tr: 'Tramvayla Sultanahmet durağına inin. Camileri namaz saatleri dışında ziyaret edin.', en: 'Take the tram to Sultanahmet. Visit the mosques outside prayer times.', el: 'Πάρτε το τραμ μέχρι το Σουλτανάχμετ. Επισκεφθείτε τα τζαμιά εκτός ωρών προσευχής.' },
      stops: [
        { name: { tr: 'Ayasofya', en: 'Hagia Sophia', el: 'Αγία Σοφία' }, place: 'Hagia Sophia, Istanbul', minutes: 60, lat: 41.0086, lng: 28.9802 },
        { name: { tr: 'Sultanahmet Camii', en: 'Blue Mosque', el: 'Μπλε Τζαμί' }, place: 'Blue Mosque, Istanbul', minutes: 40, lat: 41.0054, lng: 28.9768 },
        { name: { tr: 'Yerebatan Sarnıcı', en: 'Basilica Cistern', el: 'Βασιλική Κινστέρνα' }, place: 'Basilica Cistern, Istanbul', minutes: 40, lat: 41.0084, lng: 28.9779 },
        { name: { tr: 'Topkapı Sarayı', en: 'Topkapı Palace', el: 'Παλάτι Τοπκαπί' }, place: 'Topkapi Palace, Istanbul', minutes: 90, lat: 41.0115, lng: 28.9834 },
      ],
    },
    {
      id: 'galata-karakoy', tags: ['easy', 'sunset'],
      sharedBy: 'Lukas', rating: 4.8, minutes: 120, km: 2,
      title: { tr: 'Galata’dan Karaköy’e', en: 'From Galata to Karaköy', el: 'Από τον Γαλατά στο Καράκιοϊ' },
      description: { tr: 'Galata Kulesi, yokuş aşağı Karaköy sokakları ve Galata Köprüsü’nde gün batımı.', en: 'Galata Tower, the lanes down to Karaköy and sunset on the Galata Bridge.', el: 'Πύργος του Γαλατά, τα σοκάκια του Καράκιοϊ και ηλιοβασίλεμα στη Γέφυρα.' },
      tip: { tr: 'Otelden 5 dakika. Kule kuyruğu akşamüstü uzar, sabah gidin.', en: '5 minutes from the hotel. The tower queue gets long in the afternoon, go in the morning.', el: '5 λεπτά από το ξενοδοχείο. Πηγαίνετε στον πύργο το πρωί.' },
      stops: [
        { name: { tr: 'Galata Kulesi', en: 'Galata Tower', el: 'Πύργος του Γαλατά' }, place: 'Galata Tower, Istanbul', minutes: 40, lat: 41.0256, lng: 28.9741 },
        { name: { tr: 'Karaköy Sokakları', en: 'Karaköy Streets', el: 'Σοκάκια του Καράκιοϊ' }, place: 'Karaköy, Istanbul', minutes: 40, lat: 41.0228, lng: 28.977 },
        { name: { tr: 'Galata Köprüsü', en: 'Galata Bridge', el: 'Γέφυρα του Γαλατά' }, place: 'Galata Bridge, Istanbul', minutes: 30, lat: 41.02, lng: 28.9733 },
      ],
    },
    {
      id: 'kadikoy-food', tags: ['food'],
      sharedBy: 'Elif', rating: 4.9, minutes: 180, km: 3,
      title: { tr: 'Vapurla Kadıköy Lezzetleri', en: 'Kadıköy Food by Ferry', el: 'Γεύσεις στο Καντίκιοϊ με το πλοίο' },
      description: { tr: 'Karaköy’den vapur, Kadıköy Çarşısı’nda meze ve tatlı, Moda sahilinde yürüyüş.', en: 'Ferry from Karaköy, meze and sweets at Kadıköy market, a walk on the Moda shore.', el: 'Πλοίο από το Καράκιοϊ, μεζέδες στην αγορά του Καντίκιοϊ, βόλτα στη Μόντα.' },
      tip: { tr: 'Vapurda çay ve simit alın, martılara simit atmayın.', en: 'Get tea and simit on the ferry, but don’t feed the gulls.', el: 'Πάρτε τσάι και κουλούρι στο πλοίο.' },
      stops: [
        { name: { tr: 'Karaköy İskelesi', en: 'Karaköy Pier', el: 'Αποβάθρα Καράκιοϊ' }, place: 'Karaköy Ferry Pier, Istanbul', minutes: 25, lat: 41.0213, lng: 28.9767 },
        { name: { tr: 'Kadıköy Çarşısı', en: 'Kadıköy Market', el: 'Αγορά Καντίκιοϊ' }, place: 'Kadıköy Market, Istanbul', minutes: 90, lat: 40.9905, lng: 29.025 },
        { name: { tr: 'Moda Sahili', en: 'Moda Shore', el: 'Ακτή της Μόντας' }, place: 'Moda Sahili, Istanbul', minutes: 40, lat: 40.981, lng: 29.026 },
      ],
    },
    {
      id: 'balat-fener', tags: ['history', 'culture', 'family'],
      sharedBy: 'Nikos', rating: 4.7, minutes: 150, km: 2.5,
      title: { tr: 'Balat ve Fener’in Renkli Sokakları', en: 'Colourful Balat and Fener', el: 'Τα Πολύχρωμα Μπαλάτ και Φανάρι' },
      description: { tr: 'Rum Patrikhanesi, Bulgar Kilisesi ve Balat’ın renkli evleri.', en: 'The Ecumenical Patriarchate, the Bulgarian Church and Balat’s colourful houses.', el: 'Οικουμενικό Πατριαρχείο, Βουλγαρική Εκκλησία και τα χρωματιστά σπίτια του Μπαλάτ.' },
      tip: { tr: 'Yokuşlar dik; rahat ayakkabı giyin. Kahve molası için Balat’ta çok seçenek var.', en: 'The streets are steep; wear comfy shoes. Lots of cafés in Balat.', el: 'Ανηφόρες· φορέστε άνετα παπούτσια.' },
      stops: [
        { name: { tr: 'Rum Patrikhanesi', en: 'Ecumenical Patriarchate', el: 'Οικουμενικό Πατριαρχείο' }, place: 'Ecumenical Patriarchate of Constantinople', minutes: 30, lat: 41.0294, lng: 28.9519 },
        { name: { tr: 'Bulgar Kilisesi', en: 'Bulgarian St. Stephen Church', el: 'Βουλγαρική Εκκλησία' }, place: 'Bulgarian St. Stephen Church, Istanbul', minutes: 25, lat: 41.0285, lng: 28.9553 },
        { name: { tr: 'Balat Renkli Evler', en: 'Balat Colourful Houses', el: 'Χρωματιστά Σπίτια Μπαλάτ' }, place: 'Balat, Istanbul', minutes: 45, lat: 41.0303, lng: 28.9489 },
      ],
    },
    {
      id: 'bosphorus-sunset', tags: ['sunset', 'nature'],
      sharedBy: 'Sophie', rating: 4.8, minutes: 180, km: 4.5,
      title: { tr: 'Boğaz’da Gün Batımı', en: 'Bosphorus Sunset', el: 'Ηλιοβασίλεμα στον Βόσπορο' },
      description: { tr: 'Ortaköy Camii, Yıldız Parkı ve Bebek sahilinde gün batımı.', en: 'Ortaköy Mosque, Yıldız Park and sunset on the Bebek shore.', el: 'Τζαμί του Ορτάκιοϊ, πάρκο Γιλντίζ και ηλιοβασίλεμα στο Μπεμπέκ.' },
      tip: { tr: 'Ortaköy’de kumpir deneyin. Dönüşte taksi yerine otobüs daha hızlı olabilir.', en: 'Try a kumpir in Ortaköy. The bus back can be faster than a taxi.', el: 'Δοκιμάστε κουμπίρ στο Ορτάκιοϊ.' },
      stops: [
        { name: { tr: 'Ortaköy Camii', en: 'Ortaköy Mosque', el: 'Τζαμί Ορτάκιοϊ' }, place: 'Ortaköy Mosque, Istanbul', minutes: 40, lat: 41.0473, lng: 29.027 },
        { name: { tr: 'Yıldız Parkı', en: 'Yıldız Park', el: 'Πάρκο Γιλντίζ' }, place: 'Yıldız Park, Istanbul', minutes: 40, lat: 41.049, lng: 29.013 },
        { name: { tr: 'Bebek Sahili', en: 'Bebek Shore', el: 'Ακτή Μπεμπέκ' }, place: 'Bebek, Istanbul', minutes: 45, lat: 41.077, lng: 29.043 },
      ],
    },
    {
      id: 'istiklal-pera', tags: ['culture', 'easy'],
      sharedBy: 'James', rating: 4.6, minutes: 120, km: 1.5,
      title: { tr: 'Pera ve İstiklal', en: 'Pera and İstiklal', el: 'Πέρα και Ιστικλάλ' },
      description: { tr: 'Pera Müzesi, İstiklal Caddesi’nde nostaljik tramvay ve Taksim.', en: 'Pera Museum, the nostalgic tram on İstiklal Avenue and Taksim.', el: 'Μουσείο Πέρα, το νοσταλγικό τραμ της Ιστικλάλ και Ταξίμ.' },
      tip: { tr: 'Pera Müzesi pazartesi kapalı. Çiçek Pasajı’nda kısa bir mola verin.', en: 'Pera Museum is closed on Mondays. Take a short break at Çiçek Pasajı.', el: 'Το Μουσείο Πέρα είναι κλειστό τη Δευτέρα.' },
      stops: [
        { name: { tr: 'Pera Müzesi', en: 'Pera Museum', el: 'Μουσείο Πέρα' }, place: 'Pera Museum, Istanbul', minutes: 60, lat: 41.0317, lng: 28.9752 },
        { name: { tr: 'İstiklal Caddesi', en: 'İstiklal Avenue', el: 'Λεωφόρος Ιστικλάλ' }, place: 'İstiklal Avenue, Istanbul', minutes: 40, lat: 41.034, lng: 28.979 },
        { name: { tr: 'Taksim Meydanı', en: 'Taksim Square', el: 'Πλατεία Ταξίμ' }, place: 'Taksim Square, Istanbul', minutes: 15, lat: 41.0369, lng: 28.985 },
      ],
    },
  ],
  sampleReviews: [
    { id: 1, name: 'Maria', country: '🇬🇷', rating: 5, lang: 'EL', date: '2026-10-14', topics: ['location', 'rooftop', 'staff'], text: 'Υπέροχη θέα από την ταράτσα, πολύ φιλικό προσωπικό. Ο Γαλατάς είναι δίπλα.' },
    { id: 2, name: 'James', country: '🇬🇧', rating: 5, lang: 'EN', date: '2026-10-11', topics: ['breakfast', 'concierge'], text: 'The Turkish breakfast spread was huge. The app suggested the Kadıköy ferry route, loved it.' },
    { id: 3, name: 'Elif', country: '🇹🇷', rating: 4, lang: 'TR', date: '2026-10-07', topics: ['clean', 'noise'], text: 'Oda tertemizdi, akşamları İstiklal tarafından biraz ses geliyor.' },
    { id: 4, name: 'Lukas', country: '🇩🇪', rating: 5, lang: 'EN', date: '2026-10-03', topics: ['location', 'concierge', 'staff'], text: 'Perfect location for walking. Ordering room service from the app was super easy.' },
    { id: 5, name: 'Ayşe', country: '🇹🇷', rating: 4, lang: 'TR', date: '2026-09-29', topics: ['breakfast', 'smallRoom'], text: 'Kahvaltıya bayıldık, oda biraz küçüktü ama çok şıktı.' },
    { id: 6, name: 'Nikos', country: '🇬🇷', rating: 3, lang: 'EL', date: '2026-09-24', topics: ['slowService', 'location'], text: 'Εξαιρετική τοποθεσία, αλλά το room service άργησε λίγο.' },
  ],
  demo: { soldOut: 'kunefe', tableNote: 'Haliç manzaralı bir masa olursa sevinirim', reviewNote: 'Personel çok ilgiliydi, terastan Haliç manzarası harika.' },
}
