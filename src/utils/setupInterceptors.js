import axios from 'axios'

export const setupAuthorization = (token) => {
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.token = token
      }
      return config
    },
    (err) => Promise.reject(err)
  )
}

export const setupRedirector = (store, history) => {
  axios.interceptors.response.use(
    (res) => {
      if (res.data.errors && res.data.errors.find((error) => error.message === 'Unauthorized')) {
        store.dispatch({
          type: 'auth/LOGOUT',
          payload: 'Your token was expired, please login again!',
        })
        history.push('/login')
        return Promise.reject(new Error('Unauthorized'))
      }
      return res
    },
    (err) => {
      if (err.request.status !== 401) {
        return Promise.reject(err)
      } else {
        store.dispatch({
          type: 'auth/LOGOUT',
          payload: 'Your token was expired, please login again!',
        })
        history.push('/login')
        return Promise.reject(new Error('Unauthorized'))
      }
    }
  )
}
