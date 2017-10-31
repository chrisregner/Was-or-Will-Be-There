import { test } from 'mocha'
import { assert } from 'chai'
import D from 'date-fp'

import * as TU from 'services/testUtils'
import TimeBadge from './TimeBadge'

const mocks = {
  today: new Date(),
}

const defProps = {
  today: new Date(),
}

const setup = TU.makeTestSetup({
  Component: TimeBadge,
  defaultProps: defProps,
})


// HOW DO YOU IMPLY "WITHOUT ACCOUNTING TIME" IN CODE?
test.skip('TimeBadge | if the date is in 2 to 30 days, without accounting the time, it should say "in x days"', () => {
  const testWithVars = (date, relativeDate) => {
    const props = { date }
    const dateText = setup({ props })
      .find('.time-badge-date')
      .text()

    const actual = dateText
    const expected = relativeDate

    assert.include(actual, expected)
  }

  // testWithVars()
  // testWithVars()
  // testWithVars()
})
test.skip('TimeBadge | if the date is tomorrow, without accounting the time, it should say "tomorrow"')
test.skip('TimeBadge | if the date is today, without accounting the time, it should say "now!"')
test.skip('TimeBadge | if the date is yesterday or earlier, it should render the "Journalize" link')