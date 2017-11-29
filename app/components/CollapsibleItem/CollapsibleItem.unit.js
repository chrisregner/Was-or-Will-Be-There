import { test, after, before } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'
import D from 'date-fns'
import lolex from 'lolex'

import * as TU from 'services/testUtils'
import CollapsibleItem from './CollapsibleItem'

let fakeClock, mocks, defProps, setup

before(() => {
  const today9am = new Date(2001, 0, 1, 9)
  const today3pm = new Date(2001, 0, 1, 15)

  fakeClock = lolex.install({ now: today9am })

  mocks = {
    thirtyDaysAgo: D.subDays(today3pm, 30),
    yesterday: D.subDays(today3pm, 1),
    today: today3pm,
    tomorrow: D.addDays(today3pm, 1),
    inTwoDays: D.addDays(today3pm, 2),
    inFifteenDays: D.addDays(today3pm, 15),
    inThirtyDays: D.addDays(today3pm, 30),
    inThirtyOneDays: D.addDays(today3pm, 31),
    inOneYear: D.addYears(today3pm, 1),
  }

  defProps = {
    type: 'plan',
    data: I.Map({
      countryId: 'de',
      id: 'defaultDataId',
      title: 'Default Title',
      copy: 'Default copy',
      departure: mocks.today,
      homecoming: mocks.inOneYear,
      photos: I.List([
        I.Map({
          id: 'defaultPhotoOne',
          path: 'path/to/default/photo/one',
        }),
        I.Map({
          id: 'defaultPhotoSecond',
          path: 'path/to/default/photo/second',
          description: 'Default second photo description',
        }),
        I.Map({
          id: 'defaultPhotoThree',
          path: 'path/to/default/photo/three',
        }),
      ]),
    }),
    muiTheme: {
      palette: {
        primary1Color: '',
        primary2Color: '',
        tertiary2Color: '',
        tertiary3Color: '',
        secondaryTextColor: '',
      },
    },
    isSelected: false,
  }

  setup = TU.makeTestSetup({
    Component: CollapsibleItem,
    defaultProps: defProps,
  })
})

after(() => { fakeClock.uninstall() })

test('components.CollapsibleItem | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('components.CollapsibelItem > summary | when clicked, it should toggle its details', () => {
  const wrapper = setup()

  wrapper.find('[data-test="summary"]').simulate('click')
  const actualAfterFirstClick = wrapper.find('[data-test="details"]').prop('in')
  assert.isTrue(actualAfterFirstClick)

  wrapper.find('[data-test="summary"]').simulate('click')
  const actualAfterSecondClick = wrapper.find('[data-test="details"]').prop('in')
  assert.isFalse(actualAfterSecondClick)
})

test('components.CollapsibelItem > summary > title | it should be rendered', () => {
  const actual = setup().find('[data-test="summary"]').find('[data-test="title"]').text()
  const expected = 'Default Title'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > summary > title | it should have the correct title attribute', () => {
  const actual = setup().find('[data-test="summary"]').find('[data-test="title"]').prop('title')
  const expected = 'Default Title'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > summary > dateRange | when both departure and homecoming is provided, it should be rendered with correct text', () => {
  const actual = setup().find('[data-test="summary"]').find('[data-test="dateRange"]').text()
  const expected = '01/01/01 – 01/01/02'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > summary > dateRange | when only departure is provided, it should still be rendered with "(TBD)" in place of homecoming', () => {
  const props = { data: I.Map({ homecoming: undefined }) }
  const actual = setup({ props })
    .find('[data-test="summary"]')
    .find('[data-test="dateRange"]')
    .text()
  const expected = '01/01/01 – (TBD)'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > summary > dateRange | when only homecoming is provided, it should still be rendered with "(TBD)" in place of departure', () => {
  const props = { data: I.Map({ departure: undefined }) }
  const actual = setup({ props })
    .find('[data-test="summary"]')
    .find('[data-test="dateRange"]')
    .text()
  const expected = '(TBD) – 01/01/02'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > summary > dateRange | when both departure and homecoming is NOT provided, it should not be rendered', () => {
  const props = { data: I.Map({ departure: undefined, homecoming: undefined }) }
  const actual = setup({ props })
    .find('[data-test="summary"]')
    .find('[data-test="dateRange"]')
    .length
  const expected = 0
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details | it should not be shown by default', () => {
  const actual = setup().find('[data-test="details"]').prop('in')
  assert.isFalse(actual)
})

