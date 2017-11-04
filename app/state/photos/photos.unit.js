import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'

import photosReducer, * as fromPhotos from './photos'
import * as fromJournals from 'state/journals'

test('photos.ADD_JOURNAL | it should work', () => {
  const initialState = I.List([
    I.Map({
      id: 'firstExistingPhotoId',
      path: 'first/photo/existing/path',
      countryId: 'ph',
    }),
    I.Map({
      id: 'secondExistingPhotoId',
      path: 'second/photo/existing/path',
      description: 'The Second Existing Photo Description',
      countryId: 'ph',
    }),
  ])
  const action = fromJournals.addJournal(I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
    countryId: 'de',
    photos: I.List([
      I.Map({
        id: 'firstPhotoId',
        path: 'first/photo/path',
      }),
      I.Map({
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The Second Photo Description',
      }),
    ])
  }))

  const actual = photosReducer(initialState, action)
  const expected = I.List([
    I.Map({
      id: 'firstExistingPhotoId',
      path: 'first/photo/existing/path',
      countryId: 'ph',
    }),
    I.Map({
      id: 'secondExistingPhotoId',
      path: 'second/photo/existing/path',
      description: 'The Second Existing Photo Description',
      countryId: 'ph',
    }),
    I.Map({
      id: 'firstPhotoId',
      path: 'first/photo/path',
      countryId: 'de',
    }),
    I.Map({
      id: 'secondPhotoId',
      path: 'second/photo/path',
      description: 'The Second Photo Description',
      countryId: 'de',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})