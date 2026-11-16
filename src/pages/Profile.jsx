export default function Profile() {
  return (
    <>
      <h1>Profil dan Tentang</h1>
      <div className="card">
        <p><small>Nama</small><b>NAMA LENGKAP KAMU</b></p>
        <p><small>NIM</small><b>NIM KAMU</b></p>
        <p><small>Kelas</small><b>KELAS ATAU KELOMPOK</b></p>
      </div>
      <div className="card">
        <h2>Tentang JumMoney</h2>
        <p>
          JumMoney adalah PWA untuk mencatat pemasukan dan pengeluaran harian, lengkap dengan
          ringkasan bulanan, grafik, dan target tabungan Dream Goal. Dibuat sebagai Tugas Akhir
          Praktikum PPB.
        </p>
        <p><small>Teknologi</small><b>React, Vite, PWA, Express.js, Supabase</b></p>
        <p><small>Versi</small><b>1.0.0</b></p>
        <p><small>Tagline</small><b>Catat uang, wujudkan dream.</b></p>
      </div>
    </>
  )
}
