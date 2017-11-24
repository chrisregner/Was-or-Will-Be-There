import { combineReducers } from 'redux-immutable'
import * as R from 'ramda'

import plansReducer, { plansGetters as _plansGetters } from './plans'
import journalsReducer, { journalsGetters as _journalsGetters } from './journals'
import uiReducer, { uiGetters as _uiGetters } from './ui'
// import dummyStore from './dummyStore'

// const rootReducer = combineReducers({
//   plans: plansReducer,
//   journals: journalsReducer,
//   ui: uiReducer,
// }, dummyStore)

const rootReducers = {
  plans: plansReducer,
  journals: journalsReducer,
  ui: uiReducer,
}

/**
 * Getters
 */

const gettersShell = stateToGetters =>
  R.mapObjIndexed(
    (getters, stateKey) =>
      R.mapObjIndexed(
        (getter, getterName) =>
          (state, ...getterArgs) => getter(state[stateKey], ...getterArgs),
        getters
      ),
    stateToGetters
  )

const allGetters = gettersShell({
  ui: _uiGetters,
  plans: _plansGetters,
  journals: _journalsGetters,
})

const {
  ui: uiGetters,
  plans: plansGetters,
  journals: journalsGetters,
} = allGetters

export { uiGetters, plansGetters, journalsGetters }
export default rootReducers
