import { createAction, handleActions } from 'redux-actions'
import I from 'immutable'

const defaultState = I.fromJS({
  snackbar: {
    isVisible: false,
    message: '',
  },
  paperHeights: I.Map({}),
})

/**
 * Constants
 */

export const SET_SNACKBAR = 'ui/SET_SNACKBAR'
export const HIDE_SNACKBAR = 'ui/HIDE_SNACKBAR'
export const SET_NOT_FOUND = 'ui/SET_NOT_FOUND'

/**
 * Action Creators
 */

export const setSnackbar = createAction(SET_SNACKBAR)
export const hideSnackbar = createAction(HIDE_SNACKBAR)
export const setNotFound = createAction(SET_NOT_FOUND)

/**
 * Reducer
 */

const uiReducer = handleActions({
  [SET_SNACKBAR]: (state, { payload }) =>
    state.set('snackbar', new I.Map({
      isVisible: true,
      message: payload,
    })),
  [HIDE_SNACKBAR]: (state, { payload }) =>
    state.setIn(['snackbar', 'isVisible'], false),
  [SET_NOT_FOUND]: (state, { payload }) =>
    state.set('notFound', payload),
}, defaultState)

/**
 * Getters
 */

export const uiGetters = {
  getSnackbarInfo: state => state.get('snackbar'),
  isPathNotFound: (state, route) => state.get('notFound') && state.get('notFound') === route,
}

export default uiReducer
