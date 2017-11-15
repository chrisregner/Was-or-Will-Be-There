import { connect } from 'react-redux'
import { batchActions } from 'redux-batched-actions'

import JournalForm from 'components/JournalForm'
import { deletePlan } from 'state/plans'
import { addJournal, deletePhotos } from 'state/journals'
import { setSnackbar, setNotFound } from 'state/ui'
import { plansGetters } from 'state'

const mapStateToProps = (state, { match }) => ({
  initialValues: plansGetters.getPlan(state, match.params.id),
  isNotFound: !plansGetters.getPlan(state, match.params.id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (journalDetails) => {
    const { countryId } = ownProps.match.params
    const journalWithCountryId = journalDetails.set('countryId', countryId)
    const journalizeNotifMsg = 'Once a plan, now a story!'

    dispatch(batchActions([
      addJournal(journalWithCountryId),
      deletePlan(journalWithCountryId.get('id')),
      setSnackbar(journalizeNotifMsg),
    ]))
  },
  handleDelete: (id) => {
    const deletePlanNotifMsg = 'Bye bye plan..'

    dispatch(batchActions([
      dispatch(deletePlan(id)),
      setSnackbar(deletePlanNotifMsg),
    ]))
  },
  handleDeletePhotos: deletePhotos,
  setNotFound: (notFoundPath) => {
    dispatch(setNotFound(notFoundPath))
  },
})

const JournalizeJournalForm = connect(mapStateToProps, mapDispatchToProps)(JournalForm)

export default JournalizeJournalForm
