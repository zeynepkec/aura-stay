import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
  { code: 'el', label: 'ΕΛ' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex rounded-full border border-line bg-card p-1">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => i18n.changeLanguage(code)}
          className={`h-9 min-w-[40px] rounded-full px-2 text-xs font-semibold ${
            i18n.resolvedLanguage === code ? 'bg-primary text-card' : 'text-muted'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}