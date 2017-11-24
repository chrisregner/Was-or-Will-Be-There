## Todos

- redux-persist
- test url queries
- lint

- misc
  - css prefixes/polyfills
    - how do we know they work? as long as crossbrowser test passes, I suppose
  - webpack production optimization
    - check if webpack production config makes difference in production output
    - check if babel production config makes difference in production output
    - check if remote deletion of photo works
    - remove excess deps
      - research how to do it
      - leaflet
      - animate.css
      - tachyons
      - react-slick
  - performance test (before and after deployment)
    - research more
  - crossbrowser test
    - responsiveness test for each
  - final readme.md
    - credits
      - natural earth data
  - deploy

---

map                     - /
world overview          - /overview
country plans           - /countries/:countryId/plans
country journals        - /countries/:countryId/journals
new plan                - /countries/:countryId/plans/new
edit plan               - /countries/:countryId/plans/:id
journalize plan         - /countries/:countryId/plans/journalize
new journal             - /countries/:countryId/journals/new
edit journal            - /countries/:countryId/journals/:id
world overview          - /about

---

## Todos

- tests
  - nav
  - PaperWithAnimatingHt
  - InsertPaperTransition
  - PlansAndJournals (active item behavior)

## Issues

- Full-size image preview on journal form overflows downward (not visible) if the image is a portrait

## Possible Additional features

- additional features
  - notification
    - notify when...
      - 30 days before an departure/homecoming
      - 7 days before an departure/homecoming
      - 1 day before an departure/homecoming
      - on the day of departure/homecoming
      - 1 day after homecoming (journalize)
  - sort plans/journals/both
    - chronologically
    - geographically
  - input on map to search and select places
    - pan map upon selection
  - automatic image deleting (when certain limit is met, delete in the next midnight?)

---

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

    console.log(prevPath, currPath)

    switch(true) {
      case (!prevPath):
        break;
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
