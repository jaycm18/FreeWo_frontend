import React from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Sovelluksen nimi</h1>
        {user ? (
          <div className="flex items-center">
            <p className="text-white mr-4">Tervetuloa, {user.name}</p>
            <button
              onClick={logout}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Uloskirjaudu
            </button>
          </div>
        ) : (
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Kirjaudu sisään
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
