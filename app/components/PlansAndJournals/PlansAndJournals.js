import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router-dom'
import PlanItem from 'components/PlanItem'

import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'

const PlansAndJournals = ({
  plans,
  match: {
    params: { countryId },
  },
}) => (
  <div>
    <div className='pa2'>
      <Link to={`/countries/${countryId}/plans/new`}>
        <RaisedButton primary label='Add New Plan' />
      </Link>
    </div>
    <List>
      <Subheader>Plans</Subheader>
      {
        plans.map(plan => (
          <PlanItem
            className='plans-and-journals-plan-item'
            key={plan.get('id')}
            countryId={countryId}
            plan={plan}
          />
        )).toJS()
      }
    </List>
  </div>
)

PlansAndJournals.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      countryId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  plans: IPropTypes.listOf(
    IPropTypes.contains({
      id: PropTypes.string.isRequired,
      planName: PropTypes.string.isRequired,
      departure: PropTypes.instanceOf(Date),
    }),
  ),
}

export default PlansAndJournals
