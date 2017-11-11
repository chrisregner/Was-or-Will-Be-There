import { createAction, handleActions } from 'redux-actions'
import I from 'immutable'

const defaultState = I.fromJS({
  snackbar: {
    isVisible: false,
    message: '',
  },
  paperHeights: I.Map({}),
  ghostHeights: I.Map({}),
})

/**
 * Constants
 */

export const SET_SNACKBAR = 'ui/SET_SNACKBAR'
export const HIDE_SNACKBAR = 'ui/HIDE_SNACKBAR'
export const SET_PAPER_HEIGHT = 'ui/SET_PAPER_HEIGHT'
export const REMOVE_PAPER_HEIGHT = 'ui/REMOVE_PAPER_HEIGHT'
export const SET_GHOST_HEIGHT = 'ui/SET_GHOST_HEIGHT'
export const REMOVE_GHOST_HEIGHT = 'ui/REMOVE_GHOST_HEIGHT'
export const SET_REAL_ROUTE = 'ui/SET_REAL_ROUTE'
export const SET_NOT_FOUND = 'ui/SET_NOT_FOUND'

/**
 * Action Creators
 */

export const setSnackbar = createAction(SET_SNACKBAR)
export const hideSnackbar = createAction(HIDE_SNACKBAR)
export const setPaperHeight = createAction(
  SET_PAPER_HEIGHT,
  (paperName, height) => ({ paperName, height }),
)
export const setGhostHeight = createAction(
  SET_GHOST_HEIGHT,
  (paperName, height) => ({ paperName, height }),
)
export const removePaperHeight = createAction(REMOVE_PAPER_HEIGHT)
export const removeGhostHeight = createAction(REMOVE_GHOST_HEIGHT)
export const setRealRoute = createAction(SET_REAL_ROUTE)
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
  [SET_PAPER_HEIGHT]: (state, { payload }) =>
    state.setIn(['paperHeights', payload.paperName], payload.height),
  [SET_GHOST_HEIGHT]: (state, { payload }) =>
    state.setIn(['ghostHeights', payload.paperName], payload.height),
  [REMOVE_PAPER_HEIGHT]: (state, { payload }) =>
    state.deleteIn(['paperHeights', payload]),
  [REMOVE_GHOST_HEIGHT]: (state, { payload }) =>
    state.deleteIn(['ghostHeights', payload]),
  [SET_REAL_ROUTE]: (state, { payload }) =>
    state.set('realRoute', payload),
  [SET_NOT_FOUND]: (state, { payload }) =>
    state.set('notFound', payload),
}, defaultState)

/**
 * Getters
 */

export const uiGetters = {
  getSnackbarInfo: state => state.get('snackbar'),
  getHighestHeight: state =>
    state.get('paperHeights')
      .reduce((highestHeight, currentHeight) =>
        currentHeight > highestHeight ? currentHeight : highestHeight,
      0),
  getHighestGhostHeight: state =>
    state.get('ghostHeights')
      .reduce((highestHeight, currentHeight) =>
        currentHeight > highestHeight ? currentHeight : highestHeight,
      0),
  getHeightByComponentName: (state, componentName) =>
    state.getIn(['paperHeights', componentName]),
  getGhostHeightByComponentName: (state, componentName) =>
    state.getIn(['ghostHeights', componentName]),
  isRouteCurrent: (state, route) => state.get('realRoute') && state.get('realRoute') === route,
  isPathNotFound: (state, route) => state.get('notFound') && state.get('notFound') === route,
}

export default uiReducer
