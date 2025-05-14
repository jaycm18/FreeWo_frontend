import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import Freelancers from './pages/Freelancers'
import ClientDashboard from './pages/ClientDashboard'
import FreelancerDashboard from './pages/FreelancerDashboard'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './context/AuthContext'
import EditJob from './pages/EditJob'
import FreelancerProfile from './pages/FreelancerProfile'
import JobProfile from './pages/JobProfile'

const App = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-extrabold text-green-400 tracking-wide">FreeWo</h1>
        <div className="space-x-6">
        <Link to="/" className="hover:underline">Etusivu</Link>
          {user?.role === 'freelancer' && (
            <Link to="/jobs" className="hover:underline">Hae Toimeksiantoja</Link>
          )}
          {user?.role === 'client' && (
            <Link to="/freelancers" className="hover:underline">Hae Freelancereita</Link>
          )}
          {user?.role === 'client' && (
            <Link to="/client-dashboard" className="hover:underline">Omat Toimeksiannot</Link>
          )}
          {user?.role === 'freelancer' && (
            <Link to="/freelancer-dashboard" className="hover:underline">Oma Profiili</Link>
          )}
        </div>


        {user ? (
          <div className="space-x-4 flex items-center">
            <span className="text-green-400 font-semibold">Tervetuloa, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Kirjaudu ulos
            </button>
          </div>
        ) : (
          <div className="space-x-4 hidden md:flex">
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Kirjaudu</Link>
            <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Rekisteröidy</Link>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/freelancers" element={<PrivateRoute><Freelancers /></PrivateRoute>} />
        <Route path="/client-dashboard" element={<PrivateRoute><ClientDashboard /></PrivateRoute>} />
        <Route path="/edit-job/:id" element={<PrivateRoute><EditJob /></PrivateRoute>} />
        <Route path="/freelancer-profile/:id" element={<PrivateRoute><FreelancerProfile /></PrivateRoute>} />
        <Route path="/freelancer-search" element={<PrivateRoute><Freelancers /></PrivateRoute>} />
        <Route path="/job-profile/:id" element={<PrivateRoute><JobProfile /></PrivateRoute>} />
        <Route path="/freelancer-dashboard" element={<PrivateRoute><FreelancerDashboard /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App
