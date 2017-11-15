import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector'
import shortid from 'shortid'

import * as fromUi from 'state/ui'
import { uiGetters } from 'state'

export default (WrappedCmpt, componentName) => {
  class HeightWatcher extends React.Component {
    static displayName = `WithHeightWatcher(${
      WrappedCmpt.displayName || WrappedCmpt.name || 'UnnamedComponent'
    })`

    static propTypes = {
      setGhostHeight: PropTypes.func.isRequired,
      setPaperHeight: PropTypes.func.isRequired,
      removeGhostHeight: PropTypes.func.isRequired,
      removePaperHeight: PropTypes.func.isRequired,
      isRouteCurrent: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }

    componentWillMount = () => {
      this.paperId = `${componentName}-${shortid.generate()}`
    }

    componentDidMount = () => {
      const { props, paperId, rootEl } = this

      props.setPaperHeight(paperId, rootEl.offsetHeight)
      props.setGhostHeight(paperId, rootEl.offsetHeight)
    }

    componentWillUnmount = () => {
      this.props.removeGhostHeight(this.paperId)
      this.props.removePaperHeight(this.paperId)
    }

    shouldComponentUpdate = (nextProps) => {
      const { location, isRouteCurrent } = nextProps
      return !isRouteCurrent(location.pathname)
    }

    componentDidUpdate = () => {
      const { resizedHeight, paperId } = this
      const {
        isRouteCurrent,
        setPaperHeight,
        setGhostHeight,
        removePaperHeight,
        location,
      } = this.props

      setGhostHeight(paperId, resizedHeight)

      if (isRouteCurrent(location.pathname))
        setPaperHeight(paperId, resizedHeight)
      else
        removePaperHeight(paperId)
    }

    handleResize = (width, height) => {
      this.resizedHeight = height
      this.componentDidUpdate()
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
    setPaperHeight: (paperId, height) => {
      dispatch(fromUi.setPaperHeight(paperId, height))
    },
    setGhostHeight: (paperId, height) => {
      dispatch(fromUi.setGhostHeight(paperId, height))
    },
    removePaperHeight: (paperId, height) => {
      dispatch(fromUi.removePaperHeight(paperId))
    },
    removeGhostHeight: (paperId, height) => {
      dispatch(fromUi.removeGhostHeight(paperId))
    },
  })

  const mapStateToProps = (state, ownProps) => ({
    isRouteCurrent: newRoute => uiGetters.isRouteCurrent(state, newRoute),
  })

  const ConnectedHeightWatcher = connect(mapStateToProps, mapDispatchToProps)(HeightWatcher)

  return ConnectedHeightWatcher
}
