import test from 'tape'

import * as Tu from 'services/testUtils'
import Xxx from './Xxx'

const setup = Tu.makeTestSetup({
  Component: Xxx,
})

test('it should render without error', t => {
  const wrapper = setup()

  const actual = wrapper.exists()
  const expected = true

  t.true(actual, expected)
  t.end()
})
