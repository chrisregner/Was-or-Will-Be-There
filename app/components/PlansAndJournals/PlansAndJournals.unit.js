import test from 'tape'

import * as Tu from 'services/testUtils'
import PlansAndJournals from './PlansAndJournals'

const setup = Tu.makeTestSetup({
  Component: PlansAndJournals,
})

test('it should render without error', t => {
  const wrapper = setup()

  const actual = wrapper.exists()
  const expected = true

  t.true(actual, expected)
  t.end()
})
