import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Home from './pages/Home.jsx'
import Transactions from './pages/Transactions.jsx'
import TransactionDetail from './pages/TransactionDetail.jsx'
import TransactionForm from './pages/TransactionForm.jsx'
import Summary from './pages/Summary.jsx'
import MonthDetail from './pages/MonthDetail.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <div className="shell">
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transaksi" element={<Transactions />} />
          <Route path="/transaksi/baru" element={<TransactionForm />} />
          <Route path="/transaksi/:id" element={<TransactionDetail />} />
          <Route path="/transaksi/:id/edit" element={<TransactionForm />} />
          <Route path="/ringkasan" element={<Summary />} />
          <Route path="/ringkasan/:month" element={<MonthDetail />} />
          <Route path="/profil" element={<Profile />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}