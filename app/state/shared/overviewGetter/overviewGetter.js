import I from 'immutable'
import { createSelector } from 'reselect'

const getPlans = state => state.get('plans')
const getJournals = state => state.get('journals')

const overviewGetter = createSelector(
  getPlans,
  getJournals,
  (plans, journals) => {
    let countriesInfo = I.List()

    // Yes, the following functions totalPlans and totalJournals has side-effects to countriesInfo
    // This aims to minimize the number of iterations
    // It is all contained in a single function anyway

    plans.forEach((plan) => {
      let isCountryMarkedToHavePlan = false
      const planCountryId = plan.get('countryId')
      const countryIndex = countriesInfo.findIndex(country => {
        if (country.get('id') === planCountryId) {
          isCountryMarkedToHavePlan = country.get('hasPlan')
          return true
        }

        return false
      })

      if (!isCountryMarkedToHavePlan) {
        if (countryIndex !== -1)
          countriesInfo = countriesInfo.update(countryIndex, country =>
            country.set('hasPlan', true))
        else
          countriesInfo = countriesInfo.push(I.Map({
            id: planCountryId,
            hasPlan: true,
            hasJournal: false
          }))
      }
    })

    journals.forEach((journal) => {
      let isCountryMarkedToHaveJournal = false
      const journalCountryId = journal.get('countryId')
      const countryIndex = countriesInfo.findIndex(country => {
        if (country.get('id') === journalCountryId) {
          isCountryMarkedToHaveJournal = country.get('hasJournal')
          return true
        }

        return false
      })

      if (!isCountryMarkedToHaveJournal) {
        if (countryIndex !== -1)
          countriesInfo = countriesInfo.update(countryIndex, country =>
            country.set('hasJournal', true))
        else
          countriesInfo = countriesInfo.push(I.Map({
            id: journalCountryId,
            hasJournal: true,
            hasPlan: false
          }))
      }
    })

    const totalCountries = countriesInfo.size

    return I.Map({
      totalPlans: plans.size,
      totalJournals: journals.size,
      totalCountries: countriesInfo.size,
      countriesInfo,
    })
  }
)

export default overviewGetter
