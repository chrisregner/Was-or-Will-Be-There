import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector'

import Paper from 'material-ui/Paper'

import { uiGetters } from 'state'

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
        <Paper className='paper-with-height-paper' style={{ height: height + ownHeight }}>
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
