import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector'

import { setPaperHeight } from 'state/ui'
import { uiGetters } from 'state'

export default (WrappedCmpt, componentName) => {
  class HeightWatcher extends React.Component {
    static displayName = `WithHeightWatcher(${
      WrappedCmpt.displayName || WrappedCmpt.name || 'UnnamedComponent'
    })`

    static propTypes = {
      setPaperHeight: PropTypes.func.isRequired,
      isRouteCurrent: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }

    componentDidMount = () => {
      this.props.setPaperHeight(this.rootEl.offsetHeight)
    }

    componentDidUpdate = () => {
      const { isRouteCurrent, setPaperHeight, location } = this.props

      if (isRouteCurrent(location.pathname))
        setPaperHeight(this.rootEl.offsetHeight)
      else
        setPaperHeight(0)
    }

    handleResize = (width, height) => {
      this.props.setPaperHeight(height)
    }

    rootElRef = (rootEl) => {
      this.rootEl = rootEl
    }

    render = () => {
      const { setPaperHeight, ...props } = this.props

      return (
        <div className='' ref={this.rootElRef}>
          <WrappedCmpt {...props} />
          <ResizeDetector handleHeight onResize={this.handleResize} />
        </div>
      )
    }
  }

  const mapDispatchToProps = dispatch => ({
    setPaperHeight: (height) => {
      dispatch(setPaperHeight(componentName, height))
    },
  })

  const mapStateToProps = (state, ownProps) => ({
    isRouteCurrent: newRoute => uiGetters.isRouteCurrent(state, newRoute),
  })

  const ConnectedHeightWatcher = connect(mapStateToProps, mapDispatchToProps)(HeightWatcher)

  return ConnectedHeightWatcher
}
