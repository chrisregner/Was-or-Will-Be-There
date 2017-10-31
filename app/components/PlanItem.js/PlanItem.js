import React from 'react'
import D from 'date-fp'
import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'


import { Link } from 'react-router-dom'
import { List, ListItem } from 'material-ui/List'

const formatDate = date =>
  date
    ? D.format('MMM DD YYYY', date)
    : '(unspecified)'

const createDateRange = (plan) =>
  (plan.get('homecoming') || plan.get('departure'))
  && (<span className='small-caps'>
    {`${formatDate(plan.get('departure'))} – ${formatDate(plan.get('homecoming'))}`}
  </span>)

const PlanItem = ({ countryId, plan }) => (
  <Link
    className='plan-item no-underline'
    to={`/countries/${countryId}/plans/${plan.get('id')}`}
  >
    <ListItem
      className='plan-item-name plan-item-time-badge plan-item-date-range'
      primaryText={plan.get('planName')}
      secondaryText={createDateRange(plan)}
      rightIconButton={
        (plan.get('homecoming') || plan.get('departure'))
        && <div date={plan.get('homecoming') || plan.get('departure')}/>
      }
    />
  </Link>
)

PlanItem.propTypes = {
  countryId: PropTypes.string.isRequired,
  plan: IPropTypes.contains({
    id: PropTypes.string.isRequired,
    planName: PropTypes.string.isRequired,
    departure: PropTypes.instanceOf(Date),
    homecoming: PropTypes.instanceOf(Date),
  }).isRequired
}

/*: <div style={{ paddingRight: 16 }} className='h-100 flex--i items-center'><div>TimeBadge</div></div>*/

export default PlanItem
