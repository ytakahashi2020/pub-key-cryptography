import { useDemo } from '../DemoContext'
import { useLang } from '../i18n/LanguageContext'
import { bytesToHex } from '../crypto/encoding'
import { parsePrivateKeyHex } from '../crypto/keys'

/** Shared control: generate a random key or type your own hex. Drives all sections. */
export function PrivateKeyInput() {
  const { t } = useLang()
  const { privateKey, setPrivateKey, regenerate } = useDemo()
  const hex = bytesToHex(privateKey)

  const onChange = (raw: string) => {
    const cleaned = raw.trim()
    if (/^(0x)?[0-9a-fA-F]*$/.test(cleaned) && cleaned.replace(/^0x/, '').length <= 64) {
      try {
        setPrivateKey(parsePrivateKeyHex(cleaned || '0'))
      } catch {
        /* ignore malformed intermediate input */
      }
    }
  }

  return (
    <div className="privkey">
      <label className="privkey__label">{t('common.privKeyLabel')}</label>
      <div className="privkey__row">
        <input
          className="privkey__input"
          value={hex}
          spellCheck={false}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="privkey__gen" onClick={regenerate}>
          {t('common.generate')}
        </button>
      </div>
    </div>
  )
}
