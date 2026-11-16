import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Status from '../components/Status'
import { rupiah, bulanLabel, bulanIni } from '../config/api'

export default function Transactions() {
  const [month, setMonth] = useState(bulanIni())
  const { data, loading, error } = useFetch(`/api/transactions?month=${month}`)

  const geser = (n) => {
    const [y, m] = month.split('-').map(Number)
    const d = new Date(y, m - 1 + n, 1)
    setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }

  return (
    <>
      <div className="head">
        <h1>Transaksi</h1>
        <Link className="btn small" to="/transaksi/baru">+ Baru</Link>
      </div>

      <div className="monthbar">
        <button onClick={() => geser(-1)} aria-label="Bulan sebelumnya">‹</button>
        <b>{bulanLabel(month)}</b>
        <button onClick={() => geser(1)} aria-label="Bulan berikutnya">›</button>
      </div>

      <Status loading={loading} error={error} />
      {data?.length === 0 && (
        <p className="muted">Belum ada transaksi bulan ini. Yuk catat yang pertama!</p>
      )}

      <ul className="list">
        {data?.map((t) => (
          <li key={t.id}>
            <Link to={`/transaksi/${t.id}`}>
              <div>
                <b>{t.categories?.name ?? 'Tanpa kategori'}</b>
                <small>{t.date}{t.note && ` · ${t.note}`}</small>
              </div>
              <span className={t.type === 'pemasukan' ? 'in-t' : 'out-t'}>
                {t.type === 'pemasukan' ? '+' : '-'}{rupiah(t.amount)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
