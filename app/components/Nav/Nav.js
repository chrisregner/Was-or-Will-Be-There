import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch, Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert'
import MapIcon from 'material-ui/svg-icons/maps/map'
import InfoIcon from 'material-ui/svg-icons/action/info'
import StatsIcon from 'material-ui/svg-icons/av/equalizer'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Tabs, Tab } from 'material-ui/Tabs'
import checkIfMobile from 'services/checkIfMobile'

const BareNav = ({ history, location }) => {
  const changePath = (evOrPath, path) =>
    typeof evOrPath === 'string'
      ? history.push(evOrPath)
      : history.push(path)
  const isMobile = checkIfMobile()

  return (
    <AppBar
      style={{ paddingRight: 0 }}
      titleStyle={{ fontSize: '1.25rem' }}
      title={(
        <div>
          {
            isMobile
              ? (<Switch>
                <Route exact path='/stats' render={() => 'Overall Stats'} />
                <Route exact path='/countries/:countryId/plans/new' render={() => 'Add New Plan'} />
                <Route exact path='/countries/:countryId/plans/:id' render={() => 'Edit Plan'} />
                <Route exact path='/countries/:countryId/plans/:id/journalize' render={() => 'Journalize'} />
                <Route exact path='/countries/:countryId/journals/new' render={() => 'Add New Journal'} />
                <Route exact path='/countries/:countryId/journals/:id' render={() => 'Edit Journal'} />
                <Route render={() => (<Link to='/' className='no-underline white--i'>Plans & Journals</Link>)} />
              </Switch>)
              : (<Link to='/' className='no-underline white--i'>Plans & Journals</Link>)
          }
        </div>
      )}
      showMenuIconButton={false}
    >
      <div className='pr1 mr1 dn db-ns'>
        <Tabs onChange={changePath} value={location.pathname}>
          <Tab
            value='/'
            label={
              <div className='ph3 flex items-center'>
                <div>
                  <MapIcon style={{
                    color: location.pathname === '/' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                  }} />
                </div>
                <div className='dn db-l'>&ensp;Map</div>
              </div>
            }
          />
          <Tab
            value='/stats'
            label={
              <div className='ph3 flex items-center'>
                <div>
                  <StatsIcon style={{
                    color: location.pathname === '/stats' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                  }} />
                </div>
                <div className='dn db-l'>&ensp;Stats</div>
              </div>
            }
          />
          <Tab
            value='/about'
            label={
              <div className='ph3 flex items-center'>
                <div>
                  <InfoIcon style={{
                    color: location.pathname === '/map' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                  }} />
                </div>
                <div className='dn db-l'>&ensp;About</div>
              </div>
            }
          />
        </Tabs>
      </div>

      {
        isMobile &&
        (<div className='pr2 dn-ns'>
          <IconMenu
            onChange={changePath}
            iconButtonElement={(<IconButton iconStyle={{ color: '#fff' }}><MoreIcon /></IconButton>)}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem leftIcon={<StatsIcon />} primaryText='Stats' value='/stats' />
            <MenuItem leftIcon={<MapIcon />} primaryText='Map' value='/' />
            <MenuItem leftIcon={<InfoIcon />} primaryText='About' value='/about' />
          </IconMenu>
        </div>)
      }
    </AppBar>
  )
}

BareNav.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

const Nav = withRouter(muiThemeable({
  appBar: {
    height: 48,
  },
})(BareNav))
export default Nav
