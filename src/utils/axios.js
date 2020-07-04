import axios from 'axios'

const newBackendGraphQLUrl = String(process.env.REACT_APP_BACKEND_URL)

const REFRESH_TOKEN = `
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`

const updateToken = (token, refreshToken) => {
  if (localStorage.getItem('new_token')) {
    localStorage.setItem('new_token', token)
    localStorage.setItem('new_refreshToken', refreshToken)
  }
  if (sessionStorage.getItem('new_token')) {
    sessionStorage.setItem('new_token', token)
    sessionStorage.setItem('new_refreshToken', refreshToken)
  }
}

const removeToken = (error) => {
  sessionStorage.removeItem('new_token')
  sessionStorage.removeItem('new_refreshToken')
  localStorage.removeItem('new_token')
  localStorage.removeItem('new_refreshToken')
  return Promise.reject(error)
}

const instance = axios.create({ baseURL: newBackendGraphQLUrl })

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('new_token') || sessionStorage.getItem('new_token')
    config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization
    return config
  },
  (err) => Promise.reject(err)
)

const getNewToken = (res) => {
  const token = localStorage.getItem('new_token') || sessionStorage.getItem('new_token')
  const refreshToken = localStorage.getItem('new_refreshToken') || sessionStorage.getItem('new_refreshToken')
  if (token) {
    return axios
      .post(`${newBackendGraphQLUrl}/graphql`, {
        query: REFRESH_TOKEN,
        variables: {
          refreshToken,
        },
      })
      .then((result) => {
        const { token, refreshToken } = result.data.data.refreshToken
        if (token) {
          updateToken(token, refreshToken)
          res.config.headers.Authorization = `Bearer ${token}`
          return instance(res.config)
        }

        res.config.headers.Authorization = undefined
        return removeToken('Token has been expired')
      })
      .catch((nestedError) => {
        res.config.headers.Authorization = undefined
        return removeToken(nestedError)
      })
  }

  res.config.headers.Authorization = undefined
  return removeToken('Token not found')
}

instance.interceptors.response.use(
  (res) => {
    if (res.data.errors && res.data.errors.find((error) => error.message === 'Unauthorized!')) {
      return getNewToken(res)
    }
    return res
  },
  (err) => (err.status !== 401 ? Promise.reject(err) : getNewToken(err.response))
)

export default instance
