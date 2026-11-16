import { Link } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Status from '../components/Status'
import PageHead from '../components/PageHead'
import BarChart from '../components/BarChart'
import Icon from '../components/Icon'
import { Jummo } from '../components/JummoMood'
import { rupiah, bulanLabel } from '../config/api'

export default function Summary() {
  const { data, loading, error, reload } = useFetch('/api/summary')

  const totalMasuk = data?.reduce((a, m) => a + m.pemasukan, 0) ?? 0
  const totalKeluar = data?.reduce((a, m) => a + m.pengeluaran, 0) ?? 0
  const totalSaldo = totalMasuk - totalKeluar
  const rata = data?.length ? Math.round(totalKeluar / data.length) : 0
  const enamBulan = data ? data.slice(0, 6).reverse() : []

  return (
    <div className="page">
      <PageHead title="Ringkasan Bulanan" sub="Pemasukan dan pengeluaranmu dari bulan ke bulan" />
      <Status loading={loading} error={error} onRetry={reload} />
      {data?.length === 0 && <p className="muted">Belum ada data.</p>}

      {data?.length > 0 && (
        <>
          <div className="sum-top">
            <div className="hero">
              <div>
                <small>Total saldo semua bulan</small>
                <strong>{rupiah(totalSaldo)}</strong>
                <span className="hero-sub">{data.length} bulan tercatat</span>
              </div>
              <Jummo face size={72} className="hero-jummo" alt="" />
            </div>

            <div className="stats three">
              <div className="stat in">
                <span className="stat-ico"><Icon name="arrowDown" size={18} strokeWidth={2.5} /></span>
                <small>Total pemasukan</small>
                <b>+{rupiah(totalMasuk)}</b>
              </div>
              <div className="stat out">
                <span className="stat-ico"><Icon name="arrowUp" size={18} strokeWidth={2.5} /></span>
                <small>Total pengeluaran</small>
                <b>-{rupiah(totalKeluar)}</b>
              </div>
              <div className="stat avg">
                <span className="stat-ico"><Icon name="trend" size={18} strokeWidth={2.5} /></span>
                <small>Rata-rata keluar / bulan</small>
                <b>{rupiah(rata)}</b>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>6 bulan terakhir</h2>
            <BarChart data={enamBulan} />
          </div>

          <h2 className="section-title">Per bulan</h2>
          <ul className="month-grid">
            {data.map((m) => {
              const pakai = m.pemasukan > 0 ? Math.min(100, Math.round((m.pengeluaran / m.pemasukan) * 100)) : 100
              return (
                <li key={m.month}>
                  <Link to={`/ringkasan/${m.month}`} className="card month-card">
                    <div className="mc-top">
                      <b>{bulanLabel(m.month)}</b>
                      <span className="pill">{m.jumlah} transaksi</span>
                    </div>
                    <strong className={m.saldo >= 0 ? 'in-t' : 'out-t'}>{rupiah(m.saldo)}</strong>
                    <div className="meter" aria-label={`Terpakai ${pakai}% dari pemasukan`}>
                      <i style={{ width: `${pakai}%` }} />
                    </div>
                    <div className="mc-foot">
                      <span className="in-t">+{rupiah(m.pemasukan)}</span>
                      <span className="out-t">-{rupiah(m.pengeluaran)}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
