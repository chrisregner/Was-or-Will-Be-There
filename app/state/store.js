import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from './state'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = initialState =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware()
    )
  )
