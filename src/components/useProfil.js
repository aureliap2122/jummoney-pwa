import { useState } from 'react'

// Data profil disimpan di perangkat (localStorage), diisi lewat halaman Profil.
const KEY = 'jummoney_profil'
const KOSONG = { nama: '', nim: '', kelas: '' }

const read = () => {
  try {
    return { ...KOSONG, ...JSON.parse(localStorage.getItem(KEY)) }
  } catch {
    return KOSONG
  }
}

export default function useProfil() {
  const [profil, setProfil] = useState(read)

  const simpan = (p) => {
    const bersih = {
      nama: p.nama.trim(),
      nim: p.nim.trim(),
      kelas: p.kelas.trim(),
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(bersih))
    } catch {
      /* abaikan */
    }
    setProfil(bersih)
  }

  return { profil, simpan }
}
