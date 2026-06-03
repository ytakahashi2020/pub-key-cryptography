import { useState, type ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'

/** Reusable collapsible "show the math" panel, used across every section. */
export function ShowMath({ children }: { children: ReactNode }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  return (
    <div className="show-math">
      <button className="show-math__toggle" onClick={() => setOpen((o) => !o)}>
        {open ? '▾ ' + t('common.hideMath') : '▸ ' + t('common.showMath')}
      </button>
      {open && <div className="show-math__body">{children}</div>}
    </div>
  )
}
