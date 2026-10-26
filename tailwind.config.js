/** @type {import('tailwindcss').Config} */
// "Metro Hattı" tasarımı: otel tabelası + metro haritası.
// Her hizmet renkli, harfli bir "hat" rozetiyle gösterilir (Y Yemek, T Temizlik, M Masa/Transfer, R Rotalar, K Konsiyerj).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F4',      // Warm White — ana zemin
        card: '#FFFFFF',            // Pure White — içerik kartları
        ink: '#0A0A0A',             // Ink Black — yazılar ve ana düğmeler
        muted: '#706C68',           // gri ikincil yazılar
        line: '#EAE7E3',            // ince kenarlıklar
        primary: '#3C4C7F',         // Deep Blue — tabela, seçili sekme, aktif durak
        'primary-soft': '#DCE2F0',  // aktif durağın halkası
        discover: '#B4A5DC',        // Soft Lilac — Y hattı (yemek)
        'discover-pink': '#DEACD1', // Dusty Pink — T hattı (temizlik)
        activity: '#E5BFA8',        // Peach Salmon — M hattı (masa, transfer), ipuçları
        service: '#C5D1C5',         // Sage Green — R hattı (rotalar)
        accent: '#7B92BC',          // Muted Blue — rota çizgisi, yıldızlar
        campaign: '#3C4C7F',        // Deep Blue — kampanyalar
      },
      fontFamily: {
        sans: ['"Sofia Sans Variable"', '"Sofia Sans"', 'system-ui', 'sans-serif'],
        display: ['"Sofia Sans Condensed"', '"Sofia Sans Variable"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',               // tabela gibi: köşeler hafif yuvarlak
      },
    },
  },
  plugins: [],
}
