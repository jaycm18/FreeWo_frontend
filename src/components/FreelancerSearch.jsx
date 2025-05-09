import { useState } from 'react'
import api from '../api/axios'

const FreelancerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm) return
    setLoading(true)
    try {
      const res = await api.get(`/freelancers/search`, {
        params: { q: searchTerm }
      })
      setResults(res.data)
    } catch (err) {
      console.error('Hakutoiminto epäonnistui', err)
    }
    setLoading(false)
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Etsi freelancereita</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Nimi, sijainti, kategoria tai skills"
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
        <p>Haetaan freelancereita...</p>
      ) : (
        <ul className="space-y-4">
          {results.map(user => (
            <li key={user.id} className="border border-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p>{user.category} • {user.location}</p>
              <p className="text-sm text-gray-400">{user.skills}</p>
              <p className="mt-2 text-gray-300">{user.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FreelancerSearch
