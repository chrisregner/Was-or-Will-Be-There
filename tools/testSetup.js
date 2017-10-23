import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

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
