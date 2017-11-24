import { createStore, applyMiddleware, compose } from 'redux'
import { enableBatching } from 'redux-batched-actions'
import { persistStore, persistCombineReducers } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/es/storage'

import rootReducer from './state'

export default () => {
  const config = { key: 'root', storage }
  const finalReducer = enableBatching(persistCombineReducers(config, rootReducer))
  const reduxDevToolBrowserExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(finalReducer, undefined, reduxDevToolBrowserExtension)
  const persistor = persistStore(store)

  return { persistor, store }
}