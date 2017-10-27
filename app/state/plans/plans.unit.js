import test from 'tape'
import td from 'testdouble'
import I from 'immutable'

import * as fromPlans from './plans'

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

const plansReducer = fromPlans.plansReducerShell({
  shortid: fake.shortid,
})

const { addPlan } = fromPlans

test.skip('plansReducer | it should return the correct default state')

test('plansReducer.ADD_PLAN | it should work', t => {
  setup()

  const action = addPlan(I.Map({ planName: 'Sample Plan Name' }))

  const actual = plansReducer(mocks.initialState, action)
  const expected = I.List([
    I.Map({
      id: '0',
      planName: 'Sample Plan Name',
    }),
  ])

  t.is(actual.equals(expected), true)
  t.end()
})
