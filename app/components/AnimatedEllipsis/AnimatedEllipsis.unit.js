import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import AnimatedEllipsis from './AnimatedEllipsis'

const setup = TU.makeTestSetup({
  Component: AnimatedEllipsis,
})

test('components.AnimatedEllipsis | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})
