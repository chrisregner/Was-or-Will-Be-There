import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router-dom'
import PlanItem from 'components/PlanItem'
import JournalItem from 'components/JournalItem'

import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'

const PlansAndJournals = ({
  plans,
  journals,
  match: {
    params: { countryId },
  },
}) => (
  <div>
    <List>
      <Subheader>Plans</Subheader>
      {
        plans.isEmpty()
          ? <div className='plans-and-journals-no-plan-msg pl3 pb2 i'>
              You haven’t added any plan!
            </div>
          : plans.map(plan => (
              <PlanItem
                className='plans-and-journals-plan-item'
                key={plan.get('id')}
                countryId={countryId}
                plan={plan}
              />
            )).toJS()
      }
    </List>
    <div className='pa2 tr'>
      <Link to={`/countries/${countryId}/plans/new`}>
        <RaisedButton primary label='Add Plan' />
      </Link>
    </div>
    <List>
      <Subheader>Journals</Subheader>
      {
        journals.isEmpty()
          ? <div className='plans-and-journals-no-journal-msg pl3 pb2 i'>
              You haven’t added any journal entry!
            </div>
          : journals.map(journal => (
              <JournalItem
                className='plans-and-journals-journal-item'
                key={journal.get('id')}
                countryId={countryId}
                journal={journal}
              />
            )).toJS()
      }
    </List>
    <div className='pa2 tr'>
      <Link to={`/countries/${countryId}/journals/new`}>
        <RaisedButton primary label='Add Journal' />
      </Link>
    </div>
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
    }),
  ).isRequired,
  journals: IPropTypes.listOf(
    IPropTypes.contains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default PlansAndJournals
