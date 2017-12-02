/**
 * Fixes issues with material-ui, material-ui-next, and material-ui-icons
 * https://github.com/mui-org/material-ui/issues/8458
 */
import SvgIcon from 'material-ui-next/SvgIcon'
global.__MUI_SvgIcon__ = SvgIcon

/**
 * Custom event polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */

if (typeof window.CustomEvent !== 'function') {
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
  /* global requestAnimationFrame CustomEvent */
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

throttle('resize', 'optimizedResize')
