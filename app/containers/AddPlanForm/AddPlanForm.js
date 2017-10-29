import { connect } from 'react-redux'

import PlanForm from 'components/PlanForm'
import { addPlan } from 'state/plans'
import withHeightWatcher from 'services/withHeightWatcher'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (planDetails) => {
    const countryId = ownProps.match.params.countryId
    const planWithCountryId = planDetails.set('countryId', countryId)

    dispatch(addPlan(planWithCountryId))
  },
})

const PlanFormWithHtWatcher = withHeightWatcher(PlanForm, 'AddPlanForm')
const AddPlanForm = connect(null, mapDispatchToProps)(PlanFormWithHtWatcher)

export default AddPlanForm