test('components.CollapsibelItem > details > editLink | when type is "plan", it should be rendered with correct url', () => {
  const actual = setup().find('[data-test="details"]').find('[data-test="editLink"]').prop('to')
  const expected = '/countries/de/plans/defaultDataId'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details > editLink | when type is "journal", it should be rendered with correct url', () => {
  const props = { type: 'journal' }
  const actual = setup({ props })
    .find('[data-test="details"]')
    .find('[data-test="editLink"]')
    .prop('to')
  const expected = '/countries/de/journals/defaultDataId'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details > fullTitle | when title in summary is truncated by css, it should be rendered correctly', () => {
  const wrapper = setup()

  // simulate the DOM characteristics when text is truncated with CSS
  wrapper.instance().titleRef({ scrollWidth: 2, clientWidth: 1 })
  wrapper.instance().forceUpdate()
  wrapper.update()

  const actual = wrapper.find('[data-test="details"]').find('[data-test="fullTitle"]').text()
  const expected = 'Default Title'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details > fullTitle | when title in summary is NOT truncated by css, it should NOT be rendered', () => {
  const actual = setup().find('[data-test="details"]').find('[data-test="fullTitle"]').length
  const expected = 0
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details > copy | when copy is provided, it should be rendered', () => {
  const actual = setup().find('[data-test="details"]').find('[data-test="copy"]').text()
  const expected = 'Default copy'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details > copy | when copy is provided and the type is "plan", it should have the correct label', () => {
  const actual = setup().find('[data-test="details"]').find('[data-test="copyLabel"]').text()
  const expected = 'Notes'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details > copy | when copy is provided and the type is "journal", it should have the correct label', () => {
  const props = { type: 'journal' }
  const actual = setup({ props })
    .find('[data-test="details"]')
    .find('[data-test="copyLabel"]')
    .text()
  const expected = 'Story'
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details > copy | when copy is NOT provided, it should NOT be rendered', () => {
  const props = { data: I.Map({ copy: undefined }) }
  const actual = setup({ props })
    .find('[data-test="details"]')
    .find('[data-test="copyLabel"]')
    .length
  const expected = 0
  assert.equal(actual, expected)
})

test('components.CollapsibelItem > details > photosSlider | when photo(s) are provided, it should be rendered with these', () => {
  const actual = setup()
    .find('[data-test="details"]')
    .find('[data-test="photoSlider"]')
    .prop('photos')
  const expected = I.List([
    I.Map({
      id: 'defaultPhotoOne',
      path: 'path/to/default/photo/one',
    }),
    I.Map({
      id: 'defaultPhotoSecond',
      path: 'path/to/default/photo/second',
      description: 'Default second photo description',
    }),
    I.Map({
      id: 'defaultPhotoThree',
      path: 'path/to/default/photo/three',
    }),
  ])
  assert.isTrue(actual.equals(expected))
})

test('components.CollapsibelItem > details > photosSlider | when photo(s) are NOT provided, it should NOT be rendered', () => {
  const props = { data: I.Map({ photos: undefined }) }
  const actual = setup({ props }).find('[data-test="details"]').find('[data-test="photoSlider"]').length
  const expected = 0
  assert.equal(actual, expected)
})

/* TimeAlert */

// NOTE: departure, homecoming, and today is unlikely to be midnight sharp
//   so use examples that have more random times and will miscalculate the keyword
//   if time is included in the calculation

test(
  'components.CollapsibelItem > summary > timeAlert | ' +
  'when type is "plan", homecoming is yesterday or earlier, regardless of departure, ' +
  'it should say "journalize"',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="summary"]')
        .find('[data-test="timeAlert"]')
        .prop('tooltip')
      const expected = 'journalize'
      assert.include(actual, expected)
    }

    testWithVars(mocks.today, mocks.yesterday)
    testWithVars(mocks.inFifteenDays, mocks.yesterday)
    testWithVars(mocks.inOneYear, mocks.yesterday)
    testWithVars(undefined, mocks.yesterday)
    testWithVars(mocks.today, mocks.thirtyDaysAgo)
    testWithVars(mocks.inFifteenDays, mocks.thirtyDaysAgo)
    testWithVars(mocks.inOneYear, mocks.thirtyDaysAgo)
    testWithVars(undefined, mocks.thirtyDaysAgo)
  }
)

