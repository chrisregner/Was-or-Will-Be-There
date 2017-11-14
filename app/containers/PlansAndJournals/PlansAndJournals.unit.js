import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import PlansAndJournals from './PlansAndJournals'

const setup = TU.makeTestSetup({
  Component: PlansAndJournals,
})

test('components.PlansAndJournals | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('components.PlansAndJournals > plansList | when there are plans, it should render each correctly')
test('components.PlansAndJournals > plansList | when there are NO plans, it should render a message instead')
test('components.PlansAndJournals > journalsList | when there are journals, it should render each correctly')
test('components.PlansAndJournals > journalsList | when there are NO journals, it should render a message instead')
