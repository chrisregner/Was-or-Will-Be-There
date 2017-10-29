import { createAction, handleActions } from 'redux-actions'
import I from 'immutable'

import * as fromPlans from 'state/plans'

const newPlanMsg = 'We have a new plan!'
const defaultState = I.Map({
  snackbar: {
    isVisible: false,
    message: '',
  },
  paperHeights: I.Map({}),
})

/**
 * Constants
 */

export const HIDE_SNACKBAR = 'ui/HIDE_SNACKBAR'
export const SET_PAPER_HEIGHT = 'ui/SET_PAPER_HEIGHT'
export const SET_REAL_ROUTE = 'ui/SET_REAL_ROUTE'

/**
 * Action Creators
 */

export const hideSnackbar = createAction(HIDE_SNACKBAR)
export const setPaperHeight = createAction(
  SET_PAPER_HEIGHT,
  (paperName, height) => ({ paperName, height }),
)
export const setRealRoute = createAction(SET_REAL_ROUTE)

/**
 * Reducer
 */

const uiReducer = handleActions({
  [fromPlans.ADD_PLAN]: (state, { payload }) =>
    state.set('snackbar', new I.Map({
      isVisible: true,
      message: newPlanMsg,
    })),
  [HIDE_SNACKBAR]: (state, { payload }) =>
    state.setIn(['snackbar', 'isVisible'], false),
  [SET_PAPER_HEIGHT]: (state, { payload }) =>
    state.setIn(['paperHeights', payload.paperName], payload.height),
  [SET_REAL_ROUTE]: (state, { payload }) =>
    state.set('realRoute', payload)
}, defaultState)

/**
 * Getters
 */

export const uiGetters = {
  getHighestHeight: state =>
    state.get('paperHeights')
      .reduce((highestHeight, currentHeight) =>
        currentHeight > highestHeight ? currentHeight : highestHeight,
      0),
  isRouteCurrent: (state, route) => state.get('realRoute') === route
}

export default uiReducer
