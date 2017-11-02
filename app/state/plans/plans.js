import { createAction, handleActions } from 'redux-actions'
import I from 'immutable'
import _shortid from 'shortid'

const defaultState = I.List()

/**
 * Constants
 */

export const ADD_PLAN = 'plans/ADD_PLAN'
export const EDIT_PLAN = 'plans/EDIT_PLAN'
export const DELETE_PLAN = 'plans/DELETE_PLAN'

/**
 * Action Creators
 */

export const addPlanShell = ({ shortid }) =>
  createAction(ADD_PLAN, planDetails => planDetails.set('id', shortid.generate()))
export const addPlan = addPlanShell({ shortid: _shortid })
export const editPlan = createAction(EDIT_PLAN)
export const deletePlan = createAction(DELETE_PLAN)

/**
 * Reducer
 */

const plansReducer = handleActions({
  [ADD_PLAN]: (state, { payload }) => state.push(payload),
  [EDIT_PLAN]: (state, { payload }) =>
    state.map((plan) =>
      plan.get('id') === payload.get('id')
        ? plan.merge(payload)
        : plan
    ),
  [DELETE_PLAN]: (state, { payload }) =>
    state.filter((plan) => plan.get('id') !== payload)
}, defaultState)

export default plansReducer

/**
 * Getters
 */

export const plansGetters = {
  getPlansByCountryId: (plans, countryId) => plans.filter(plan => plan.get('countryId') === countryId),
  getPlan: (plans, id) => plans.find(plan => plan.get('id') === id)
}
