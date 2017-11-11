import I from 'immutable'
import { createSelector } from 'reselect'
import countryNames from 'constants/countryNames'

const getPlans = state => state.get('plans')
const getJournals = state => state.get('journals')

const overviewGetter = createSelector(
  getPlans,
  getJournals,
  (plans, journals) => {
    let unorderedCountriesInfo = I.List()

    // Yes, the following functions totalPlans and totalJournals has side-effects to unorderedCountriesInfo
    // This aims to minimize the number of iterations
    // It is all contained in a single function anyway

    plans.forEach((plan) => {
      let isCountryMarkedToHavePlan = false
      const planCountryId = plan.get('countryId')
      const countryIndex = unorderedCountriesInfo.findIndex((country) => {
        if (country.get('id') === planCountryId) {
          isCountryMarkedToHavePlan = country.get('hasPlan')
          return true
        }

        return false
      })

      if (!isCountryMarkedToHavePlan)
        if (countryIndex !== -1)
          unorderedCountriesInfo = unorderedCountriesInfo.update(countryIndex, country =>
            country.set('hasPlan', true))
        else
          unorderedCountriesInfo = unorderedCountriesInfo.push(I.Map({
            id: planCountryId,
            hasPlan: true,
            hasJournal: false,
          }))
    })

    journals.forEach((journal) => {
      let isCountryMarkedToHaveJournal = false
      const journalCountryId = journal.get('countryId')
      const countryIndex = unorderedCountriesInfo.findIndex((country) => {
        if (country.get('id') === journalCountryId) {
          isCountryMarkedToHaveJournal = country.get('hasJournal')
          return true
        }

        return false
      })

      if (!isCountryMarkedToHaveJournal)
        if (countryIndex !== -1)
          unorderedCountriesInfo = unorderedCountriesInfo.update(countryIndex, country =>
            country.set('hasJournal', true))
        else
          unorderedCountriesInfo = unorderedCountriesInfo.push(I.Map({
            id: journalCountryId,
            hasJournal: true,
            hasPlan: false,
          }))
    })

    const countriesInfo = unorderedCountriesInfo.sort((countryA, countryB) => {
      const countryNameA = countryNames[countryA.get('id')]
      const countryNameB = countryNames[countryB.get('id')]

      if (countryNameA > countryNameB)
        return 1
      else if (countryNameA < countryNameB)
        return -1

      return 0
    })

    return I.Map({
      totalPlans: plans.size,
      totalJournals: journals.size,
      totalCountries: unorderedCountriesInfo.size,
      countriesInfo,
    })
  }
)

export default overviewGetter
