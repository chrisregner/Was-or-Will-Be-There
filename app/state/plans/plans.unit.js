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

test.skip('plansReducer | it should return the correct default state')

const { addPlanShell } = fromPlans
const addPlan = addPlanShell({ shortid: fake.shortid })

test('plansReducer.ADD_PLAN | it should work', () => {
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
