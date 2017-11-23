import React from 'react'
import PropTypes from 'prop-types'
import ResizeDetector from 'react-resize-detector'

/**
 * Custom event polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */

if (typeof window.CustomEvent !== "function") {
  const CustomEvent = (event, params) => {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype
  window.CustomEvent = CustomEvent
}

/**
 * Optimized resize event
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
const throttle = (type, name, obj) => {
  obj = obj || window
  let running = false
  const func = () => {
    if (running)
      return

    running = true

    requestAnimationFrame(() => {
      obj.dispatchEvent(new CustomEvent(name))
      running = false
    })
  }

  obj.addEventListener(type, func)
}

throttle("resize", "optimizedResize")

/* The AnimatingHtDiv itself */
class AnimatingHtDiv extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  state = {
    height: 0,
  }

  componentDidMount = () => window.addEventListener("optimizedResize", this.handleWindowResize)
  componentWillUnmount = () => window.removeEventListener("optimizedResize", this.handleWindowResize)

  handleWindowResize = () => this.setState({
    height: this.childWrapperEl.offsetHeight,
  })

  handleResize = (w, h) => this.setState({
    height: h,
  })

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
