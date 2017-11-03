import { createAction, handleActions } from 'redux-actions'
import I from 'immutable'
import _shortid from 'shortid'

const defaultState = I.List()

/**
 * Constants
 */

export const ADD_JOURNAL = 'journals/ADD_JOURNAL'
export const EDIT_JOURNAL = 'journals/EDIT_JOURNAL'
export const DELETE_JOURNAL = 'journals/DELETE_JOURNAL'

/**
 * Action Creators
 */

export const addJournalShell = ({ shortid }) =>
  createAction(ADD_JOURNAL, journalDetails => journalDetails.set('id', shortid.generate()))
export const addJournal = addJournalShell({ shortid: _shortid })
export const editJournal = createAction(EDIT_JOURNAL)
export const deleteJournal = createAction(DELETE_JOURNAL)

/**
 * Reducer
 */

const journalsReducer = handleActions({
  [ADD_JOURNAL]: (state, { payload }) => state.push(payload),
  [EDIT_JOURNAL]: (state, { payload }) =>
    state.map(journal =>
      journal.get('id') === payload.get('id')
        ? journal.merge(payload)
        : journal
    ),
  [DELETE_JOURNAL]: (state, { payload }) =>
    state.filter(journal => journal.get('id') !== payload),
}, defaultState)

export default journalsReducer

/**
 * Getters
 */

export const journalsGetters = {
  getJournalsByCountryId: (journals, countryId) => journals.filter(journal => journal.get('countryId') === countryId),
  getJournal: (journals, id) => journals.find(journal => journal.get('id') === id),
}
