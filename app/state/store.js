import { createStore, combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'
import { persistStore, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/es/storage'
import * as R from 'ramda'

import rootReducers from './state'

export default () => {
  const reduxDevToolBrowserExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const config = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
  }

  const rootReducer = R.pipe(
    combineReducers,
    enableBatching,
    R.curryN(2, persistReducer)(config)
  )(rootReducers)

  const store = createStore(rootReducer, undefined, reduxDevToolBrowserExtension)
  const persistor = persistStore(store)

  return { persistor, store }
}
