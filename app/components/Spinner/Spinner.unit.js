import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import Spinner from './Spinner'

const setup = TU.makeTestSetup({
  Component: Spinner,
})

test('components.Spinner | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})
