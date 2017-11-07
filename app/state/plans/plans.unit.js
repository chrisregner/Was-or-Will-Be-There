import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import I from 'immutable'

import plansReducer, * as fromPlans from './plans'

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

test.skip('state.plans | it should return the correct default state')

const { addPlanShell } = fromPlans
const addPlan = addPlanShell({ shortid: fake.shortid })

test('state.plans.ADD_PLAN | it should work', () => {
  setup()

  const action = addPlan(I.Map({ planName: 'Sample Plan Name' }))

  const actual = plansReducer(mocks.initialState, action)
  const expected = I.List([
    I.Map({
      id: '0',
      planName: 'Sample Plan Name',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('state.plans.EDIT_PLAN | it should work', () => {
  setup()

  const initialState = I.List([
    I.Map({
      id: '1',
      planName: 'First Plan',
    }),
    I.Map({
      id: '2',
      planName: 'Second Plan',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      id: '3',
      planName: 'Third Plan',
    }),
  ])

  const action = fromPlans.editPlan(I.Map({
    id: '2',
    planName: 'Edited Name',
    notes: 'Edited Note',
    departure: new Date(2010, 9, 10),
  }))

  const actual = plansReducer(initialState, action)
  const expected = I.List([
    I.Map({
      id: '1',
      planName: 'First Plan',
    }),
    I.Map({
      id: '2',
      planName: 'Edited Name',
      notes: 'Edited Note',
      departure: new Date(2010, 9, 10),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      id: '3',
      planName: 'Third Plan',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('state.plans.DELETE_PLAN | it should work', () => {
  setup()

  const initialState = I.List([
    I.Map({
      id: '1',
      planName: 'First Plan',
    }),
    I.Map({
      id: '2',
      planName: 'Second Plan',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      id: '3',
      planName: 'Third Plan',
    }),
  ])

  const action = fromPlans.deletePlan('2')

  const actual = plansReducer(initialState, action)
  const expected = I.List([
    I.Map({
      id: '1',
      planName: 'First Plan',
    }),
    I.Map({
      id: '3',
      planName: 'Third Plan',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

/**
 * Getter
 */

const { plansGetters } = fromPlans

test('state.plans.getPlansByCountryId() | it should work', () => {
  const state = I.List([
    I.Map({
      countryId: 'jp',
      id: '1',
      planName: 'First Plan',
    }),
    I.Map({
      countryId: 'ph',
      id: '2',
      planName: 'Second Plan',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      countryId: 'ph',
      id: '3',
      planName: 'Third Plan',
    }),
  ])

  const actual = plansGetters.getPlansByCountryId(state, 'ph')
  const expected = I.List([
    I.Map({
      countryId: 'ph',
      id: '2',
      planName: 'Second Plan',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      countryId: 'ph',
      id: '3',
      planName: 'Third Plan',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('state.plans.getPlan() | it should work', () => {
  const state = I.List([
    I.Map({
      id: '1',
      planName: 'First Plan',
    }),
    I.Map({
      id: '2',
      planName: 'Second Plan',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2001, 0, 10),
    }),
    I.Map({
      id: '3',
      planName: 'Third Plan',
    }),
  ])

  const actual = plansGetters.getPlan(state, '2')
  const expected = I.Map({
    id: '2',
    planName: 'Second Plan',
    departure: new Date(2001, 0, 1),
    homecoming: new Date(2001, 0, 10),
  })

  assert.isTrue(actual.equals(expected))
})
