import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { AnimatedSwitch } from 'react-router-transition'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import 'animate.css/animate.css'
import 'tachyons/css/tachyons.css'
import './App.css'
import { uiGetters } from 'state'
import Nav from 'components/Nav'
import MapCmpt from 'components/MapCmpt'
import NotFound from 'components/NotFound'
import CountryLoader from 'containers/CountryLoader'
import PopulatedPlansAndJournals from 'containers/PopulatedPlansAndJournals'
import AddPlanForm from 'containers/AddPlanForm'
import EditPlanForm from 'containers/EditPlanForm'
import AddJournalForm from 'containers/AddJournalForm'
import EditJournalForm from 'containers/EditJournalForm'
import PaperWithHeight from 'containers/PaperWithHeight'
import NotifSnackbar from 'containers/NotifSnackbar'
import RealRouteWatcher from 'containers/RealRouteWatcher'
import NotFoundSetter from 'containers/NotFoundSetter'

const AnimatedSwitchWrpr = styled.div`
  & > div > div,
  & > div > form {
    position: absolute;
    width: 100%;
  }
`

const muiTheme = getMuiTheme({
  appBar: {
    height: 48,
  },
})

const BareApp = ({ isPathNotFound, location }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={{ minWidth: 300 }} className='min-vh-100'>
      <div className='fixed top-0 right-0 left-0 z-2'>
        <Nav />
      </div>
      <div
        className='fixed right-0 left-0 bottom-0'
        style={{
          top: 48,
          height: 'calc(100vh - 48px)',
        }}
      >
        <MapCmpt />
      </div>


      {
        isPathNotFound(location.pathname)
        ? <NotFound />
        : <Switch>
            <Route path='/countries/:countryId' render={({ match, history }) => (
              <div
                style={{
                  top: 48,
                  minHeight: 'calc(100vh - 48px)',
                  backgroundColor: 'rgba(0, 0, 0, 0.54)',
                }}
                className='relative z-1 pa2 h-100'
              >
                <PaperWithHeight>
                  <CountryLoader
                    className='ma0 pa2'
                    wrapperEl='h2'
                    countryId={match.params.countryId}
                    pathname={location.pathname}
                    history={history}
                  />
                  <AnimatedSwitchWrpr className='relative'>
                    <AnimatedSwitch
                      atEnter={{ opacity: 0 }}
                      atLeave={{ opacity: 0 }}
                      atActive={{ opacity: 1 }}
                    >
                      <Route exact path='/countries/:countryId' component={PopulatedPlansAndJournals} />
                      <Route exact path='/countries/:countryId/plans/new' component={AddPlanForm} />
                      <Route exact path='/countries/:countryId/plans/:id' component={EditPlanForm} />
                      <Route exact path='/countries/:countryId/journals/new' component={AddJournalForm} />
                      <Route exact path='/countries/:countryId/journals/:id' component={EditJournalForm} />
                      <Route component={NotFoundSetter} />
                    </AnimatedSwitch>
                  </AnimatedSwitchWrpr>
                </PaperWithHeight>
              </div>
            )} />
            <Route exact path='/' />
            <Route component={NotFoundSetter} />
          </Switch>
      }

      <NotifSnackbar />
      <RealRouteWatcher />
    </div>
  </MuiThemeProvider>
)

BareApp.propTypes = {
  isPathNotFound: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  isPathNotFound: (path) => uiGetters.isPathNotFound(state, path)
})

const App = withRouter(connect(mapStateToProps)(BareApp))

export default App
