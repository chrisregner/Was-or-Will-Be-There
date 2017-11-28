import { createAction, handleActions } from 'redux-actions'

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from 'constants/'
import { journals as dummyJournals } from 'state/dummyData'

const defaultState = dummyJournals
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

export const addJournal = createAction(ADD_JOURNAL, removeMetaDataFromPhotos)
export const editJournal = createAction(EDIT_JOURNAL, removeMetaDataFromPhotos)
export const deleteJournal = createAction(DELETE_JOURNAL)
export const deletePhotos = ({ toDelete, photos }) => {
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
    .filter(photo => !photo.get('path').startsWith('default/')) // don't delete dummy photos
    .map(photo => photo.get('id'))

  if (photoIds.size) {
    const reqDelete = () => {
      const proxyurl = 'https://cors-anywhere.herokuapp.com/'
      const serviceUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/upload`
      const idsQuery = photoIds.reduce((acc, photoId) => (
        acc === ''
          ? `?public_ids[]=${photoId}`
          : acc + `&public_ids[]=${photoId}`
      ), '')

      const req = new XMLHttpRequest()
      req.open(
        'DELETE',
        proxyurl + serviceUrl + idsQuery,
        true,
        CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET
      )

      req.setRequestHeader('Authorization', 'Basic ' + btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`))
      req.onreadystatechange = function () {
        if (req.readyState === 4)
          if (req.status >= 200 && req.status < 400) {
            console.log('Successfully deleted images: ', req.responseText) // eslint-disable-line no-console
          } else {
            console.error('Error in attempt to delete the image(s) in cloudinary: ', req.statusText)
          }
      }

      req.send()
    }

    reqDelete()
  }
}

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
