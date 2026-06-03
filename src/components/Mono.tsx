import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

/** A monospace value box with a copy button. Used for hex / addresses / etc. */
export function Mono({ value, label, breakAll = true }: { value: string; label?: string; breakAll?: boolean }) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      /* clipboard may be unavailable */
    }
  }

  const copyLabel = label ? `${t('common.copy')}: ${label}` : t('common.copy')

  return (
    <div className="mono">
      {label && <div className="mono__label">{label}</div>}
      <div className="mono__row">
        <code className={breakAll ? 'mono__value mono__value--break' : 'mono__value'}>{value}</code>
        <button
          className="mono__copy"
          onClick={copy}
          title={t('common.copy')}
          aria-label={copyLabel}
        >
          <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
        </button>
      </div>
    </div>
  )
}
