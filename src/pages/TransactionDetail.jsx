import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Status from '../components/Status'
import { useToast } from '../components/Toast'
import { api, rupiah } from '../config/api'

export default function TransactionDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const { data: t, loading, error } = useFetch(`/api/transactions/${id}`)

  const hapus = async () => {
    if (!confirm('Hapus transaksi ini?')) return
    try {
      await api.delete(`/api/transactions/${id}`)
      toast('Terhapus ✓')
      nav('/transaksi')
    } catch (e) {
      toast('Gagal menghapus: ' + e.message)
    }
  }

  return (
    <>
      <Link to="/transaksi">← Kembali</Link>
      <h1>Detail Transaksi</h1>
      <Status loading={loading} error={error} />
      {t && (
        <div className="card">
          <p><small>Jenis</small><b>{t.type}</b></p>
          <p><small>Nominal</small><b className={t.type === 'pemasukan' ? 'in-t' : 'out-t'}>{rupiah(t.amount)}</b></p>
          <p><small>Kategori</small><b>{t.categories?.name ?? '-'}</b></p>
          <p><small>Tanggal</small><b>{t.date}</b></p>
          <p><small>Catatan</small><b>{t.note || '-'}</b></p>
          <div className="row">
            <Link className="btn" to={`/transaksi/${id}/edit`}>Edit</Link>
            <button className="btn danger" onClick={hapus}>Hapus</button>
          </div>
        </div>
      )}
    </>
  )
}
