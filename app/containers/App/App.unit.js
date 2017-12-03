import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { BareApp } from './App'

const defProps = {
  isPathNotFound: td.func(),
  fetchCountryNames: td.func(),
  location: {
    pathname: '',
  },
}

const setup = TU.makeTestSetup({
  Component: BareApp,
  defaultProps: defProps,
  tools: ['td'],
})

test('containers.App | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})
