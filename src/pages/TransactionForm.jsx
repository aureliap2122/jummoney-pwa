import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import Icon, { kategoriIcon } from '../components/Icon'
import { Jummo } from '../components/JummoMood'
import { useToast } from '../components/Toast'
import { api } from '../config/api'

export default function TransactionForm() {
  const { id } = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const [cats, setCats] = useState([])
  const [err, setErr] = useState('')
  const [f, setF] = useState({
    date: new Date().toLocaleDateString('sv-SE'),
    type: 'pengeluaran',
    amount: '',
    category_id: '',
    note: '',
  })

  useEffect(() => {
    api.get('/api/categories').then(setCats).catch((e) => setErr(e.message))
    if (id) {
      api.get(`/api/transactions/${id}`)
        .then((t) => setF({
          date: t.date, type: t.type, amount: t.amount,
          category_id: t.category_id ?? '', note: t.note ?? '',
        }))
        .catch((e) => setErr(e.message))
    }
  }, [id])

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const masuk = f.type === 'pemasukan'

  const submit = async (e) => {
    e.preventDefault()
    const body = { ...f, amount: Number(f.amount), category_id: f.category_id || null }
    try {
      if (id) await api.put(`/api/transactions/${id}`, body)
      else await api.post('/api/transactions', body)
      toast('Tersimpan ✓')
      nav('/transaksi')
    } catch (e2) {
      setErr(e2.message)
    }
  }

  return (
    <div className="page">
      <PageHead title={`${id ? 'Edit' : 'Catat'} Transaksi`} back="/transaksi" />

      <div className="form-layout">
        <form onSubmit={submit} className="card form">
          {err && <p className="error" role="alert">{err}</p>}

          <div className="field">
            <span className="label">Jenis</span>
            <div className="seg" role="radiogroup" aria-label="Jenis transaksi">
              <button type="button" role="radio" aria-checked={!masuk}
                className={!masuk ? 'on out' : ''}
                onClick={() => setF({ ...f, type: 'pengeluaran', category_id: '' })}>
                <Icon name="arrowUp" size={18} strokeWidth={2.5} /> Pengeluaran
              </button>
              <button type="button" role="radio" aria-checked={masuk}
                className={masuk ? 'on in' : ''}
                onClick={() => setF({ ...f, type: 'pemasukan', category_id: '' })}>
                <Icon name="arrowDown" size={18} strokeWidth={2.5} /> Pemasukan
              </button>
            </div>
          </div>

          <label className="field">
            <span className="label">Nominal (Rp)</span>
            <span className="money-input">
              <b>Rp</b>
              <input type="number" min="1" required inputMode="numeric" placeholder="0"
                value={f.amount} onChange={set('amount')} />
            </span>
          </label>

          <div className="field">
            <span className="label">Kategori</span>
            <div className="chips">
              {cats.filter((c) => c.type === f.type).map((c) => (
                <button
                  type="button" key={c.id}
                  className={`chip ${f.category_id === c.id ? 'on' : ''}`}
                  onClick={() => setF({ ...f, category_id: c.id })}
                >
                  <Icon name={kategoriIcon(c.name)} size={16} />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="two">
            <label className="field">
              <span className="label">Tanggal</span>
              <input type="date" required value={f.date} onChange={set('date')} />
            </label>
            <label className="field">
              <span className="label">Catatan</span>
              <input value={f.note} onChange={set('note')} placeholder="Contoh: Makan siang" />
            </label>
          </div>

          <div className="row">
            <Link className="btn ghost" to="/transaksi">Batal</Link>
            <button className="btn" type="submit">Simpan</button>
          </div>
        </form>

        <aside className="form-side d-only">
          <div className="bubble">
            <span className="bubble-badge" aria-hidden="true">✨</span>
            <p>{masuk ? 'Yeay, ada pemasukan baru!' : 'Catat dulu, hemat belakangan.'}</p>
          </div>
          <Jummo mood={masuk ? 'senang' : 'santai'} size={170} className="float" alt="" />
        </aside>
      </div>
    </div>
  )
}
