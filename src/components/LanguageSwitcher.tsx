import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
  { code: 'el', label: 'ΕΛ' },
]

// dark: koyu mavi tabelanın üstünde kullanılır
export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { i18n } = useTranslation()

  return (
    <div className={`flex gap-0.5 rounded-lg p-[3px] ${dark ? 'bg-card/15' : 'border border-line bg-card'}`}>
      {languages.map(({ code, label }) => {
        const active = i18n.resolvedLanguage === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => i18n.changeLanguage(code)}
            className={`h-8 min-w-[38px] rounded-md px-2 font-display text-[13px] font-bold ${
              active ? (dark ? 'bg-card text-primary' : 'bg-primary text-card') : dark ? 'text-card' : 'text-muted'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
