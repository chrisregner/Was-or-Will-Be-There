import React from 'react'
import formatDate from 'date-fns/format'
import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ListItem } from 'material-ui/List'

import TimeBadge from 'components/TimeBadge'

const smartFormatDate = date =>
  date
    ? formatDate(date, 'MM/DD/YY')
    : '(TBD)'

const createDateRange = plan =>
  (plan.get('homecoming') || plan.get('departure')) &&
  `${smartFormatDate(plan.get('departure'))} – ${smartFormatDate(plan.get('homecoming'))}`

const PlanItem = ({ countryId, plan }) => (
  <Link
    className='plan-item no-underline'
    to={`/countries/${countryId}/plans/${plan.get('id')}`}
  >
    <ListItem className='plan-item-name plan-item-date-range'>
      <div className='flex items-center w-100'>
        <div className='flex-grow-1 pr2 truncate'>
          {plan.get('planName')}
          {
            (plan.get('homecoming') || plan.get('departure')) &&
            <div className='pt1 f6 gray'>{createDateRange(plan)}</div>
          }
        </div>
        <div>
          <TimeBadge
            className='plan-item-time-badge'
            id={plan.get('id')}
            countryId={countryId}
            homecoming={plan.get('homecoming')}
            departure={plan.get('departure')}
          />
        </div>
      </div>
    </ListItem>
  </Link>
)

PlanItem.propTypes = {
  countryId: PropTypes.string.isRequired,
  plan: IPropTypes.contains({
    id: PropTypes.string.isRequired,
    planName: PropTypes.string.isRequired,
    departure: PropTypes.instanceOf(Date),
    homecoming: PropTypes.instanceOf(Date),
  }).isRequired,
}

/*: <div style={{ paddingRight: 16 }} className='h-100 flex--i items-center'><div>TimeBadge</div></div> */

export default PlanItem
