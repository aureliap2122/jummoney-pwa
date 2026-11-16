import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import { Jummo } from './JummoMood'

const items = [
  { to: '/', label: 'Beranda', icon: 'home' },
  { to: '/transaksi', label: 'Transaksi', icon: 'receipt' },
  { to: '/ringkasan', label: 'Ringkasan', icon: 'pie' },
  { to: '/profil', label: 'Profil', icon: 'user' },
]

const cls = ({ isActive }) => (isActive ? 'active' : '')

// Navigasi bawah (HP dan tablet kecil)
export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Menu utama">
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end={i.to === '/'} className={cls}>
          <Icon name={i.icon} size={22} />
          <span>{i.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

// Sidebar kiri (laptop)
export function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/" className="brand" aria-label="JumMoney, ke Beranda">
        <Jummo face size={44} className="brand-face" alt="" />
        <span className="brand-name">JumMoney</span>
      </Link>

      <Link to="/transaksi/baru" className="btn side-cta">
        <Icon name="plus" size={20} strokeWidth={2.5} /> Catat Transaksi
      </Link>

      <nav aria-label="Menu utama">
        {items.map((i) => (
          <NavLink key={i.to} to={i.to} end={i.to === '/'} className={cls}>
            <Icon name={i.icon} size={22} />
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="side-jummo">
        <Jummo mood="santai" size={120} className="float" alt="" />
        <p>Catat uang, wujudkan dream.</p>
      </div>
    </aside>
  )
}

// Bar atas (HP): logo di kiri, avatar profil di kanan
export function TopBar() {
  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="JumMoney, ke Beranda">
        <Jummo face size={40} className="brand-face" alt="" />
        <span className="brand-name">JumMoney</span>
      </Link>
      <Link to="/profil" className="avatar-btn" aria-label="Profil">
        <Icon name="user" size={20} />
      </Link>
    </header>
  )
}
