import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const AdminClientSearch = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    if (!searchTerm) return
    try {
      const res = await api.get('/admin/users/search', {
        params: { q: searchTerm, role: 'client' }
      })
      setResults(res.data)
      if (onResults) onResults(res.data)
    } catch (err) {
      alert('Hakutoiminto epäonnistui')
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded mb-4">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Etsi asiakkaita nimellä, sähköpostilla..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white flex-1"
        />
        <button onClick={handleSearch} className="bg-blue-500 px-4 py-2 rounded text-white">Hae</button>
      </div>
      <ul>
        {results.map(client => (
          <li key={client.id} className="flex justify-between items-center bg-gray-700 p-2 rounded mb-2">
            <span>{client.name} ({client.email})</span>
            <Link to={`/client-profile/${client.id}`} className="text-blue-400 underline mr-2">
              Profiili
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminClientSearch