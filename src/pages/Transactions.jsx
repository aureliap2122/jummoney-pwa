import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Status from '../components/Status'
import PageHead from '../components/PageHead'
import Icon, { kategoriIcon } from '../components/Icon'
import { Jummo, MOODS, getMood } from '../components/JummoMood'
import { rupiah, bulanLabel, bulanIni } from '../config/api'

export default function Transactions() {
  const [month, setMonth] = useState(bulanIni())
  const { data, loading, error, reload } = useFetch(`/api/transactions?month=${month}`)

  const geser = (n) => {
    const [y, m] = month.split('-').map(Number)
    const d = new Date(y, m - 1 + n, 1)
    setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }

  // Total bulan yang sedang dilihat, dihitung dari daftar transaksinya
  const pemasukan = (data ?? []).filter((t) => t.type === 'pemasukan').reduce((s, t) => s + Number(t.amount), 0)
  const pengeluaran = (data ?? []).filter((t) => t.type === 'pengeluaran').reduce((s, t) => s + Number(t.amount), 0)
  const mood = getMood({ pemasukan, pengeluaran, jumlah: data?.length ?? 0, goalDone: false })

  const tombolBaru = (
    <Link className="btn small" to="/transaksi/baru">
      <Icon name="plus" size={18} strokeWidth={2.5} /> Baru
    </Link>
  )

  return (
    <div className="page">
      <PageHead title="Transaksi" count={data?.length} action={tombolBaru} />

      <div className="split">
        <div className="split-main">
          {/* Pesan Jummo ringkas (HP) */}
          {data && (
            <div className="strip m-only">
              <Jummo face size={52} className="strip-face" alt="" />
              <p>{MOODS[mood].text}</p>
            </div>
          )}

          <div className="monthbar">
            <button onClick={() => geser(-1)} aria-label="Bulan sebelumnya">
              <Icon name="left" size={20} />
            </button>
            <b><Icon name="calendar" size={18} /> {bulanLabel(month)}</b>
            <button onClick={() => geser(1)} aria-label="Bulan berikutnya">
              <Icon name="right" size={20} />
            </button>
          </div>

          <Status loading={loading} error={error} onRetry={reload} />

          {data?.length === 0 && (
            <div className="empty">
              <Jummo mood="semangat" size={130} className="float" alt="" />
              <p>Belum ada transaksi bulan ini.<br />Yuk catat yang pertama!</p>
              <Link className="btn small" to="/transaksi/baru">+ Catat Transaksi</Link>
            </div>
          )}

          <ul className="tx-list">
            {data?.map((t) => (
              <li key={t.id}>
                <Link to={`/transaksi/${t.id}`} className="tx">
                  <span className={`tx-ico ${t.type}`}>
                    <Icon name={kategoriIcon(t.categories?.name)} size={22} />
                  </span>
                  <span className="tx-info">
                    <b>{t.categories?.name ?? 'Tanpa kategori'}</b>
                    <small>{t.date}{t.note && ` · ${t.note}`}</small>
                  </span>
                  <span className={`tx-amt ${t.type === 'pemasukan' ? 'in-t' : 'out-t'}`}>
                    {t.type === 'pemasukan' ? '+' : '-'}{rupiah(t.amount)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Panel samping, hanya di laptop */}
        <aside className="split-side d-only">
          <div className="card side-sum">
            <small className="muted">Ringkasan {bulanLabel(month)}</small>
            <strong className={pemasukan - pengeluaran >= 0 ? 'in-t' : 'out-t'}>
              {rupiah(pemasukan - pengeluaran)}
            </strong>
            <div className="side-rows">
              <span><i className="dot in" /> Pemasukan <b className="in-t">+{rupiah(pemasukan)}</b></span>
              <span><i className="dot out" /> Pengeluaran <b className="out-t">-{rupiah(pengeluaran)}</b></span>
            </div>
          </div>
          <div className="jummo-note">
            <div className="bubble"><span className="bubble-badge" aria-hidden="true">{MOODS[mood].badge}</span><p>{MOODS[mood].text}</p></div>
            <Jummo mood={mood} size={150} className="float" alt="" />
          </div>
        </aside>
      </div>
    </div>
  )
}
