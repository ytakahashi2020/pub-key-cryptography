import type { ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { LanguageToggle } from './LanguageToggle'

const NAV = [
  { id: 'intro', key: 'nav.intro' },
  { id: 'keys', key: 'nav.keys' },
  { id: 'ecc', key: 'nav.ecc' },
  { id: 'sign', key: 'nav.sign' },
  { id: 'hash', key: 'nav.hash' },
  { id: 'compare', key: 'nav.compare' },
  { id: 'summary', key: 'nav.summary' },
]

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useLang()
  return (
    <div className="layout">
      <header className="header">
        <div className="header__bar">
          <a href="#intro" className="header__brand">
            <span className="header__logo">🔑</span>
            <span>
              <strong className="header__title">{t('app.title')}</strong>
              <span className="header__subtitle">{t('app.subtitle')}</span>
            </span>
          </a>
          <LanguageToggle />
        </div>
        <nav className="header__nav">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="header__navlink">
              {t(n.key)}
            </a>
          ))}
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">{t('footer.built')}</footer>
    </div>
  )
}
