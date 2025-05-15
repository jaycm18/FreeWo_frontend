import { useState, useEffect } from 'react'
import api from '../api/axios'
import MyJobsList from '../components/MyJobsList'
import CategorySelect from '../components/CategorySelect'

const ClientDashboard = () => {
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: ''
  })
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    category: '',
    location: ''
  })
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    // Hae oma profiili
    const fetchProfile = async () => {
      try {
        const res = await api.get('/jobs/me')
        setProfile(res.data)
      } catch (err) {
        console.error('Profiilin haku epäonnistui', err)
      }
    }
    fetchProfile()
  }, [])

  const handleProfileChange = e => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileUpdate = async e => {
    e.preventDefault()
    try {
      await api.put('/jobs/me', profile)
      setEditMode(false)
      alert('Profiili päivitetty!')
    } catch (err) {
      alert('Profiilin päivitys epäonnistui')
    }
  }

  const handleProfileDelete = async () => {
    if (!window.confirm('Poistetaanko profiili pysyvästi?')) return
    try {
      await api.delete('/jobs/me')
      alert('Profiili poistettu')
      window.location.href = '/' // Kirjaa ulos ja ohjaa etusivulle
    } catch (err) {
      alert('Profiilin poisto epäonnistui')
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
        <CategorySelect
          value={newJob.category}
          onChange={(value) => setNewJob({ ...newJob, category: value })}
          required
        />
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

      <h2 className="text-3xl font-bold mt-12 mb-4">Oma profiili</h2>
      {!editMode ? (
        <div className="bg-gray-800 p-6 rounded mb-6">
          <p><strong>Nimi:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Kategoria:</strong> {profile.category}</p>
          <p><strong>Sijainti:</strong> {profile.location}</p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 mr-4"
          >
            Muokkaa profiilia
          </button>
          <button
            onClick={handleProfileDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4"
          >
            Poista profiili
          </button>
        </div>
      ) : (
        <form onSubmit={handleProfileUpdate} className="bg-gray-800 p-6 rounded mb-6">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Nimi"
            className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Sähköposti"
            className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
          />
          <CategorySelect
            value={profile.category}
            onChange={value => setProfile(prev => ({ ...prev, category: value }))}
            required
          />
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleProfileChange}
            placeholder="Sijainti"
            className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-4"
          >
            Tallenna muutokset
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Peruuta
          </button>
        </form>
      )}


    </div>
  )
}

export default ClientDashboard
