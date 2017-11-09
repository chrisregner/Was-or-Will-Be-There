import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import 'animate.css/animate.css'
import 'tachyons/css/tachyons.css'
import './App.css'
import Nav from 'components/Nav'
import MapCmpt from 'components/MapCmpt'
import NotifSnackbar from 'containers/NotifSnackbar'
import RealRouteWatcher from 'containers/RealRouteWatcher'
import NotFoundSetter from 'containers/NotFoundSetter'
import { uiGetters } from 'state'
import PaperRoutes from 'components/PaperRoutes'

const muiTheme = getMuiTheme({
  appBar: {
    height: 48,
  },
})

class BareApp extends React.Component {
  static propTypes = {
    isPathNotFound: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
  }

  render = () => {
    const { isPathNotFound, location } = this.props
    const isNotFound = isPathNotFound(location.pathname)

    return (
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
            isNotFound
            ? <NotFound />
            : <Switch>
                <Route path='/countries/:countryId' component={PaperRoutes} />
                <Route exact path='/' />
                <Route component={NotFoundSetter} />
              </Switch>
          }

          <NotifSnackbar />
          <RealRouteWatcher />
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  isPathNotFound: (path) => uiGetters.isPathNotFound(state, path)
})

const mapDispatchToProps = (dispatch) => ({
  // fetchCountryNames: () => dispatch(getCountryNames())
})

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(BareApp))

export { BareApp }
export default App
