import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import NotFound from './NotFound'

const setup = TU.makeTestSetup({
  Component: NotFound,
})

test('NotFound | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})
