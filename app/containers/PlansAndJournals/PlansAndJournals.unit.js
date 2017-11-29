import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { BarePlansAndJournals } from './PlansAndJournals'

const defProps = {
  match: {
    params: {
      countryId: 'de',
      plansOrJournals: 'plans',
    },
  },
  history: {
    push: td.func(),
  },
  plans: I.List([
    I.Map({
      countryId: 'de',
      id: 'firstPlanId',
      title: 'First Plan Title',
    }),
    I.Map({
      countryId: 'de',
      id: 'secondPlanId',
      title: 'Second Plan Title',
      copy: 'Second plan copy',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2002, 1, 2),
    }),
    I.Map({
      countryId: 'de',
      id: 'thirdPlanId',
      title: 'Third Plan Title',
    }),
    I.Map({
      countryId: 'de',
      id: 'fourthPlanId',
      title: 'Fourth Plan Title',
    }),
  ]),
  journals: I.List([
    I.Map({
      countryId: 'de',
      id: 'firstJournalId',
      title: 'First Journal Title',
    }),
    I.Map({
      countryId: 'de',
      id: 'secondJournalId',
      title: 'Second Journal Title',
      copy: 'Second journal copy',
      departure: new Date(2011, 0, 1),
      homecoming: new Date(2012, 1, 2),
      photos: I.List([
        I.Map({
          id: 'firstJournalPhoto',
          path: 'path/to/first/journal/photo',
        }),
        I.Map({
          id: 'secondJournalPhoto',
          path: 'path/to/second/journal/photo',
          description: 'Default second photo description',
        }),
        I.Map({
          id: 'thirdJournalPhoto',
          path: 'path/to/third/journal/photo',
        }),
      ]),
    }),
    I.Map({
      countryId: 'de',
      id: 'thirdJournalId',
      title: 'Third Journal Title',
    }),
  ]),
}

const setup = TU.makeTestSetup({
  Component: BarePlansAndJournals,
  defaultProps: defProps,
  tools: ['td'],
})

test('containers.PlansAndJournals | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('containers.PlansAndJournals | when in plans route, it should render the plans list', () => {
  const actual = setup().find('[data-test="planList"]').length
  const expected = 1
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals | when in plans route, it should NOT render the journals list', () => {
  const actual = setup().find('[data-test="journalList"]').length
  const expected = 0
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals | when in journals route, it should render the journals list', () => {
  const props = {
    match: {
      params: {
        plansOrJournals: 'journals',
      },
    },
  }
  const actual = setup({ props }).find('[data-test="journalList"]').length
  const expected = 1
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals | when in journals route, it should NOT render the plans list', () => {
  const props = {
    match: {
      params: {
        plansOrJournals: 'journals',
      },
    },
  }
  const actual = setup({ props }).find('[data-test="planList"]').length
  const expected = 0
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals | when plans tab button is clicked, it should call history.push() with correct args', () => {
  setup().find('[data-test="plansLink"]').simulate('click')
  td.verify(defProps.history.push('/countries/de/plans'))
})

test('containers.PlansAndJournals | when journals tab button is clicked, it should call history.push() with correct args', () => {
  setup().find('[data-test="journalsLink"]').simulate('click')
  td.verify(defProps.history.push('/countries/de/journals'))
})

test('containers.PlansAndJournals > plansList | when there are plans, it should render each', () => {
  const actual = setup().find('[data-test="plan"]').length
  const expected = 4
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > plansList | when there are plans, it should render them with correct props', () => {
  const actual = I.fromJS(setup().find('[data-test="plan"]').at(1).props())
  const expected = I.Map({
    type: 'plan',
    data: I.Map({
      countryId: 'de',
      id: 'secondPlanId',
      title: 'Second Plan Title',
      copy: 'Second plan copy',
      departure: new Date(2001, 0, 1),
      homecoming: new Date(2002, 1, 2),
    }),
  })
  assert.isTrue(actual.isSuperset(expected))
})

test('containers.PlansAndJournals > plansList | when there are plans, it should NOT render the no-plan message', () => {
  const actual = setup().find('[data-test="noPlan"]').length
  const expected = 0
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > plansList | when there are NO plans, it should render a message instead', () => {
  const props = { plans: undefined }
  const actual = setup({ props }).find('[data-test="noPlan"]').length
  const expected = 1
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > plansList | when there are NO plans, it should NOT render the plans', () => {
  const props = { plans: undefined }
  const actual = setup({ props }).find('[data-test="plan"]').length
  const expected = 0
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > plansList | it should render an "add plan" link', () => {
  const actual = setup().find('[data-test="addPlan"]').prop('to')
  const expected = '/countries/de/plans/new'
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > journalList | when there are journals, it should render each', () => {
  const props = {
    match: {
      params: {
        plansOrJournals: 'journals',
      },
    },
  }
  const actual = setup({ props }).find('[data-test="journal"]').length
  const expected = 3
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > journalList | when there are journals, it should render them with correct props', () => {
  const props = {
    match: {
      params: {
        plansOrJournals: 'journals',
      },
    },
  }
  const actual = I.fromJS(setup({ props }).find('[data-test="journal"]').at(1).props())
  const expected = I.Map({
    type: 'journal',
    data: I.Map({
      countryId: 'de',
      id: 'secondJournalId',
      title: 'Second Journal Title',
      copy: 'Second journal copy',
      departure: new Date(2011, 0, 1),
      homecoming: new Date(2012, 1, 2),
      photos: I.List([
        I.Map({
          id: 'firstJournalPhoto',
          path: 'path/to/first/journal/photo',
        }),
        I.Map({
          id: 'secondJournalPhoto',
          path: 'path/to/second/journal/photo',
          description: 'Default second photo description',
        }),
        I.Map({
          id: 'thirdJournalPhoto',
          path: 'path/to/third/journal/photo',
        }),
      ]),
    }),
  })
  assert.isTrue(actual.isSuperset(expected))
})

test('containers.PlansAndJournals > journalList | when there are journals, it should NOT render the no-journal message', () => {
  const props = {
    match: {
      params: {
        plansOrJournals: 'journals',
      },
    },
  }
  const actual = setup({ props }).find('[data-test="noJournal"]').length
  const expected = 0
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > journalList | when there are NO journals, it should render a message instead', () => {
  const props = {
    match: {
      params: {
        plansOrJournals: 'journals',
      },
    },
    journals: undefined,
  }
  const actual = setup({ props }).find('[data-test="noJournal"]').length
  const expected = 1
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > journalList | when there are NO journals, it should NOT render the journals', () => {
  const props = {
    match: {
      params: {
        plansOrJournals: 'journals',
      },
    },
    journals: undefined,
  }
  const actual = setup({ props }).find('[data-test="journal"]').length
  const expected = 0
  assert.equal(actual, expected)
})

test('containers.PlansAndJournals > journalList | it should render an "add journal" link', () => {
  const props = {
    match: {
      params: {
        plansOrJournals: 'journals',
      },
    },
  }
  const actual = setup({ props }).find('[data-test="addJournal"]').prop('to')
  const expected = '/countries/de/journals/new'
  assert.equal(actual, expected)
})
