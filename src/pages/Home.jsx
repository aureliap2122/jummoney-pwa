import { Link } from 'react-router-dom'
import useFetch from '../components/useFetch'
import useGoal from '../components/useGoal'
import useCountUp from '../components/useCountUp'
import Status from '../components/Status'
import JummoMood from '../components/JummoMood'
import DreamGoal from '../components/DreamGoal'
import DonutChart from '../components/DonutChart'
import BarChart from '../components/BarChart'
import { rupiah, bulanLabel, bulanIni } from '../config/api'

export default function Home() {
  const now = bulanIni()
  const sum = useFetch('/api/summary')
  const cur = useFetch(`/api/summary/${now}`)
  const { goal, save, clear } = useGoal()

  const bulan = sum.data?.find((m) => m.month === now) ?? {
    pemasukan: 0, pengeluaran: 0, saldo: 0, jumlah: 0,
  }
  const totalSaldo = sum.data?.reduce((a, m) => a + m.saldo, 0) ?? 0
  const goalDone = Boolean(goal) && totalSaldo >= goal.target
  const saldoAnim = useCountUp(bulan.saldo)
  const kategoriKeluar = cur.data?.kategori.filter((k) => k.type === 'pengeluaran') ?? []
  const enamBulan = sum.data ? sum.data.slice(0, 6).reverse() : []

  return (
    <>
      <h1>JumMoney</h1>
      <Status loading={sum.loading} error={sum.error} />

      {sum.data && (
        <>
          <JummoMood {...bulan} goalDone={goalDone} />

          <div className="hero">
            <small>Saldo {bulanLabel(now)}</small>
            <strong>{rupiah(saldoAnim)}</strong>
          </div>
          <div className="row">
            <div className="card in"><small>Pemasukan</small><b>{rupiah(bulan.pemasukan)}</b></div>
            <div className="card out"><small>Pengeluaran</small><b>{rupiah(bulan.pengeluaran)}</b></div>
          </div>

          <DreamGoal goal={goal} saldo={totalSaldo} onSave={save} onClear={clear} />

          <div className="card">
            <h2>Pengeluaran per kategori</h2>
            <DonutChart items={kategoriKeluar} />
          </div>
          <div className="card">
            <h2>6 bulan terakhir</h2>
            <BarChart data={enamBulan} />
          </div>

          <Link className="btn" to="/transaksi/baru">+ Catat Transaksi</Link>
        </>
      )}
    </>
  )
}