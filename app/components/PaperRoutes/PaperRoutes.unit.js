import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import PaperRoutes from './PaperRoutes'

const setup = TU.makeTestSetup({
  Component: PaperRoutes,
})

test('components.PaperRoutes | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('components.PaperRoutes | it should render country name cmpt with country id')
