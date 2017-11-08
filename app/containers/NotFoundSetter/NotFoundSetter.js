import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNotFound } from 'state/ui'

class BareNotFoundSetter extends React.Component {
  static propTypes = {
    setNotFound: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  componentWillMount = () => {
    const { setNotFound, location } = this.props
    setNotFound(location.pathname)
  }

  render = () => null
}

const mapDispatchToProps = (dispatch) => ({
  setNotFound: (notFoundPath) => {
    dispatch(setNotFound(notFoundPath))
  }
})

const NotFoundSetter = connect(null, mapDispatchToProps)(BareNotFoundSetter)

export { BareNotFoundSetter }
export default NotFoundSetter
