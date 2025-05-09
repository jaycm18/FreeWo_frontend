import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const MyJobsList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/my-jobs')
      setJobs(res.data)
    } catch (err) {
      console.error('Toimeksiantojen haku epäonnistui', err)
    }
    setLoading(false)
  }

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`)
  }

  const handleDelete = async (jobId) => {
    if (!window.confirm('Haluatko varmasti poistaa tämän toimeksiannon?')) return
    try {
      await api.delete(`/jobs/${jobId}`)
      setJobs(jobs.filter(job => job.id !== jobId && job._id !== jobId))
    } catch (err) {
      console.error('Toimeksiannon poisto epäonnistui', err)
    }
  }

  if (loading) return <p>Ladataan toimeksiantoja...</p>

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Omat toimeksiannot</h2>
      {jobs.length === 0 ? (
        <p>Ei toimeksiantoja vielä.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map(job => (
            <li key={job.id || job._id} className="border border-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-400">{job.category} • {job.location}</p>
              <p className="text-gray-500">{job.budget ? `Budjetti: ${job.budget} €` : 'Budjetti ei määritelty'}</p>
              <p className="text-gray-500">Julkaistu: {new Date(job.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-300 mt-2">{job.description}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(job.id || job._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                >
                  Muokkaa
                </button>
                <button
                  onClick={() => handleDelete(job.id || job._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Poista
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyJobsList
