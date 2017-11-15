import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector'

import Paper from 'material-ui/Paper'

import { uiGetters } from 'state'

// reduced the duration (450ms) original from <Paper /> to (300ms) of <Collapse /> (material-ui-next)
const transition = {
  transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
}

class BarePaperWithHeight extends React.Component {
  componentDidMount = () => {
    const ownHeight = this.childrenWrapperEl.offsetHeight

    this.setState({ ownHeight })
  }

  state = {
    ownHeight: 0,
  }

  handleChildrenWrprResize = (w, h) => {
    this.setState({ ownHeight: h })
  }

  childrenWrapperRef = (childrenWrapperEl) => {
    this.childrenWrapperEl = childrenWrapperEl
  }

  render = () => {
    const { ownHeight } = this.state
    const { height, ghostHeight, children } = this.props

    return (
      <div className='paper-with-height-ghost' style={{ height: ghostHeight + ownHeight }}>
        <Paper
          className='paper-with-height-paper'
          style={{ height: height + ownHeight, ...transition }}
        >
          <div className='paper-with-height-children-wrapper' ref={this.childrenWrapperRef}>
            <ResizeDetector
              className='paper-with-height-children-wrapper-resize-detector'
              handleHeight
              onResize={this.handleChildrenWrprResize}
            />
            {children}
          </div>
        </Paper>
      </div>
    )
  }
}

BarePaperWithHeight.propTypes = {
  height: PropTypes.number.isRequired,
  ghostHeight: PropTypes.number.isRequired,
  children: PropTypes.node,
}

const mapStateToProps = state => ({
  height: uiGetters.getHighestHeight(state),
  ghostHeight: uiGetters.getHighestGhostHeight(state),
})

const PaperWithHeight = connect(mapStateToProps)(BarePaperWithHeight)

export { BarePaperWithHeight }
export default PaperWithHeight
