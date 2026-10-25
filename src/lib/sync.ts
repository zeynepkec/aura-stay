// =============================================================
//  VERİTABANI SENKRONU (Supabase)
//
//  Ekranlar veriye useShared() ile ulaşmaya devam eder. Bu dosya o verileri
//  Supabase'deki "records" tablosuyla eşitler:
//   - Uygulama açılınca tüm kayıtları indirir (startSync)
//   - Bir ekran bir şeyi değiştirince sadece değişen kaydı gönderir (pushChange)
//   - Başka bir cihaz bir şeyi değiştirince anında haber alır (realtime)
//
//  Tarayıcı hafızası (localStorage) önbellek olarak kalır; bağlantı yoksa
//  uygulama eskisi gibi çalışır. Sepet ve oturum bilgisi cihazda kalır, paylaşılmaz.
// =============================================================
import { supabase } from './supabase'

type Row = { collection: string; id: string; data: unknown }
type Item = { id?: string; room?: string; createdAt?: number }

// Paylaşılan veriler: 'list' = kayıt listesi (her kayıt ayrı satır), 'doc' = tek parça
const SYNCED: Record<string, { kind: 'list' | 'doc'; idOf?: (x: Item) => string }> = {
  'aura-orders': { kind: 'list', idOf: (x) => x.id ?? '' },
  'aura-requests': { kind: 'list', idOf: (x) => x.id ?? '' },
  'aura-feedback': { kind: 'list', idOf: (x) => x.id ?? '' },
  'aura-reviews': { kind: 'list', idOf: (x) => x.room ?? '' }, // her odanın tek değerlendirmesi
  'aura-soldout': { kind: 'doc' },
  'aura-closed-bills': { kind: 'doc' },
}

const DOC_ID = 'doc'
const SAME_TAB_EVENT = 'aura-shared-change'
export const SYNC_STATUS_EVENT = 'aura-sync-status'

export type SyncStatus = 'local' | 'connecting' | 'live' | 'error'
let status: SyncStatus = supabase ? 'connecting' : 'local'
export const getSyncStatus = () => status
const setStatus = (next: SyncStatus) => {
  status = next
  window.dispatchEvent(new Event(SYNC_STATUS_EVENT))
}

export const isSynced = (key: string) => key in SYNCED

// Yerel önbelleğe yaz ve ekranlara haber ver
function writeLocal(key: string, value: unknown) {
  if (value === undefined) localStorage.removeItem(key)
  else localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new CustomEvent(SAME_TAB_EVENT, { detail: key }))
}

function readLocal<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as T) : fallback
  } catch {
    return fallback
  }
}

// Listeler en yeni kayıt başta olacak şekilde tutulur
const newestFirst = (list: Item[]) => [...list].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))

// Veritabanından gelen tek bir değişikliği önbelleğe uygula
function applyRow(row: Row, deleted: boolean) {
  const config = SYNCED[row.collection]
  if (!config) return
  if (config.kind === 'doc') {
    writeLocal(row.collection, deleted ? undefined : row.data)
    return
  }
  const list = readLocal<Item[]>(row.collection, []).filter((x) => config.idOf!(x) !== row.id)
  writeLocal(row.collection, newestFirst(deleted ? list : [row.data as Item, ...list]))
}

// Uygulama açılınca: tüm kayıtları indir, sonra canlı değişiklikleri dinle
export async function startSync() {
  if (!supabase) return
  const { data, error } = await supabase.from('records').select('collection, id, data')
  if (error) {
    console.error('Veritabanına bağlanılamadı:', error.message)
    setStatus('error')
    return
  }
  const rows = (data ?? []) as Row[]
  for (const [key, config] of Object.entries(SYNCED)) {
    const mine = rows.filter((r) => r.collection === key)
    if (config.kind === 'doc') writeLocal(key, mine.find((r) => r.id === DOC_ID)?.data)
    else writeLocal(key, newestFirst(mine.map((r) => r.data as Item)))
  }

  supabase
    .channel('records-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'records' }, (payload) => {
      if (payload.eventType === 'DELETE') applyRow(payload.old as Row, true)
      else applyRow(payload.new as Row, false)
    })
    .subscribe((state) => {
      if (state === 'SUBSCRIBED') setStatus('live')
      else if (state === 'CHANNEL_ERROR' || state === 'TIMED_OUT') setStatus('error')
    })
}

const logError = ({ error }: { error: { message: string } | null }) => {
  if (error) console.error('Veritabanına yazılamadı:', error.message)
}

// Bir ekran veriyi değiştirince: sadece değişen kayıtları gönder
export function pushChange(key: string, prev: unknown, next: unknown) {
  const config = SYNCED[key]
  if (!supabase || !config) return
  if (config.kind === 'doc') {
    void supabase.from('records').upsert({ collection: key, id: DOC_ID, data: next, updated_at: new Date().toISOString() }).then(logError)
    return
  }
  const idOf = config.idOf!
  const before = new Map((prev as Item[]).map((x) => [idOf(x), JSON.stringify(x)]))
  const nextList = next as Item[]
  const changed = nextList
    .filter((x) => before.get(idOf(x)) !== JSON.stringify(x))
    .map((x) => ({ collection: key, id: idOf(x), data: x, updated_at: new Date().toISOString() }))
  const nextIds = new Set(nextList.map(idOf))
  const removed = [...before.keys()].filter((id) => !nextIds.has(id))
  if (changed.length) void supabase.from('records').upsert(changed).then(logError)
  if (removed.length) void supabase.from('records').delete().eq('collection', key).in('id', removed).then(logError)
}

// Demo araçları için: bir veriyi tamamen değiştir (önce sil, sonra yaz)
export async function replaceShared(key: string, value: unknown) {
  writeLocal(key, value)
  const config = SYNCED[key]
  if (!supabase || !config) return
  logError(await supabase.from('records').delete().eq('collection', key))
  if (value === undefined) return
  const rows =
    config.kind === 'doc'
      ? [{ collection: key, id: DOC_ID, data: value }]
      : (value as Item[]).map((x) => ({ collection: key, id: config.idOf!(x), data: x }))
  if (rows.length) logError(await supabase.from('records').insert(rows))
}
