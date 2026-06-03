import { Section } from '../Section'
import { useLang } from '../../i18n/LanguageContext'

const LINKS = [
  { label: 'noble-curves (secp256k1 / ed25519)', url: 'https://github.com/paulmillr/noble-curves' },
  { label: 'noble-hashes (SHA-256 / Keccak / RIPEMD)', url: 'https://github.com/paulmillr/noble-hashes' },
  { label: 'EIP-55 (Ethereum checksum addresses)', url: 'https://eips.ethereum.org/EIPS/eip-55' },
  { label: 'Solana — Keys & Wallets', url: 'https://solana.com/docs/core/accounts' },
  { label: 'BIP-173 (Bech32 / SegWit addresses)', url: 'https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki' },
]

export function SummarySection() {
  const { t } = useLang()
  return (
    <Section id="summary" title={t('summary.title')}>
      <h3 className="subhead">{t('summary.points')}</h3>
      <ul className="takeaways">
        <li>{t('summary.p1')}</li>
        <li>{t('summary.p2')}</li>
        <li>{t('summary.p3')}</li>
      </ul>

      <h3 className="subhead">{t('summary.caveats')}</h3>
      <ul className="caveats">
        <li>{t('summary.c1')}</li>
        <li>{t('summary.c2')}</li>
      </ul>

      <h3 className="subhead">{t('summary.links')}</h3>
      <ul className="links">
        {LINKS.map((l) => (
          <li key={l.url}>
            <a href={l.url} target="_blank" rel="noreferrer noopener">
              {l.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
