import { createStore, applyMiddleware, compose } from 'redux'
import { enableBatching } from 'redux-batched-actions'

import rootReducer from './state'
import dummyStore from './dummyStore'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = initialState =>
  createStore(
    enableBatching(rootReducer),
    initialState || dummyStore,
    composeEnhancers(
      applyMiddleware()
    )
  )
