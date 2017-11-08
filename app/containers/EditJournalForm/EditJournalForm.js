import { connect } from 'react-redux'
import { batchActions } from 'redux-batched-actions'

import JournalForm from 'components/JournalForm'
import { editJournal, deleteJournal, deletePhotos } from 'state/journals'
import { setSnackbar, setNotFound } from 'state/ui'
import { journalsGetters } from 'state'
import withHeightWatcher from 'containers/withHeightWatcher'

const mapStateToProps = (state, { match }) => ({
  initialValues: journalsGetters.getJournal(state, match.params.id),
  isNotFound: !journalsGetters.getJournal(state, match.params.id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (journalDetails) => {
    const countryId = ownProps.match.params.countryId
    const journalWithCountryId = journalDetails.set('countryId', countryId)
    const editJournalNotifMsg = 'Updated a journal entry!'

    dispatch(batchActions([
      editJournal(journalWithCountryId),
      setSnackbar(editJournalNotifMsg),
    ]))
  },
  handleDelete: (id) => {
    const deleteJournalNotifMsg = 'Deleted a journal entry'

    dispatch(batchActions([
      dispatch(deleteJournal(id)),
      setSnackbar(deleteJournalNotifMsg),
    ]))
  },
  handleDeletePhotos: deletePhotos,
  setNotFound: (notFoundPath) => {
    dispatch(setNotFound(notFoundPath))
  }
})

const EditJournalForm = connect(mapStateToProps, mapDispatchToProps)(
  withHeightWatcher(JournalForm, 'EditJournalForm')
)

export default EditJournalForm
