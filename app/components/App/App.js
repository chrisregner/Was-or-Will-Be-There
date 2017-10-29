import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import 'tachyons/css/tachyons.css'
import 'animate.css/animate.css'
import './App.css'
import Nav from 'components/Nav'
import MapCmpt from 'components/MapCmpt'
import PopulatedPlansAndJournals from 'containers/PopulatedPlansAndJournals'
import AddPlanForm from 'containers/AddPlanForm'
import PaperWithHeight from 'containers/PaperWithHeight'

const Wrapper = styled.div`
  min-width: 300px;
`

const MapWrpr = styled.div`
  top: 48px;
  height: calc(100vh - 48px);
`

const Overlay = styled.div`
  min-height: calc(100vh - 48px);
  background-color: rgba(0, 0, 0, 0.54);
`

const AnimatedSwitchWrpr = styled.div`
  & > div > div,
  & > div > form {
    position: absolute;
  }
`

const muiTheme = getMuiTheme({
  appBar: {
    height: 48,
  },
})

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Wrapper className='min-vh-100'>
      <Nav />
      <MapWrpr className='fixed right-0 left-0 bottom-0'>
        <MapCmpt />
      </MapWrpr>

      {/* FIXME: USE AnimatedRoute instead */}
      <Route path='/countries/:countryId' render={() => (
        <Overlay className='relative z-1 pa2'>
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
        </Overlay>
      )} />
    </Wrapper>
  </MuiThemeProvider>
)

export default App
