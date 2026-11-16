import { useState } from 'react'

// Teks dan aksen tiap mood Jummo
export const MOODS = {
  pesta: { badge: '🎉', text: 'Dream tercapai! Selamat!' },
  semangat: { badge: '🌱', text: 'Yuk catat transaksi pertamamu!' },
  waspada: { badge: '💦', text: 'Hati-hati, pengeluaran sudah banyak.' },
  santai: { badge: '✨', text: 'Masih aman, jaga terus ya.' },
  senang: { badge: '💛', text: 'Hemat banget bulan ini!' },
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

// Kalau nanti kamu punya gambar Jummo untuk tiap mood, taruh di public/jummo/
// (misalnya public/jummo/pesta.png) lalu isi nama mood-nya di daftar ini.
// Mood yang tidak ada di daftar memakai gambar utama /jummo.png.
const MOOD_IMAGES = []

// Gambar maskot. face = true untuk versi kepala saja (avatar kecil).
export function Jummo({ mood = 'santai', size = 140, face = false, className = '', alt = 'Jummo' }) {
  const [rusak, setRusak] = useState(false)
  const punyaGambar = !face && !rusak && MOOD_IMAGES.includes(mood)
  const src = face ? '/jummo-face.png' : punyaGambar ? `/jummo/${mood}.png` : '/jummo.png'
  return (
    <span className={`jummo mood-${mood} ${className}`} style={{ width: size }}>
      <img src={src} alt={alt} width={size} onError={() => setRusak(true)} draggable="false" />
      {mood === 'pesta' && (
        <span className="confetti" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => <i key={i} />)}
        </span>
      )}
    </span>
  )
}

// Maskot + balon ucapan, dipakai di Beranda
export default function JummoMood(props) {
  const mood = getMood(props)
  const { badge, text } = MOODS[mood]
  return (
    <div className="jummo-stage">
      <p className="tagline">Catat uang, wujudkan dream.</p>
      <div className="bubble" role="status">
        <span className="bubble-badge" aria-hidden="true">{badge}</span>
        <p>{text}</p>
      </div>
      <Jummo mood={mood} size={props.size ?? 150} className="float" />
    </div>
  )
}
