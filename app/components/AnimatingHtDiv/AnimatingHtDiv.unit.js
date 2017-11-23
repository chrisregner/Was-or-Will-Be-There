import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import AnimatingHtDiv from './AnimatingHtDiv'

const setup = TU.makeTestSetup({
  Component: AnimatingHtDiv,
})

test('components.AnimatingHtDiv | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})
