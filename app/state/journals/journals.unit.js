import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import I from 'immutable'

import journalsReducer, * as fromJournals from './journals'

const fake = {
  shortid: {
    generate: td.func(),
  },
}

const mocks = {
  initialState: I.List([]),
}

const setup = () => {
  td.reset()
  td.when(fake.shortid.generate())
    .thenReturn('0', '1', '2', '3', '4')
}

/**
 * Reducer
 */

test.skip('journals | it should return the correct default state')

const { addJournalShell } = fromJournals
const addJournal = addJournalShell({ shortid: fake.shortid })

test('journals.ADD_JOURNAL | it should work', () => {
  setup()

  const action = addJournal(I.Map({ title: 'Sample Journal Name' }))

  const actual = journalsReducer(mocks.initialState, action)
  const expected = I.List([
    I.Map({
      id: '0',
      title: 'Sample Journal Name',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('journals.EDIT_JOURNAL | it should work', () => {
  setup()

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

  const action = fromJournals.editJournal(I.Map({
    id: '2',
    title: 'Edited Name',
    textContent: 'Edited Note',
    departure: new Date(2010, 9, 10),
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
    }),
    I.Map({
      id: '3',
      title: 'Third Journal',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('journals.DELETE_JOURNAL | it should work', () => {
  setup()

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
