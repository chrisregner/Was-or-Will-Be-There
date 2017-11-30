import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { matchPath } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location'

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

  &.ToLeft {
    animation-name: toLeft;
  }

  &.ToRight {
    animation-name: toRight;
  }
`

class BareInsertPaperTransition extends React.Component {
  static propTypes = {
    nth: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    lastLocation: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }

  wrapperRef = (wrapperEl) => {
    this.wrapperEl = wrapperEl
  }

  render = () => {
    const {
      pathname: currPath,
      nth, children, className, lastLocation,
    } = this.props

    const prevPath = lastLocation && lastLocation.pathname

    const specificPlanOrJournalPattern = '/countries/:countryId/:plansOrJournals(plans|journals)/:any'
    const isInSpecificPlanOrJournal = matchPath(currPath, { path: specificPlanOrJournalPattern })
    const wasInSpecificPlanOrJournal = matchPath(prevPath, { path: specificPlanOrJournalPattern })

    const plansOrJournalsPattern = '/countries/:countryId/:plansOrJournals(plans|journals)'
    const isInPlansOrJournals = matchPath(currPath, { path: plansOrJournalsPattern, exact: true })
    const wasInPlansOrJournals = matchPath(prevPath, { path: plansOrJournalsPattern, exact: true })

    let animation = ''

    if (wasInPlansOrJournals && isInSpecificPlanOrJournal)
      if (nth === 1) animation = 'toLeft'
      else animation = 'toRight'

    if (wasInSpecificPlanOrJournal && isInPlansOrJournals)
      if (nth === 1) animation = 'toRight'
      else animation = 'toLeft'

    if (wasInSpecificPlanOrJournal && isInSpecificPlanOrJournal && prevPath !== currPath && nth === 2) {
      animation = 'toRight'

      /* force repaint in browser */
      this.wrapperEl.classList.remove(animation)
      void this.wrapperEl.offsetWidth
      this.wrapperEl.classList.add(animation)
    }

    return (
      <Wrapper innerRef={this.wrapperRef} className={`animated ${animation} ${className}`}>
        {children}
      </Wrapper>
    )
  }
}

const InsertPaperTransition = withLastLocation(BareInsertPaperTransition)

export { BareInsertPaperTransition }
export default InsertPaperTransition
