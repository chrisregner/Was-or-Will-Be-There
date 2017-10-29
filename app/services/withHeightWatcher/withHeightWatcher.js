import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector'

import { setPaperHeight } from 'state/ui'
// import { routeGetters } from 'state'

export default (WrappedCmpt, componentName) => {
  class HeightWatcher extends React.Component {
    static displayName = `WithHeightWatcher(${
      WrappedCmpt.displayName || WrappedCmpt.name || 'UnnamedComponent'
    })`

    static propTypes = {
      setPaperHeight: PropTypes.func.isRequired,
      willUnmount: PropTypes.bool.isRequired,
    }


    componentDidMount = () => {
      console.log('>>> mounted ' + componentName)
      this.props.setPaperHeight(this.rootEl.offsetHeight)
    }

    componentDidUpdate = () => {
      console.log('>>> did update ' + componentName)
      const { willUnmount, setPaperHeight } = this.props

      if (willUnmount) {
        setPaperHeight(this.rootEl.offsetHeight)
        console.log('>>> will unmount' + componentName)
      }
    }

    // componentWillUnmount = () => {
    //   console.log('>>> will unmount ' + componentName)
    //   this.props.setPaperHeight(0)
    // }

    handleResize = (width, height) => {
      this.props.setPaperHeight(height)
    }

    rootElRef = rootEl => {
      this.rootEl = rootEl
    }

    render = () => {
      const { setPaperHeight, ...props } = this.props
      console.log('>>> rendered ' + componentName)

      return (
        <div className='' ref={this.rootElRef}>
          <WrappedCmpt {...props} />
          <ResizeDetector handleHeight onResize={this.handleResize} />
        </div>
      )
    }
  }

  const mapDispatchToProps = dispatch => ({
    setPaperHeight: height => {
      dispatch(setPaperHeight(componentName, height))
    }
  })

  const mapStateToProps = (state, ownProps) => ({
    willUnmount: false/*routeGetters.isRouteCurrent(ownProps.location.pathName)*/
  })

  const ConnectedHeightWatcher = connect(mapStateToProps, mapDispatchToProps)(HeightWatcher)

  return ConnectedHeightWatcher
}
