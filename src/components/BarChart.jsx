import { useState } from 'react'
import { rupiah, bulanLabel, bulanSingkat } from '../config/api'

export default function BarChart({ data }) {
  const [sel, setSel] = useState(null)

  if (!data.length) return <p className="muted">Belum ada data. Catat transaksi pertamamu!</p>

  const max = Math.max(...data.flatMap((d) => [d.pemasukan, d.pengeluaran]), 1)
  const H = 130
  const lebar = 320 / data.length
  const tinggi = (v) => (v / max) * H

  return (
    <div>
      <svg viewBox="0 0 320 172" className="bars" role="img"
        aria-label="Pemasukan dan pengeluaran 6 bulan terakhir">
        {[0, 0.5, 1].map((g) => (
          <line key={g} x1="0" x2="320" y1={150 - g * H} y2={150 - g * H} stroke="#E6DFB0" />
        ))}
        {data.map((d, i) => {
          const x = i * lebar + lebar / 2
          return (
            <g key={d.month} onClick={() => setSel(sel === i ? null : i)}>
              <rect x={x - 16} y={150 - tinggi(d.pemasukan)} width="14"
                height={tinggi(d.pemasukan)} rx="3" fill="#22A860" />
              <rect x={x + 2} y={150 - tinggi(d.pengeluaran)} width="14"
                height={tinggi(d.pengeluaran)} rx="3" fill="#F26B5B" />
              <text x={x} y="167" textAnchor="middle" fontSize="10" fill="#6B7A99">
                {bulanSingkat(d.month)}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="key">
        <span><i style={{ background: '#22A860' }} />Pemasukan</span>
        <span><i style={{ background: '#F26B5B' }} />Pengeluaran</span>
      </div>
      <p className="muted small">
        {sel === null
          ? 'Ketuk batang untuk melihat nominal'
          : `${bulanLabel(data[sel].month)}: masuk ${rupiah(data[sel].pemasukan)}, keluar ${rupiah(data[sel].pengeluaran)}`}
      </p>
    </div>
  )
}