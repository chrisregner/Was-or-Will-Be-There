import { connect } from 'react-redux'

import PlanForm from 'components/PlanForm'
import { addPlan } from 'state/plans'
import { setPaperHeight } from 'state/ui'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (planDetails) => {
    const countryId = ownProps.match.params.countryId
    const planWithCountryId = planDetails.set('countryId', countryId)

    dispatch(addPlan(planWithCountryId))
  },
  setPaperHeight: (paperHeight) => {
    dispatch(setPaperHeight('PlanForm', paperHeight))
  }
})

const AddPlanForm = connect(null, mapDispatchToProps)(PlanForm)

export default AddPlanForm
