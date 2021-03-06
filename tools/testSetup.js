/* eslint-disable node/no-deprecated-api */

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import td from 'testdouble'
import { JSDOM } from 'jsdom'
import { SynchronousPromise } from 'synchronous-promise'

// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
Enzyme.configure({ adapter: new Adapter() })

/**
 * Disable non-js imports
 */

function noop () {
  return null
}

require.extensions['.css'] = noop
require.extensions['.png'] = noop
require.extensions['.svg'] = noop
require.extensions['.jpg'] = noop
require.extensions['.jpeg'] = noop
require.extensions['.gif'] = noop

/* Add browser global variables */
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

const copyProps = (src, target) => {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = { userAgent: 'node.js' }
copyProps(window, global)

/* Configure testdouble */
td.config({
  promiseConstructor: SynchronousPromise,
})

// https://github.com/chaijs/type-detect/issues/98#issuecomment-294254114
global.HTMLElement = window.HTMLElement

// https://github.com/akiran/react-slick#test-setup
global.window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {},
  }
}

// fixes the issue with smoothscroll package
global.history = {}
