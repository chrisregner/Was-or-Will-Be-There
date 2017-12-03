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
    style: PropTypes.object,
    className: PropTypes.string,
  }

  wasShown = false

  childFn = state =>
    <div style={this.props.style} className={c(
      this.props.className,
      'transform-z will-change-opacity',
      state === 'entering' && 'animated fadeIn',
      state === 'exiting' && 'animated fadeOut',
      state === 'exited' && 'dn',
    )}>
      {this.wasShown && <UpdateStopper allowUpdate={this.props.isShown}>
        {this.props.children}
      </UpdateStopper>}
    </div>

  render = () => {
    if (this.props.isShown) this.wasShown = true

    return (
      <Transition in={this.props.isShown} timeout={duration}>
        {this.childFn}
      </Transition>
    )
  }
}

export default Fader
