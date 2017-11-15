import React from 'react'
import PropTypes from 'prop-types'

const duration = 450

class FadingMounter extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
  }

  state = {
    isTimerUp: !this.props.isVisible,
    isTimerSet: false,
  }

  componentDidUpdate = () => {
    console.log(this.props.component.displayName || this.props.component.name || this.props.component, '>>> updated, isVisible? >>>', this.props.isVisible)

    const { isVisible } = this.props
    const { isTimerUp, isTimerSet } = this.state

    if (isVisible && isTimerUp) {
      this.setState({ isTimerUp: false, isTimerSet: false })
    } else if (!isVisible && !isTimerUp && !isTimerSet) {
      this.setState({ isTimerSet: true })
      setTimeout(() => this.setState({ isTimerUp: true }), duration)
    }
  }

  render = () => {
    const { component: Component, isVisible } = this.props
    const { isTimerUp } = this.state

    console.log(Component.displayName || Component.name || Component, '>>> rendered, isTimerUp? >>>', isTimerUp)

    return (
      <div className={`animated ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
        {!isTimerUp && <Component />}
      </div>
    )
  }
}

export { duration }
export default FadingMounter
