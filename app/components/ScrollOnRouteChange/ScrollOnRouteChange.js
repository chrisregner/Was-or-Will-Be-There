import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import _smoothscroll from 'smoothscroll'

const ScrollOnRouteChangeShell = ({ smoothscroll }) =>
  class BareScrollOnRouteChange extends React.Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired
    }

    shouldComponentUpdate = (newProps) =>
      this.props.location.pathname !== newProps.location.pathname

    componentDidUpdate = () => smoothscroll(0, 300)

    render = () => (null)
  }

const ScrollOnRouteChange = withRouter(ScrollOnRouteChangeShell({ smoothscroll: _smoothscroll }))

export { ScrollOnRouteChangeShell }
export default ScrollOnRouteChange
