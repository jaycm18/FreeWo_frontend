import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import CategorySelect from '../components/CategorySelect'

const EditJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    budget: ''

    
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/my-jobs`)
        const job = res.data.find(j => j.id === id || j._id === id)
        if (job) {
          setFormData({
            title: job.title,
            category: job.category,
            location: job.location,
            description: job.description,
            budget: job.budget || ''

            
          })
        } else {
          setError('Toimeksiantoa ei löytynyt')
        }
      } catch (err) {
        setError('Toimeksiannon haku epäonnistui')
      }
      setLoading(false)
    }

    fetchJob()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'budget' ? parseFloat(value) || '' : value // Muunna budget numeroksi
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.put(`/jobs/${id}`, formData)
      navigate('/client-dashboard')
    } catch (err) {
      setError('Päivitys epäonnistui')
    }
  }

  if (loading) return <p>Ladataan...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Muokkaa toimeksiantoa</h2>

        <label className="block mb-2">Otsikko</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        <label className="block mb-2">Kategoria</label>
        <CategorySelect
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        />

        <label className="block mb-2 mt-4">Sijainti</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        <label className="block mb-2">Budjetti (€)</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700"
          min={0}
        />

        <label className="block mb-2">Kuvaus</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 rounded bg-gray-700"
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Tallenna muutokset
        </button>
      </form>
    </div>
  )
}

export default EditJob
