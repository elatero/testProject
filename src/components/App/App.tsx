import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'

import { Router } from '../Router'
import configureStore, { history } from 'store'
import { setupRedirector } from 'utils/setupInterceptors'

// Setup redux
const { store: reduxStore, persistor } = configureStore()

// Setup interceptors
setupRedirector(reduxStore, history)

//@ts-ignore eslint-disable-next-line react/prop-types
const App = () => {
  // TODO - restore App auto updater
  // const [newServiceWorkerDetected, setSWUpdateDetected] = useState(false)
  // const [serviceWorkerRegistration, setSWRegistration] = useState(false)

  // const handleNewServiceWorker = event => {
  //   setSWRegistration(event.detail.registration)
  //   setSWUpdateDetected(true)
  // }

  // useEffect(() => {
  //   document.addEventListener('onNewServiceWorker', handleNewServiceWorker)

  //   return () => {
  //     document.removeEventListener('onNewServiceWorker', handleNewServiceWorker)
  //   }
  // })

  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}

export const store = reduxStore
export default App
