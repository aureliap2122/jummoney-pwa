import { useState } from 'react'
import { rupiah } from '../config/api'
import Icon from './Icon'

export default function DreamGoal({ goal, saldo, onSave, onClear, className = '' }) {
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
      <form className={`card form dream-form ${className}`} onSubmit={submit}>
        <div className="card-head">
          <span className="dot-icon"><Icon name="target" size={20} /></span>
          <h2>{goal ? 'Ubah Dream' : 'Buat Dream'}</h2>
        </div>
        {!goal && <p className="muted small">Pasang target tabunganmu, Jummo temani sampai tercapai.</p>}
        <label>
          Nama target
          <input required value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Tiket konser" />
        </label>
        <label>
          Nominal (Rp)
          <input type="number" min="1" required value={target} inputMode="numeric"
            onChange={(e) => setTarget(e.target.value)} />
        </label>
        <div className="row">
          {goal && (
            <button type="button" className="btn ghost" onClick={() => setEdit(false)}>Batal</button>
          )}
          <button className="btn navy" type="submit">Simpan Dream</button>
        </div>
      </form>
    )
  }

  const terkumpul = Math.max(saldo, 0)
  const persen = Math.min(100, Math.round((terkumpul / goal.target) * 100))
  const tercapai = persen >= 100

  return (
    <div className={`card dream ${className}`}>
      <div className="card-head">
        <span className="dot-icon"><Icon name="target" size={20} /></span>
        <h2>Dream: {goal.name}</h2>
        <span className={`pill ${tercapai ? 'done' : ''}`}>{tercapai ? 'Tercapai!' : `${persen}%`}</span>
      </div>

      <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={persen}>
        <div className={`bar-fill ${tercapai ? 'done' : ''}`} style={{ width: `${persen}%` }} />
      </div>

      <div className="dream-foot">
        <span>
          <b>{rupiah(terkumpul)}</b> <small>dari {rupiah(goal.target)}</small>
        </span>
        {!tercapai && <span className="chip-out">Kurang {rupiah(goal.target - terkumpul)}</span>}
      </div>

      <div className="dream-actions">
        <button className="icon-btn" onClick={() => setEdit(true)} aria-label="Ubah Dream">
          <Icon name="pencil" size={18} />
        </button>
        <button className="icon-btn" onClick={hapus} aria-label="Hapus Dream">
          <Icon name="trash" size={18} />
        </button>
      </div>
    </div>
  )
}
