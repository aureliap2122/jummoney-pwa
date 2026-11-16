import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Status from '../components/Status'
import PageHead from '../components/PageHead'
import DonutChart from '../components/DonutChart'
import Icon, { kategoriIcon } from '../components/Icon'
import { rupiah, bulanLabel } from '../config/api'

export default function MonthDetail() {
  const { month } = useParams()
  const { data, loading, error, reload } = useFetch(`/api/summary/${month}`)
  const keluar = data?.kategori.filter((k) => k.type === 'pengeluaran') ?? []

  return (
    <div className="page">
      <PageHead title={bulanLabel(month)} sub="Rincian per kategori" back="/ringkasan" />
      <Status loading={loading} error={error} onRetry={reload} />
      {data && (
        <div className="month-layout">
          <div className="month-left">
            <div className="hero">
              <div>
                <small>Saldo bulan ini</small>
                <strong>{rupiah(data.saldo)}</strong>
              </div>
              <span className="hero-ico" aria-hidden="true"><Icon name="wallet" size={26} /></span>
            </div>
            <div className="stats">
              <div className="stat in">
                <span className="stat-ico"><Icon name="arrowDown" size={18} strokeWidth={2.5} /></span>
                <small>Pemasukan</small>
                <b>+{rupiah(data.pemasukan)}</b>
              </div>
              <div className="stat out">
                <span className="stat-ico"><Icon name="arrowUp" size={18} strokeWidth={2.5} /></span>
                <small>Pengeluaran</small>
                <b>-{rupiah(data.pengeluaran)}</b>
              </div>
            </div>
            <div className="card">
              <h2>Pengeluaran per kategori</h2>
              <DonutChart items={keluar} />
            </div>
          </div>

          <div className="month-right">
            <h2 className="section-title">Per kategori</h2>
            <ul className="tx-list">
              {data.kategori.map((k) => (
                <li key={k.type + k.name}>
                  <div className="tx">
                    <span className={`tx-ico ${k.type}`}><Icon name={kategoriIcon(k.name)} size={22} /></span>
                    <span className="tx-info">
                      <b>{k.name}</b>
                      <small>{k.type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</small>
                    </span>
                    <span className={`tx-amt ${k.type === 'pemasukan' ? 'in-t' : 'out-t'}`}>{rupiah(k.total)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
