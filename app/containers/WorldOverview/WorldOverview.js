import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import { cyan700, amber700, pinkA200, darkBlack } from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import DestinationIcon from 'material-ui/svg-icons/action/room'
import FlagIcon from 'material-ui/svg-icons/content/flag'
import GlobeIcon from 'material-ui/svg-icons/social/public'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

import overviewGetter from 'state/shared/overviewGetter'
import CountryNameAndFlag from 'components/CountryNameAndFlag'
import NonALink from 'components/NonALink'

const preventDefault = (ev) => { ev.preventDefault() }

const BareWorldOverview = ({ worldOverview }) => (
  <div>

    {/* Counters */}
    <div className='flex pa2 f6'>
      <div className='w-33 tc'>
        <div>
          <DestinationIcon style={{ color: amber700 }} />
        </div>
        <div className='world-overview-total-plans f3 fw5'>
          {worldOverview.get('totalPlans')}
        </div>
        <div style={{ color: fade(darkBlack, 0.54) }}>
          Plans
        </div>
      </div>
      <div className='w-33 tc'>
        <div>
          <FlagIcon style={{ color: pinkA200 }} />
        </div>
        <div className='world-overview-total-journals f3 fw5'>
          {worldOverview.get('totalJournals')}
        </div>
        <div style={{ color: fade(darkBlack, 0.54) }}>
          Journals
        </div>
      </div>
      <div className='w-33 tc'>
        <div>
          <GlobeIcon style={{ color: cyan700 }} />
        </div>
        <div className='world-overview-total-countries f3 fw5'>
          {worldOverview.get('totalCountries')}
        </div>
        <div style={{ color: fade(darkBlack, 0.54) }}>
          Countries
        </div>
      </div>
    </div>

    {/* Countries and info */}
    <List style={{ paddingBottom: 24 }}>
      <Subheader>Countries</Subheader>
      {
        worldOverview.get('countriesInfo').size > 0
          ? worldOverview.get('countriesInfo').reduce((acc, country, countryId) => {
            acc.push(
              <NonALink
                key={countryId}
                to={`/countries/${countryId}`}
                className={`world-overview-country-item world-overview-country-item-${countryId} world-overview-country-item-link db no-underline`}
              >
                <ListItem innerDivStyle={{ padding: '8px 8px 8px 16px' }}>
                  <div className='flex items-center'>
                    <div className='flex-grow-1'>
                      <CountryNameAndFlag
                        customClassNames={{
                          loader: 'w2pt5 mr2',
                          countryName: 'world-overview-country-item-name f5 fw4 pl1',
                        }}
                        countryId={countryId}
                      />
                    </div>
                    <div>
                      {
                        country.get('hasPlan') &&
                        <IconButton
                          onClick={preventDefault}
                          className='world-overview-country-item-has-plan'
                          style={{ padding: 6, width: 36, height: 36 }}
                          iconStyle={{ color: fade(darkBlack, 0.54) }}
                          tooltip='Has plan!'
                          tooltipPosition='bottom-left'
                        >
                          <DestinationIcon />
                        </IconButton>
                      }
                      {
                        country.get('hasJournal') &&
                        <IconButton
                          onClick={preventDefault}
                          className='world-overview-country-item-has-journal'
                          style={{ padding: 6, width: 36, height: 36 }}
                          iconStyle={{ color: fade(darkBlack, 0.54) }}
                          tooltip='Has Journal!'
                          tooltipPosition='bottom-left'
                        >
                          <FlagIcon />
                        </IconButton>
                      }
                    </div>

                  </div>
                </ListItem>
              </NonALink>
            )

            return acc
          }, [])
          : <div>
            <p className='world-overview-no-country-msg ph3 pv0 ma0 lh-copy f5 i'>
            You don’t have any entry on any country yet!
            </p>
          </div>
      }
    </List>

    <div className='tc pb3'>
      <NonALink to='/'>
        <RaisedButton primary label='Open Map' />
      </NonALink>
    </div>
  </div>
)

BareWorldOverview.propTypes = {
  worldOverview: IPropTypes.contains({
    totalPlans: PropTypes.number.isRequired,
    totalJournals: PropTypes.number.isRequired,
    totalCountries: PropTypes.number.isRequired,
    countriesInfo: IPropTypes.orderedMapOf(
      IPropTypes.contains({
        hasPlan: PropTypes.bool.isRequired,
        hasJournal: PropTypes.bool.isRequired,
      }),
      PropTypes.string,
    ),
  }).isRequired,
}

const mapStateToProps = state => ({
  worldOverview: overviewGetter(state),
})

const WorldOverview = connect(mapStateToProps)(BareWorldOverview)

export { BareWorldOverview }
export default WorldOverview
