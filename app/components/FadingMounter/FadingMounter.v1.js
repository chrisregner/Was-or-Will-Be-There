import React from 'react'
import PropTypes from 'prop-types'

const duration = 450

class FadingMounter extends React.PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
  }

  state = {
    isTimerUp: !this.props.isVisible
  }

  componentDidUpdate = () => {
    if (this.props.isVisible)
      this.setState({ isTimerUp: false })
    else
      setTimeout(() => this.setState({ isTimerUp: true }), duration)
  }

  render = () => {
    const { component: Component, isVisible } = this.props
    const { isTimerUp } = this.state

    return (
      <div className={`animated ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
        {!isTimerUp && <Component />}
      </div>
    )
  }
}

export { duration }
export default FadingMounter
