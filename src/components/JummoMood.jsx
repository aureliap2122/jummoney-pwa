const MOODS = {
  pesta: ['🎉', 'Dream tercapai! Selamat!'],
  semangat: ['🌱', 'Yuk catat transaksi pertamamu!'],
  waspada: ['😅', 'Hati-hati, pengeluaran sudah banyak.'],
  santai: ['🙂', 'Masih aman, jaga terus ya.'],
  senang: ['😄', 'Hemat banget bulan ini!'],
}

export function getMood({ pemasukan, pengeluaran, jumlah, goalDone }) {
  if (goalDone) return 'pesta'
  if (!jumlah) return 'semangat'
  if (pengeluaran > 0 && pemasukan === 0) return 'waspada'
  const rasio = pengeluaran / pemasukan
  if (rasio > 0.8) return 'waspada'
  if (rasio >= 0.5) return 'santai'
  return 'senang'
}

export default function JummoMood(props) {
  const [emoji, text] = MOODS[getMood(props)]
  return (
    <div className="bubble">
      <span className="emoji">{emoji}</span>
      <p>{text}</p>
    </div>
  )
}