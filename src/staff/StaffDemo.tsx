import { Database, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StaffTitle from './StaffTitle'
import { buildDemoData } from '../lib/demoData'
import { replaceShared } from '../lib/sync'
import '../translations/demo'

// Uygulamanın kullandığı tüm veri anahtarları
const DATA_KEYS = ['aura-orders', 'aura-requests', 'aura-feedback', 'aura-reviews', 'aura-closed-bills', 'aura-soldout', 'aura-cart']

export default function StaffDemo() {
  const { t } = useTranslation()

  // Örnek verileri yükle (veritabanı bağlıysa tüm cihazlar görür)
  const loadDemo = async () => {
    const data = buildDemoData()
    await replaceShared('aura-orders', data.orders)
    await replaceShared('aura-requests', data.requests)
    await replaceShared('aura-feedback', data.feedback)
    await replaceShared('aura-reviews', data.reviews)
    await replaceShared('aura-soldout', data.soldOut)
    await replaceShared('aura-closed-bills', undefined)
    window.location.reload()
  }

  const resetAll = async () => {
    if (!window.confirm(t('demo.reset_confirm'))) return
    for (const key of DATA_KEYS) await replaceShared(key, undefined)
    window.location.reload()
  }

  return (
    <div>
      <StaffTitle line="route" title={t('demo.title')} subtitle={t('demo.subtitle')} />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Örnek veriler — lila-pembe geçiş */}
        <section className="flex flex-col rounded-card bg-primary p-5 text-card">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-card/15">
            <Database size={20} />
          </span>
          <h2 className="mt-4 text-2xl">{t('demo.load_title')}</h2>
          <p className="mt-1 flex-1 text-sm text-card/85">{t('demo.load_text')}</p>
          <button type="button" onClick={loadDemo} className="mt-5 h-12 rounded-[10px] bg-card font-display text-base font-bold text-primary">
            {t('demo.load')}
          </button>
        </section>

        {/* Sıfırla */}
        <section className="flex flex-col rounded-card border border-line bg-card p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-background">
            <RotateCcw size={20} />
          </span>
          <h2 className="mt-4 text-2xl">{t('demo.reset_title')}</h2>
          <p className="mt-1 flex-1 text-sm text-muted">{t('demo.reset_text')}</p>
          <button type="button" onClick={resetAll} className="mt-5 h-12 rounded-[10px] border border-ink text-base font-bold font-display">
            {t('demo.reset')}
          </button>
        </section>
      </div>
    </div>
  )
}