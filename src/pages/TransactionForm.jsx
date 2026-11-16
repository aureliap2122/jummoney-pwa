import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
    <form onSubmit={submit} className="form">
      <Link to="/transaksi">← Batal</Link>
      <h1>{id ? 'Edit' : 'Catat'} Transaksi</h1>
      {err && <p className="error">{err}</p>}

      <label>
        Jenis
        <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value, category_id: '' })}>
          <option value="pengeluaran">Pengeluaran</option>
          <option value="pemasukan">Pemasukan</option>
        </select>
      </label>

      <label>
        Nominal (Rp)
        <input type="number" min="1" required value={f.amount} onChange={set('amount')} />
      </label>

      <div style={{ marginBottom: 12 }}>
        <small>Kategori</small>
        <div className="chips">
          {cats.filter((c) => c.type === f.type).map((c) => (
            <button
              type="button" key={c.id}
              className={`chip ${f.category_id === c.id ? 'on' : ''}`}
              onClick={() => setF({ ...f, category_id: c.id })}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <label>
        Tanggal
        <input type="date" required value={f.date} onChange={set('date')} />
      </label>
      <label>
        Catatan
        <input value={f.note} onChange={set('note')} />
      </label>

      <button className="btn" type="submit">Simpan</button>
    </form>
  )
}
