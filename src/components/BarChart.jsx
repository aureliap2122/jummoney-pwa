import { useEffect, useRef, useState } from 'react'
import { rupiah, bulanLabel, bulanSingkat } from '../config/api'

// Lebar grafik mengikuti lebar kartunya, jadi tetap tajam di HP maupun laptop
function useLebar() {
  const ref = useRef(null)
  const [w, setW] = useState(320)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const set = () => setW(Math.max(240, Math.round(el.clientWidth)))
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w]
}

export default function BarChart({ data }) {
  const [sel, setSel] = useState(null)
  const [ref, W] = useLebar()

  if (!data.length) return <p className="muted">Belum ada data. Catat transaksi pertamamu!</p>

  const max = Math.max(...data.flatMap((d) => [d.pemasukan, d.pengeluaran]), 1)
  const H = 150
  const BASE = 164
  const lebar = W / data.length
  const bw = Math.min(26, lebar * 0.28)
  const tinggi = (v) => (v / max) * H

  return (
    <div ref={ref}>
      <svg width={W} height={BASE + 22} className="bars" role="img"
        aria-label="Pemasukan dan pengeluaran 6 bulan terakhir">
        {[0, 0.5, 1].map((g) => (
          <line key={g} x1="0" x2={W} y1={BASE - g * H} y2={BASE - g * H}
            stroke="#EFE6B8" strokeDasharray={g === 0 ? '' : '4 5'} />
        ))}
        {data.map((d, i) => {
          const x = i * lebar + lebar / 2
          const on = sel === null || sel === i
          return (
            <g key={d.month} onClick={() => setSel(sel === i ? null : i)} opacity={on ? 1 : 0.45}>
              <rect x={x - bw - 2} y={BASE - tinggi(d.pemasukan)} width={bw}
                height={tinggi(d.pemasukan)} rx="6" fill="#22A860" />
              <rect x={x + 2} y={BASE - tinggi(d.pengeluaran)} width={bw}
                height={tinggi(d.pengeluaran)} rx="6" fill="#F26B5B" />
              <text x={x} y={BASE + 17} textAnchor="middle" fontSize="12" fontWeight="600" fill="#6B7A99">
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
      <p className="muted small chart-hint">
        {sel === null
          ? 'Ketuk batang untuk melihat nominal'
          : `${bulanLabel(data[sel].month)}: masuk ${rupiah(data[sel].pemasukan)}, keluar ${rupiah(data[sel].pengeluaran)}`}
      </p>
    </div>
  )
}
