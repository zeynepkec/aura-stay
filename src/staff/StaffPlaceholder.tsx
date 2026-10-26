import { Hammer } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import '../translations/staff'

export default function StaffPlaceholder({ tab }: { tab: string }) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center rounded-card border border-line bg-card px-6 py-20 text-center">
      <Hammer size={32} className="text-muted" />
      <h1 className="mt-4 font-title text-[28px] font-extrabold">{t(`staff.tabs.${tab}`)}</h1>
      <p className="mt-1 text-sm text-muted">{t('staff.soon')}</p>
    </div>
  )
}