import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import * as I from 'immutable'

import rootReducer from './state'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = (initialState/* = I.Map()*/) =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware()
    )
  )