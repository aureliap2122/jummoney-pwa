import { Link, useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Status from '../components/Status'
import { rupiah, bulanLabel } from '../config/api'

export default function MonthDetail() {
  const { month } = useParams()
  const { data, loading, error } = useFetch(`/api/summary/${month}`)
  return (
    <>
      <Link to="/ringkasan">← Kembali</Link>
      <h1>{bulanLabel(month)}</h1>
      <Status loading={loading} error={error} />
      {data && (
        <>
          <div className="hero">
            <small>Saldo bulan ini</small>
            <strong>{rupiah(data.saldo)}</strong>
          </div>
          <div className="row">
            <div className="card in"><small>Pemasukan</small><b>{rupiah(data.pemasukan)}</b></div>
            <div className="card out"><small>Pengeluaran</small><b>{rupiah(data.pengeluaran)}</b></div>
          </div>
          <h2>Per kategori</h2>
          <ul className="list">
            {data.kategori.map((k) => (
              <li key={k.type + k.name}>
                <a>
                  <div><b>{k.name}</b><small>{k.type}</small></div>
                  <span className={k.type === 'pemasukan' ? 'in-t' : 'out-t'}>{rupiah(k.total)}</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
