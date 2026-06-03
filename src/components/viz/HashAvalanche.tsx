import { hashDiff } from '../../crypto/hashing'

/** Renders two hex hashes with differing nibbles highlighted in red. */
export function HashAvalanche({ hexA, hexB }: { hexA: string; hexB: string }) {
  const { diffNibbles, changedBits, totalBits } = hashDiff(hexA, hexB)
  return (
    <div className="avalanche">
      <div className="avalanche__row">
        <span className="avalanche__tag">A</span>
        <code className="avalanche__hex">{hexA}</code>
      </div>
      <div className="avalanche__row">
        <span className="avalanche__tag">B</span>
        <code className="avalanche__hex">
          {hexB.split('').map((c, i) => (
            <span key={i} className={diffNibbles[i] ? 'avalanche__diff' : undefined}>
              {c}
            </span>
          ))}
        </code>
      </div>
      <div className="avalanche__meter">
        <div
          className="avalanche__bar"
          style={{ width: `${totalBits ? (changedBits / totalBits) * 100 : 0}%` }}
        />
      </div>
      <div className="avalanche__count">
        {changedBits} / {totalBits} bits ({totalBits ? Math.round((changedBits / totalBits) * 100) : 0}%)
      </div>
    </div>
  )
}
