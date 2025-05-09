import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true,
})

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch (e) {
    return true
  }
}

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')

  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`
  } else if (token) {
    console.warn('[Axios] Access-token vanhentunut, poistetaan...')
    localStorage.removeItem('accessToken')
  }

  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        console.log('[Axios] Uusitaan access-token...')
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'}/refresh`,
          {},
          { withCredentials: true }
        )

        const newToken = res.data.accessToken
        localStorage.setItem('accessToken', newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshErr) {
        console.error('[Axios] Refresh epäonnistui:', refreshErr)
        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(error)
  }
)

export default api
