import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { matchPath } from 'react-router-dom'

const Wrapper = styled.div`
  @keyframes toLeft {
    from {
      transform: translateX(50%);
    }

    to {
      transform: none;
    }
  }

  @keyframes toRight {
    from {
      transform: translateX(-50%);
    }

    to {
      transform: none;
    }
  }

  &.divergeToLeft {
    animation-name: toLeft;
  }

  &.divergeToRight {
    animation-name: toRight;
  }

  &.convergeToLeft {
    animation-name: toLeft;
  }

  &.convergeToRight {
    animation-name: toRight;
  }
`

class InsertPaperTransition extends React.Component {
  static propTypes = {
    nth: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  state = {
    prevPath: null
  }

  componentWillReceiveProps = (nextProps) => this.setState({
    prevPath: nextProps.pathname
  })

  render = () => {
    const {
      pathname: currPath,
      nth, children, className
    } = this.props
    const { prevPath } = this.state
    const insertingPathPattern = '/countries/:countryId/:plansOrJournals(plans|journals)/:any'
    const shouldSplit = matchPath(currPath, { path: insertingPathPattern })
    const wasSplitted = matchPath(prevPath, { path: insertingPathPattern })
    let animation

    switch(true) {
      case (nth === 1 && !!((shouldSplit && !wasSplitted) || (shouldSplit && wasSplitted))):
        animation = 'divergeToLeft'
        break;
      case (nth === 1 && !!((!shouldSplit && wasSplitted) || (!shouldSplit && !wasSplitted))):
        animation = 'convergeToRight'
        break;
      case (nth === 2 && !!((shouldSplit && !wasSplitted) || (shouldSplit && wasSplitted))):
        animation = 'divergeToRight'
        break;
      case (nth === 2 && !!((!shouldSplit && wasSplitted) || (!shouldSplit && !wasSplitted))):
        animation = 'convergeToLeft'
        break;
    }

    return (
      <Wrapper className={`animated ${animation} ${className}`}>
        {children}
      </Wrapper>
    )
  }
}

export default InsertPaperTransition
