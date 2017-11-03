import { connect } from 'react-redux'

import PlanForm from 'components/PlanForm'
import { editPlan, deletePlan } from 'state/plans'
import { plansGetters } from 'state'
import withHeightWatcher from 'containers/withHeightWatcher'

const mapStateToProps = (state, { match }) => ({
  initialValues: plansGetters.getPlan(state, match.params.id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (planDetails) => {
    const countryId = ownProps.match.params.countryId
    const planWithCountryId = planDetails.set('countryId', countryId)

    dispatch(editPlan(planWithCountryId))
  },
  handleDelete: (id) => {
    dispatch(deletePlan(id))
  },
})

const EditPlanForm = connect(mapStateToProps, mapDispatchToProps)(
  withHeightWatcher(PlanForm, 'EditPlanForm')
)

export default EditPlanForm
