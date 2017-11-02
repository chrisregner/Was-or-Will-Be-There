import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class BareNonALink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    beforePush: PropTypes.func,
    afterPush: PropTypes.func,
    children: PropTypes.node,
  }

  handleClick = (ev) => {
    ev.preventDefault()

    const { history, beforePush, afterPush, to } = this.props

    if (beforePush) beforePush(ev)
    history.push(to)
    if (afterPush) afterPush(ev)
  }

  render = () => {
    const {
      children, to, beforePush, afterPush,
      match, location, history, staticContext,
      ...otherProps
    } = this.props

    return (
      <div
        href={to}
        tabIndex='0'
        role='link'
        onClick={this.handleClick}
        {...otherProps}
      >
        {children}
      </div>
    )
  }
}

const NonALink = withRouter(BareNonALink)

export { BareNonALink }
export default NonALink
