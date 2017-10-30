import { combineReducers } from 'redux-immutable'
import * as R from 'ramda'

import plansReducer, { plansGetters as _plansGetters } from './plans'
import uiReducer, { uiGetters as _uiGetters } from './ui'

// // Delegate default values to child reducers (https://github.com/gajus/redux-immutable#usage)
// const getDefaultState = I.Map({
//   plans: undefined,
//   ui: undefined,
// })

// TODO: must be an Immutable state
const rootReducer = combineReducers({
  plans: plansReducer,
  ui: uiReducer,
})

/**
 * Getters
 */

export const gettersShell = ({
  uiGetters,
  plansGetters,
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
})

const { uiGetters, plansGetters } = gettersShell({
  uiGetters: _uiGetters,
  plansGetters: _plansGetters,
})

export { uiGetters, plansGetters }
export default rootReducer
