import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Status from '../components/Status'
import PageHead from '../components/PageHead'
import Icon, { kategoriIcon } from '../components/Icon'
import { useToast } from '../components/Toast'
import { api, rupiah } from '../config/api'

export default function TransactionDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const { data: t, loading, error, reload } = useFetch(`/api/transactions/${id}`)

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

  const masuk = t?.type === 'pemasukan'

  return (
    <div className="page narrow">
      <PageHead title="Detail Transaksi" back="/transaksi" />
      <Status loading={loading} error={error} onRetry={reload} />
      {t && (
        <div className="card detail">
          <div className="detail-top">
            <span className={`tx-ico big ${t.type}`}>
              <Icon name={kategoriIcon(t.categories?.name)} size={30} />
            </span>
            <div>
              <small className="muted">{masuk ? 'Pemasukan' : 'Pengeluaran'}</small>
              <strong className={masuk ? 'in-t' : 'out-t'}>
                {masuk ? '+' : '-'}{rupiah(t.amount)}
              </strong>
            </div>
          </div>

          <dl className="kv">
            <div><dt>Kategori</dt><dd>{t.categories?.name ?? '-'}</dd></div>
            <div><dt>Tanggal</dt><dd>{t.date}</dd></div>
            <div><dt>Catatan</dt><dd>{t.note || '-'}</dd></div>
          </dl>

          <div className="row">
            <Link className="btn navy" to={`/transaksi/${id}/edit`}>
              <Icon name="pencil" size={18} /> Edit
            </Link>
            <button className="btn danger" onClick={hapus}>
              <Icon name="trash" size={18} /> Hapus
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
