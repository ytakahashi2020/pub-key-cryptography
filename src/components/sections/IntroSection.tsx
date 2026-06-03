import { Section } from '../Section'
import { ChainSelector } from '../ChainSelector'
import { useLang } from '../../i18n/LanguageContext'

export function IntroSection() {
  const { t } = useLang()
  return (
    <Section id="intro" title={t('intro.title')} lead={t('intro.lead')}>
      <div className="safety">
        <p>{t('safety.local')}</p>
        <p className="safety__warn">{t('safety.realkey')}</p>
      </div>

      <h3 className="subhead">{t('intro.roadmap')}</h3>
      <div className="roadmap">
        <span className="roadmap__node roadmap__node--priv">{t('intro.road.priv')}</span>
        <span className="roadmap__arrow">→</span>
        <span className="roadmap__node roadmap__node--pub">{t('intro.road.pub')}</span>
        <span className="roadmap__arrow">→</span>
        <span className="roadmap__node roadmap__node--addr">{t('intro.road.addr')}</span>
        <span className="roadmap__arrow">＋</span>
        <span className="roadmap__node roadmap__node--sign">{t('intro.road.sign')}</span>
      </div>
      <p className="note">{t('intro.road.note')}</p>

      <h3 className="subhead">{t('intro.pickChain')}</h3>
      <ChainSelector />
    </Section>
  )
}
