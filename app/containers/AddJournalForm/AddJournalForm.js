import { connect } from 'react-redux'
import I from 'immutable'
import shortid from 'shortid'
import { batchActions } from 'redux-batched-actions'

import JournalForm from 'components/JournalForm'
import { addJournal, deletePhotos } from 'state/journals'
import { setSnackbar } from 'state/ui'
import withHeightWatcher from 'containers/withHeightWatcher'

const mapStateToProps = () => ({
  initialValues: I.Map({
    id: shortid.generate(),
  }),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (journalDetails, photosDeleted) => {
    const countryId = ownProps.match.params.countryId
    const journalWithCountryId = journalDetails.set('countryId', countryId)
    const addJournalNotifMsg = 'Added a new journal entry!'

    dispatch(batchActions([
      addJournal(journalWithCountryId),
      setSnackbar(addJournalNotifMsg),
    ]))
  },
  handleDeletePhotos: deletePhotos,
})

const AddJournalForm = connect(mapStateToProps, mapDispatchToProps)(
  withHeightWatcher(JournalForm, 'AddJournalForm')
)

export default AddJournalForm
