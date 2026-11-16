import { Link } from 'react-router-dom'
import Icon from './Icon'

// Judul halaman. back = alamat tujuan tombol kembali (opsional).
export default function PageHead({ title, sub, back, count, action }) {
  return (
    <div className="page-head">
      {back && (
        <Link to={back} className="round-btn" aria-label="Kembali">
          <Icon name="left" size={20} />
        </Link>
      )}
      <div className="page-title">
        <h1>
          {title}
          {count !== undefined && <span className="count">{count}</span>}
        </h1>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {action}
    </div>
  )
}
