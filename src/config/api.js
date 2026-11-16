import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// Mengambil isi respons, dan menyeragamkan pesan error
api.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(new Error(err.response?.data?.message || err.message)),
)

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n || 0)

export const bulanLabel = (m) =>
  new Date(m + '-01').toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

export const bulanSingkat = (m) =>
  new Date(m + '-01').toLocaleDateString('id-ID', { month: 'short' })

// Bulan sekarang dalam format YYYY-MM (zona waktu perangkat)
export const bulanIni = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}