import { test } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import * as I from 'immutable'
import D from 'date-fp'
import * as TU from 'services/testUtils'
import PlansAndJournals from './PlansAndJournals'

const mocks = {
  inTenDays: D.add('days', 10, new Date()),
}

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

test('PlansAndJournals | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test.skip('PlansAndJournals | it should render a link to add a journal')

test('PlansAndJournals | it should render a link to add a plan', () => {
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

  assert.equal(actual, expected)
})

test.skip('PlansAndJournals | if there is no plans nor journals, it should render a message')
test.skip('PlansAndJournals | if there is no plans nor journals, it should NOT render the message for lacking plans alone')
test.skip('PlansAndJournals | if there is no plans nor journals, it should NOT render the message for lacking journals alone')
test.skip('PlansAndJournals | if there is journal(s) but no plan, it should render a message for lacking plans')
test.skip('PlansAndJournals | if there is journal(s) but no plan, it should NOT render a message for lacking BOTH plans and journals')
test.skip('PlansAndJournals | if there is plan(s) but no journal, it should render a message for lacking journals')
test.skip('PlansAndJournals | if there is plan(s) but no journal, it should NOT render a message for lacking BOTH plans and journals')

test('PlansAndJournals | if there is any plan, it should render it', () => {
  const testWithVars = (plans, quantity) => {
    const props = { plans }

    const wrapper = setup({ props })
    const planItemsWrpr = wrapper.find('[data-name="PlanItem"]')

    const actual = planItemsWrpr.length
    const expected = quantity

    assert.equal(actual, expected)
  }

  testWithVars(I.fromJS([
    {
      id: '1',
      planName: 'First Plan',
    },
    {
      id: '2',
      planName: 'Second Plan',
    },
    {
      id: '3',
      planName: 'Third Plan',
    }
  ]), 3)

  testWithVars(I.fromJS([
    {
      id: '1',
      planName: 'First Plan',
    },
    {
      id: '2',
      planName: 'Second Plan',
    },
    {
      id: '3',
      planName: 'Third Plan',
    },
    {
      id: '4',
      planName: 'Blah',
    },
    {
      id: '5',
      planName: 'Bleh',
    }
  ]), 5)
})

test.skip('PlansAndJournals | when plans are provided, it should render the PlanItem with correct props for each')
