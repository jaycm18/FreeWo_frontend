import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import FreelancerSearch from '../components/FreelancerSearch'

const Freelancers = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [freelancers, setFreelancers] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    if (!user || (user.role !== 'client' && user.role !== 'admin')) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const res = await api.get('/freelancers')
        setFreelancers(res.data)
        const uniqueCategories = [...new Set(res.data.map(f => f.category))]
        setCategories(uniqueCategories)
      } catch (err) {
        console.error('Freelancereiden haku epäonnistui', err)
      }
    }

    fetchFreelancers()
  }, [])

  // Suodata freelancerit valitun kategorian perusteella
  const filteredFreelancers = selectedCategory
    ? freelancers.filter(f => f.category === selectedCategory)
    : freelancers

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Freelancerit</h1>

      {/* FreelancerSearch-komponentti */}
      <FreelancerSearch />

      {/* Kategorioiden selaus */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Selaa kategorioittain</h2>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)} // Päivitä valittu kategoria
          className="p-3 rounded bg-gray-900 text-white mb-6"
        >
          <option value="">Kaikki kategoriat</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredFreelancers.map(f => (
            <div
              key={f.id}
              className="bg-gray-800 p-4 rounded-lg shadow cursor-pointer"
              onClick={() => navigate(`/freelancer-profile/${f.id}`)}
            >
              <h3 className="text-lg font-semibold text-green-400">{f.name}</h3>
              <p className="text-gray-300">{f.category} — {f.location}</p>
              <p className="text-gray-400">{f.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Freelancers