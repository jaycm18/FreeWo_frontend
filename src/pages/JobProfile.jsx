import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

const JobProfile = () => {
  const { id } = useParams() // Hakee toimeksiannon ID:n URL:sta
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`) // Hakee toimeksiannon tiedot backendistä
        setJob(res.data)
      } catch (err) {
        console.error('Toimeksiannon tietojen haku epäonnistui', err)
        setError('Toimeksiantoa ei löytynyt tai tapahtui virhe.')
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  if (loading) {
    return <p className="p-8">Ladataan toimeksiannon tietoja...</p>
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate('/jobs')}
          className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Takaisin
        </button>
      </div>
    )
  }

  if (!job) {
    return <p className="p-8">Toimeksiantoa ei löytynyt.</p>
  }

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)} // Navigoi takaisin edelliselle sivulle
        className="mb-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Takaisin
      </button>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-400 mb-4">{job.title}</h1>
        <p className="text-lg text-gray-300 mb-2">
          <strong>Kategoria:</strong> {job.category}
        </p>
        <p className="text-lg text-gray-300 mb-2">
          <strong>Sijainti:</strong> {job.location}
        </p>
        <p className="text-lg text-gray-300 mb-4">
          <strong>Budjetti:</strong> {job.budget} €
        </p>
        <p className="text-gray-400">{job.description}</p>
      </div>
    </div>
  )
}

export default JobProfile