import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setRealRoute } from 'state/ui'

class BareRealRouteWatcher extends React.Component {
  static propTypes = {
    setRealRoute: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  componentDidMount = () => {
    const { setRealRoute, location } = this.props
    setRealRoute(location.pathname)
  }
  componentDidUpdate = () => {
    const { setRealRoute, location } = this.props
    setRealRoute(location.pathname)
  }

  render = () => null
}

const mapDispatchToProps = (dispatch) => ({
  setRealRoute: (newRoute) => {
    dispatch(setRealRoute(newRoute))
  }
})

const RealRouteWatcher = withRouter(connect(null, mapDispatchToProps)(BareRealRouteWatcher))

export { BareRealRouteWatcher }
export default RealRouteWatcher
