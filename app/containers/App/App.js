import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { amber500, amber700, amber900 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import 'animate.css/animate.css'
import 'tachyons/css/tachyons.css'
import './App.css'
import { uiGetters } from 'state'
import Nav from 'components/Nav'
import MapCmpt from 'components/MapCmpt'
import PaperRoutes from 'components/PaperRoutes'
import NotFound from 'components/NotFound'
import NotifSnackbar from 'containers/NotifSnackbar'
import RealRouteWatcher from 'containers/RealRouteWatcher'
import NotFoundSetter from 'containers/NotFoundSetter'

const muiTheme = getMuiTheme({
  appBar: {
    height: 48,
  },
  palette: {
    tertiary1Color: amber500,
    tertiary2Color: amber700,
    tertiary3Color: amber900,
  },
})

class BareApp extends React.Component {
  static propTypes = {
    isPathNotFound: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
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
              ? <NotFound className='app-not-found' />
              : <Switch className='app-routes'>
                <Route path='/:path(countries|overview)' component={PaperRoutes} />
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

const mapStateToProps = state => ({
  isPathNotFound: path => uiGetters.isPathNotFound(state, path),
})

const App = withRouter(connect(mapStateToProps)(BareApp))

export { BareApp }
export default App
