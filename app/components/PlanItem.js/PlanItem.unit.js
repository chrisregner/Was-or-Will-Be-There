import { test } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import I from 'immutable'
import D from 'date-fp'

import * as TU from 'services/testUtils'
import PlanItem from './PlanItem'

const defProps = {
  countryId: 'defaultCountryId',
  plan: I.Map({
    id: 'defaultId',
    planName: 'Default Plan Name',
  })
}

const nextYr = D.get('year', new Date()) + 1
const mocks = {
  Jun05NextYr: new Date(nextYr, 5, 6),
  Aug25NexYr: new Date(nextYr, 7, 26),
  nextYr: nextYr,
}

const setup = TU.makeTestSetup({
  Component: PlanItem,
  defaultProps: defProps
})

test('PlanItem | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('PlanItem | it should be a link with correct url', () => {
  const props = {
    countryId: 'ph',
    plan: I.Map({
      id: '143',
    })
  }
  const wrapper = setup({ props })

  const actual = wrapper.prop('to')
  const expected = '/countries/ph/plans/143'

  assert.equal(actual, expected)
})

test('PlanItem | it should show the plan name', () => {
  const props = {
    plan: I.Map({
      planName: 'Most Unique Plan Name Ever'
    })
  }
  const wrapper = setup({ props })
  const planNameWrpr = wrapper.find('[primaryText="Most Unique Plan Name Ever"]')

  const actual = planNameWrpr.length
  const expected = 1

  assert.equal(actual, expected)
})

test('PlanItem | when both departure and homecoming is provided, it should show a range', () => {
  const props = {
    plan: I.Map({
      departure: mocks.Jun05NextYr,
      homecoming: mocks.Aug25NexYr,
    })
  }
  const wrapper = setup({ props })
  const range = wrapper.find('.plan-item-date-range')
    .prop('secondaryText')
    .props.children

  const actual = range
  const expected = `Jun 05 ${mocks.nextYr} – Aug 25 ${mocks.nextYr}`

  assert.equal(actual, expected)
})

test('PlanItem | when either departure or homecoming is missing, it should show a range with "unspecified" as filler', () => {
  const testWhereDepartureIsMissing = () => {
    const props = {
      plan: I.Map({
        homecoming: mocks.Aug25NexYr,
      })
    }
    const wrapper = setup({ props })
    const range = wrapper.find('.plan-item-date-range')
      .prop('secondaryText')
      .props.children

    const actual = range
    const expected = `(unspecified) – Aug 25 ${mocks.nextYr}`

    assert.equal(actual, expected)
  }

  const testWhereHomecomingIsMissing = () => {
    const props = {
      plan: I.Map({
        departure: mocks.Jun05NextYr,
      })
    }
    const wrapper = setup({ props })
    const range = wrapper.find('.plan-item-date-range')
      .prop('secondaryText')
      .props.children

    const actual = range
    const expected = `Jun 05 ${mocks.nextYr} – (unspecified)`

    assert.equal(actual, expected)
  }

  testWhereDepartureIsMissing()
  testWhereHomecomingIsMissing
})

test('PlanItem | when no date is provided, it should NOT show a range', () => {
  const wrapper = setup()
  const range = wrapper.find('.plan-item-date-range')
      .prop('secondaryText')

  const actual = range

  assert.isNotOk(actual)
})

test('PlanItem | if both homecoming and departure is provided, it should render the time badge with homecoming date as prop', () => {
  const props = {
    plan: I.Map({
      departure: mocks.Jun05NextYr,
      homecoming: mocks.Aug25NexYr,
    })
  }
  const wrapper = setup({ props })
  const timeBadgeNode = wrapper.find(`.plan-item-time-badge`)
    .prop('rightIconButton')

  const actual = timeBadgeNode.props.date
  const expected = mocks.Aug25NexYr

  assert.equal(actual, expected)
})

test('PlanItem | if only homecoming is provided, it should render the time badge with homecoming date as prop', () => {
  const props = {
    plan: I.Map({
      homecoming: mocks.Aug25NexYr,
    })
  }
  const wrapper = setup({ props })
  const timeBadgeNode = wrapper.find(`.plan-item-time-badge`)
    .prop('rightIconButton')

  const actual = timeBadgeNode.props.date
  const expected = mocks.Aug25NexYr

  assert.equal(actual, expected)
})

test('PlanItem | if only departure is provided, it should render the time badge with departure date as prop', () => {
  const props = {
    plan: I.Map({
      departure: mocks.Jun05NextYr,
    })
  }
  const wrapper = setup({ props })
  const timeBadgeNode = wrapper.find(`.plan-item-time-badge`)
    .prop('rightIconButton')

  const actual = timeBadgeNode.props.date
  const expected = mocks.Jun05NextYr

  assert.equal(actual, expected)
})