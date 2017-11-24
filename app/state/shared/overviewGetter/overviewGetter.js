import I from 'immutable'
import { createSelector } from 'reselect'
import countryNames from 'constants/countryNames'

const getPlans = state => state['plans']
const getJournals = state => state['journals']

const overviewGetter = createSelector(
  getPlans,
  getJournals,
  (plans, journals) => {
    const makeCountriesInfoReducer = type => (acc, entry) => {
      const countryId = entry.get('countryId')

      if (!acc.get(countryId))
        return acc.set(countryId, I.Map({
          [type]: true,
          [type === 'hasPlan' ? 'hasJournal' : 'hasPlan']: false,
        }))
      else if (!acc.getIn([countryId, type]))
        return acc.setIn([countryId, type], true)

      return acc
    }

    const incompleteCountriesInfo = plans.reduce(makeCountriesInfoReducer('hasPlan'), I.Map())
    const unsortedCountriesInfo = journals.reduce(makeCountriesInfoReducer('hasJournal'), incompleteCountriesInfo)
    const countriesInfo = unsortedCountriesInfo.sortBy(
      (countryInfo, countryId) => countryId,
      (countryA, countryB) => {
        const countryNameA = countryNames[countryA]
        const countryNameB = countryNames[countryB]

        if (countryNameA > countryNameB)
          return 1
        else if (countryNameA < countryNameB)
          return -1

        return 0
      }
    )

    return I.Map({
      totalPlans: plans.size,
      totalJournals: journals.size,
      totalCountries: countriesInfo.size,
      countriesInfo,
    })
  }
)

export default overviewGetter
