import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getSyncStatus, SYNC_STATUS_EVENT, type SyncStatus } from '../lib/sync'
import '../translations/sync'

const DOT: Record<SyncStatus, string> = {
  live: 'bg-green-500',
  connecting: 'bg-activity animate-pulse',
  local: 'bg-muted',
  error: 'bg-red-500',
}

// Veritabanı bağlantısının durumu: canlı / bağlanıyor / yerel / hata
export default function SyncBadge() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<SyncStatus>(getSyncStatus())

  useEffect(() => {
    const update = () => setStatus(getSyncStatus())
    window.addEventListener(SYNC_STATUS_EVENT, update)
    return () => window.removeEventListener(SYNC_STATUS_EVENT, update)
  }, [])

  return (
    <span className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium" title={t(`sync.hint.${status}`)}>
      <span className={`h-2 w-2 rounded-full ${DOT[status]}`} />
      {t(`sync.${status}`)}
    </span>
  )
}
