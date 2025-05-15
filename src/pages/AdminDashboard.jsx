import React, { useState } from 'react'
import AdminFreelancerSearch from '../components/AdminFreelancerSearch'
import AdminJobSearch from '../components/AdminJobSearch'
import CategorySelect from '../components/CategorySelect'
import AdminClientSearch from '../components/AdminClientSearch'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [selectedFreelancers, setSelectedFreelancers] = useState([])
  const [selectedJobs, setSelectedJobs] = useState([])
  const [selectedClients, setSelectedClients] = useState([])
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: '',
    name: '',
    category: '',
    location: '',
    skills: '',
    description: ''
  })

  // Poista freelancer
  const handleDeleteFreelancer = async (id) => {
    if (!window.confirm('Poistetaanko freelancer?')) return
    try {
      await api.delete(`/admin/freelancers/${id}`)
      setSelectedFreelancers(selectedFreelancers.filter(u => u.id !== id))
    } catch {
      alert('Poisto epäonnistui')
    }
  }

  // Poista toimeksianto
  const handleDeleteJob = async (id) => {
    if (!window.confirm('Poistetaanko toimeksianto?')) return
    try {
      await api.delete(`/admin/jobs/${id}`)
      setSelectedJobs(selectedJobs.filter(j => j.id !== id))
    } catch {
      alert('Poisto epäonnistui')
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      await api.post('/admin/users', newUser)
      setNewUser({
        email: '',
        password: '',
        role: '',
        name: '',
        category: '',
        location: '',
        skills: '',
        description: ''
      })
      alert('Käyttäjä lisätty!')
    } catch {
      alert('Käyttäjän luonti epäonnistui')
    }
  }

  if (user?.role !== 'admin') return <div>Ei oikeuksia</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Freelancer-haku */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Freelancer-haku</h2>
        <AdminFreelancerSearch onResults={setSelectedFreelancers} />
        <div className="mt-4">
          {selectedFreelancers.map(f => (
            <div key={f.id} className="flex justify-between items-center bg-gray-800 p-3 rounded mb-2">
              <span>{f.name} ({f.email})</span>
              <button
                onClick={() => handleDeleteFreelancer(f.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Poista
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Toimeksiantojen haku */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Toimeksiantojen haku</h2>
        <AdminJobSearch onResults={setSelectedJobs} />
        <div className="mt-4">
          {selectedJobs.map(j => (
            <div key={j.id} className="flex justify-between items-center bg-gray-800 p-3 rounded mb-2">
              <span>{j.title} ({j.category})</span>
              <button
                onClick={() => handleDeleteJob(j.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Poista
              </button>
            </div>
          ))}
        </div>
      </section>

       {/* Asiakkaiden haku */}
       <section className="mb-8">
         <h2 className="text-2xl font-semibold mb-2">Asiakkaiden haku</h2>
         <AdminClientSearch onResults={setSelectedClients} />
      </section>

      {/* Uuden käyttäjän luonti */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Lisää uusi käyttäjä</h2>
        <form onSubmit={handleCreateUser} className="flex flex-wrap gap-2 bg-gray-800 p-4 rounded">
          <input
            type="email"
            placeholder="Sähköposti"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            required
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Salasana"
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            required
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Nimi"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <CategorySelect
            value={newUser.category}
            onChange={value => setNewUser({ ...newUser, category: value })}
            required
          />
          <input
            type="text"
            placeholder="Sijainti"
            value={newUser.location}
            onChange={e => setNewUser({ ...newUser, location: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Osaamiset"
            value={newUser.skills}
            onChange={e => setNewUser({ ...newUser, skills: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <textarea
            placeholder="Kuvaus"
            value={newUser.description}
            onChange={e => setNewUser({ ...newUser, description: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white w-full"
          />
          <select
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
            required
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Rooli</option>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Luo käyttäjä
          </button>
        </form>
      </section>
    </div>
  )
}

export default AdminDashboard