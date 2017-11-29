import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui-next/styles'
import BottomNavigation, { BottomNavigationButton } from 'material-ui-next/BottomNavigation'
import { amber700, pinkA200 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import DestinationIcon from 'material-ui-icons/Room'
import FlagIcon from 'material-ui-icons/Flag'
import NonALink from 'components/NonALink'

import { plansGetters, journalsGetters } from 'state'
import CollapsibleItem from 'components/CollapsibleItem'

const PlansButton = withStyles({
  selected: { color: amber700 },
})(({ classes, ...props }) => (
  <BottomNavigationButton classes={classes} {...props} />
))

const JournalsButton = withStyles({
  selected: { color: pinkA200 },
})(({ classes, ...props }) => (
  <BottomNavigationButton classes={classes} {...props} />
))

class BarePlansAndJournals extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        plansOrJournals: PropTypes.string.isRequired,
        countryId: PropTypes.string.isRequired,
        id: PropTypes.string,
      }).isRequired,
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
    const { history, plans, journals } = this.props
    const { countryId, id, plansOrJournals } = this.props.match.params

    return (
      <div className='pt2'>
        <BottomNavigation
          value={plansOrJournals}
          showLabels
        >
          <PlansButton
            component='div'
            data-test='plansLink'
            label='Plans'
            value='plans'
            icon={<DestinationIcon />}
            onClick={() => history.push(`/countries/${countryId}/plans`)}
          />
          <JournalsButton
            component='div'
            data-test='journalsLink'
            label='Journals'
            value='journals'
            icon={<FlagIcon />}
            onClick={() => history.push(`/countries/${countryId}/journals`)}
          />
        </BottomNavigation>

        {
          plansOrJournals === 'plans' &&
          <div data-test='planList'>
            {
              (plans && plans.size > 0)
                ? plans.map(plan => (
                  <CollapsibleItem
                    key={plan.get('id')}
                    data-test='plan'
                    type='plan'
                    data={plan}
                    isSelected={plan.get('id') === id}
                  />
                )).toJS()
                : <div data-test='noPlan' className='pv4 ph3 tc gray'>
                    You have no plan in this country!
                </div>
            }

            <div className='tc pv3'>
              <NonALink
                data-test='addPlan'
                to={`/countries/${countryId}/plans/new`}
                className='dib'
              >
                <RaisedButton label='Add Plan' primary />
              </NonALink>
            </div>
          </div>
        }

        {
          plansOrJournals === 'journals' &&
          <div data-test='journalList'>
            {
              (journals && journals.size > 0)
                ? journals.map(journal => (
                  <CollapsibleItem
                    key={journal.get('id')}
                    data-test='journal'
                    type='journal'
                    data={journal}
                    isSelected={journal.get('id') === id}
                  />
                )).toJS()
                : <div data-test='noJournal' className='pv4 ph3 tc gray'>
                    You have no journal in this country!
                </div>
            }

            <div className='tc pv3'>
              <NonALink
                data-test='addJournal'
                to={`/countries/${countryId}/journals/new`}
                className='dib'
              >
                <RaisedButton label='Add Journal' primary />
              </NonALink>
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
