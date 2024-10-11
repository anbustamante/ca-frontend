import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Asegúrate de importar tus componentes
import Login from './components/Login'
import Register from './components/Register'
import VerifyEmail from './components/VerifyEmail'
import Dashboard from './components/Dashboard'
import ReservasComponent from './components/ReservasComponent'
import SugerenciasComponent from './components/SugerenciasComponent'

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />} />
        <Route path="/verify-email" element={
          user && !user.verified ? <VerifyEmail user={user} setUser={setUser} /> : <Navigate to="/dashboard" />
        } />
        <Route 
          path="/dashboard" 
          element={user && user.verified ? <Dashboard user={user} /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/reservas" element={<ReservasComponent />} />
<Route path="/sugerencias" element={<SugerenciasComponent />} />
      </Routes>
    </Router>
  )
}

export default App
