import { useMemo } from 'react'
import type { Point, ToyCurve } from '../../crypto/toycurve'
import { allPoints } from '../../crypto/toycurve'

const SIZE = 460
const PAD = 28

interface Props {
  curve: ToyCurve
  /** Points to highlight, with a CSS color class suffix. */
  highlights?: { point: Point; kind: 'G' | 'P' | 'Q' | 'R' | 'sum' }[]
  /** A line to draw (chord/tangent) between two screen points. */
  line?: { from: Point; to: Point } | null
  onPick?: (pt: Point) => void
}

const KIND_COLOR: Record<string, string> = {
  G: '#10b981',
  P: '#3b82f6',
  Q: '#f59e0b',
  R: '#ef4444',
  sum: '#ef4444',
}

export function CurvePlot({ curve, highlights = [], line, onPick }: Props) {
  const pts = useMemo(() => allPoints(curve), [curve])
  const p = Number(curve.p)
  const inner = SIZE - PAD * 2
  const sx = (x: number) => PAD + (x / (p - 1)) * inner
  const sy = (y: number) => SIZE - PAD - (y / (p - 1)) * inner

  const highlightMap = new Map<string, string>()
  for (const h of highlights) {
    if (h.point) highlightMap.set(`${h.point.x},${h.point.y}`, h.kind)
  }

  return (
    <svg className="curveplot" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img">
      {/* axes */}
      <line x1={PAD} y1={SIZE - PAD} x2={SIZE - PAD} y2={SIZE - PAD} className="curveplot__axis" />
      <line x1={PAD} y1={SIZE - PAD} x2={PAD} y2={PAD} className="curveplot__axis" />

      {/* chord / tangent line */}
      {line && line.from && line.to && (
        <line
          x1={sx(Number(line.from.x))}
          y1={sy(Number(line.from.y))}
          x2={sx(Number(line.to.x))}
          y2={sy(Number(line.to.y))}
          className="curveplot__chord"
        />
      )}

      {/* all curve points */}
      {pts.map((pt, i) => {
        if (!pt) return null
        const key = `${pt.x},${pt.y}`
        const kind = highlightMap.get(key)
        const cx = sx(Number(pt.x))
        const cy = sy(Number(pt.y))
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={kind ? 7 : 3.5}
            fill={kind ? KIND_COLOR[kind] : '#94a3b8'}
            stroke={kind ? '#0f172a' : 'none'}
            strokeWidth={kind ? 1.5 : 0}
            className={onPick ? 'curveplot__pt curveplot__pt--clickable' : 'curveplot__pt'}
            onClick={onPick ? () => onPick(pt) : undefined}
          />
        )
      })}

      {/* highlight labels */}
      {highlights.map((h, i) =>
        h.point ? (
          <text
            key={i}
            x={sx(Number(h.point.x)) + 9}
            y={sy(Number(h.point.y)) - 9}
            className="curveplot__label"
            fill={KIND_COLOR[h.kind]}
          >
            {h.kind === 'sum' ? 'P+Q' : h.kind}
          </text>
        ) : null,
      )}
    </svg>
  )
}
