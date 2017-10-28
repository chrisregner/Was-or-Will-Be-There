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

/**
 * Action Creators
 */

export const hideSnackbar = createAction(HIDE_SNACKBAR)
export const setPaperHeight = createAction(
  SET_PAPER_HEIGHT,
  (paperName, height) => ({ paperName, height }),
)

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
}, defaultState)

export default uiReducer
