import { useState } from 'react'
import api from '../api/axios'
import MyJobsList from '../components/MyJobsList'
import CategorySelect from '../components/CategorySelect'

const ClientDashboard = () => {
  const [freelancers, setFreelancers] = useState([])
  const [search, setSearch] = useState('')
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: ''
  })

  const handleSearch = async () => {
    try {
      const res = await api.get('/freelancers/search', {
        params: { q: search }
      })
      setFreelancers(res.data)
    } catch (err) {
      console.error('Hakutoiminto epäonnistui', err)
    }
  }

  const handleJobChange = e => {
    const { name, value } = e.target
    setNewJob(prev => ({ ...prev, [name]: value }))
  }

  const handleCreateJob = async e => {
    e.preventDefault()
    try {
      const jobData = { ...newJob }
      if (!jobData.budget) delete jobData.budget
      else jobData.budget = parseFloat(jobData.budget)

      await api.post('/jobs', jobData)
      setNewJob({ title: '', description: '', category: '', location: '', budget: '' })
    } catch (err) {
      console.error('Toimeksiannon luonti epäonnistui', err)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Luo uusi toimeksianto</h2>
      <form onSubmit={handleCreateJob} className="bg-gray-800 p-6 rounded mb-10">
        <input
          type="text"
          name="title"
          value={newJob.title}
          onChange={handleJobChange}
          placeholder="Otsikko"
          required
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        />
        <textarea
          name="description"
          value={newJob.description}
          onChange={handleJobChange}
          placeholder="Kuvaus"
          required
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        />
        <CategorySelect value={newJob.category} onChange={handleJobChange} required />
        <input
          type="text"
          name="location"
          value={newJob.location}
          onChange={handleJobChange}
          placeholder="Sijainti"
          required
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        />
        <input
          type="number"
          name="budget"
          value={newJob.budget}
          onChange={handleJobChange}
          placeholder="Budjetti (€)"
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Julkaise toimeksianto
        </button>
      </form>

      <MyJobsList />

      <h2 className="text-3xl font-bold mt-12 mb-4">Hae freelancereita</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Etsi nimellä, taidoilla, sijainnilla..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 p-3 rounded bg-gray-900 text-white border border-gray-600"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-4 text-white rounded"
        >
          Hae
        </button>
      </div>
      {freelancers.map(f => (
        <div key={f.id} className="bg-gray-700 p-4 rounded-lg mb-4">
          <p className="text-lg font-semibold">{f.name}</p>
          <p className="text-gray-300">{f.category} — {f.location}</p>
          <p className="text-gray-400">{f.skills}</p>
        </div>
      ))}
    </div>
  )
}

export default ClientDashboard
