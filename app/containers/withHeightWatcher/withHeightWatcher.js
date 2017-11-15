import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector'
import shortid from 'shortid'

import * as fromUi from 'state/ui'

export default (WrappedCmpt, componentName) => {
  class HeightWatcher extends React.Component {
    static displayName = `WithHeightWatcher(${
      WrappedCmpt.displayName || WrappedCmpt.name || 'UnnamedComponent'
    })`

    static propTypes = {
      setPaperHeight: PropTypes.func.isRequired,
      removePaperHeight: PropTypes.func.isRequired,
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
    }

    componentWillUnmount = () => {
      this.props.removePaperHeight(this.paperId)
    }

    handleResize = (width, height) => {
      this.props.setPaperHeight(this.paperId, height)
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
    removePaperHeight: (paperId, height) => {
      dispatch(fromUi.removePaperHeight(paperId))
    },
  })

  const ConnectedHeightWatcher = connect(null, mapDispatchToProps)(HeightWatcher)

  return ConnectedHeightWatcher
}
