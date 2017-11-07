import { connect } from 'react-redux'
import { batchActions } from 'redux-batched-actions'

import PlanForm from 'components/PlanForm'
import { setSnackbar } from 'state/ui'
import { addPlan } from 'state/plans'
import withHeightWatcher from 'containers/withHeightWatcher'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (planDetails) => {
    const countryId = ownProps.match.params.countryId
    const planWithCountryId = planDetails.set('countryId', countryId)

    const addPlanNotifMsg = 'We have a new plan!'

    dispatch(batchActions([
      addPlan(planWithCountryId),
      setSnackbar(addPlanNotifMsg),
    ]))
  },
})

const AddPlanForm = connect(null, mapDispatchToProps)(
  withHeightWatcher(PlanForm, 'AddPlanForm')
)

export default AddPlanForm
