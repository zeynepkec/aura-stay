# AURA Stay — Hermis Boutique Hotel

Otel misafirleri için dijital konsiyerj (PWA) ve personel paneli.
Hermis Boutique Hotel (Plaka, Atina) için hazırlandı. React + TypeScript + Vite + Tailwind.

Bu repo iki ekip çalışmasının birleşimidir:
- **AURA Stay** (uygulama yapısı): sayfalar, misafir ↔ personel bağlantısı, rollerle personel paneli, bildirimler, harita, anı kartı, QR giriş, Vercel yayını
- **askHermis misafir portalı** (içerik ve asistan): otel bilgileri, menü, Atina rotaları, SSS, onay isteyen asistan, yorum özeti

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173  (Network adresi telefondan açmak için)
npm run build    # yayın öncesi kontrol (Vercel de bunu çalıştırır)
```

- Misafir uygulaması: `/` → "Demo: Oda 302 ile giriş yap" ya da `/qr` sayfasındaki bir oda kodu
- Personel paneli: `/staff` → PIN **1111** Mutfak · **2222** Kat hizmetleri · **3333** Resepsiyon
- Sunum için örnek veriler: Resepsiyon → **Demo** sekmesi

## İçerik nasıl düzenlenir?

| Ne | Dosya |
|---|---|
| Otel bilgileri, Wi-Fi, saatler, SSS, kampanya, hizmet seçenekleri | `src/data/hotel.ts` |
| Menü (fiyat €, etiket, alerjen, asistan anahtar kelimeleri) | `src/data/menu.ts` |
| Atina rotaları (duraklar, harita konumları, ipuçları) | `src/data/routes.ts` |
| Örnek misafir yorumları | `src/data/reviews.ts` |
| Ekran yazıları (TR / EN / EL) | `src/translations/*.ts` |

- **Yeni ürün:** `menu.ts` → `menuItems` listesine ekle. `id` benzersiz olmalı. `keywords` asistanın ürünü tanımasını sağlar.
- **Yeni rota:** `routes.ts` → `routes` listesine ekle. Her durak için `place` (Google Haritalar'da aranacak İngilizce isim) ve `lat/lng` (harita konumu) yaz.
- **Asistanın cevapladığı sorular:** `hotel.ts` → `faq` listesi (`keywords` + 3 dilde `answer`).

## Asistan kuralları (`src/lib/concierge.ts`)

1. Sipariş ve talepleri personele göndermeden **önce onay ister**.
2. Fiyatı sadece menüden alır; **transfer ücretini uydurmaz** (resepsiyon onaylar).
3. Eksik bilgiyi (saat, kişi sayısı, varış yeri) tek tek sorar.
4. Anlamadığında tahmin yürütmez, seçenek sunar.
5. 1 harflik yazım hatalarını ve aksansız Türkçe / Yunanca yazımı tolere eder.
6. Rota önerisini misafirin tercih kelimelerine göre yapar.

## Klasör yapısı

```
src/
  data/          içerik: hotel, menu, routes, reviews, stay
  lib/           concierge (asistan), reviewSummary, session (QR giriş), shared (ortak hafıza), staff, demoData
  store/         misafir tarafının ortak hafızası (sipariş, hizmet, geri bildirim)
  pages/         misafir ekranları
  staff/         personel paneli ekranları
  components/    alt menü, dil seçici, bildirimler, yorum özeti
  translations/  ekran yazıları (TR / EN / EL)
```

## Veri katmanı

Şu an veriler tarayıcının hafızasında (`localStorage`) tutulur: aynı tarayıcıdaki sekmeler birbirini anında görür
(misafir sekmesi ↔ personel sekmesi). Farklı cihazlar arası senkron için son adımda Supabase bağlanacak;
ekranlar `src/lib/shared.ts` ve `src/store/` üzerinden çalıştığı için sadece bu katman değişecek.

## Yol haritası

- [x] Misafir uygulaması (QR giriş, 3 dil, menü/sepet/sipariş, hizmetler, rotalar + harita, asistan, değerlendirme, anı kartı)
- [x] Personel paneli (mutfak, menü durumu, görevler, masa talepleri, oda hesapları, geri bildirimler, demo)
- [x] askHermis içeriği ve asistanı ile birleştirme
- [x] PWA ve Vercel yayını
- [ ] Veritabanı (Supabase) ve gerçek yapay zekâ modeli
