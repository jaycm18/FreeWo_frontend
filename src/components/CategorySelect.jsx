// components/CategorySelect.js
import { useEffect, useState } from 'react'
import api from '../api/axios'

const CategorySelect = ({ value, onChange, required = false }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        setCategories(res.data)
      } catch (err) {
        console.error('Kategorioiden haku epäonnistui:', err)
      }
    }

    fetchCategories()
  }, [])

  return (
    <select
      name="category"
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 mb-3 rounded bg-gray-900 text-white"
    >
      <option value="">Valitse kategoria</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  )
}

export default CategorySelect
