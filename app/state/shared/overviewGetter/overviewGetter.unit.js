import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'

import overviewGetter from './overviewGetter'

// This should have 5 journals
//   2 going to countryOne
//   2 going to countryTwo
//   1 going to countryThree
// This should have 6 plans
//   2 going to countryOne
//   2 going to countryTwo
//   2 going to countryFour
// This should have 4 countries
//   countryOne hasPlan and hasJournal
//   countryTwo hasPlan and hasJournal
//   countryThree hasJournal
//   countryFour hasPlan
const nonZeroState = I.Map({
  journals: I.List([
    I.Map({
      id: 'journalOne',
      countryId: 'countryOne',
      title: 'Journal One',
    }),
    I.Map({
      id: 'journalTwo',
      countryId: 'countryTwo',
      title: 'Journal Two',
    }),
    I.Map({
      id: 'journalThree',
      countryId: 'countryThree',
      title: 'Journal Three',
    }),
    I.Map({
      id: 'journalFour',
      countryId: 'countryTwo',
      title: 'Journal Four',
    }),
    I.Map({
      id: 'journalFive',
      countryId: 'countryOne',
      title: 'Journal Five',
    })
  ]),
  plans: I.List([
    I.Map({
      id: 'planOne',
      countryId: 'countryOne',
      planName: 'Plan One',
    }),
    I.Map({
      id: 'planTwo',
      countryId: 'countryTwo',
      planName: 'Plan Two',
    }),
    I.Map({
      id: 'planThree',
      countryId: 'countryFour',
      planName: 'Plan Three',
    }),
    I.Map({
      id: 'planFour',
      countryId: 'countryFour',
      planName: 'Plan Four',
    }),
    I.Map({
      id: 'planFive',
      countryId: 'countryTwo',
      planName: 'Plan Five',
    }),
    I.Map({
      id: 'planSix',
      countryId: 'countryOne',
      planName: 'Plan Five',
    })
  ])
})

const zeroState = I.Map({
  plans: I.List(),
  journals: I.List()
})

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
    const expected = 5
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
    const expected = 4
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

test('state.overviewGetter | it should return the list of unique countries with hasPlan and hasJournal data', () => {
  const testWithNonZeroState = () => {
    const actual = overviewGetter(nonZeroState).get('countriesInfo')
    const expected = I.List([
      I.Map({
        id: 'countryOne',
        hasPlan: true,
        hasJournal: true
      }),
      I.Map({
        id: 'countryTwo',
        hasPlan: true,
        hasJournal: true
      }),
      I.Map({
        id: 'countryThree',
        hasPlan: false,
        hasJournal: true
      }),
      I.Map({
        id: 'countryFour',
        hasPlan: true,
        hasJournal: false
      }),
    ])

    assert.isTrue(
      actual.isSubset(expected)
      && actual.isSuperset(expected)
    )
  }

  const testWithZeroState = () => {
    const actual = overviewGetter(zeroState).get('countriesInfo')
    const expected = I.List([])

    assert.isTrue(
      actual.isSubset(expected)
      && actual.isSuperset(expected)
    )
  }

  testWithNonZeroState()
  testWithZeroState()
})
