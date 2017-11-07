import { test, after } from 'mocha'
import { assert } from 'chai'
import D from 'date-fns'
import lolex from 'lolex'

import * as TU from 'services/testUtils'
import TimeBadge from './TimeBadge'

const todayMidnight = new Date(2001, 0, 1)
const todayNoon = new Date(2001, 0, 1, 12)
const fakeClock = lolex.install({ now: todayNoon })

const createMidnightDate = noOfDays =>
  D.addDays(todayMidnight, noOfDays)

const mocks = {
  todayMidnight,
  todayNoon,
}

const defProps = {
  countryId: 'countryDefaultId',
  id: 'defaultId',
}

const setup = TU.makeTestSetup({
  Component: TimeBadge,
  defaultProps: defProps,
})

after(() => {
  fakeClock.uninstall()
})

test('components.TimeBadge | if homecoming is yesterday or earlier, regardless of departure, it should render the "Journalize" link', () => {
  const testWithVars = (id, countryId, homecomingNoOfDays, departureNoOfDays) => {
    const homecoming = createMidnightDate(homecomingNoOfDays)
    const departure = createMidnightDate(departureNoOfDays)

    const props = { id, countryId, homecoming, departure }
    const expectedLink = `/countries/${countryId}/plans/${id}/journalize`
    const linkWrpr = setup({ props })
      .find(`[to="${expectedLink}"]`)

    const actual = linkWrpr.exists()

    assert.isTrue(actual)
  }

  testWithVars('firstId', 'jp', -1, -2)
  testWithVars('secondId', 'us', -15, -30)
  testWithVars('thirdId', 'de', -100, -200)
})

test('components.TimeBadge | if departure is later than 30 days, it should not render', () => {
  const testWithVars = (noOfDays) => {
    const departure = createMidnightDate(noOfDays)
    const props = { departure }
    const wrapper = setup({ props })

    const actual = wrapper.getElement()

    assert.isNull(actual)
  }

  testWithVars(31)
  testWithVars(666)
})

test('components.TimeBadge | if departure is in 2 to 30 days, it should say "in x days"', () => {
  const testWithVars = (noOfDays) => {
    const departure = createMidnightDate(noOfDays)
    const props = { departure }

    const wrapper = setup({ props })

    const actual = wrapper.find('.time-badge-text').text()
    const expected = `in ${noOfDays} days`

    assert.include(actual, expected)
  }

  testWithVars(2)
  testWithVars(15)
  testWithVars(30)
})

test('components.TimeBadge | if departure is tomorrow, it should say "tomorrow"', () => {
  const departure = createMidnightDate(1)
  const props = { departure }
  const wrapper = setup({ props })

  const actual = wrapper.find('.time-badge-text').text()
  const expected = 'tomorrow'

  assert.include(actual, expected)
})

test('components.TimeBadge | if departure is today, it should say "today"', () => {
  const departure = mocks.todayMidnight
  const props = { departure }
  const wrapper = setup({ props })

  const actual = wrapper.find('.time-badge-text').text()
  const expected = 'today'

  assert.include(actual, expected)
})
