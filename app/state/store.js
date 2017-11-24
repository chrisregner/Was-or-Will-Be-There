import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'
import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/es/storage'
import * as R from 'ramda'

import rootReducers from './state'

export default () => {
  const makePersistorConfig = (key) => ({ transforms: [immutableTransform()], key, storage })
  const persistedReducers = {
    ui: rootReducers.ui,
    plans: persistReducer(makePersistorConfig('plans'), rootReducers.plans),
    journals: persistReducer(makePersistorConfig('journals'), rootReducers.journals),
  }

  const rootReducer = combineReducers(rootReducers)
  const batchedRootReducer = enableBatching(rootReducer)

  const reduxDevToolBrowserExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(batchedRootReducer, undefined, reduxDevToolBrowserExtension)
  // const persistor = persistStore(store)

  return { /*persistor, */store }
}