test(
  'components.CollapsibelItem > details > timeAlert | ' +
  'when type is "plan", homecoming is yesterday or earlier, regardless of departure, ' +
  'it should be link with correct url',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="details"]')
        .find('[data-test="timeAlert"]')
        .prop('to')
      const expected = '/countries/de/plans/defaultDataId/journalize'
      assert.equal(actual, expected)
    }

    testWithVars(mocks.today, mocks.yesterday)
    testWithVars(mocks.inFifteenDays, mocks.yesterday)
    testWithVars(mocks.inOneYear, mocks.yesterday)
    testWithVars(undefined, mocks.yesterday)
    testWithVars(mocks.today, mocks.thirtyDaysAgo)
    testWithVars(mocks.inFifteenDays, mocks.thirtyDaysAgo)
    testWithVars(mocks.inOneYear, mocks.thirtyDaysAgo)
    testWithVars(undefined, mocks.thirtyDaysAgo)
  }
)

test(
  'components.CollapsibelItem > summary > timeAlert | ' +
  'when type is "plan", homecoming is NOT yesterday or earlier, and departure is in 2 to 30 days, ' +
  'it should say "in X days"',
  () => {
    const testWithVars = (departure, homecoming, noOfDays) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="summary"]')
        .find('[data-test="timeAlert"]')
        .prop('tooltip')
      const expected = `in ${noOfDays} days`
      assert.include(actual, expected)
    }

    testWithVars(mocks.inTwoDays, mocks.inFifteenDays, 2)
    testWithVars(mocks.inFifteenDays, mocks.inOneYear, 15)
    testWithVars(mocks.inThirtyDays, undefined, 30)
  }
)

test(
  'components.CollapsibelItem > details > timeAlert | ' +
  'when type is "plan", homecoming is NOT yesterday or earlier, and departure is in 2 to 30 days, ' +
  'it should say "in X days"',
  () => {
    const testWithVars = (departure, homecoming, noOfDays) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="details"]')
        .find('[data-test="timeAlert"]')
        .text()
      const expected = `in ${noOfDays} days`
      assert.include(actual, expected)
    }

    testWithVars(mocks.inTwoDays, mocks.inFifteenDays, 2)
    testWithVars(mocks.inFifteenDays, mocks.inOneYear, 15)
    testWithVars(mocks.inThirtyDays, undefined, 30)
  }
)

test(
  'components.CollapsibelItem > summary > timeAlert | ' +
  'when type is "plan", homecoming is NOT yesterday or earlier, and departure is tomorrow, ' +
  'it should say "tomorrow"',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="summary"]')
        .find('[data-test="timeAlert"]')
        .prop('tooltip')
      const expected = 'tomorrow'
      assert.include(actual, expected)
    }

    testWithVars(mocks.tomorrow, mocks.inFifteenDays)
    testWithVars(mocks.tomorrow, mocks.inOneYear)
    testWithVars(mocks.tomorrow, undefined)
  }
)

test(
  'components.CollapsibelItem > details > timeAlert | ' +
  'when type is "plan", homecoming is NOT yesterday or earlier, and departure is tomorrow, ' +
  'it should say "tomorrow"',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="details"]')
        .find('[data-test="timeAlert"]')
        .text()
      const expected = 'tomorrow'
      assert.include(actual, expected)
    }

    testWithVars(mocks.tomorrow, mocks.inFifteenDays)
    testWithVars(mocks.tomorrow, mocks.inOneYear)
    testWithVars(mocks.tomorrow, undefined)
  }
)

test(
  'components.CollapsibelItem > summary > timeAlert | ' +
  'when type is "plan", homecoming is NOT yesterday or earlier, and departure is today, ' +
  'it should say "today"',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="summary"]')
        .find('[data-test="timeAlert"]')
        .prop('tooltip')
      const expected = 'today'
      assert.include(actual, expected)
    }

    testWithVars(mocks.today, mocks.inFifteenDays)
    testWithVars(mocks.today, mocks.inOneYear)
    testWithVars(mocks.today, undefined)
  }
)

