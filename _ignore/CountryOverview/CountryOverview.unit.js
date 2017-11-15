import { test, suite } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import CountryOverview from './CountryOverview'

const setup = TU.makeTestSetup({
  Component: CountryOverview,
})

suite('components.CountryOverview', () => {
  test('it should render without error', () => {
    const actual = setup().exists()
    assert.isTrue(actual)
  })
})

suite('components.CountryOverview > planList', () => {
  test('when there are plans, it should render the plans correctly')
  test('when there are NO plans, it should render a message')
})

suite('components.CountryOverview > journalList', () => {
  test('when there are journals, it should render the journals correctly')
  test('when there are NO journals, it should render a message')
})
