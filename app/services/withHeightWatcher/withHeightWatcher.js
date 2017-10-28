import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector'

import { setPaperHeight } from 'state/ui'

export default (WrappedCmpt, componentName) => {
  class HeightWatcher extends React.Component {
    static displayName = `WithHeightWatcher(${
      WrappedCmpt.displayName || WrappedCmpt.name || 'UnnamedComponent'
    })`

    static propTypes = {
      setPaperHeight: PropTypes.func.isRequired,
    }

    handleResize = (width, height) => {
      this.props.setPaperHeight(height)
    }

    // updatePaperHeight = () => {
    //   const rootElHeight = this.rootEl.offsetHeight

    //   if (rootElHeight !== this.lastRootElHeight) {
    //     this.props.setPaperHeight(rootElHeight)
    //     this.lastRootElHeight = rootElHeight
    //   }
    // }

    render = () => (
      <div>
        <WrappedCmpt />
        <ResizeDetector handleHeight onResize={this.handleResize} />
      </div>
    )
  }

  const mapDispatchToProps = (dispatch) => ({
    setPaperHeight: (height) => {
      dispatch(setPaperHeight(componentName, height))
    }
  })

  return connect(null, mapDispatchToProps)(HeightWatcher)
}
