import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { BareApp } from './App'

const defProps = {
  isPathNotFound: td.func(),
  fetchCountryNames: td.func(),
  location: {
    pathname: ''
  },
}

const setup = TU.makeTestSetup({
  Component: BareApp,
  defaultProps: defProps,
})

test('containers.App | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('containers.App | it should call isPathNotFound once with location.pathname')
test('containers.App | if isPathNotFound returned true, it should render the not found page')
test('containers.App | if isPathNotFound returned false, it should render the routes')
test('containers.App | when mounted, it should call fetchCountryNames')
