import { connect } from 'react-redux'
import { batchActions } from 'redux-batched-actions'

import PlanForm from 'components/PlanForm'
import { editPlan, deletePlan } from 'state/plans'
import { setSnackbar } from 'state/ui'
import { plansGetters } from 'state'
import withHeightWatcher from 'containers/withHeightWatcher'

const mapStateToProps = (state, { match }) => ({
  initialValues: plansGetters.getPlan(state, match.params.id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (planDetails) => {
    const countryId = ownProps.match.params.countryId
    const planWithCountryId = planDetails.set('countryId', countryId)
    const editPlanNotifMsg = 'Updated a plan!'

    dispatch(batchActions([
      editPlan(planWithCountryId),
      setSnackbar(editPlanNotifMsg),
    ]))
  },
  handleDelete: (id) => {
    const deletePlanNotifMsg = 'Bye bye plan..'

    dispatch(batchActions([
      dispatch(deletePlan(id)),
      setSnackbar(deletePlanNotifMsg),
    ]))
  },
})

const EditPlanForm = connect(mapStateToProps, mapDispatchToProps)(
  withHeightWatcher(PlanForm, 'EditPlanForm')
)

export default EditPlanForm
