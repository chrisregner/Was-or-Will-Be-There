import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Transition from 'react-transition-group/Transition'

const duration = 450

class UpdateStopper extends React.Component {
  static propTypes = {
    allowUpdate: PropTypes.bool.isRequired,
    children: PropTypes.node,
  }

  shouldComponentUpdate = nextProps => nextProps.allowUpdate
  render = () => this.props.children
}

class Fader extends React.Component {
  static propTypes = {
    isShown: PropTypes.bool.isRequired,
    children: PropTypes.node,
  }

  childFn = state =>
    <div className={c(
      'animated transform-z will-change-opacity',
      state === 'entering' && 'fadeIn',
      state === 'exiting' && 'fadeOut',
    )}>
      {state !== 'exited' &&
      <UpdateStopper allowUpdate={this.props.isShown}>
        {this.props.children}
      </UpdateStopper>}
    </div>

  render = () =>
    <Transition in={this.props.isShown} timeout={duration}>
      {this.childFn}
    </Transition>
}

export default Fader
