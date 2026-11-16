import { useState } from 'react'
import Icon from '../components/Icon'
import { Jummo } from '../components/JummoMood'

const SLIDES = [
  {
    judul: 'Kelola Uang Saku,',
    tebal: 'Wujudkan Impian!',
    teks: 'Pencatat keuangan pintar buat mahasiswa & muda-mudi. Praktis, tanpa ribet, langsung dari browsermu.',
    mood: 'senang',
  },
  {
    judul: 'Catat Setiap Rupiah,',
    tebal: 'Tanpa Ribet!',
    teks: 'Pemasukan dan pengeluaran tercatat rapi per kategori, lengkap dengan ringkasan tiap bulan.',
    mood: 'santai',
  },
  {
    judul: 'Kejar Dream-mu,',
    tebal: 'Bareng Jummo!',
    teks: 'Pasang target tabungan dan pantau progresnya. Jummo siap menyemangatimu setiap hari.',
    mood: 'pesta',
  },
]

// Hiasan melayang di sekitar maskot, beda tiap slide
function Hiasan({ i }) {
  if (i === 0)
    return (
      <>
        <div className="float-tag t-bubble"><span>Hai! Aku <b>Jummo</b></span> <span aria-hidden="true">👋</span></div>
        <div className="float-tag t-badge"><i className="dot-green" /> Bebas Bokek!</div>
      </>
    )
  if (i === 1)
    return (
      <>
        <div className="float-tag t-bubble in-t"><Icon name="arrowDown" size={14} strokeWidth={3} /> +Rp 1.500.000</div>
        <div className="float-tag t-badge out-t"><Icon name="arrowUp" size={14} strokeWidth={3} /> -Rp 25.000</div>
      </>
    )
  return (
    <>
      <div className="float-tag t-bubble">Dream: Tiket konser</div>
      <div className="float-tag t-badge t-progress">
        <span className="mini-bar"><i style={{ width: '89%' }} /></span> 89%
      </div>
    </>
  )
}

export default function Onboarding({ onDone }) {
  const [i, setI] = useState(0)
  const [x0, setX0] = useState(null)
  const s = SLIDES[i]
  const akhir = i === SLIDES.length - 1

  const maju = () => (akhir ? onDone() : setI(i + 1))
  const mundur = () => setI(Math.max(0, i - 1))

  const onTouchEnd = (e) => {
    if (x0 === null) return
    const dx = e.changedTouches[0].clientX - x0
    setX0(null)
    if (dx < -50) maju()
    else if (dx > 50) mundur()
  }

  return (
    <div
      className="onb"
      onTouchStart={(e) => setX0(e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') maju()
        if (e.key === 'ArrowLeft') mundur()
      }}
    >
      <header className="onb-top">
        <div className="brand">
          <span className="logo-j" aria-hidden="true">J</span>
          <span className="brand-name">JumMoney</span>
        </div>
        <button className="skip" type="button" onClick={onDone}>Lewati</button>
      </header>

      <div className="onb-art" aria-hidden="false">
        <span className="spark s1" /><span className="spark s2" /><span className="spark s3" />
        <i className="coin c1" /><i className="coin c2" /><i className="coin c3" />
        <div className="onb-frame-wrap" key={i}>
          <div className="onb-frame">
            <Jummo mood={s.mood} size={230} className="float" />
          </div>
          <Hiasan i={i} />
        </div>
      </div>

      <section className="onb-sheet">
        <div className="steps" role="tablist" aria-label={`Langkah ${i + 1} dari ${SLIDES.length}`}>
          {SLIDES.map((_, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`Langkah ${n + 1}`}
              className={n === i ? 'on' : ''}
              onClick={() => setI(n)}
            />
          ))}
        </div>

        <div className="onb-text" key={`t${i}`}>
          <h1>
            {s.judul}<br />
            <span className="hl">{s.tebal}</span>
          </h1>
          <p>{s.teks}</p>
        </div>

        <button className="btn onb-cta" type="button" onClick={maju}>
          {akhir ? 'Mulai Sekarang' : 'Lanjut'}
          <Icon name="arrowRight" size={20} strokeWidth={2.5} />
        </button>

        <p className="onb-foot">
          <Icon name="check" size={14} strokeWidth={3} className="ok" />
          100% Gratis &amp; Ramah Kantong Mahasiswa
        </p>
      </section>
    </div>
  )
}
