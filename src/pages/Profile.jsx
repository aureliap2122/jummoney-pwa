import { useState } from 'react'
import PageHead from '../components/PageHead'
import Icon from '../components/Icon'
import { Jummo } from '../components/JummoMood'
import { setOnboarded } from '../components/useOnboarding'
import useProfil from '../components/useProfil'
import { useToast } from '../components/Toast'

const TEKNOLOGI = ['React', 'Vite', 'PWA', 'Express.js', 'Supabase']

export default function Profile() {
  const { profil, simpan } = useProfil()
  const toast = useToast()
  const kosong = !profil.nama && !profil.nim && !profil.kelas
  const [edit, setEdit] = useState(kosong)
  const [f, setF] = useState(profil)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    simpan(f)
    setEdit(false)
    toast('Profil tersimpan ✓')
  }

  return (
    <div className="page">
      <PageHead title="Profil dan Tentang" />

      <div className="profile-grid">
        <section className="card profile-card">
          <div className="avatar-big">
            <Jummo face size={110} alt="Avatar Jummo" />
          </div>

          {!edit ? (
            <>
              <h2 className="p-name">{profil.nama || 'Belum diisi'}</h2>
              <dl className="kv">
                <div><dt><Icon name="hash" size={16} /> NIM</dt><dd>{profil.nim || '-'}</dd></div>
                <div><dt><Icon name="users" size={16} /> Kelas</dt><dd>{profil.kelas || '-'}</dd></div>
              </dl>
              <button className="btn navy" type="button" onClick={() => { setF(profil); setEdit(true) }}>
                <Icon name="pencil" size={18} /> Ubah Profil
              </button>
            </>
          ) : (
            <form className="form" onSubmit={submit}>
              <label className="field">
                <span className="label">Nama</span>
                <input required value={f.nama} onChange={set('nama')} placeholder="Nama lengkap" />
              </label>
              <label className="field">
                <span className="label">NIM</span>
                <input required value={f.nim} onChange={set('nim')} placeholder="NIM" />
              </label>
              <label className="field">
                <span className="label">Kelas</span>
                <input required value={f.kelas} onChange={set('kelas')} placeholder="Kelas atau kelompok" />
              </label>
              <div className="row">
                {!kosong && (
                  <button type="button" className="btn ghost" onClick={() => setEdit(false)}>Batal</button>
                )}
                <button className="btn" type="submit">Simpan</button>
              </div>
            </form>
          )}
        </section>

        <section className="card about-card">
          <div className="card-head">
            <span className="dot-icon"><Icon name="info" size={20} /></span>
            <h2>Tentang JumMoney</h2>
          </div>
          <p>
            JumMoney adalah PWA untuk mencatat pemasukan dan pengeluaran harian, lengkap dengan
            ringkasan bulanan, grafik, dan target tabungan Dream Goal. Dibuat sebagai Tugas Akhir
            Praktikum PPB.
          </p>

          <dl className="kv">
            <div>
              <dt>Teknologi</dt>
              <dd className="tags">{TEKNOLOGI.map((t) => <span key={t} className="pill">{t}</span>)}</dd>
            </div>
            <div><dt>Versi</dt><dd>1.0.0</dd></div>
            <div><dt>Tagline</dt><dd>Catat uang, wujudkan dream.</dd></div>
          </dl>

          <button className="btn ghost" type="button" onClick={() => setOnboarded(false)}>
            <Icon name="refresh" size={18} /> Lihat pengantar lagi
          </button>
        </section>
      </div>
    </div>
  )
}
