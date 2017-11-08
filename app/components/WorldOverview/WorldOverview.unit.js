import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'

import * as TU from 'services/testUtils'
import WorldOverview from './WorldOverview'

const defProps = {
  worldOverview: I.Map({
    totalPlans: 0,
    totalJournals: 0,
    totalCountries: 0,
    countriesInfo: I.List(),
  })
}

const setup = TU.makeTestSetup({
  Component: WorldOverview,
  defaultProps: defProps
})

test.skip('components.WorldOverview | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test.skip('components.WorldOverview | it should show the no of plans', () => {
  const props = {
    worldOverview: I.Map({
      totalPlans: 143,
    })
  }

  const actual = setup({ props })
    .find('.world-overview-total-plans')
    .contains(143)

  assert.isTrue(actual)
})

test.skip('components.WorldOverview | it should show the no of journals', () => {
  const props = {
    worldOverview: I.Map({
      totalJournals: 143,
    })
  }

  const actual = setup({ props })
    .find('.world-overview-total-journals')
    .contains(143)

  assert.isTrue(actual)
})

test.skip('components.WorldOverview | it should show the no of countries', () => {
  const props = {
    worldOverview: I.Map({
      totalCountries: 143,
    })
  }

  const actual = setup({ props })
    .find('.world-overview-total-countries')
    .contains(143)

  assert.isTrue(actual)
})

const propsWithCountries = {
  countriesInfo:  I.List([
    I.Map({
      id: 'ph',
      hasPlan: true,
      hasJournal: true
    }),
    I.Map({
      id: 'jp',
      hasPlan: true,
      hasJournal: false
    }),
    I.Map({
      id: 'us',
      hasPlan: false,
      hasJournal: true
    }),
    I.Map({
      id: 'de',
      hasPlan: true,
      hasJournal: true
    }),
    I.Map({
      id: 'gb',
      hasPlan: true,
      hasJournal: false
    }),
    I.Map({
      id: 'ch',
      hasPlan: false,
      hasJournal: true,
    }),
  ])
}

test.skip('components.WorldOverview > CountriesList | it should list none if no country is passed', () => {
  const actual = setup()
    .find('.world-overview-country-item')
    .length
  const expected = 0

  assert.equal(actual, expected)
})

test.skip('components.WorldOverview > CountriesList | it should show a message if no country is passed', () => {
  const actual = setup()
    .find('.world-overview-no-country-msg')
    .length
  const expected = 1

  assert.equal(actual, expected)
})

test.skip('components.WorldOverview > CountriesList | it should list all of the countries passed', () => {
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item')
    .length
  const expected = 6

  assert.equal(actual, expected)
})

test.skip('components.WorldOverview > CountriesList | it should be in alphabetical of country names')
test.skip('components.WorldOverview > CountriesList | it should render link for each item')
test.skip('components.WorldOverview > CountriesList | it should render country name')
test.skip('components.WorldOverview > CountriesList | if country has plan but NO journal, it should render the tags correctly')
test.skip('components.WorldOverview > CountriesList | if country has journal but NO plan, it should render the tags correctly')
test.skip('components.WorldOverview > CountriesList | if country has both journal but plan, it should render the tags correctly')
test.skip('components.WorldOverview > CountriesList | if country has both journal but plan, it should render the tags correctly')
