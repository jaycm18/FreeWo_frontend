import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import JobSearch from '../components/JobSearch'

const Jobs = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
      if (!user || (user.role !== 'freelancer' && user.role !== 'admin')) {
        navigate('/login')
      }
    }, [user, navigate])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs')
        setJobs(res.data)

        // Luo uniikit kategoriat
        const uniqueCategories = [...new Set(res.data.map(job => job.category))]
        setCategories(uniqueCategories)
      } catch (err) {
        console.error('Toimeksiantojen haku epäonnistui', err)
      }
    }

    fetchJobs()
  }, [])

  // Suodata toimeksiannot valitun kategorian perusteella
  const filteredJobs = selectedCategory
    ? jobs.filter(job => job.category === selectedCategory)
    : jobs

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Toimeksiannot</h1>

      {/* JobSearch-komponentti */}
      <JobSearch />

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

        {/* Toimeksiantojen listaus */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-gray-800 p-4 rounded-lg shadow cursor-pointer"
              onClick={() => navigate(`/job-profile/${job.id}`)}
            >
              <h3 className="text-lg font-semibold text-green-400">{job.title}</h3>
              <p className="text-gray-300">{job.category} — {job.location}</p>
              <p className="text-gray-400">{job.description}</p>
              <p className="text-gray-500 mt-2">Budjetti: {job.budget} €</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Jobs