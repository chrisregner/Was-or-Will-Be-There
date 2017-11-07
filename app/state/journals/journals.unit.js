import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import I from 'immutable'
import * as R from 'ramda'

import journalsReducer, * as fromJournals from './journals'

const mocks = {
  initialState: I.List([]),
}

test.skip('journals | it should return the correct default state')

/**
 * Action creators
 */

const { addJournal } = fromJournals

test('journals.addJournal() | it should remove all photos with isDeleted property from photos', () => {
  const action = addJournal(I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
    photos: I.List([
      I.Map({
        id: 'firstPhotoId',
        path: 'first/photo/path',
        isDeleted: true,
      }),
      I.Map({
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The Second Photo Description',
      }),
      I.Map({
        id: 'thirdPhotoId',
        path: 'third/photo/path',
        description: 'The Third Photo Description',
        isDeleted: true,
      }),
    ]),
  }))

  const actual = action.payload
  const expected = I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
    photos: I.List([
      I.Map({
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The Second Photo Description',
      }),
    ]),
  })

  assert.isTrue(actual.equals(expected))
})

test('journals.addJournal() | it should remove isNotSaved property from all photos', () => {
  const action = addJournal(I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
    photos: I.List([
      I.Map({
        id: 'firstPhotoId',
        path: 'first/photo/path',
      }),
      I.Map({
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The Second Photo Description',
        isNotSaved: true,
      }),
      I.Map({
        id: 'thirdPhotoId',
        path: 'third/photo/path',
        description: 'The Third Photo Description',
        isNotSaved: true,
      }),
    ]),
  }))

  const actual = action.payload
  const expected = I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
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
      I.Map({
        id: 'thirdPhotoId',
        path: 'third/photo/path',
        description: 'The Third Photo Description',
      }),
    ]),
  })

  assert.isTrue(actual.equals(expected))
})

const { editJournal } = fromJournals

test('journals.editJournal() | it should remove all photos with isDeleted property from photos', () => {
  const action = editJournal(I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
    photos: I.List([
      I.Map({
        id: 'firstPhotoId',
        path: 'first/photo/path',
        isDeleted: true,
      }),
      I.Map({
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The Second Photo Description',
      }),
      I.Map({
        id: 'thirdPhotoId',
        path: 'third/photo/path',
        description: 'The Third Photo Description',
        isDeleted: true,
      }),
    ]),
  }))

  const actual = action.payload
  const expected = I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
    photos: I.List([
      I.Map({
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The Second Photo Description',
      }),
    ]),
  })

  assert.isTrue(actual.equals(expected))
})

test('journals.editJournal() | it should remove isNotSaved property from all photos', () => {
  const action = editJournal(I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
    photos: I.List([
      I.Map({
        id: 'firstPhotoId',
        path: 'first/photo/path',
      }),
      I.Map({
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The Second Photo Description',
        isNotSaved: true,
      }),
      I.Map({
        id: 'thirdPhotoId',
        path: 'third/photo/path',
        description: 'The Third Photo Description',
        isNotSaved: true,
      }),
    ]),
  }))

  const actual = action.payload
  const expected = I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
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
      I.Map({
        id: 'thirdPhotoId',
        path: 'third/photo/path',
        description: 'The Third Photo Description',
      }),
    ]),
  })

  assert.isTrue(actual.equals(expected))
})

/**
 * deletePhotos() (side-effect)
 */

const deleteResourcesLens = R.lensPath(['localCloudinary', 'v2', 'api', 'delete_resources'])
const deps = R.set(
  deleteResourcesLens,
  td.func(),
  {},
)
const fakeDeleteResources = R.view(deleteResourcesLens, deps)
const deletePhotos = fromJournals.deletePhotosShell(deps)

test.skip('journals.deletePhotos() | When toDelete arg includes "not-saved", it should delete passed photos with isNotSaved prop in cloud', () => {
  const photos = I.List([
    I.Map({
      id: 'firstPhotoId',
      path: 'first/photo/path',
    }),
    I.Map({
      id: 'secondPhotoId',
      path: 'second/photo/path',
      description: 'The Second Photo Description',
      isNotSaved: true,
    }),
    I.Map({
      id: 'thirdPhotoId',
      path: 'third/photo/path',
      description: 'The Third Photo Description',
    }),
    I.Map({
      id: 'fourthPhotoId',
      path: 'fourth/photo/path',
      isNotSaved: true,
    }),
  ])

  deletePhotos({
    toDelete: ['not-saved'],
    photos,
  })

  td.verify(
    fakeDeleteResources(['secondPhotoId', 'fourthPhotoId']),
    { times: 1, ignoreExtraArgs: true }
  )
  td.reset()
})

test.skip('journals.deletePhotos() | When toDelete arg includes "deleted", it should delete passed photos with isDeleted prop in cloud', () => {
  const photos = I.List([
    I.Map({
      id: 'firstPhotoId',
      path: 'first/photo/path',
    }),
    I.Map({
      id: 'secondPhotoId',
      path: 'second/photo/path',
      description: 'The Second Photo Description',
      isDeleted: true,
    }),
    I.Map({
      id: 'thirdPhotoId',
      path: 'third/photo/path',
      description: 'The Third Photo Description',
    }),
    I.Map({
      id: 'fourthPhotoId',
      path: 'fourth/photo/path',
      isDeleted: true,
    }),
  ])

  deletePhotos({
    toDelete: ['deleted'],
    photos,
  })

  td.verify(
    fakeDeleteResources(['secondPhotoId', 'fourthPhotoId']),
    { times: 1, ignoreExtraArgs: true }
  )
  td.reset()
})

