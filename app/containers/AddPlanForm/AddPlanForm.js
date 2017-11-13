import { connect } from 'react-redux'
import { batchActions } from 'redux-batched-actions'

import PlanForm from 'components/PlanForm'
import { setSnackbar } from 'state/ui'
import { addPlan } from 'state/plans'

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

const AddPlanForm = connect(null, mapDispatchToProps)(PlanForm)

export default AddPlanForm
