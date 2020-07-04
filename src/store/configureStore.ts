import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, PreloadedState } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import createRootReducer, { ReduxState } from './createRootReducer'

export const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authentication'],
}

export let store: any

const configureStore = (preloadedState?: PreloadedState<ReduxState>) => {
  const middlewares = [thunkMiddleware, routerMiddleware(history)]
  const middlewareEnchancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnchancer] // Add any enchancers here
  const composedEnchancers = composeWithDevTools(...enhancers)

  const rootReducer = createRootReducer(history)
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, preloadedState, composedEnchancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./createRootReducer', () => store.replaceReducer(persistedReducer))
  }

  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore
