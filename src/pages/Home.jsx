import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [freelancers, setFreelancers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await api.get('/public/public-jobs')
        const freelancersRes = await api.get('/public/public-freelancers')
        setJobs(jobsRes.data)
        setFreelancers(freelancersRes.data)
      } catch (err) {
        console.error('Virhe julkisessa datassa', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {/* Hero-osio */}
      <section className="bg-green-100 text-gray-900 w-full py-20 px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Tervetuloa FreeWo-sivustolle!</h2>
        <p className="text-xl max-w-2xl mx-auto">
          Etsi ja luo toimeksiantoja helposti. Liity mukaan freelancerina, kevytyrittäjänä tai asiakkaana – täysin maksutta!
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
            Rekisteröidy heti tästä!
          </Link>
        </div>
      </section>

      {/* Esittelyosio */}
      <div className="px-6 py-12 max-w-5xl mx-auto space-y-12">
        <div>
          <h3 className="text-3xl font-bold mb-2">Toimeksiannot</h3>
          <p className="text-lg text-gray-400">Tutustu saatavilla oleviin toimeksiantoihin ja löydä sinulle sopiva työprojekti!</p>
        </div>

        {/* Viimeisimmät toimeksiannot */}
        <div>
          <h4 className="text-2xl font-semibold mb-4 text-white">Viimeisimmät toimeksiannot</h4>
          <div className="marquee-container h-44 mb-2">
            <div className="marquee-track">
              {jobs.slice(0, 10).map((job, idx) => (
                <div key={job.id + '-a'} className="bg-gray-800 p-4 rounded-xl shadow mx-2 min-w-[250px]">
                  <h5 className="text-xl font-bold text-green-400">{job.title}</h5>
                  <p className="text-sm text-gray-300">{job.category} • {job.location}</p>
                  <p className="text-gray-400 mt-2 line-clamp-3">
                    {job.description.length > 100
                      ? job.description.slice(0, 100) + '…'
                      : job.description}
                  </p>
                </div>
              ))}
              {jobs.slice(0, 10).map((job, idx) => (
                <div key={job.id + '-b'} className="bg-gray-800 p-4 rounded-xl shadow mx-2 min-w-[250px]">
                  <h5 className="text-xl font-bold text-green-400">{job.title}</h5>
                  <p className="text-sm text-gray-300">{job.category} • {job.location}</p>
                  <p className="text-gray-400 mt-2 line-clamp-3">
                    {job.description.length > 100
                      ? job.description.slice(0, 100) + '…'
                      : job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            <Link to="/login" className="underline text-blue-400 hover:text-blue-300">
              Kirjaudu ammattilaisena nähdäksesi kaikki toimeksiannot
            </Link>
          </p>
        </div>

        {/* Freelancerit */}
        <div>
          <h3 className="text-3xl font-bold mb-2">Freelancerit | Kevytyrittäjät</h3>
          <p className="text-lg text-gray-400">Tutustu osaaviin ammattilaisiin ja löydä täydellinen tekijä projektiisi!</p>
        </div>

        {/* Uusimmat freelancerit */}
        <div>
          <h4 className="text-2xl font-semibold mb-4 text-white">Uusimmat ammattilaiset</h4>
          <div className="marquee-container h-44 mb-2">
            <div className="marquee-track">
              {freelancers.slice(0, 10).map((user, idx) => (
                <div key={user.id + '-a'} className="bg-gray-800 p-4 rounded-xl shadow mx-2 min-w-[250px]">
                  <h5 className="text-xl font-bold text-green-400">{user.name}</h5>
                  <p className="text-sm text-gray-300">{user.category}</p>
                  <p className="text-gray-400 mt-2 line-clamp-3">
                    {user.description.length > 100
                      ? user.description.slice(0, 100) + '…'
                      : user.description}
                  </p>
                </div>
              ))}
              {freelancers.slice(0, 10).map((user, idx) => (
                <div key={user.id + '-b'} className="bg-gray-800 p-4 rounded-xl shadow mx-2 min-w-[250px]">
                  <h5 className="text-xl font-bold text-green-400">{user.name}</h5>
                  <p className="text-sm text-gray-300">{user.category}</p>
                  <p className="text-gray-400 mt-2 line-clamp-3">
                    {user.description.length > 100
                      ? user.description.slice(0, 100) + '…'
                      : user.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            <Link to="/login" className="underline text-blue-400 hover:text-blue-300">
              Kirjaudu asiakkaana nähdäksesi kaikki ammattilaiset
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
