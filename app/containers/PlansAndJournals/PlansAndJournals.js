import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import RaisedButton from 'material-ui/RaisedButton'
import DestinationIcon from 'material-ui/svg-icons/action/room'
import FlagIcon from 'material-ui/svg-icons/content/flag'

import { plansGetters, journalsGetters } from 'state'
import CollapsibleItem from 'components/CollapsibleItem'

class BarePlansAndJournals extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        countryId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    plans: IPropTypes.listOf(
      IPropTypes.contains({
        countryId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        copy: PropTypes.string,
        departure: PropTypes.instanceOf(Date),
        homecoming: PropTypes.instanceOf(Date),
      })
    ),
    journals: IPropTypes.listOf(
      IPropTypes.contains({
        countryId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        copy: PropTypes.string,
        departure: PropTypes.instanceOf(Date),
        homecoming: PropTypes.instanceOf(Date),
        photos: IPropTypes.listOf(IPropTypes.contains({
          id: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          description: PropTypes.string,
        })),
      })
    ),
  }

  render = () => {
    const { history, match, location, plans, journals } = this.props
    const { countryId } = match.params
    const activeTab = location.pathname.includes('plans')
      ? 'plans'
      : 'journals'

    return (
      <div>
        <BottomNavigation
          style={{ backgroundColor: 'transparet' }}
          selectedIndex={activeTab === 'plans' ? 0 : 1}
        >
          <BottomNavigationItem
            data-test='plansLink'
            label='Plans'
            icon={<DestinationIcon />}
            onClick={() => history.push(`/countries/${countryId}/plans`)}
          />
          <BottomNavigationItem
            data-test='journalsLink'
            label='Journals'
            icon={<FlagIcon />}
            onClick={() => history.push(`/countries/${countryId}/journals`)}
          />
        </BottomNavigation>

        {
          activeTab === 'plans' &&
          <div data-test='planList'>
            {
              (plans && plans.size > 0)
                ? plans.map(plan => (
                  <CollapsibleItem
                    key={plan.get('id')}
                    data-test='plan'
                    type='plan'
                    data={plan}
                  />
                )).toJS()
                : <div data-test='noPlan'>
                    You haven’t added any plan yet!
                </div>
            }

            <div className='tc pv3'>
              <Link data-test='addPlan' to={`/countries/${countryId}/plans/new`}>
                <RaisedButton label='Add Plan' primary />
              </Link>
            </div>
          </div>
        }

        {
          activeTab === 'journals' &&
          <div data-test='journalList'>
            {
              (journals && journals.size > 0)
                ? journals.map(journal => (
                  <CollapsibleItem
                    key={journal.get('id')}
                    data-test='journal'
                    type='journal'
                    data={journal}
                  />
                )).toJS()
                : <div data-test='noJournal'>
                    You haven’t added any journal yet!
                </div>
            }

            <div className='tc pv3'>
              <Link data-test='addJournal' to={`/countries/${countryId}/journals/new`}>
                <RaisedButton label='Add Journal' primary />
              </Link>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  plans: plansGetters.getPlansByCountryId(state, ownProps.match.params.countryId),
  journals: journalsGetters.getJournalsByCountryId(state, ownProps.match.params.countryId),
})

const PlansAndJournals = connect(mapStateToProps)(BarePlansAndJournals)

export { BarePlansAndJournals }
export default PlansAndJournals
