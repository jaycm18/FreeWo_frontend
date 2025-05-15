import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const FreelancerProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [freelancer, setFreelancer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  // Hakee freelancerin tiedot backendistä
  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const res = await api.get(`/freelancers/${id}`)
        setFreelancer(res.data)
      } catch (err) {
        console.error('Freelancerin tietojen haku epäonnistui', err)
        setError('Freelanceria ei löytynyt tai tapahtui virhe.')
      } finally {
        setLoading(false)
      }
    }

    fetchFreelancer()
  }, [id])

  // Adminin poisto-funktio
  const handleDelete = async () => {
    if (!window.confirm('Poistetaanko freelancer?')) return
    try {
      await api.delete(`/admin/freelancers/${id}`)
      alert('Freelancer poistettu')
      navigate('/freelancers')
    } catch {
      alert('Poisto epäonnistui')
    }
  }

  if (loading) {
    return <p className="p-8">Ladataan freelancerin tietoja...</p>
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate('/freelancers')}
          className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Takaisin
        </button>
      </div>
    )
  }

  if (!freelancer) {
    return <p className="p-8">Freelanceria ei löytynyt.</p>
  }

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Takaisin
      </button>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-400 mb-4">{freelancer.name}</h1>
        <p className="text-lg text-gray-300 mb-2">
          <strong>Kategoria:</strong> {freelancer.category}
        </p>
        <p className="text-lg text-gray-300 mb-2">
          <strong>Sijainti:</strong> {freelancer.location}
        </p>
        <p className="text-lg text-gray-300 mb-4">
          <strong>Skills:</strong> {freelancer.skills}
        </p>
        <p className="text-gray-400">{freelancer.description}</p>
        {/* Poistonappi vain adminille */}
        {user?.role === 'admin' && (
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-6"
          >
            Poista freelancer
          </button>
        )}
      </div>
    </div>
  )
}

export default FreelancerProfile