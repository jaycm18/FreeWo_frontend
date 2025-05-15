import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const ClientProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => { 
    const fetchClient = async () => {
      try {
        const res = await api.get(`/admin/users/${id}`)
        setClient(res.data)
      } catch (err) {
        setError('Asiakasta ei löytynyt tai tapahtui virhe.')
      } finally {
        setLoading(false)
      }
    }
    fetchClient()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Poistetaanko asiakas?')) return
    try {
      await api.delete(`/admin/clients/${id}`)
      alert('Asiakas poistettu')
      navigate('/admin-dashboard')
    } catch {
      alert('Poisto epäonnistui')
    }
  }

  if (loading) return <p>Ladataan...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!client) return <p>Asiakasta ei löytynyt.</p>

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Takaisin
      </button>
      <h1 className="text-2xl font-bold mb-4">{client.name}</h1>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Rooli:</strong> {client.role}</p>
      <p><strong>Kategoria:</strong> {client.category}</p>
      <p><strong>Luotu:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
      {user?.role === 'admin' && (
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-6"
        >
          Poista asiakas
        </button>
      )}
    </div>
  )
}

export default ClientProfile