import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'

import * as TU from 'services/testUtils'
import { BareWorldOverview } from './WorldOverview'

const defProps = {
  worldOverview: I.Map({
    totalPlans: 0,
    totalJournals: 0,
    totalCountries: 0,
    countriesInfo: I.List(),
  })
}

const setup = TU.makeTestSetup({
  Component: BareWorldOverview,
  defaultProps: defProps
})

test.skip('containers.WorldOverview | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test.skip('containers.WorldOverview | it should show the no of plans', () => {
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

test.skip('containers.WorldOverview | it should show the no of journals', () => {
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

test.skip('containers.WorldOverview | it should show the no of countries', () => {
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
      id: 'cn',
      hasPlan: true,
      hasJournal: true,
    }),
    I.Map({
      id: 'de',
      hasPlan: true,
      hasJournal: false
    }),
    I.Map({
      id: 'gb',
      hasPlan: false,
      hasJournal: true
    }),
    I.Map({
      id: 'jp',
      hasPlan: true,
      hasJournal: true
    }),
    I.Map({
      id: 'ph',
      hasPlan: true,
      hasJournal: false
    }),
    I.Map({
      id: 'us',
      hasPlan: false,
      hasJournal: true
    }),
  ])
}

test.skip('containers.WorldOverview > CountriesList | if no country is passed, it should list none', () => {
  const actual = setup()
    .find('.world-overview-country-item')
    .length
  const expected = 0

  assert.equal(actual, expected)
})

test.skip('containers.WorldOverview > CountriesList | if no country is passed, it should show a message', () => {
  const actual = setup()
    .find('.world-overview-no-country-msg')
    .length
  const expected = 1

  assert.equal(actual, expected)
})

test.skip('containers.WorldOverview > CountriesList | if any country is passed, it should NOT show the message', () => {
  const actual = setup()
    .find('.world-overview-no-country-msg')
    .length
  const expected = 0

  assert.equal(actual, expected)
})

test.skip('containers.WorldOverview > CountriesList | it should list all of the countries passed', () => {
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item')
    .length
  const expected = 6

  assert.equal(actual, expected)
})

test.skip('containers.WorldOverview > CountriesList | it should be in alphabetical of country names', () => {
  const countryItems = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item')
  const expectedSequence = [
    'ch', // China
    'de', // Germany
    'jp', // Japan
    'ph', // Philippines
    'gb', // United Kingdom
    'us', // United States
  ]

  expectedSequence.forEach((countryId, index) => {
    const actual = countryItems
      .at(index)
      .prop('classNames')
      .split(' ')
    const expected = `world-overview-country-item-${countryId}`

    assert.includes(actual, expected)
  })
})

test.skip('containers.WorldOverview > CountriesList | it should render link for each item', () => {
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item-de')
    .find('.world-overview-country-item-link')
    .prop('to')
  const expected = '/countries/de'

  assert.equal(actual, expected)
})

test.skip('containers.WorldOverview > CountriesList | it should render country name', () => {
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item-de')
    .find('.world-overview-country-item-name')
    .prop('text')
  const expected = 'Germany'

  assert.equal(actual, expected)
})

test.skip('containers.WorldOverview > CountriesList | if country has plan but NO journal, it should render the tags correctly', () => {
  const germany = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item-de')

  const actual = {
    hasPlanTag: germany
      .find('.world-overview-country-item-has-plan')
      .length,
    hasJournalTag: germany
      .find('.world-overview-country-item-has-journal')
      .length,
  }

  const expected = {
    hasPlan: 1,
    hasJournal: 0
  }

  assert.deepEqual(actual, expected)
})

test.skip('containers.WorldOverview > CountriesList | if country has journal but NO plan, it should render the tags correctly', () => {
  const uk = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item-gb')

  const actual = {
    hasPlanTag: uk
      .find('.world-overview-country-item-has-plan')
      .length,
    hasJournalTag: uk
      .find('.world-overview-country-item-has-journal')
      .length,
  }

  const expected = {
    hasPlan: 0,
    hasJournal: 1
  }

  assert.deepEqual(actual, expected)
})

test.skip('containers.WorldOverview > CountriesList | if country has both journal but plan, it should render the tags correctly', () => {
  const china = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item-cn')

  const actual = {
    hasPlanTag: china
      .find('.world-overview-country-item-has-plan')
      .length,
    hasJournalTag: china
      .find('.world-overview-country-item-has-journal')
      .length,
  }

  const expected = {
    hasPlan: 1,
    hasJournal: 1
  }

  assert.deepEqual(actual, expected)
})
