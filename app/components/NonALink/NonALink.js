import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import * as R from 'ramda'

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
      children, to, ...otherProps
    } = this.props

    const unnecessaryProps = [
      'beforePush', 'afterPush',
      'match', 'location', 'history', 'staticContext',
    ]
    const finalOtherProps = R.omit(unnecessaryProps, otherProps)

    return (
      <div
        href={to}
        tabIndex={-1}
        role='link'
        onClick={this.handleClick}
        {...finalOtherProps}
      >
        {children}
      </div>
    )
  }
}

const NonALink = withRouter(BareNonALink)

export { BareNonALink }
export default NonALink
