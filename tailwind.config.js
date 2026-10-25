/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F4',      // Warm White — ana zemin
        card: '#FFFFFF',            // Pure White — içerik kartları
        ink: '#0A0A0A',             // Ink Black — yazılar
        muted: '#6A6662',           // ikincil yazılar (açık zeminde okunur kontrast)
        line: '#E6E2DD',            // ince kenarlıklar
        primary: '#3C4C7F',         // Deep Blue — ana düğmeler, seçili durumlar, anahtar etiketi
        'primary-soft': '#E7EAF2',  // Deep Blue'nun açık tonu — seçili arka planlar
        discover: '#B4A5DC',        // Soft Lilac — konsiyerj (sohbet)
        'discover-pink': '#DEACD1', // Dusty Pink — anı kartı
        activity: '#E5BFA8',        // Peach Salmon — rotalar ve aktiviteler
        service: '#C5D1C5',         // Sage Green — otel hizmetleri
        accent: '#7B92BC',          // Muted Blue — "işlemde" durumları
        campaign: '#3C4C7F',        // Deep Blue — özel kampanyalar
      },
      fontFamily: {
        sans: ['"Commissioner Variable"', 'Commissioner', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',               // kartlar ve gruplar
      },
    },
  },
  plugins: [],
}
