/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F4',      // Warm White — ana zemin
        card: '#FFFFFF',            // Pure White — içerik kartları
        ink: '#0A0A0A',             // Ink Black — yazılar ve butonlar
        muted: '#706C68',           // gri ikincil yazılar
        line: '#EAE7E3',            // ince kenarlıklar
        discover: '#B4A5DC',        // Soft Lilac — keşif alanı
        'discover-pink': '#DEACD1', // Dusty Pink — lila geçişleri
        activity: '#E5BFA8',        // Peach Salmon — aktivite kartları
        service: '#C5D1C5',         // Sage Green — otel hizmetleri
        accent: '#7B92BC',          // Muted Blue — ikincil vurgular
        campaign: '#3C4C7F',        // Deep Blue — özel kampanyalar
      },
    },
  },
  plugins: [],
}