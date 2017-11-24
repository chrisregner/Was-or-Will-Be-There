import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'
import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/es/storage'
import * as R from 'ramda'

import rootReducers from './state'

export default () => {
  const makePersistorConfig = (key) => ({
    transforms: [immutableTransform()],
    storage, key,
  })

  const persistedReducers = R.mapObjIndexed(
    (subReducer, subReducerName) => persistReducer(makePersistorConfig(subReducerName), subReducer),
    rootReducers
  )

  const rootReducer = combineReducers(persistedReducers)
  const batchedRootReducer = enableBatching(rootReducer)

  const reduxDevToolBrowserExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(batchedRootReducer, undefined, reduxDevToolBrowserExtension)
  const persistor = persistStore(store)

  return { persistor, store }
}