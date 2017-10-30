import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router-dom'
// import { TimeBadge } from 'components/TimeBadge'

import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'

const PlansAndJournals = ({
  plans,
  match: {
    params: { countryId }
  }
}) => (
  <div>
    <div className='pa2'>
      <Link to={`/countries/${countryId}/plans/new`}>
        <RaisedButton primary={true} label='Add New Plan' />
      </Link>
    </div>
    <List>
      <Subheader>Plans</Subheader>
      {
        plans.map(plan => (
          <Link
            data-name='PlanItem'
            data-plan-id={plan.get('id')}
            to={`/countries/${countryId}/plans/${plan.get('id')}`}
            key={plan.get('id')}
          >
            <ListItem
              primaryText={plan.get('planName')}
              rightIconButton={
                plan.get('departure')
                ? <div data-name='TimeBadge' date={plan.get('departure')} />
                : <div className='h-100 flex items-center'><div>TimeBadge</div></div>
              } />
          </Link>
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
