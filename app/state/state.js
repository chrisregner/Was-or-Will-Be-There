import { combineReducers } from 'redux-immutable'
import * as R from 'ramda'

import plansReducer, { plansGetters as _plansGetters } from './plans'
import journalsReducer, { journalsGetters as _journalsGetters } from './journals'
import uiReducer, { uiGetters as _uiGetters } from './ui'

const rootReducer = combineReducers({
  plans: plansReducer,
  journals: journalsReducer,
  ui: uiReducer,
})

/**
 * Getters
 */

export const gettersShell = ({
  uiGetters,
  plansGetters,
  journalsGetters,
}) => ({
  uiGetters: Object.entries(uiGetters)
    .reduce(
      (newGetters, [oldGetterName, oldGetterFn]) =>
        R.set(
          R.lensProp(oldGetterName),
          (state, ...args) => oldGetterFn(state.get('ui'), ...args),
          newGetters,
        ),
      {}
    ),
  plansGetters: Object.entries(plansGetters)
    .reduce(
      (newGetters, [oldGetterName, oldGetterFn]) =>
        R.set(
          R.lensProp(oldGetterName),
          (state, ...args) => oldGetterFn(state.get('plans'), ...args),
          newGetters,
        ),
      {}
    ),
  journalsGetters: Object.entries(plansGetters)
    .reduce(
      (newGetters, [oldGetterName, oldGetterFn]) =>
        R.set(
          R.lensProp(oldGetterName),
          (state, ...args) => oldGetterFn(state.get('journals'), ...args),
          newGetters,
        ),
      {}
    ),
})

const { uiGetters, plansGetters, journalsGetters } = gettersShell({
  uiGetters: _uiGetters,
  plansGetters: _plansGetters,
  journalsGetters: _journalsGetters,
})

export { uiGetters, plansGetters, journalsGetters }
export default rootReducer