test.skip('journals.deletePhotos() | When toDelete arg includes "all", it should delete all passed photos in cloud', () => {
  const photos = I.List([
    I.Map({
      id: 'firstPhotoId',
      path: 'first/photo/path',
      isNotSaved: true,
    }),
    I.Map({
      id: 'secondPhotoId',
      path: 'second/photo/path',
      description: 'The Second Photo Description',
    }),
    I.Map({
      id: 'thirdPhotoId',
      path: 'third/photo/path',
      description: 'The Third Photo Description',
      isDeleted: true,
    }),
    I.Map({
      id: 'fourthPhotoId',
      path: 'fourth/photo/path',
    }),
  ])

  deletePhotos({
    toDelete: ['all'],
    photos,
  })

  td.verify(
    fakeDeleteResources(['firstPhotoId', 'secondPhotoId', 'thirdPhotoId', 'fourthPhotoId']),
    { times: 1, ignoreExtraArgs: true }
  )
  td.reset()
})

test.skip('journals | when photo deletion fails in cloud, it should repeat the process every 5 seconds until it succeeds')
test.skip('journals | when photo deletion fails in cloud, but only because the photo doesn\'t exist, it should not repeat the process')

/**
 * Reducer
 */

test('journals.ADD_JOURNAL | it should work', () => {
  const initialState = I.List([
    I.Map({
      id: 'firstExistingId',
      title: 'First Existing Id',
    }),
    I.Map({
      id: 'secondExistingId',
      title: 'Second Existing Id',
    }),
  ])
  const action = addJournal(I.Map({
    id: 'randomId',
    title: 'Sample Journal Name',
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
    ]),
  }))

  const actual = journalsReducer(initialState, action)
  const expected = I.List([
    I.Map({
      id: 'firstExistingId',
      title: 'First Existing Id',
    }),
    I.Map({
      id: 'secondExistingId',
      title: 'Second Existing Id',
    }),
    I.Map({
      id: 'randomId',
      title: 'Sample Journal Name',
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
      ]),
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('journals.EDIT_JOURNAL | it should work', () => {

  const initialState = I.List([
    I.Map({
      id: '1',
      title: 'First Journal',
    }),
    I.Map({
      id: '2',
      title: 'Second Journal',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
      photos: I.List([
        I.Map({
          id: 'firstPhotoId',
          path: 'first/photo/path',
        }),
        I.Map({
          id: 'secondPhotoId',
          path: 'second/photo/path',
          description: 'The Second Photo Initial Description',
        }),
      ]),
    }),
    I.Map({
      id: '3',
      title: 'Third Journal',
    }),
  ])

  const action = fromJournals.editJournal(I.Map({
    id: '2',
    title: 'Edited Name',
    textContent: 'Edited Note',
    departure: new Date(2010, 9, 10),
    photos: I.List([
      I.Map({
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The Second Photo Updated Description',
      }),
    ]),
  }))

  const actual = journalsReducer(initialState, action)
  const expected = I.List([
    I.Map({
      id: '1',
      title: 'First Journal',
    }),
    I.Map({
      id: '2',
      title: 'Edited Name',
      textContent: 'Edited Note',
      departure: new Date(2010, 9, 10),
      homecoming: new Date(2001, 0, 10),
      photos: I.List([
        I.Map({
          id: 'secondPhotoId',
          path: 'second/photo/path',
          description: 'The Second Photo Updated Description',
        }),
      ]),
    }),
    I.Map({
      id: '3',
      title: 'Third Journal',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('journals.DELETE_JOURNAL | it should work', () => {

  const initialState = I.List([
    I.Map({
      id: '1',
      title: 'First Journal',
    }),
    I.Map({
      id: '2',
      title: 'Second Journal',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      id: '3',
      title: 'Third Journal',
    }),
  ])

  const action = fromJournals.deleteJournal('2')

  const actual = journalsReducer(initialState, action)
  const expected = I.List([
    I.Map({
      id: '1',
      title: 'First Journal',
    }),
    I.Map({
      id: '3',
      title: 'Third Journal',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

/**
 * Getter
 */

const { journalsGetters } = fromJournals

test('journals.getJournalsByCountryId() | it should work', () => {
  const state = I.List([
    I.Map({
      countryId: 'jp',
      id: '1',
      title: 'First Journal',
    }),
    I.Map({
      countryId: 'ph',
      id: '2',
      title: 'Second Journal',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      countryId: 'ph',
      id: '3',
      title: 'Third Journal',
    }),
  ])

  const actual = journalsGetters.getJournalsByCountryId(state, 'ph')
  const expected = I.List([
    I.Map({
      countryId: 'ph',
      id: '2',
      title: 'Second Journal',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      countryId: 'ph',
      id: '3',
      title: 'Third Journal',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('journals.getJournal() | it should work', () => {
  const state = I.List([
    I.Map({
      id: '1',
      title: 'First Journal',
    }),
    I.Map({
      id: '2',
      title: 'Second Journal',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      id: '3',
      title: 'Third Journal',
    }),
  ])

  const actual = journalsGetters.getJournal(state, '2')
  const expected = I.Map({
    id: '2',
    title: 'Second Journal',
    departure: new Date(2001, 0, 1),
    homecoming: new Date(2001, 0, 10),
  })

  assert.isTrue(actual.equals(expected))
})
