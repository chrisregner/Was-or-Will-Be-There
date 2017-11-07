import { test } from 'mocha'
import { assert } from 'chai'

import * as Tu from 'services/testUtils'
import MapCmpt from './MapCmpt'

const setup = Tu.makeTestSetup({
  Component: MapCmpt,
})

test('components.MapCmpt | it should render without error', () => {
  const wrapper = setup()

  const actual = wrapper.exists()

  assert.isTrue(actual)
})
