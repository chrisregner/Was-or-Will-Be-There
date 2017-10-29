import { combineReducers } from 'redux-immutable'
import * as I from 'immutable'
import * as R from 'ramda'

import plansReducer from './plans'
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
    )
})

const { uiGetters } = gettersShell({
  uiGetters: _uiGetters
})


export {
  uiGetters,
}

export default rootReducer
