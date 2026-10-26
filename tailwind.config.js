/** @type {import('tailwindcss').Config} */
// askHermis 2027 tasarım sistemi (Hermis ekibinin gönderdiği): mürekkep, kâğıt ve bej.
// Arayüz tek renkli; renk yalnızca büyük "boyalı zeminlerde" (field) kullanılır.
// Hizmet hatları (Y, T, M, R, K, O) korunuyor: rozetler gri tonlu karolar, sayfa başlıkları departman zeminleri.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F4',      // beige — surface-grouped, ana zemin
        card: '#FFFFFF',            // paper — surface-raised
        ink: '#0A0A0A',             // ink — yazı ve tek ana düğme (accent)
        muted: '#3B3B3B',           // label-secondary
        line: '#E6E5E2',            // separator
        primary: '#0A0A0A',         // ink hero zemini, seçili sekme, aktif durak
        'primary-soft': '#E4E3E0',  // accent-tint
        discover: '#F9BC9A',        // field-peach — F&B (Y hattı, yemek)
        'discover-pink': '#C2D6C4', // field-sage — temizlik (T hattı)
        activity: '#E5885A',        // field-ember — Front Office (M hattı, masa ve transfer)
        service: '#C2D6C4',         // field-sage — sakin zemin (R hattı, rotalar)
        accent: '#3B3B3B',          // graphite — rota çizgisi, yıldızlar
        campaign: '#183274',        // field-night — kapanış çağrısı (kampanya)
        tile: {
          ink: '#0A0A0A',
          graphite: '#3B3B3B',
          stone: '#6B6B6B',
          silver: '#8A8A8A',
          sand: '#7A7266',
        },
        success: { DEFAULT: '#1E5945', text: '#14503A', tint: 'rgba(30,89,69,0.12)' },
        warning: { DEFAULT: '#B07A12', text: '#7A5200', tint: 'rgba(176,122,18,0.14)' },
        danger: { DEFAULT: '#A31D1D', text: '#8E1A1A', tint: 'rgba(163,29,29,0.10)' },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'sans-serif'],
        // Küçük etiket ve düğmeler Inter ile (Comfortaa 20px altında kullanılmaz)
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'sans-serif'],
        // Başlıklar: Comfortaa (Yunanca harfleri de var)
        title: ['Comfortaa', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', 'Inter', 'ui-monospace', 'monospace'],
      },
      fontWeight: {
        extrabold: '700',
      },
      borderRadius: {
        card: '14px',               // radius-lg
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,10,10,0.05), 0 8px 24px rgba(10,10,10,0.06)',
        popover: '0 14px 36px rgba(10,10,10,0.18)',
      },
    },
  },
  plugins: [],
}
