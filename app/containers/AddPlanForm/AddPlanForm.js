import { connect } from 'react-redux'

import PlanForm from 'components/PlanForm'
import { addPlan } from 'state/plans'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (planDetails) => {
    const countryId = ownProps.match.params.countryId
    const planWithCountryId = planDetails.set('countryId', countryId)

    dispatch(addPlan(planWithCountryId))

    // ITEST: this should include countryId
    // ITEST: this should add the plan
    // ITEST: this should notify as well
    // ITEST: notify | this should be hideable
  },
})

const AddPlanForm = connect(null, mapDispatchToProps)(PlanForm)

export default AddPlanForm
