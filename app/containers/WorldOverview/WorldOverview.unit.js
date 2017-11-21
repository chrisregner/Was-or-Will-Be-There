import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'

import * as TU from 'services/testUtils'
import { BareWorldOverview } from './WorldOverview'
import { createFlagUrl } from 'constants/'

const defProps = {
  worldOverview: I.Map({
    totalPlans: 0,
    totalJournals: 0,
    totalCountries: 0,
    countriesInfo: I.Map(),
  }),
  muiTheme: {
    palette: {},
  },
}

const setup = TU.makeTestSetup({
  Component: BareWorldOverview,
  defaultProps: defProps,
})

test('containers.WorldOverview | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('containers.WorldOverview | it should show the no of plans', () => {
  const props = {
    worldOverview: I.Map({
      totalPlans: 143,
    }),
  }

  const actual = setup({ props })
    .find('.world-overview-total-plans')
    .contains(143)

  assert.isTrue(actual)
})

test('containers.WorldOverview | it should show the no of journals', () => {
  const props = {
    worldOverview: I.Map({
      totalJournals: 143,
    }),
  }

  const actual = setup({ props })
    .find('.world-overview-total-journals')
    .contains(143)

  assert.isTrue(actual)
})

test('containers.WorldOverview | it should show the no of countries', () => {
  const props = {
    worldOverview: I.Map({
      totalCountries: 143,
    }),
  }

  const actual = setup({ props })
    .find('.world-overview-total-countries')
    .contains(143)

  assert.isTrue(actual)
})

const propsWithCountriesInfo = {
  worldOverview: I.Map({
    countriesInfo: I.Map({
      cn: I.Map({
        hasPlan: true,
        hasJournal: true,
      }),
      de: I.Map({
        hasPlan: true,
        hasJournal: false,
      }),
      gb: I.Map({
        hasPlan: false,
        hasJournal: true,
      }),
      jp: I.Map({
        hasPlan: true,
        hasJournal: true,
      }),
      ph: I.Map({
        hasPlan: true,
        hasJournal: false,
      }),
      us: I.Map({
        hasPlan: false,
        hasJournal: true,
      }),
    }),
  }),
}

test('containers.WorldOverview > CountriesList | if no country is passed, it should list none', () => {
  const actual = setup()
    .find('.world-overview-country-item')
    .length
  const expected = 0

  assert.equal(actual, expected)
})

test('containers.WorldOverview > CountriesList | if no country is passed, it should show a message', () => {
  const actual = setup()
    .find('.world-overview-no-country-msg')
    .length
  const expected = 1

  assert.equal(actual, expected)
})

test('containers.WorldOverview > CountriesList | if any country is passed, it should NOT show the message', () => {
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-no-country-msg')
    .length
  const expected = 0

  assert.equal(actual, expected)
})

test('containers.WorldOverview > CountriesList | it should list all of the countries passed', () => {
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item')
    .length
  const expected = 6

  assert.equal(actual, expected)
})

test('containers.WorldOverview > CountriesList | it should render link for each item', () => {
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item-de')
    .find('.world-overview-country-item-link')
    .prop('to')
  const expected = '/countries/de'

  assert.equal(actual, expected)
})

test('containers.WorldOverview > CountriesList | it should render country name', () => {
  /**
   * NOTE: `.find('CountryNameAndFlagL').dive()` isn't optimal (coupling to implementation)
   *   but using mount() on components with SVG has issues
   */
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item-de')
    .find('CountryNameAndFlag')
    .dive()
    .find('.world-overview-country-item-name')
    .text()
  const expected = 'Germany'

  assert.equal(actual, expected)
})

test('containers.WorldOverview > CountriesList | it should render country flag', () => {
  /**
   * NOTE: `.find('CountryNameAndFlagL').dive()` isn't optimal (coupling to implementation)
   *   but using mount() on components with SVG has issues
   */
  const actual = setup({ props: propsWithCountriesInfo })
    .find('.world-overview-country-item-de')
    .find('CountryNameAndFlag')
    .dive()
    .find('.world-overview-country-item-flag')
    .prop('src')
  const expected = createFlagUrl('de')

  assert.equal(actual, expected)
})

test('containers.WorldOverview > CountriesList | if country has plan but NO journal, it should render the tags correctly', () => {
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
    hasPlanTag: 1,
    hasJournalTag: 0,
  }

  assert.deepEqual(actual, expected)
})

test('containers.WorldOverview > CountriesList | if country has journal but NO plan, it should render the tags correctly', () => {
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
    hasPlanTag: 0,
    hasJournalTag: 1,
  }

  assert.deepEqual(actual, expected)
})

test('containers.WorldOverview > CountriesList | if country has both journal but plan, it should render the tags correctly', () => {
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
    hasPlanTag: 1,
    hasJournalTag: 1,
  }

  assert.deepEqual(actual, expected)
})
