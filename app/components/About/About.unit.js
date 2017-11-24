import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import About from './About'

const setup = TU.makeTestSetup({
  Component: About,
})

test('components.About | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})
