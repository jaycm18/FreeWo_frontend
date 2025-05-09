// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div> // tai joku spinnari
  }

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute

// src/components/PrivateRoute.jsx
// Tämä komponentti tarkistaa, onko käyttäjä kirjautunut sisään ennen kuin näyttää suojatun reitin sisällön.