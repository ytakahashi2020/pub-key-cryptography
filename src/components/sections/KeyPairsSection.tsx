import { useMemo } from 'react'
import { Section } from '../Section'
import { ShowMath } from '../ShowMath'
import { Mono } from '../Mono'
import { PrivateKeyInput } from '../PrivateKeyInput'
import { useDemo } from '../../DemoContext'
import { useLang } from '../../i18n/LanguageContext'
import {
  ed25519PublicKey,
  secpPublicKeyCompressed,
  secpPublicKeyUncompressed,
} from '../../crypto/keys'
import { bitcoinP2PKH, ethereumAddress, solanaAddress, type AddressResult } from '../../crypto/addresses'
import { bytesToHex } from '../../crypto/encoding'

function ChainCard({
  name,
  pubLabel,
  pubValue,
  result,
}: {
  name: string
  pubLabel: string
  pubValue: string
  result: AddressResult
  chainClass: string
}) {
  const { t } = useLang()
  return (
    <div className="chaincard">
      <h4 className="chaincard__name">{name}</h4>
      <Mono label={pubLabel} value={pubValue} />
      <div className="chaincard__addr">
        <span className="chaincard__addrlabel">{t('keys.address')}</span>
        <Mono value={result.address} />
      </div>
      <ShowMath>
        <ol className="steps">
          {result.steps.map((s, i) => (
            <li key={i} className="steps__item">
              <div className="steps__label">{t(s.labelKey)}</div>
              <code className="steps__value">{s.value}</code>
              {s.noteKey && <div className="steps__note">{t(s.noteKey)}</div>}
            </li>
          ))}
        </ol>
      </ShowMath>
    </div>
  )
}

export function KeyPairsSection() {
  const { t } = useLang()
  const { privateKey } = useDemo()

  const derived = useMemo(() => {
    const secpComp = secpPublicKeyCompressed(privateKey)
    const secpUncomp = secpPublicKeyUncompressed(privateKey)
    const edPub = ed25519PublicKey(privateKey)
    return {
      secpComp,
      secpUncomp,
      edPub,
      sol: solanaAddress(edPub),
      btc: bitcoinP2PKH(secpComp),
      eth: ethereumAddress(secpUncomp),
    }
  }, [privateKey])

  return (
    <Section id="keys" title={t('keys.title')} lead={t('keys.lead')}>
      <PrivateKeyInput />

      <div className="chaincards">
        <ChainCard
          name={t('chain.solana')}
          chainClass="solana"
          pubLabel={t('keys.pubEd')}
          pubValue={bytesToHex(derived.edPub)}
          result={derived.sol}
        />
        <ChainCard
          name={t('chain.bitcoin')}
          chainClass="bitcoin"
          pubLabel={t('keys.pubCompressed')}
          pubValue={bytesToHex(derived.secpComp)}
          result={derived.btc}
        />
        <ChainCard
          name={t('chain.ethereum')}
          chainClass="ethereum"
          pubLabel={t('keys.pubUncompressed')}
          pubValue={bytesToHex(derived.secpUncomp)}
          result={derived.eth}
        />
      </div>

      <div className="highlight">{t('keys.highlight')}</div>
      <p className="note">
        <strong>{t('common.intermediate')}: </strong>
        {t('keys.solNote')}
      </p>
    </Section>
  )
}
