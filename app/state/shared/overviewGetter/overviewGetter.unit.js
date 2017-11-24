import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'

import overviewGetter from './overviewGetter'

/*
cn China
de Germany
jp Japan
no Norway
ph Philippines
us United States

This should have 7 journals
  2 going to ph
  2 going to jp
  1 going to us
  1 going to no
  1 going to cn
This should have 6 plans
  2 going to ph
  2 going to jp
  2 going to de
This should have 6 countries
  ph hasPlan and hasJournal
  jp hasPlan and hasJournal
  us hasJournal
  de hasPlan
  no hasJournal
  cn hasJournal
*/

const nonZeroState = {
  journals: I.List([
    I.Map({
      id: 'journalOne',
      countryId: 'ph',
      title: 'Journal One',
    }),
    I.Map({
      id: 'journalTwo',
      countryId: 'jp',
      title: 'Journal Two',
    }),
    I.Map({
      id: 'journalThree',
      countryId: 'us',
      title: 'Journal Three',
    }),
    I.Map({
      id: 'journalFour',
      countryId: 'jp',
      title: 'Journal Four',
    }),
    I.Map({
      id: 'journalFive',
      countryId: 'ph',
      title: 'Journal Five',
    }),
    I.Map({
      id: 'journalSix',
      countryId: 'no',
      title: 'Journal Six',
    }),
    I.Map({
      id: 'journalSeven',
      countryId: 'cn',
      title: 'Journal Seven',
    }),
  ]),
  plans: I.List([
    I.Map({
      id: 'planOne',
      countryId: 'ph',
      planName: 'Plan One',
    }),
    I.Map({
      id: 'planTwo',
      countryId: 'jp',
      planName: 'Plan Two',
    }),
    I.Map({
      id: 'planThree',
      countryId: 'de',
      planName: 'Plan Three',
    }),
    I.Map({
      id: 'planFour',
      countryId: 'de',
      planName: 'Plan Four',
    }),
    I.Map({
      id: 'planFive',
      countryId: 'jp',
      planName: 'Plan Five',
    }),
    I.Map({
      id: 'planSix',
      countryId: 'ph',
      planName: 'Plan Five',
    }),
  ]),
}

const zeroState = {
  plans: I.List(),
  journals: I.List(),
}

test('state.overviewGetter | it should return the total number of plans', () => {
  const testWithNonZeroState = () => {
    const actual = overviewGetter(nonZeroState).get('totalPlans')
    const expected = 6
    assert.equal(actual, expected)
  }

  const testWithZeroState = () => {
    const actual = overviewGetter(zeroState).get('totalPlans')
    const expected = 0
    assert.equal(actual, expected)
  }

  testWithNonZeroState()
  testWithZeroState()
})

test('state.overviewGetter | it should return the total number of journals', () => {
  const testWithNonZeroState = () => {
    const actual = overviewGetter(nonZeroState).get('totalJournals')
    const expected = 7
    assert.equal(actual, expected)
  }

  const testWithZeroState = () => {
    const actual = overviewGetter(zeroState).get('totalJournals')
    const expected = 0
    assert.equal(actual, expected)
  }

  testWithNonZeroState()
  testWithZeroState()
})

test('state.overviewGetter | it should return the total number of countries traveled', () => {
  const testWithNonZeroState = () => {
    const actual = overviewGetter(nonZeroState).get('totalCountries')
    const expected = 6
    assert.equal(actual, expected)
  }

  const testWithZeroState = () => {
    const actual = overviewGetter(zeroState).get('totalCountries')
    const expected = 0
    assert.equal(actual, expected)
  }

  testWithNonZeroState()
  testWithZeroState()
})

test('state.overviewGetter | it should return the Map of unique countries with hasPlan and hasJournal data, ordered by their country names', () => {
  const testWithNonZeroState = () => {
    const actual = overviewGetter(nonZeroState).get('countriesInfo')
    const expected = I.OrderedMap({
      cn: I.Map({ // China
        hasPlan: false,
        hasJournal: true,
      }),
      de: I.Map({ // Germany
        hasPlan: true,
        hasJournal: false,
      }),
      jp: I.Map({ // Japan
        hasPlan: true,
        hasJournal: true,
      }),
      no: I.Map({ // Norway
        hasPlan: false,
        hasJournal: true,
      }),
      ph: I.Map({ // Philippines
        hasPlan: true,
        hasJournal: true,
      }),
      us: I.Map({ // United States
        hasPlan: false,
        hasJournal: true,
      }),
    })

    assert.isTrue(
      actual.equals(expected)
    )
  }

  const testWithZeroState = () => {
    const actual = overviewGetter(zeroState).get('countriesInfo')
    const expected = I.List([])

    assert.isTrue(
      actual.isSubset(expected) &&
      actual.isSuperset(expected)
    )
  }

  testWithNonZeroState()
  testWithZeroState()
})
