import { createAction, handleActions } from 'redux-actions'
import I from 'immutable'
import _localCloudinary from 'services/cloudinary'

const defaultState = I.List()
const removeMetaDataFromPhotos = payload =>
  payload.update('photos', photos =>
    photos
      .filter(photo => !photo.get('isDeleted'))
      .map(photo => photo.delete('isNotSaved')))

/**
 * Constants
 */

export const ADD_JOURNAL = 'journals/ADD_JOURNAL'
export const EDIT_JOURNAL = 'journals/EDIT_JOURNAL'
export const DELETE_JOURNAL = 'journals/DELETE_JOURNAL'

/**
 * Action Creators
 */

export const deletePhotosShell = ({ localCloudinary }) => ({ toDelete, photos }) => {
  let photosToDelete

  if (toDelete.includes('all'))
    photosToDelete = photos
  else
    photosToDelete = photos
      .filter((photo) => {
        if (toDelete.includes('not-saved') && photo.get('isNotSaved'))
          return true

        if (toDelete.includes('deleted') && photo.get('isDeleted'))
          return true

        return false
      })

  const photoIds = photosToDelete
    .map(photo => photo.get('id'))
    .toJS()

  console.log('Images to delete:', photoIds) // eslint-disable-line no-console

  // if (photoIds.length)
  //   localCloudinary.v2.api.delete_resources(photoIds, (error, result) => {
  //     if (error)
  //       console.error('Error in attempt to delete the image(s) in cloud: ', error)
  //     else
  //       console.log('Successfully uploaded images: ', result) // eslint-disable-line no-console
  //   })
}

export const addJournal = createAction(ADD_JOURNAL, removeMetaDataFromPhotos)
export const editJournal = createAction(EDIT_JOURNAL, removeMetaDataFromPhotos)
export const deleteJournal = createAction(DELETE_JOURNAL)
export const deletePhotos = deletePhotosShell({ localCloudinary: _localCloudinary })

/**
 * Reducer
 */

const journalsReducer = handleActions({
  [ADD_JOURNAL]: (state, { payload }) => state.push(payload),
  [EDIT_JOURNAL]: (state, { payload }) =>
    state.map(journal =>
      journal.get('id') === payload.get('id')
        ? journal.merge(payload)
        : journal),
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
  getJournals: journals => journals,
}
