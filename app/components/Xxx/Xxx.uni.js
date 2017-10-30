import test from 'tape'

import * as TU from 'services/testUtils'
import Xxx from './Xxx'

const setup = TU.makeTestSetup({
  Component: Xxx,
})

test('Xxx | it should render without error', (t) => {
  const wrapper = setup()

  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})
