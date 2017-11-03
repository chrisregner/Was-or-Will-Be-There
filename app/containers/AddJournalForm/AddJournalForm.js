import { connect } from 'react-redux'

import JournalForm from 'components/JournalForm'
import { addJournal } from 'state/journals'
import withHeightWatcher from 'containers/withHeightWatcher'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (journalDetails) => {
    const countryId = ownProps.match.params.countryId
    const journalWithCountryId = journalDetails.set('countryId', countryId)

    dispatch(addJournal(journalWithCountryId))
  },
})

const AddJournalForm = connect(null, mapDispatchToProps)(
  withHeightWatcher(JournalForm, 'AddJournalForm')
)

export default AddJournalForm
