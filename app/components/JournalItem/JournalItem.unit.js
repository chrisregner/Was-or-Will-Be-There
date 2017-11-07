import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'
import D from 'date-fns'

import * as TU from 'services/testUtils'
import JournalItem from './JournalItem'

const defProps = {
  countryId: 'defaultCountryId',
  journal: I.Map({
    id: 'defaultId',
    title: 'Default Journal Name',
  }),
}

const nextYr = D.getYear(new Date()) + 1

const mocks = {
  Jun05NextYr: new Date(nextYr, 5, 5),
  Aug25NexYr: new Date(nextYr, 7, 25),
  nextYrStr: nextYr.toString().slice(2, 4),
}

const setup = TU.makeTestSetup({
  Component: JournalItem,
  defaultProps: defProps,
})

test('components.JournalItem | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('components.JournalItem | it should be a link with correct url', () => {
  const props = {
    countryId: 'ph',
    journal: I.Map({
      id: '143',
    }),
  }
  const wrapper = setup({ props })

  const actual = wrapper.prop('to')
  const expected = '/countries/ph/journals/143'

  assert.equal(actual, expected)
})

test('components.JournalItem | it should show the journal name', () => {
  const props = {
    journal: I.Map({
      title: 'Most Unique Journal Name Ever',
    }),
  }
  const wrapper = setup({ props })

  const expectedText = 'Most Unique Journal Name Ever'
  const actual = wrapper.contains(expectedText)

  assert.isTrue(actual)
})

test('components.JournalItem | when both departure and homecoming is provided, it should show a range', () => {
  const props = {
    journal: I.Map({
      departure: mocks.Jun05NextYr,
      homecoming: mocks.Aug25NexYr,
    }),
  }
  const wrapper = setup({ props })

  const expectedText = `06/05/${mocks.nextYrStr} – 08/25/${mocks.nextYrStr}`
  const actual = wrapper.contains(expectedText)

  assert.isTrue(actual)
})

test('components.JournalItem | when either departure or homecoming is missing, it should show a range with "TBD" as filler', () => {
  const testWhereDepartureIsMissing = () => {
    const props = {
      journal: I.Map({
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
      journal: I.Map({
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

test('components.JournalItem | when no date is provided, it should NOT show a range', () => {
  const wrapper = setup()
  const range = wrapper.find('.journal-item-date-range')
    .prop('secondaryText')

  const actual = range

  assert.isNotOk(actual)
})
