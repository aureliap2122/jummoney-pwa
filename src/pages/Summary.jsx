import { Link } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Status from '../components/Status'
import { rupiah, bulanLabel } from '../config/api'

export default function Summary() {
  const { data, loading, error } = useFetch('/api/summary')
  return (
    <>
      <h1>Ringkasan Bulanan</h1>
      <Status loading={loading} error={error} />
      {data?.length === 0 && <p className="muted">Belum ada data.</p>}
      <ul className="list">
        {data?.map((m) => (
          <li key={m.month}>
            <Link to={`/ringkasan/${m.month}`}>
              <div>
                <b>{bulanLabel(m.month)}</b>
                <small>{m.jumlah} transaksi</small>
              </div>
              <span className={m.saldo >= 0 ? 'in-t' : 'out-t'}>{rupiah(m.saldo)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
