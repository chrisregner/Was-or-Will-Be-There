import { test } from 'mocha'
import { assert } from 'chai'
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

test('PlansAndJournals | if plans are provided, it should render each', () => {
  const testWithVars = (plans, quantity) => {
    const props = { plans }

    const wrapper = setup({ props })
    const planItemsWrpr = wrapper.find('.plans-and-journals-plan-item')

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
    },
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
    },
  ]), 5)
})

test('PlansAndJournals | if plans are provided, it should render the the plan items with correct props', () => {
  const props = {
    match: {
      params: {
        countryId: 'de',
      },
    },
    plans: I.fromJS([
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
      },
    ]),
  }

  const samplePlanItemWrpr = setup({ props })
    .find('.plans-and-journals-plan-item')
    .at(2)

  const actual = I.fromJS({
    countryId: samplePlanItemWrpr.prop('countryId'),
    plan: samplePlanItemWrpr.prop('plan'),
  })

  const expected = I.fromJS({
    countryId: 'de',
    plan: {
      id: '3',
      planName: 'Third Plan',
    },
  })

  assert.isTrue(actual.equals(expected))
})
