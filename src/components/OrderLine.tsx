import { useTranslation } from 'react-i18next'
import { ORDER_STEPS } from '../store/StayContext'
import '../translations/orders'

// Siparişin durakları yatay bir metro hattı üzerinde: Alındı → Hazırlanıyor → Yolda → Teslim
export default function OrderLine({ step, color = 'bg-discover' }: { step: number; color?: string }) {
  const { t } = useTranslation()
  const pct = (i: number) => `${(i / (ORDER_STEPS.length - 1)) * 100}%`
  return (
    <div>
      <div className="relative mx-2 h-7">
        <span className="absolute inset-x-0 top-[11px] h-1.5 rounded-full bg-line" />
        <span className={`absolute left-0 top-[11px] h-1.5 rounded-full ${color}`} style={{ width: pct(step) }} />
        {ORDER_STEPS.map((s, i) => (
          <span
            key={s}
            className={`absolute -translate-x-1/2 rounded-full border-solid ${
              i === step
                ? 'top-px h-[26px] w-[26px] border-[6px] border-primary bg-card'
                : i < step
                  ? `top-1.5 h-4 w-4 border-[3px] border-card ${color}`
                  : 'top-1.5 h-4 w-4 border-[3px] border-line bg-card'
            }`}
            style={{ left: pct(i) }}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4 text-xs text-muted">
        {ORDER_STEPS.map((s, i) => (
          <span key={s} className={`${i === 0 ? 'text-left' : i === ORDER_STEPS.length - 1 ? 'text-right' : 'text-center'} ${i === step ? 'font-bold text-ink' : ''}`}>
            {t(`orders.status.${s}`)}
          </span>
        ))}
      </div>
    </div>
  )
}
