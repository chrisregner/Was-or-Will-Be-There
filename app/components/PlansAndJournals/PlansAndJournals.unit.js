import test from 'tape'

import * as TU from 'services/testUtils'
import PlansAndJournals from './PlansAndJournals'

const setup = TU.makeTestSetup({
  Component: PlansAndJournals,
})

test('PlansAndJournals | it should render without error', t => {
  const wrapper = setup()

  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})

test.skip('PlansAndJournals | it should render a link to add a journal')
test.skip('PlansAndJournals | it should render a link to add a plan')

test.skip('PlansAndJournals | if there is no plans nor journals, it should render a message')
test.skip('PlansAndJournals | if there is no plans nor journals, it should NOT render the message for lacking plans alone')
test.skip('PlansAndJournals | if there is no plans nor journals, it should NOT render the message for lacking journals alone')
test.skip('PlansAndJournals | if there is journal(s) but no plan, it should render a message for lacking plans')
test.skip('PlansAndJournals | if there is journal(s) but no plan, it should NOT render a message for lacking BOTH plans and journals')
test.skip('PlansAndJournals | if there is plan(s) but no journal, it should render a message for lacking journals')
test.skip('PlansAndJournals | if there is plan(s) but no journal, it should NOT render a message for lacking BOTH plans and journals')

test.skip('PlansAndJournals | if there is any plan, it should render it')
test.skip('PlansAndJournals > PlanEntry | it should render timeBadge with the correct props')
