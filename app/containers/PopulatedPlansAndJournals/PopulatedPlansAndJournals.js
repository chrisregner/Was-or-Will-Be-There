import { connect } from 'react-redux'

import PlansAndJournals from 'components/PlansAndJournals'
import withHeightWatcher from 'containers/withHeightWatcher'
import { plansGetters, journalsGetters } from 'state'

const mapStateToProps = (state, { match }) => ({
  plans: plansGetters.getPlansByCountryId(state, match.params.countryId),
  journals: journalsGetters.getJournalsByCountryId(state, match.params.countryId),
})

const PopulatedPlansAndJournals = withHeightWatcher(
  connect(mapStateToProps)(PlansAndJournals),
  'PopulatedPlansAndJournals',
)

export default PopulatedPlansAndJournals
