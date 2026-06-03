import { useMemo } from 'react'
import { Section } from '../Section'
import { ShowMath } from '../ShowMath'
import { Mono } from '../Mono'
import { PrivateKeyInput } from '../PrivateKeyInput'
import { ChainSelector } from '../ChainSelector'
import { useDemo, type Chain } from '../../DemoContext'
import { useLang } from '../../i18n/LanguageContext'
import {
  ed25519PublicKey,
  secpPublicKeyCompressed,
  secpPublicKeyUncompressed,
} from '../../crypto/keys'
import {
  bitcoinBech32,
  bitcoinP2PKH,
  ethereumAddress,
  solanaAddress,
  type AddressResult,
} from '../../crypto/addresses'
import { bytesToHex } from '../../crypto/encoding'

function StepList({ result }: { result: AddressResult }) {
  const { t } = useLang()
  return (
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
  )
}

function ChainCard({
  name,
  pubLabel,
  pubValue,
  result,
  extra,
  chainClass,
  focused,
}: {
  name: string
  pubLabel: string
  pubValue: string
  result: AddressResult
  extra?: { label: string; result: AddressResult }
  chainClass: Chain
  focused: boolean
}) {
  const { t } = useLang()
  return (
    <div className={`chaincard chaincard--${chainClass} ${focused ? 'is-focused' : ''}`}>
      <h4 className="chaincard__name">{name}</h4>
      <Mono label={pubLabel} value={pubValue} />
      <div className="chaincard__addr">
        <span className="chaincard__addrlabel">{extra ? t('keys.addrLegacy') : t('keys.address')}</span>
        <Mono value={result.address} />
      </div>
      <StepList result={result} />
      {extra && (
        <>
          <div className="chaincard__addr">
            <span className="chaincard__addrlabel">{extra.label}</span>
            <Mono value={extra.result.address} />
          </div>
          <StepList result={extra.result} />
        </>
      )}
    </div>
  )
}

export function KeyPairsSection() {
  const { t } = useLang()
  const { privateKey, focusChain } = useDemo()

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
      btcBech32: bitcoinBech32(secpComp),
      eth: ethereumAddress(secpUncomp),
    }
  }, [privateKey])

  const cards = useMemo(
    () => [
      {
        chain: 'solana' as Chain,
        name: t('chain.solana'),
        pubLabel: t('keys.pubEd'),
        pubValue: bytesToHex(derived.edPub),
        result: derived.sol,
        extra: undefined,
      },
      {
        chain: 'bitcoin' as Chain,
        name: t('chain.bitcoin'),
        pubLabel: t('keys.pubCompressed'),
        pubValue: bytesToHex(derived.secpComp),
        result: derived.btc,
        extra: { label: t('keys.addrSegwit'), result: derived.btcBech32 },
      },
      {
        chain: 'ethereum' as Chain,
        name: t('chain.ethereum'),
        pubLabel: t('keys.pubUncompressed'),
        pubValue: bytesToHex(derived.secpUncomp),
        result: derived.eth,
        extra: undefined,
      },
    ],
    [t, derived],
  )

  // Bring the focused chain to the front so the user's pick leads.
  const ordered = [...cards].sort(
    (a, b) => Number(b.chain === focusChain) - Number(a.chain === focusChain),
  )

  return (
    <Section id="keys" title={t('keys.title')} lead={t('keys.lead')}>
      <PrivateKeyInput />
      <ChainSelector />

      <div className="chaincards">
        {ordered.map((c) => (
          <ChainCard
            key={c.chain}
            name={c.name}
            chainClass={c.chain}
            focused={c.chain === focusChain}
            pubLabel={c.pubLabel}
            pubValue={c.pubValue}
            result={c.result}
            extra={c.extra}
          />
        ))}
      </div>

      <div className="highlight">{t('keys.highlight')}</div>
      <p className="note">
        <strong>{t('common.intermediate')}: </strong>
        {t('keys.solNote')}
      </p>
    </Section>
  )
}
