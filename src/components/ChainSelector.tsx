import { useDemo, type Chain } from '../DemoContext'
import { useLang } from '../i18n/LanguageContext'

const CHAINS: Chain[] = ['solana', 'bitcoin', 'ethereum']

export function ChainSelector({ compact = false }: { compact?: boolean }) {
  const { t } = useLang()
  const { focusChain, setFocusChain } = useDemo()
  return (
    <div className={compact ? 'chain-selector chain-selector--compact' : 'chain-selector'}>
      {!compact && <span className="chain-selector__label">{t('chain.focus')}:</span>}
      {CHAINS.map((c) => (
        <button
          key={c}
          className={`chain-pill chain-pill--${c} ${focusChain === c ? 'is-active' : ''}`}
          onClick={() => setFocusChain(c)}
        >
          {t(`chain.${c}`)}
        </button>
      ))}
    </div>
  )
}
