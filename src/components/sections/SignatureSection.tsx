import { useMemo, useState } from 'react'
import { Section } from '../Section'
import { ShowMath } from '../ShowMath'
import { Mono } from '../Mono'
import { useDemo } from '../../DemoContext'
import { useLang } from '../../i18n/LanguageContext'
import {
  signEcdsa,
  signEddsa,
  verifyEcdsa,
  verifyEddsa,
  type Scheme,
  type SignResult,
} from '../../crypto/signatures'

export function SignatureSection() {
  const { t } = useLang()
  const { privateKey } = useDemo()

  const [scheme, setScheme] = useState<Scheme>('eddsa') // Solana-first default
  const [message, setMessage] = useState('gm, blockchain!')
  // The message that was actually signed (snapshot). Editing `message` after
  // this is set is what triggers the tamper-detection.
  const [signed, setSigned] = useState<{ msg: string; result: SignResult } | null>(null)

  const sign = () => {
    const result = scheme === 'ecdsa' ? signEcdsa(message, privateKey) : signEddsa(message, privateKey)
    setSigned({ msg: message, result })
  }

  // Re-sign automatically if the user switches scheme after having signed.
  const verification = useMemo(() => {
    if (!signed) return null
    const ok =
      signed.result.scheme === 'ecdsa'
        ? verifyEcdsa(message, signed.result.signatureHex, privateKey)
        : verifyEddsa(message, signed.result.signatureHex, privateKey)
    return ok
  }, [signed, message, privateKey])

  const tampered = signed !== null && message !== signed.msg

  return (
    <Section id="sign" title={t('sign.title')} lead={t('sign.lead')}>
      <div className="scheme-switch">
        <span className="scheme-switch__label">{t('sign.scheme')}:</span>
        <label className={scheme === 'eddsa' ? 'is-active' : ''}>
          <input
            type="radio"
            checked={scheme === 'eddsa'}
            onChange={() => {
              setScheme('eddsa')
              setSigned(null)
            }}
          />
          {t('sign.eddsa')}
        </label>
        <label className={scheme === 'ecdsa' ? 'is-active' : ''}>
          <input
            type="radio"
            checked={scheme === 'ecdsa'}
            onChange={() => {
              setScheme('ecdsa')
              setSigned(null)
            }}
          />
          {t('sign.ecdsa')}
        </label>
      </div>

      <label className="field-label">{t('sign.message')}</label>
      <textarea
        className={`message-input ${tampered ? 'is-tampered' : ''}`}
        value={message}
        rows={2}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="btn-primary" onClick={sign}>
        {t('sign.signBtn')}
      </button>

      {signed && (
        <>
          <Mono label={t('sign.signature')} value={signed.result.signatureHex} />
          <div className={`verdict ${verification ? 'verdict--ok' : 'verdict--bad'}`}>
            {verification ? t('sign.valid') : t('sign.invalid')}
          </div>
          {tampered && <p className="note note--warn">{t('sign.tamperHint')}</p>}

          <ShowMath>
            <ol className="steps">
              {signed.result.parts.map((p, i) => (
                <li key={i} className="steps__item">
                  <div className="steps__label">{t(p.labelKey)}</div>
                  <code className="steps__value">{p.value}</code>
                </li>
              ))}
            </ol>
            <p className="note">{t('sign.deterministic')}</p>
          </ShowMath>
        </>
      )}

      <div className="callout">{t('sign.notEncrypt')}</div>
    </Section>
  )
}
