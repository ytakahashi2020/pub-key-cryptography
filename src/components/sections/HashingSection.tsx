import { useMemo, useState } from 'react'
import { Section } from '../Section'
import { Mono } from '../Mono'
import { HashAvalanche } from '../viz/HashAvalanche'
import { useLang } from '../../i18n/LanguageContext'
import { keccak256Hex, sha256Hex } from '../../crypto/hashing'

export function HashingSection() {
  const { t } = useLang()
  const [text, setText] = useState('blockchain')

  const sha = useMemo(() => sha256Hex(text), [text])
  const keccak = useMemo(() => keccak256Hex(text), [text])

  // avalanche: compare hash(text) vs hash(text + "x")
  const shaA = sha
  const shaB = useMemo(() => sha256Hex(text + 'x'), [text])

  return (
    <Section id="hash" title={t('hash.title')} lead={t('hash.lead')}>
      <label className="field-label">{t('hash.input')}</label>
      <input className="text-input" value={text} onChange={(e) => setText(e.target.value)} />

      <Mono label={t('hash.sha256')} value={sha} />
      <Mono label={t('hash.keccak')} value={keccak} />

      <div className="oneway">{t('hash.oneway')}</div>

      <h3 className="subhead">{t('hash.avalanche')}</h3>
      <p className="note">{t('hash.avalancheDesc')}</p>
      <HashAvalanche hexA={shaA} hexB={shaB} />

      <h3 className="subhead">{t('hash.whySign')}</h3>
      <p className="note">{t('hash.whySignDesc')}</p>

      <div className="callout">
        <strong>{t('hash.addrRecap')}</strong>
        <ul className="recap">
          <li>
            <span className="chain-pill chain-pill--solana is-active">{t('chain.solana')}</span>{' '}
            {t('compare.val.none')} → Base58
          </li>
          <li>
            <span className="chain-pill chain-pill--bitcoin is-active">{t('chain.bitcoin')}</span>{' '}
            SHA-256 → RIPEMD-160 → Base58Check
          </li>
          <li>
            <span className="chain-pill chain-pill--ethereum is-active">{t('chain.ethereum')}</span>{' '}
            Keccak-256 → last 20 bytes → EIP-55
          </li>
        </ul>
      </div>
    </Section>
  )
}
