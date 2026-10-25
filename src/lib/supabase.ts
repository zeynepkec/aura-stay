import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Bağlantı bilgileri .env.local dosyasından (bilgisayarda) ya da Vercel ayarlarından (internette) gelir.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Bilgiler yoksa uygulama eskisi gibi sadece tarayıcı hafızasıyla çalışır
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null
