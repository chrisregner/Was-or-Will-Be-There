import test from 'tape'
import * as I from 'immutable'

import * as TU from 'services/testUtils'
import PlansAndJournals from './PlansAndJournals'

const defProps = {
  match: {
    params: {
      countryId: '',
    },
  },
  plans: I.List(),
}

const setup = TU.makeTestSetup({
  Component: PlansAndJournals,
  defaultProps: defProps,
})

test('PlansAndJournals | it should render without error', (t) => {
  const wrapper = setup()

  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})

test.skip('PlansAndJournals | it should render a link to add a journal')

test('PlansAndJournals | it should render a link to add a plan', (t) => {
  const props = {
    match: {
      params: {
        countryId: 'ph',
      },
    },
  }
  const wrapper = setup({ props })
  const linkWrpr = wrapper.find('[to="/countries/ph/plans/new"]')

  const actual = linkWrpr.length
  const expected = 1

  t.is(actual, expected)
  t.end()
})

test.skip('PlansAndJournals | if there is no plans nor journals, it should render a message')
test.skip('PlansAndJournals | if there is no plans nor journals, it should NOT render the message for lacking plans alone')
test.skip('PlansAndJournals | if there is no plans nor journals, it should NOT render the message for lacking journals alone')
test.skip('PlansAndJournals | if there is journal(s) but no plan, it should render a message for lacking plans')
test.skip('PlansAndJournals | if there is journal(s) but no plan, it should NOT render a message for lacking BOTH plans and journals')
test.skip('PlansAndJournals | if there is plan(s) but no journal, it should render a message for lacking journals')
test.skip('PlansAndJournals | if there is plan(s) but no journal, it should NOT render a message for lacking BOTH plans and journals')

test.skip('PlansAndJournals | if there is any plan, it should render it', (t) => {

})

test.skip('PlansAndJournals > PlanItem | it should render the plan name')
test.skip('PlansAndJournals > PlanItem | it should be a link to editing that plan')
test.skip('PlansAndJournals > PlanItem | it should render timeBadge with the correct props')
