import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { AnimatedSwitch } from 'react-router-transition'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { amber500, amber700, amber900 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './App.css'
import { uiGetters } from 'state'
import Nav from 'components/Nav'
import MapCmpt from 'components/MapCmpt'
import PaperRoutes from 'components/PaperRoutes'
import NotFound from 'components/NotFound'
import ScrollOnRouteChange from 'components/ScrollOnRouteChange'
import FadingMounter from 'components/FadingMounter'
import NotifSnackbar from 'containers/NotifSnackbar'
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

const Pages = () => (
  <AnimatedSwitch
    atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
    className='relative'
  >
    <Route path='/:path(countries|stats)' component={PaperRoutes} />
    <Route exact path='/' />
    <Route component={NotFoundSetter} />
  </AnimatedSwitch>
)

class BareApp extends React.Component {
  static propTypes = {
    isPathNotFound: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  render = () => {
    const { isPathNotFound, location } = this.props
    const isNotFound = isPathNotFound(location.pathname) || false

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
            <Switch>
              <Route path='/countries/:countryId' component={MapCmpt} />
              <Route component={MapCmpt} />
            </Switch>
          </div>

          <FadingMounter className='app-not-found' isVisible={isNotFound} component={NotFound} />
          <FadingMounter className='app-routes' isVisible={!isNotFound} component={Pages} />

          <ScrollOnRouteChange />
          <NotifSnackbar />
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
