import React from 'react'
import PropTypes from 'prop-types'
import ResizeDetector from 'react-resize-detector'

/* The AnimatingHtDiv itself */
class AnimatingHtDiv extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    height: 0,
  }

  handleResize = (width, height) =>
    this.state.height !== height &&
    this.setState({ height })

  childWrapperRef = (childWrapperEl) => {
    this.childWrapperEl = childWrapperEl
  }

  render = () => (
    <div style={{
      height: this.state.height,
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    }}>
      <div ref={this.childWrapperRef}>
        <ResizeDetector handleHeight onResize={this.handleResize} />
        {this.props.children}
      </div>
    </div>
  )
}

export default AnimatingHtDiv
