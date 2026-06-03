import { useMemo } from 'react'
import { Section } from '../Section'
import { PrivateKeyInput } from '../PrivateKeyInput'
import { useDemo } from '../../DemoContext'
import { useLang } from '../../i18n/LanguageContext'
import {
  ed25519PublicKey,
  secpPublicKeyCompressed,
  secpPublicKeyUncompressed,
} from '../../crypto/keys'
import { bitcoinP2PKH, ethereumAddress, solanaAddress } from '../../crypto/addresses'
import { ellipsize } from '../../crypto/encoding'

export function ComparisonSection() {
  const { t } = useLang()
  const { privateKey } = useDemo()

  const addrs = useMemo(() => {
    return {
      sol: solanaAddress(ed25519PublicKey(privateKey)).address,
      btc: bitcoinP2PKH(secpPublicKeyCompressed(privateKey)).address,
      eth: ethereumAddress(secpPublicKeyUncompressed(privateKey)).address,
    }
  }, [privateKey])

  const rows: { label: string; sol: string; btc: string; eth: string }[] = [
    { label: t('compare.row.curve'), sol: 'Ed25519', btc: 'secp256k1', eth: 'secp256k1' },
    { label: t('compare.row.scheme'), sol: 'EdDSA', btc: 'ECDSA', eth: 'ECDSA' },
    {
      label: t('compare.row.addrHash'),
      sol: t('compare.val.none'),
      btc: 'SHA-256 + RIPEMD-160',
      eth: 'Keccak-256',
    },
    { label: t('compare.row.encoding'), sol: 'Base58', btc: 'Base58Check', eth: 'hex + EIP-55' },
    {
      label: t('compare.row.keyFormat'),
      sol: t('compare.val.seed'),
      btc: t('compare.val.scalar'),
      eth: t('compare.val.scalar'),
    },
    {
      label: t('compare.row.address'),
      sol: ellipsize(addrs.sol, 6, 6),
      btc: ellipsize(addrs.btc, 6, 6),
      eth: ellipsize(addrs.eth, 6, 6),
    },
  ]

  return (
    <Section id="compare" title={t('compare.title')} lead={t('compare.lead')}>
      <PrivateKeyInput />
      <div className="compare-wrap">
        <table className="compare">
          <thead>
            <tr>
              <th></th>
              <th className="compare__head compare__head--solana">{t('chain.solana')}</th>
              <th className="compare__head compare__head--bitcoin">{t('chain.bitcoin')}</th>
              <th className="compare__head compare__head--ethereum">{t('chain.ethereum')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={r.label === t('compare.row.address') ? 'compare__addr-row' : ''}>
                <th className="compare__rowlabel">{r.label}</th>
                <td><code>{r.sol}</code></td>
                <td><code>{r.btc}</code></td>
                <td><code>{r.eth}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
