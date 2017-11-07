import { connect } from 'react-redux'
import I from 'immutable'
import shortid from 'shortid'

import JournalForm from 'components/JournalForm'
import { addJournal, deletePhotos } from 'state/journals'
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

    dispatch(addJournal(journalWithCountryId))
  },
  handleDeletePhotos: deletePhotos,
})

const AddJournalForm = connect(mapStateToProps, mapDispatchToProps)(
  withHeightWatcher(JournalForm, 'AddJournalForm')
)

export default AddJournalForm
