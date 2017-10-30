import { connect } from 'react-redux'

import PlanForm from 'components/PlanForm'
import { addPlan } from 'state/plans'
import withHeightWatcher from 'containers/withHeightWatcher'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (planDetails) => {
    const countryId = ownProps.match.params.countryId
    const planWithCountryId = planDetails.set('countryId', countryId)

    dispatch(addPlan(planWithCountryId))
  },
})

const AddPlanForm = connect(null, mapDispatchToProps)(
  withHeightWatcher(PlanForm, 'AddPlanForm')
)

export default AddPlanForm
