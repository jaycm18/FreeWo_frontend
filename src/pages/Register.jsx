import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import CategorySelect from '../components/CategorySelect'

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      role: '',
      location: '',
      description: '',
      skills: '',
      category: ''
    })
    const [error, setError] = useState(null)
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await api.post('/register', formData)
        console.log(res.data)
        navigate('/login')
      } catch (err) {
        setError(err.response?.data?.error || 'Rekisteröinti epäonnistui')
      }
    }
  
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg w-80"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Rekisteröidy</h2>
  
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Nimi
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nimi"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Sähköposti
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Sähköposti"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              Salasana
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Salasana"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
  
          {/* Rooli (dropdown) */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="role">
              Rooli
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="">Valitse rooli</option>
              <option value="client">Työnantaja</option>
              <option value="freelancer">Työntekijä</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label className="block mb-2" htmlFor="location">
              Paikkakunta
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Paikkakunta"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2" htmlFor="skills">
              Osaamiset
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              placeholder="Osaamiset (esim. sähkötyöt, React)"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
  
          {/* Kategoria (käytetään CategorySelect-komponenttia) */}
        <div className="mb-4">
          <label className="block mb-2">Kategoria</label>
          <CategorySelect
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })} // Välitetään vain valittu arvo
            required
          />
        </div>
  
          <div className="mb-4">
            <label className="block mb-2" htmlFor="description">
              Kuvaus (vapaaehtoinen)
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Kuvaus (vapaaehtoinen esittely)"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded bg-gray-700 text-white resize-none"
            ></textarea>
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Rekisteröidy
          </button>
  
          <p className="text-sm text-center text-gray-400 mt-4">
            Onko sinulla jo tili?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Kirjaudu sisään
            </a>
          </p>
        </form>
      </div>
    )
  }
  
  export default Register
  
// Tämä komponentti on rekisteröitymislomake, joka käyttää axiosia API-kutsujen tekemiseen. Se hakee kategoriat ja lähettää rekisteröintitiedot palvelimelle. Lomake sisältää kentät nimen, sähköpostin, salasanan, roolin, paikkakunnan, osaamiset, kategorian ja kuvauksen syöttämistä varten. Lomakkeen lähettämisen jälkeen käyttäjä ohjataan kirjautumissivulle.
// Lomakkeessa on myös virheenkäsittely, joka näyttää mahdolliset virheet käyttäjälle. Lomake on responsiivinen ja mukautuu eri näyttökokoihin.