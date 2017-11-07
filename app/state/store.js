import { createStore, applyMiddleware, compose } from 'redux'
import { enableBatching } from 'redux-batched-actions'
import I from 'immutable'

import rootReducer from './state'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const fallbackInitialState = I.Map({})

export const configureStore = initialState =>
  createStore(
    enableBatching(rootReducer),
    initialState || fallbackInitialState,
    composeEnhancers(
      applyMiddleware()
    )
  )
