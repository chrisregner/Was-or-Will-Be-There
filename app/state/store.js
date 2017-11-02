import { createStore, applyMiddleware, compose } from 'redux'
import I from 'immutable'

import rootReducer from './state'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const fallbackInitialState = I.Map({
  plans: I.List([
    I.Map({
      countryId: 'de',
      id: 'foo',
      planName: 'The Foo Plan',
    })
  ])
})

export const configureStore = initialState =>
  createStore(
    rootReducer,
    initialState || fallbackInitialState,
    composeEnhancers(
      applyMiddleware()
    )
  )
