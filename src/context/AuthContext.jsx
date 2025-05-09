import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await api.get('/me')
      setUser(res.data.user)
    } catch (err) {
      console.error('[fetchUser] Virhe:', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const res = await api.post('/login', { email, password })
      localStorage.setItem('accessToken', res.data.accessToken)
      await fetchUser()
      return { success: true }
    } catch (err) {
      console.error('[login] Virhe:', err)
      return {
        success: false,
        message: err.response?.data?.error || 'Kirjautuminen epäonnistui'
      }
    }
  }

  const register = async (data) => {
    try {
      await api.post('/register', data)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || 'Rekisteröinti epäonnistui'
      }
    }
  }

  const logout = async () => {
    try {
      await api.post('/logout')
      localStorage.removeItem('accessToken')
      setUser(null)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
