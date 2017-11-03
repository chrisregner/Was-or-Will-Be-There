import { connect } from 'react-redux'

import JournalForm from 'components/JournalForm'
import { editJournal, deleteJournal } from 'state/journals'
import { journalsGetters } from 'state'
import withHeightWatcher from 'containers/withHeightWatcher'

const mapStateToProps = (state, { match }) => ({
  initialValues: journalsGetters.getJournal(state, match.params.id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (journalDetails) => {
    const countryId = ownProps.match.params.countryId
    const journalWithCountryId = journalDetails.set('countryId', countryId)

    dispatch(editJournal(journalWithCountryId))
  },
  handleDelete: (id) => {
    dispatch(deleteJournal(id))
  },
})

const EditJournalForm = connect(mapStateToProps, mapDispatchToProps)(
  withHeightWatcher(JournalForm, 'EditJournalForm')
)

export default EditJournalForm
