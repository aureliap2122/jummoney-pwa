import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Beranda', icon: '🏠' },
  { to: '/transaksi', label: 'Transaksi', icon: '🧾' },
  { to: '/ringkasan', label: 'Ringkasan', icon: '📊' },
  { to: '/profil', label: 'Profil', icon: '👤' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          end={i.to === '/'}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <span>{i.icon}</span>
          {i.label}
        </NavLink>
      ))}
    </nav>
  )
}