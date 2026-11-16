import { Link } from 'react-router-dom'
import useFetch from '../components/useFetch'
import useGoal from '../components/useGoal'
import useCountUp from '../components/useCountUp'
import useProfil from '../components/useProfil'
import Status from '../components/Status'
import JummoMood from '../components/JummoMood'
import DreamGoal from '../components/DreamGoal'
import DonutChart from '../components/DonutChart'
import BarChart from '../components/BarChart'
import Icon from '../components/Icon'
import { rupiah, bulanLabel, bulanIni } from '../config/api'

export default function Home() {
  const now = bulanIni()
  const sum = useFetch('/api/summary')
  const cur = useFetch(`/api/summary/${now}`)
  const { goal, save, clear } = useGoal()
  const { profil } = useProfil()

  const bulan = sum.data?.find((m) => m.month === now) ?? {
    pemasukan: 0, pengeluaran: 0, saldo: 0, jumlah: 0,
  }
  const totalSaldo = sum.data?.reduce((a, m) => a + m.saldo, 0) ?? 0
  const goalDone = Boolean(goal) && totalSaldo >= goal.target
  const saldoAnim = useCountUp(bulan.saldo)
  const kategoriKeluar = cur.data?.kategori.filter((k) => k.type === 'pengeluaran') ?? []
  const enamBulan = sum.data ? sum.data.slice(0, 6).reverse() : []
  const panggilan = profil.nama.split(' ')[0]

  return (
    <div className="page">
      {/* Judul + tombol utama, hanya tampil di laptop */}
      <div className="desk-head d-only">
        <div>
          <h1>{panggilan ? `Halo, ${panggilan}!` : 'Halo!'}</h1>
          <p className="muted">Ini ringkasan keuanganmu bulan {bulanLabel(now)}.</p>
        </div>
        <Link className="btn" to="/transaksi/baru">
          <Icon name="plus" size={20} strokeWidth={2.5} /> Catat Transaksi
        </Link>
      </div>

      <Status loading={sum.loading} error={sum.error} onRetry={sum.reload} />

      {sum.data && (
        <div className="home-grid">
          <section className="g-jummo">
            <JummoMood {...bulan} goalDone={goalDone} />
          </section>

          <div className="hero g-hero">
            <div>
              <small>Saldo {bulanLabel(now)}</small>
              <strong>{rupiah(saldoAnim)}</strong>
            </div>
            <span className="hero-ico" aria-hidden="true"><Icon name="wallet" size={26} /></span>
          </div>

          <div className="stats g-stats">
            <div className="stat in">
              <span className="stat-ico"><Icon name="arrowDown" size={18} strokeWidth={2.5} /></span>
              <small>Pemasukan</small>
              <b>+{rupiah(bulan.pemasukan)}</b>
            </div>
            <div className="stat out">
              <span className="stat-ico"><Icon name="arrowUp" size={18} strokeWidth={2.5} /></span>
              <small>Pengeluaran</small>
              <b>-{rupiah(bulan.pengeluaran)}</b>
            </div>
          </div>

          <DreamGoal className="g-dream" goal={goal} saldo={totalSaldo} onSave={save} onClear={clear} />

          <Link className="btn btn-cta g-cta m-only" to="/transaksi/baru">
            <Icon name="plus" size={22} strokeWidth={2.5} /> Catat Transaksi
          </Link>

          <div className="card g-donut">
            <h2>Pengeluaran per kategori</h2>
            <DonutChart items={kategoriKeluar} />
          </div>
          <div className="card g-bar">
            <h2>6 bulan terakhir</h2>
            <BarChart data={enamBulan} />
          </div>
        </div>
      )}
    </div>
  )
}
