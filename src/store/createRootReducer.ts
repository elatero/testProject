import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'

import { History } from 'history'
import { PersistState } from 'redux-persist'
import features from '../features'

export type ReduxState = {
  _persist: PersistState
  router: RouterState
  authentication: any
  listContact: any
}

const createRootReducer = (history: History) =>
  // @ts-ignore
  combineReducers<ReduxState>({
    router: connectRouter(history),
    authentication: features.authentication.reducer,
    listContact: features.listContact.reducer,
  })

export default createRootReducer
