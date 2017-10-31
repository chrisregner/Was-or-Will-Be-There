import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import 'animate.css/animate.css'
import 'tachyons/css/tachyons.css'
import './App.css'
import Nav from 'components/Nav'
import MapCmpt from 'components/MapCmpt'
import PopulatedPlansAndJournals from 'containers/PopulatedPlansAndJournals'
import AddPlanForm from 'containers/AddPlanForm'
import PaperWithHeight from 'containers/PaperWithHeight'
import NotifSnackbar from 'containers/NotifSnackbar'
import RealRouteWatcher from 'containers/RealRouteWatcher'

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

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={{ minWidth: 300 }} className='min-vh-100'>
      <Nav />
      <div
        className='fixed right-0 left-0 bottom-0'
        style={{
          top: 48,
          height: 'calc(100vh - 48px)',
        }}
      >
        <MapCmpt />
      </div>

      {/* FIXME: USE AnimatedRoute instead */}
      <Route path='/countries/:countryId' render={() => (
        <div
          style={{
            minHeight: 'calc(100vh - 48px)',
            backgroundColor: 'rgba(0, 0, 0, 0.54)',
          }}
          className='relative z-1 pa2'
        >
          <PaperWithHeight>
            <AnimatedSwitchWrpr className='relative'>
              <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
              >
                <Route exact path='/countries/:countryId' component={PopulatedPlansAndJournals} />
                <Route path='/countries/:countryId/plans/new' component={AddPlanForm} />
              </AnimatedSwitch>
            </AnimatedSwitchWrpr>
          </PaperWithHeight>
        </div>
      )} />

      <NotifSnackbar />
      <RealRouteWatcher />
    </div>
  </MuiThemeProvider>
)

export default App
