import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'

const duration = 450
const makeEaseOut = pow => (t, b, c, d) => (c * (1 - Math.pow(1 - (t / d), pow)) + b)

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

  state = { prevIsShown: this.props.isShown }
  shouldComponentUpdate = nextProps => nextProps !== this.props

  componentDidUpdate = () => {
    const isShown = this.props.isShown

    if (isShown !== this.state.prevIsShown) {
      this.hasUpdated = true
      this.setState({ prevIsShown: this.props.isShown })

      let beginning, changeDesired, durationToUse
      let isNew = true
      const goal = isShown ? 1 : 0

      if (this.wrapperEl.style.display === 'none')
        this.wrapperEl.style.display = ''

      this.step = (timestamp) => {
        let time

        if (isNew) {
          isNew = false
          const oldTime = this.start && timestamp - this.start
          this.start = timestamp

          if (oldTime < duration) {
            durationToUse = duration - oldTime
            beginning = Number(this.wrapperEl.style.opacity)
          } else {
            durationToUse = duration
            beginning = isShown ? 0 : 1
          }
        }

        time = timestamp - this.start
        changeDesired = goal - beginning

        const steppedOpacity = makeEaseOut(2)(time, beginning, changeDesired, durationToUse)

        this.wrapperEl.style.opacity = isShown
          ? Math.min(steppedOpacity, goal)
          : Math.max(steppedOpacity, goal)

        if (time < durationToUse)
          window.requestAnimationFrame(this.step)
        else if (!isShown)
          this.wrapperEl.style.display = 'none'
      }

      window.requestAnimationFrame(this.step)
    }
  }

  componentDidMount = () => {}

  render = () =>
    <div
      style={!this.hasUpdated && !this.props.isShown
        ? { display: 'none', ...this.props.style }
        : this.props.style}
      className={c('transform-z will-change-opacity', this.props.className)}
      ref={(el) => { this.wrapperEl = el }}
    >
      <UpdateStopper allowUpdate={this.props.isShown}>
        {this.props.children}
      </UpdateStopper>
    </div>
}

export default Fader
