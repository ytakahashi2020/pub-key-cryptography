import { useLang } from '../i18n/LanguageContext'

export function LanguageToggle() {
  const { t, toggle } = useLang()
  return (
    <button className="lang-toggle" onClick={toggle}>
      {t('lang.toggle')}
    </button>
  )
}
