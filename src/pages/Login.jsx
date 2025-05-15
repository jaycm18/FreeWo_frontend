import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, user, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login(email, password)

    if (!result.success) {
      setError(result.message)
    }
    // Ohjaus tapahtuu vasta useEffectissä kun user päivittyy
  }

  useEffect(() => {
    if (!loading) {
      if (user?.role === 'client') {
        navigate('/client-dashboard')
      } else if (user?.role === 'freelancer') {
        navigate('/freelancer-dashboard')
      } else if (user?.role === 'admin') {
        navigate('/admin-dashboard')
      }
    }
  }, [user, loading, navigate])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Kirjaudu sisään</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Sähköposti</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Salasana</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Kirjaudutaan...' : 'Kirjaudu'}
        </button>
      </form>
    </div>
  )
}

export default Login
// Tämä komponentti on kirjautumissivu, joka käyttää AuthContextia käyttäjän kirjautumiseen. Se sisältää lomakkeen sähköpostin ja salasanan syöttämistä varten. Kun käyttäjä lähettää lomakkeen,
//  se kutsuu login-funktiota ja ohjaa käyttäjän oikealle sivulle sen mukaan, onko hän asiakas vai freelancer. Jos kirjautuminen epäonnistuu, virheilmoitus näytetään lomakkeen yläpuolella.