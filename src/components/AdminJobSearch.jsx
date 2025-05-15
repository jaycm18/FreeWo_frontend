import React, { useState } from 'react'
import JobSearch from './JobSearch'

const AdminJobSearch = ({ onResults }) => {
  const [results, setResults] = useState([])

  // Oletetaan, että JobSearch palauttaa tulokset onSearch-callbackilla
  const handleResults = (data) => {
    setResults(data)
    if (onResults) onResults(data)
  }

  return (
    <div>
      <JobSearch onSearch={handleResults} />
    </div>
  )
}

export default AdminJobSearch