import axios from 'axios'

// Luodaan axios-instanssi, joka käyttää määriteltyä baseURL:ää ja sallii evästeiden lähettämisen
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api', // Backendin osoite
  withCredentials: true, // Sallii evästeiden ja muiden tunnistetietojen lähettämisen
})

// Funktio tarkistaa, onko JWT-token vanhentunut
const isTokenExpired = (token) => {
  try {
    // Tokenin payload (sisältö) dekoodataan ja tarkistetaan sen vanhenemisaika (exp)
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now() // Palauttaa true, jos token on vanhentunut
  } catch (e) {
    return true // Jos token on virheellinen, oletetaan sen olevan vanhentunut
  }
}

// Request-interceptor: Suoritetaan ennen jokaista pyyntöä
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken') // Haetaan access-token localStoragesta

  if (token && !isTokenExpired(token)) {
    // Jos token on voimassa, lisätään se Authorization-otsikkoon
    config.headers.Authorization = `Bearer ${token}`
  } else if (token) {
    // Jos token on vanhentunut, poistetaan se localStoragesta
    console.warn('[Axios] Access-token vanhentunut, poistetaan...')
    localStorage.removeItem('accessToken')
  }

  return config // Palautetaan muokattu konfiguraatio
})

// Response-interceptor: Suoritetaan jokaisen vastauksen jälkeen
api.interceptors.response.use(
  response => response, // Jos vastaus on onnistunut, palautetaan se sellaisenaan
  async error => {
    const originalRequest = error.config // Tallennetaan alkuperäinen pyyntö

    // Jos vastaus on 401 (Unauthorized) ja pyyntöä ei ole vielä uusittu
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Estetään uusintayrityksen toistuminen

      try {
        console.log('[Axios] Uusitaan access-token...')
        // Lähetetään pyyntö refresh-tokenin avulla uuden access-tokenin saamiseksi
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'}/refresh`, // Refresh-reitti
          {},
          { withCredentials: true } // Lähetetään evästeet mukana
        )

        const newToken = res.data.accessToken // Haetaan uusi access-token vastauksesta
        localStorage.setItem('accessToken', newToken) // Tallennetaan uusi token localStorageen
        originalRequest.headers.Authorization = `Bearer ${newToken}` // Lisätään uusi token alkuperäiseen pyyntöön
        return api(originalRequest) // Lähetetään alkuperäinen pyyntö uudelleen
      } catch (refreshErr) {
        console.error('[Axios] Refresh epäonnistui:', refreshErr)
        return Promise.reject(refreshErr) // Palautetaan virhe, jos refresh epäonnistuu
      }
    }

    return Promise.reject(error) // Palautetaan alkuperäinen virhe, jos se ei ole 401
  }
)

export default api // Viedään axios-instanssi käytettäväksi muualla sovelluksessa
