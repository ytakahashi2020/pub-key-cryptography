import { useMemo, useState } from 'react'
import { Section } from '../Section'
import { ShowMath } from '../ShowMath'
import { CurvePlot } from '../viz/CurvePlot'
import { useLang } from '../../i18n/LanguageContext'
import {
  DEFAULT_CURVE,
  DEFAULT_GENERATOR,
  add,
  order,
  scalarMul,
  type Point,
} from '../../crypto/toycurve'

function fmt(pt: Point): string {
  return pt === null ? 'O' : `(${pt.x}, ${pt.y})`
}

export function EllipticCurveSection() {
  const { t } = useLang()
  const curve = DEFAULT_CURVE
  const G = DEFAULT_GENERATOR
  const grpOrder = useMemo(() => order(G, curve), [G, curve])

  // --- scalar multiplication explorer ---
  const [k, setK] = useState(5)
  const kG = useMemo(() => scalarMul(BigInt(k), G, curve), [k, G, curve])

  // --- point addition picker ---
  const [picks, setPicks] = useState<Point[]>([])
  const onPick = (pt: Point) => {
    setPicks((prev) => {
      if (prev.length >= 2) return [pt]
      // avoid duplicate of same screen point as both P and Q for clarity
      return [...prev, pt]
    })
  }
  const P = picks[0] ?? null
  const Q = picks[1] ?? null
  const sum = P && Q ? add(P, Q, curve) : null

  // --- discrete-log challenge ---
  const challengeK = 13
  const challengePoint = useMemo(() => scalarMul(BigInt(challengeK), G, curve), [G, curve])
  const [revealed, setRevealed] = useState(false)

  return (
    <Section id="ecc" title={t('ecc.title')} lead={t('ecc.lead')}>
      <div className="ecc-curve-eq">
        <strong>{t('ecc.curveEq')}:</strong> y² = x³ + 7 (mod 97) · G = (1, 28) ·{' '}
        {t('compare.row.curve') /* reuse */ && `#points = ${grpOrder}`}
      </div>
      <div className="warning">{t('ecc.warning')}</div>

      <div className="ecc-grid">
        {/* scalar multiplication */}
        <div className="ecc-panel">
          <h4 className="subhead">k·G</h4>
          <CurvePlot
            curve={curve}
            highlights={[
              { point: G, kind: 'G' },
              { point: kG, kind: 'R' },
            ]}
          />
          <label className="ecc-slider-label">
            {t('ecc.scalarLabel')}: <strong>{k}</strong>
          </label>
          <input
            className="ecc-slider"
            type="range"
            min={1}
            max={grpOrder}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          />
          <div className="ecc-result">
            {t('ecc.result')}: <code>{kG === null ? t('ecc.identity') : fmt(kG)}</code>
          </div>
        </div>

        {/* point addition */}
        <div className="ecc-panel">
          <h4 className="subhead">{t('ecc.addTitle')}</h4>
          <CurvePlot
            curve={curve}
            onPick={onPick}
            line={P && Q ? { from: P, to: Q } : null}
            highlights={[
              ...(P ? [{ point: P, kind: 'P' as const }] : []),
              ...(Q ? [{ point: Q, kind: 'Q' as const }] : []),
              ...(sum ? [{ point: sum, kind: 'sum' as const }] : []),
            ]}
          />
          <p className="note">{t('ecc.pickTwo')}</p>
          <div className="ecc-result">
            P = <code>{fmt(P)}</code> ＋ Q = <code>{fmt(Q)}</code> ={' '}
            <code className="ecc-sum">{P && Q ? fmt(sum) : '—'}</code>
          </div>
        </div>
      </div>

      {/* discrete log challenge */}
      <div className="ecc-challenge">
        <h4 className="subhead">{t('ecc.challenge')}</h4>
        <p className="note">{t('ecc.challengeDesc')}</p>
        <div className="ecc-result">
          k·G = <code>{fmt(challengePoint)}</code>, G = <code>{fmt(G)}</code> → k = ?{' '}
          <button className="btn-inline" onClick={() => setRevealed((r) => !r)}>
            {t('ecc.challengeAnswer')}
          </button>
          {revealed && <strong className="ecc-answer"> k = {challengeK}</strong>}
        </div>
      </div>

      <ShowMath>
        <div className="formula">
          <p>
            <strong>{t('common.intermediate')}</strong>
          </p>
          <p>λ = (y_Q − y_P) / (x_Q − x_P) mod p （異なる2点 / two distinct points）</p>
          <p>λ = (3·x_P² + a) / (2·y_P) mod p （同じ点を2倍 / doubling）</p>
          <p>x_R = λ² − x_P − x_Q, &nbsp; y_R = λ·(x_P − x_R) − y_P</p>
          <hr />
          <p>{t('ecc.realCurves')}:</p>
          <p>{t('ecc.realSecp')}</p>
          <p>{t('ecc.realEd')}</p>
        </div>
      </ShowMath>
    </Section>
  )
}
