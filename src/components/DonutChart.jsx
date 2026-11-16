import { useState } from 'react'
import { rupiah } from '../config/api'

const COLORS = ['#1B3A6B', '#3F5F9A', '#6F8CBF', '#A3B7DA', '#FFD93D']

export default function DonutChart({ items }) {
  const [sel, setSel] = useState(null)

  const sorted = [...items].sort((a, b) => b.total - a.total)
  const rest = sorted.slice(4).reduce((s, x) => s + x.total, 0)
  const data = sorted.length <= 5 ? sorted : [...sorted.slice(0, 4), { name: 'Lainnya', total: rest }]
  const total = data.reduce((s, x) => s + x.total, 0)

  if (!total) return <p className="muted">Belum ada pengeluaran bulan ini.</p>

  const R = 60
  const C = 2 * Math.PI * R
  let offset = 0
  const slices = data.map((d, i) => {
    const len = (d.total / total) * C
    const s = { ...d, len, offset, color: COLORS[i] }
    offset += len
    return s
  })

  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 160 160" className="donut" role="img" aria-label="Pengeluaran per kategori">
        <g transform="rotate(-90 80 80)">
          {slices.map((s, i) => (
            <circle
              key={s.name}
              cx="80" cy="80" r={R} fill="none"
              stroke={s.color}
              strokeWidth={sel === i ? 26 : 22}
              strokeDasharray={`${s.len} ${C - s.len}`}
              strokeDashoffset={-s.offset}
              onClick={() => setSel(sel === i ? null : i)}
            />
          ))}
        </g>
        <text x="80" y="75" textAnchor="middle" fontSize="9" fill="#6B7A99">
          {sel === null ? 'Total keluar' : slices[sel].name}
        </text>
        <text x="80" y="92" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1B3A6B">
          {rupiah(sel === null ? total : slices[sel].total)}
        </text>
      </svg>

      <ul className="legend">
        {slices.map((s, i) => (
          <li key={s.name} className={sel === i ? 'on' : ''}>
            <button type="button" onClick={() => setSel(sel === i ? null : i)}>
              <i style={{ background: s.color }} />
              <span>{s.name}</span>
              <b>{rupiah(s.total)}</b>
              <small>{Math.round((s.total / total) * 100)}%</small>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
