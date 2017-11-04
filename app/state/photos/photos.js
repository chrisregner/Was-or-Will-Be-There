import { handleActions } from 'redux-actions'
import I from 'immutable'

import * as fromJournals from 'state/journals'

const defaultState = I.List()

const photosReducer = handleActions({
  [fromJournals.ADD_JOURNAL]: (state, { payload }) =>
    payload.get('photos')
      ? state.concat(
          payload
            .get('photos')
            .map(photo => photo.set('countryId', payload.get('countryId')))
        )
      : state
}, defaultState)

export default photosReducer
