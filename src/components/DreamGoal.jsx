import { useState } from 'react'
import { rupiah } from '../config/api'

export default function DreamGoal({ goal, saldo, onSave, onClear }) {
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(goal?.name ?? '')
  const [target, setTarget] = useState(goal?.target ?? '')

  const submit = (e) => {
    e.preventDefault()
    onSave({ name: name.trim(), target: Number(target) })
    setEdit(false)
  }

  const hapus = () => {
    if (!confirm('Hapus Dream ini?')) return
    onClear()
    setName('')
    setTarget('')
  }

  if (!goal || edit) {
    return (
      <form className="card form" onSubmit={submit}>
        <h2>{goal ? 'Ubah Dream' : 'Buat Dream'}</h2>
        <label>
          Nama target
          <input required value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Tiket konser" />
        </label>
        <label>
          Nominal (Rp)
          <input type="number" min="1" required value={target}
            onChange={(e) => setTarget(e.target.value)} />
        </label>
        <button className="btn" type="submit">Simpan Dream</button>
      </form>
    )
  }

  const terkumpul = Math.max(saldo, 0)
  const persen = Math.min(100, Math.round((terkumpul / goal.target) * 100))
  const tercapai = persen >= 100

  return (
    <div className="card">
      <div className="head">
        <h2>Dream: {goal.name}</h2>
        <div>
          <button className="icon-btn" onClick={() => setEdit(true)} aria-label="Ubah Dream">✏️</button>
          <button className="icon-btn" onClick={hapus} aria-label="Hapus Dream">🗑️</button>
        </div>
      </div>
      <div className="bar">
        <div className={`bar-fill ${tercapai ? 'done' : ''}`} style={{ width: `${persen}%` }} />
      </div>
      <div className="row between">
        <small>{rupiah(terkumpul)} dari {rupiah(goal.target)}</small>
        <b>{tercapai ? 'Tercapai!' : `${persen}%`}</b>
      </div>
      {!tercapai && <small>Kurang {rupiah(goal.target - terkumpul)}</small>}
    </div>
  )
}