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

export const addPlan = createAction(ADD_PLAN)

/**
 * Reducer
 */

export const plansReducerShell = ({ shortid }) =>
  handleActions({
    [ADD_PLAN]: (state, { payload }) => state.push(payload.set('id', shortid.generate())),
  }, defaultState)

const plansReducer = plansReducerShell({ shortid: _shortid })

export default plansReducer
