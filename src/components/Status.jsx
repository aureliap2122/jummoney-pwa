export default function Status({ loading, error, onRetry }) {
  if (loading)
    return (
      <div className="loading" role="status">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        Memuat…
      </div>
    )
  if (error)
    return (
      <div className="card error-box" role="alert">
        <b>Gagal memuat</b>
        <p>{error}</p>
        {onRetry && (
          <button className="btn small" onClick={onRetry}>Coba lagi</button>
        )}
      </div>
    )
  return null
}
