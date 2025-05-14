import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!searchTerm) return
    setLoading(true)
    try {
      const res = await api.get('/jobs/search', {
        params: { q: searchTerm }
      })
      setResults(res.data)
    } catch (err) {
      console.error('Toimeksiantojen haku epäonnistui', err)
    }
    setLoading(false)
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Etsi toimeksiantoja</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Otsikko, sijainti, kategoria..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-semibold"
        >
          Hae
        </button>
      </div>

      {loading ? (
        <p>Haetaan toimeksiantoja...</p>
      ) : (
        <ul className="space-y-4">
          {results.map(job => (
            <li
              key={job.id}
              className="border border-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => navigate(`/job-profile/${job.id}`)} // Navigoi toimeksiannon yksityiskohtiin
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p>{job.category} • {job.location}</p>
              <p className="text-sm text-gray-400">{job.description}</p>
              <p className="mt-2 text-gray-300">Budjetti: {job.budget} €</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default JobSearch