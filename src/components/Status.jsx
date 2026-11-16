export default function Status({ loading, error }) {
  if (loading) return <p className="muted">Memuat…</p>
  if (error) return <p className="error">Gagal memuat: {error}</p>
  return null
}