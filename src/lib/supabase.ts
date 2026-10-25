import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Bağlantı bilgileri .env.local dosyasından (bilgisayarda) ya da Vercel ayarlarından (internette) gelir.
const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim().replace(/^["']|["']$/g, '')
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim().replace(/^["']|["']$/g, '')

// Adresin sonuna yanlışlıkla /rest/v1/ gibi parçalar eklenmişse sadece ana adresi kullan
function cleanUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    return new URL(value).origin
  } catch {
    console.error('VITE_SUPABASE_URL geçersiz:', value)
    return undefined
  }
}

const url = cleanUrl(rawUrl)

// Bilgiler yoksa uygulama eskisi gibi sadece tarayıcı hafızasıyla çalışır
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null

if (url) console.info('Veritabanı adresi:', url)