test(
  'components.CollapsibelItem > details > timeAlert | ' +
  'when type is "plan", homecoming is NOT yesterday or earlier, and departure is today, ' +
  'it should say "today"',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="details"]')
        .find('[data-test="timeAlert"]')
        .text()
      const expected = 'today'
      assert.include(actual, expected)
    }

    testWithVars(mocks.today, mocks.inFifteenDays)
    testWithVars(mocks.today, mocks.inOneYear)
    testWithVars(mocks.today, undefined)
  }
)

test(
  'components.CollapsibelItem > summary > timeAlert | ' +
  'when type is "plan", homecoming is NOT yesterday or earlier, and departure is earlier than today or later than 30 days, ' +
  'it should NOT render',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="summary"]')
        .find('[data-test="timeAlert"]')
        .length
      const expected = 0
      assert.equal(actual, expected)
    }

    testWithVars(mocks.yesterday, mocks.inThirtyOneDays)
    testWithVars(mocks.yesterday, mocks.inOneYear)
    testWithVars(mocks.yesterday, undefined)
    testWithVars(mocks.thirtyDaysAgo, mocks.inThirtyOneDays)
    testWithVars(mocks.thirtyDaysAgo, mocks.inOneYear)
    testWithVars(mocks.thirtyDaysAgo, undefined)
    testWithVars(undefined, mocks.inThirtyOneDays)
    testWithVars(undefined, mocks.inOneYear)
    testWithVars(undefined, undefined)
  }
)

test(
  'components.CollapsibelItem > details > timeAlert | ' +
  'when type is "plan", homecoming is NOT yesterday or earlier, and departure is earlier than today or later than 30 days, ' +
  'it should NOT render',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="details"]')
        .find('[data-test="timeAlert"]')
        .length
      const expected = 0
      assert.equal(actual, expected)
    }

    testWithVars(mocks.yesterday, mocks.inThirtyOneDays)
    testWithVars(mocks.yesterday, mocks.inOneYear)
    testWithVars(mocks.yesterday, undefined)
    testWithVars(mocks.thirtyDaysAgo, mocks.inThirtyOneDays)
    testWithVars(mocks.thirtyDaysAgo, mocks.inOneYear)
    testWithVars(mocks.thirtyDaysAgo, undefined)
    testWithVars(undefined, mocks.inThirtyOneDays)
    testWithVars(undefined, mocks.inOneYear)
    testWithVars(undefined, undefined)
  }
)

test(
  'components.CollapsibelItem > summary > timeAlert | ' +
  'when type is "journal", regardless of the dates, ' +
  'it should NOT render',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        type: 'journal',
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="summary"]')
        .find('[data-test="timeAlert"]')
        .length
      const expected = 0
      assert.equal(actual, expected)
    }

    testWithVars(mocks.today, mocks.yesterday)
    testWithVars(mocks.inTwoDays, mocks.inFifteenDays)
    testWithVars(mocks.tomorrow, mocks.inFifteenDays)
    testWithVars(mocks.today, mocks.inFifteenDays)
    testWithVars(mocks.yesterday, mocks.inThirtyOneDays)
  }
)

test(
  'components.CollapsibelItem > details > timeAlert | ' +
  'when type is "journal", regardless of the dates, ' +
  'it should NOT render',
  () => {
    const testWithVars = (departure, homecoming) => {
      const props = {
        type: 'journal',
        data: I.Map({ departure, homecoming }),
      }
      const actual = setup({ props })
        .find('[data-test="details"]')
        .find('[data-test="timeAlert"]')
        .length
      const expected = 0
      assert.equal(actual, expected)
    }

    testWithVars(mocks.today, mocks.yesterday)
    testWithVars(mocks.inTwoDays, mocks.inFifteenDays)
    testWithVars(mocks.tomorrow, mocks.inFifteenDays)
    testWithVars(mocks.today, mocks.inFifteenDays)
    testWithVars(mocks.yesterday, mocks.inThirtyOneDays)
  }
)
