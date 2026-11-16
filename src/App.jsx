import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { BottomNav, Sidebar, TopBar } from './components/Nav.jsx'
import useOnboarding, { setOnboarded } from './components/useOnboarding.js'
import Onboarding from './pages/Onboarding.jsx'
import Home from './pages/Home.jsx'
import Transactions from './pages/Transactions.jsx'
import TransactionDetail from './pages/TransactionDetail.jsx'
import TransactionForm from './pages/TransactionForm.jsx'
import Summary from './pages/Summary.jsx'
import MonthDetail from './pages/MonthDetail.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  const sudahLihat = useOnboarding()
  const nav = useNavigate()

  // Pertama kali dibuka: tampilkan pengantar dulu
  if (!sudahLihat) {
    return (
      <Onboarding
        onDone={() => {
          setOnboarded(true)
          nav('/')
        }}
      />
    )
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <TopBar />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
