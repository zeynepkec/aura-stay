# AURA Stay

Otel misafirleri için dijital konsiyerj (PWA) ve personel paneli. React + TypeScript + Vite + Tailwind.
Tüm dünyadaki oteller için tasarlandı; şimdilik **Türkiye** ve **Yunanistan**:

| Ülke | Şehir | Otel |
|---|---|---|
| Yunanistan | Atina | Hermis Boutique Hotel (askHermis içeriği) |
| Türkiye | İstanbul | Pera Lale Otel (demo otel, hayali) |

Her otelin menüsü, para birimi, rotaları, SSS'si, odaları ve giriş kodları ayrıdır; verileri de veritabanında ayrı tutulur
(İstanbul mutfağı Atina'nın siparişlerini görmez). Yeni otel: `src/data/hotels/` içine bir dosya ekle, `hotels/index.ts` listesine yaz.

Bu repo iki ekip çalışmasının birleşimidir:
- **AURA Stay** (uygulama yapısı): sayfalar, misafir ↔ personel bağlantısı, rollerle personel paneli, bildirimler, harita, anı kartı, QR giriş, Vercel yayını
- **askHermis misafir portalı** (içerik ve asistan): otel bilgileri, menü, Atina rotaları, SSS, onay isteyen asistan, yorum özeti

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173  (Network adresi telefondan açmak için)
npm run build    # yayın öncesi kontrol (Vercel de bunu çalıştırır)
```

Uygulama giriş ekranıyla açılır: **Misafir girişi** ya da **Personel girişi**.

- **Misafir girişi:** önce ülke → şehir → otel seçilir, sonra üç yoldan biriyle odaya girilir:
  1. **QR kodu okut:** odadaki QR kod kamerayla (ya da fotoğraftan) okunur
  2. **Oda numarası gir:** oda numarası + 4 haneli giriş kodu (ör. Hermis Oda 302 kod `h2p8`, Pera Lale Oda 302 kod `x2w7`). Kodlar `/qr` sayfasında her odanın altında yazar
  3. **Oda kartını okut:** NFC oda kartı (sadece Android + Chrome). Kartlar `/qr` sayfasındaki "Karta yaz" ile hazırlanır
- **Personel girişi:** `/staff` → otel seçilir → PIN **1111** Mutfak, **2222** Kat hizmetleri, **3333** Resepsiyon (PIN'ler ekranda yazmaz)
- Oda QR kodları ve giriş kodları: Resepsiyon paneli → **Oda QR kodları** (ya da `/qr`)
- Sunum için örnek veriler: Resepsiyon → **Demo** sekmesi
- Kamera ile QR okuma sadece güvenli adreste (https ya da localhost) açılır; telefonda yerel ağ adresiyle denerken "Fotoğraftan oku"yu kullanın

## İçerik nasıl düzenlenir?

| Ne | Dosya |
|---|---|
| Oteller: bilgiler, Wi-Fi, saatler, SSS, kampanya, odalar, menü, rotalar, örnek yorumlar | `src/data/hotels/hermis.ts`, `src/data/hotels/pera.ts` |
| Misafirlerin eklediği rotalar | veritabanında (`aura-routes`) |
| Ekran yazıları (TR / EN / EL) | `src/translations/*.ts` |

- **Yeni ürün:** `menu.ts` → `menuItems` listesine ekle. `id` benzersiz olmalı. `keywords` asistanın ürünü tanımasını sağlar.
- **Yeni rota:** `routes.ts` → `routes` listesine ekle. Her durak için `place` (Google Haritalar'da aranacak İngilizce isim) ve `lat/lng` (harita konumu) yaz.
- **Asistanın cevapladığı sorular:** `hotel.ts` → `faq` listesi (`keywords` + 3 dilde `answer`).

## Tasarım: Metro Hattı

Otel tabelası ve metro haritası fikri. Her hizmet renkli, harfli bir "hat" rozetiyle gösterilir:
**Y** Yemek (lila), **T** Temizlik (pembe), **M** Masa / transfer (şeftali), **R** Rotalar (yeşil), **K** Konsiyerj (koyu mavi).
Sipariş durumu ve rota durakları metro hattı üzerinde ilerler.

- Yazı tipleri: Sofia Sans (metin) ve Sofia Sans Condensed (başlıklar, numaralar); Türkçe ve Yunanca destekli, uygulamanın içinde gelir
- Renkler: `tailwind.config.js` · Rozet: `src/components/LineBadge.tsx` · Sipariş hattı: `src/components/OrderLine.tsx`

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

## Veritabanı (Supabase)

Paylaşılan veriler (siparişler, talepler, geri bildirimler, değerlendirmeler, menü durumu, kapatılan hesaplar)
Supabase'deki tek bir `records` tablosunda tutulur ve tüm cihazlarda **canlı** güncellenir. Sepet ve oturum cihazda kalır.

1. supabase.com'da proje aç → **SQL Editor** → `supabase/kurulum.sql` dosyasının tamamını çalıştır
2. **Project Settings → API Keys** → Project URL ve anon / publishable anahtarı kopyala
3. Bilgisayarda: `.env.example` dosyasını `.env.local` adıyla kopyala, bilgileri yaz, `npm run dev`'i yeniden başlat
4. İnternette: Vercel → proje → **Settings → Environment Variables** → aynı iki değişkeni ekle → **Redeploy**

Personel panelinin sağ üstünde bağlantı durumu görünür: **Canlı** (veritabanı) ya da **Yerel mod** (sadece bu tarayıcı).
Ekranlar veriye `src/lib/shared.ts` ile ulaşır; senkron `src/lib/sync.ts` içindedir.

> Şimdilik tablo herkese okuma/yazma izni veriyor (demo). Misafir ve personel yetkilerinin ayrılması sıradaki adım.

## Yol haritası

- [x] Misafir uygulaması (QR giriş, 3 dil, menü/sepet/sipariş, hizmetler, rotalar + harita, asistan, değerlendirme, anı kartı)
- [x] Personel paneli (mutfak, menü durumu, görevler, masa talepleri, oda hesapları, geri bildirimler, demo)
- [x] askHermis içeriği ve asistanı ile birleştirme
- [x] PWA ve Vercel yayını
- [x] Veritabanı (Supabase): cihazlar arası canlı senkron
- [ ] Misafir / personel yetkileri (RLS) ve gerçek yapay zekâ modeli
