import React, { useState } from 'react'
import FreelancerSearch from './FreelancerSearch'

const AdminFreelancerSearch = ({ onResults }) => {
  const [results, setResults] = useState([])

  // Oletetaan, että FreelancerSearch palauttaa tulokset onSearch-callbackilla
  const handleResults = (data) => {
    setResults(data)
    if (onResults) onResults(data)
  }

  return (
    <div>
      <FreelancerSearch onSearch={handleResults} />
    </div>
  )
}

export default AdminFreelancerSearch