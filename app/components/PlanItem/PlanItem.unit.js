import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'
import D from 'date-fns'

import * as TU from 'services/testUtils'
import PlanItem from './PlanItem'

const defProps = {
  countryId: 'defaultCountryId',
  plan: I.Map({
    id: 'defaultId',
    planName: 'Default Plan Name',
  }),
}

const nextYr = D.getYear(new Date()) + 1

const mocks = {
  Jun05NextYr: new Date(nextYr, 5, 5),
  Aug25NexYr: new Date(nextYr, 7, 25),
  nextYrStr: nextYr.toString().slice(2, 4),
}

const setup = TU.makeTestSetup({
  Component: PlanItem,
  defaultProps: defProps,
})

test('components.PlanItem | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('components.PlanItem | it should be a link with correct url', () => {
  const props = {
    countryId: 'ph',
    plan: I.Map({
      id: '143',
    }),
  }
  const wrapper = setup({ props })

  const actual = wrapper.prop('to')
  const expected = '/countries/ph/plans/143'

  assert.equal(actual, expected)
})

test('components.PlanItem | it should show the plan name', () => {
  const props = {
    plan: I.Map({
      planName: 'Most Unique Plan Name Ever',
    }),
  }
  const wrapper = setup({ props })

  const expectedText = 'Most Unique Plan Name Ever'
  const actual = wrapper.contains(expectedText)

  assert.isTrue(actual)
})

test('components.PlanItem | when both departure and homecoming is provided, it should show a range', () => {
  const props = {
    plan: I.Map({
      departure: mocks.Jun05NextYr,
      homecoming: mocks.Aug25NexYr,
    }),
  }
  const wrapper = setup({ props })

  const expectedText = `06/05/${mocks.nextYrStr} – 08/25/${mocks.nextYrStr}`
  const actual = wrapper.contains(expectedText)

  assert.isTrue(actual)
})

test('components.PlanItem | when either departure or homecoming is missing, it should show a range with "TBD" as filler', () => {
  const testWhereDepartureIsMissing = () => {
    const props = {
      plan: I.Map({
        homecoming: mocks.Aug25NexYr,
      }),
    }
    const wrapper = setup({ props })

    const expectedText = `(TBD) – 08/25/${mocks.nextYrStr}`
    const actual = wrapper.contains(expectedText)

    assert.isTrue(actual)
  }

  const testWhereHomecomingIsMissing = () => {
    const props = {
      plan: I.Map({
        departure: mocks.Jun05NextYr,
      }),
    }
    const wrapper = setup({ props })

    const expectedText = `06/05/${mocks.nextYrStr} – (TBD)`
    const actual = wrapper.contains(expectedText)

    assert.isTrue(actual)
  }

  testWhereDepartureIsMissing()
  testWhereHomecomingIsMissing()
})

test('components.PlanItem | when no date is provided, it should NOT show a range', () => {
  const wrapper = setup()
  const range = wrapper.find('.plan-item-date-range')
    .prop('secondaryText')

  const actual = range

  assert.isNotOk(actual)
})

test('components.PlanItem | it should render the time badge with correct props', () => {
  const testWithVars = (id, countryId, departure, homecoming) => {
    const props = {
      countryId,
      plan: I.Map({
        id,
        departure,
        homecoming,
      }),
    }
    const timeBadgeWrpr = setup({ props })
      .find('.plan-item-time-badge')

    const actual = {
      departure: timeBadgeWrpr.prop('departure'),
      homecoming: timeBadgeWrpr.prop('homecoming'),
    }

    const expected = { departure, homecoming }

    assert.deepEqual(actual, expected)
  }

  testWithVars('firstId', 'jp', mocks.Jun05NextYr, mocks.Aug25NexYr)
  testWithVars('secondId', 'us', mocks.Jun05NextYr, undefined)
  testWithVars('thirdId', 'de', undefined, mocks.Aug25NexYr)
  testWithVars('fourthId', 'ph', undefined, undefined)
})
