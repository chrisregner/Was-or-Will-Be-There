import { createAction, handleActions } from 'redux-actions'
import I from 'immutable'
import _shortid from 'shortid'

const defaultState = I.List()

/**
 * Constants
 */

export const ADD_PLAN = 'plans/ADD_PLAN'

/**
 * Action Creators
 */

export const addPlanShell = ({ shortid }) =>
  createAction(ADD_PLAN, planDetails => planDetails.set('id', shortid.generate()))
export const addPlan = addPlanShell({ shortid: _shortid })

/**
 * Reducer
 */


const plansReducer = handleActions({
  [ADD_PLAN]: (state, { payload }) => state.push(payload),
}, defaultState)

export default plansReducer
