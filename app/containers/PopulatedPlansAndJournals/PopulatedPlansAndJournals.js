import PlansAndJournals from 'components/PlansAndJournals'
import withHeightWatcher from 'services/withHeightWatcher'

const PopulatedPlansAndJournals = withHeightWatcher(PlansAndJournals, 'PopulatedPlansAndJournals')

export default PopulatedPlansAndJournals
