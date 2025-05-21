import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const FreelancerDashboard = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: '',
    skills: '',
    description: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Hae freelancerin profiili
  const fetchProfile = async () => {
    try {
      const res = await api.get('/freelancers/me')
      console.log('Haettu profiili:', res.data) // Debugging
      setProfile(res.data)
    } catch (err) {
      console.error('Profiilin haku epäonnistui', err)
    } finally {
      setLoading(false)
    }
  }

  // Päivitä freelancerin profiili
  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      await api.put('/freelancers/me', profile)
      alert('Profiili päivitetty onnistuneesti!')
      fetchProfile() // Päivitä profiili uudelleen
    } catch (err) {
      console.error('Profiilin päivitys epäonnistui', err)
    }
  }

  // Poista freelancerin profiili
  const handleProfileDelete = async () => {
    if (!window.confirm('Haluatko varmasti poistaa profiilisi?')) return
    try {
      await api.delete('/freelancers/me')
      alert('Profiili poistettu onnistuneesti!')
      navigate('/login')
    } catch (err) {
      console.error('Profiilin poisto epäonnistui', err)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) return <p>Ladataan...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Oma Profiili</h2>

      {/* Profiilikortti */}
      <div className="bg-gray-800 p-6 rounded-lg mb-10">
        <h3 className="text-2xl font-bold mb-4">Profiili</h3>
        <p><strong>Nimi:</strong> {profile.name}</p>
        <p><strong>Sähköposti:</strong> {profile.email}</p>
        <p><strong>Sijainti:</strong> {profile.location || 'Ei määritelty'}</p>
        <p><strong>Osaamiset:</strong> {profile.skills || 'Ei määritelty'}</p>
        <p><strong>Kuvaus:</strong> {profile.description || 'Ei määritelty'}</p>
      </div>

      {/* Profiilin muokkaus */}
      <form onSubmit={handleProfileUpdate} className="bg-gray-800 p-6 rounded mb-10">
        <h3 className="text-2xl font-bold mb-4">Muokkaa profiilia</h3>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Nimi"
          required
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          placeholder="Sähköposti"
          required
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        />
        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          placeholder="Sijainti"
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        />
        <input
          type="text"
          name="skills"
          value={profile.skills}
          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
          placeholder="Osaamiset"
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        />
        <textarea
          name="description"
          value={profile.description}
          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
          placeholder="Kuvaus"
          rows={3}
          className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Päivitä profiili
        </button>
        <button
          type="button"
          onClick={handleProfileDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ml-4"
        >
          Poista profiili
        </button>
      </form>
    </div>
  )
}

export default FreelancerDashboard