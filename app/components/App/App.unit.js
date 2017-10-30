import { test } from 'mocha'
import { assert } from 'chai'

import * as Tu from 'services/testUtils'
import App from './App'

const setup = Tu.makeTestSetup({
  Component: App,
})

test('it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})
