import { useMemo, useState } from 'react'
import { Section } from '../Section'
import { ShowMath } from '../ShowMath'
import { Mono } from '../Mono'
import { useDemo } from '../../DemoContext'
import { useLang } from '../../i18n/LanguageContext'
import { randomPrivateKey } from '../../crypto/keys'
import { bytesToHex } from '../../crypto/encoding'
import {
  publicKeyForScheme,
  signEcdsa,
  signEddsa,
  verifyWithPublicKey,
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

  // A stable "attacker" key, different from the signer's. The verifier using
  // THIS public key will always fail — proving the signature is bound to the
  // signer's specific key pair.
  const [wrongPriv] = useState(() => randomPrivateKey())

  const sign = () => {
    const result = scheme === 'ecdsa' ? signEcdsa(message, privateKey) : signEddsa(message, privateKey)
    setSigned({ msg: message, result })
  }

  // The signer's public key — this is all a verifier needs (no secret involved).
  const signerPub = useMemo(
    () => publicKeyForScheme(scheme, privateKey),
    [scheme, privateKey],
  )
  const wrongPub = useMemo(() => publicKeyForScheme(scheme, wrongPriv), [scheme, wrongPriv])

  // Verify with the CORRECT public key.
  const verification = useMemo(() => {
    if (!signed) return null
    return verifyWithPublicKey(signed.result.scheme, message, signed.result.signatureHex, signerPub)
  }, [signed, message, signerPub])

  // Verify with the WRONG public key — should always fail.
  const wrongVerification = useMemo(() => {
    if (!signed) return null
    return verifyWithPublicKey(signed.result.scheme, message, signed.result.signatureHex, wrongPub)
  }, [signed, message, wrongPub])

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

          {/* The asymmetry: verification needs only the public key. */}
          <div className="verify-grid">
            <div className="verify-card">
              <div className="verify-card__title">{t('sign.verifyCorrect')}</div>
              <Mono label={t('sign.signerPub')} value={bytesToHex(signerPub)} />
              <div className={`verdict ${verification ? 'verdict--ok' : 'verdict--bad'}`}>
                {verification ? t('sign.valid') : t('sign.invalid')}
              </div>
            </div>
            <div className="verify-card">
              <div className="verify-card__title">{t('sign.verifyWrong')}</div>
              <Mono label={t('sign.wrongPub')} value={bytesToHex(wrongPub)} />
              <div className={`verdict ${wrongVerification ? 'verdict--ok' : 'verdict--bad'}`}>
                {wrongVerification ? t('sign.valid') : t('sign.wrongFail')}
              </div>
            </div>
          </div>
          {tampered && <p className="note note--warn">{t('sign.tamperHint')}</p>}
          <p className="note">{t('sign.asymmetryNote')}</p>

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
