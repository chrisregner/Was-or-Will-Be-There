import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'
import * as TU from 'services/testUtils'
import PlansAndJournals from './PlansAndJournals'

const defProps = {
  match: {
    params: {
      countryId: '',
    },
  },
  plans: I.List(),
  journals: I.List(),
}

const setup = TU.makeTestSetup({
  Component: PlansAndJournals,
  defaultProps: defProps,
})

test('components.PlansAndJournals | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('components.PlansAndJournals | it should render a link to add a plan', () => {
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

test('components.PlansAndJournals | it should render a link to add a journal', () => {
  const props = {
    match: {
      params: {
        countryId: 'ph',
      },
    },
  }
  const wrapper = setup({ props })
  const linkWrpr = wrapper.find('[to="/countries/ph/journals/new"]')

  const actual = linkWrpr.length
  const expected = 1

  assert.equal(actual, expected)
})

test('components.PlansAndJournals | if there is NO plan, it should render a message for lacking plans', () => {
  const props = {
    plans: I.List(),
  }
  const wrapper = setup({ props })
  const noPlanMsgWrpr = wrapper.find('.plans-and-journals-no-plan-msg')

  const actual = noPlanMsgWrpr.length
  const expected = 1

  assert.equal(actual, expected)
})

test('components.PlansAndJournals | if there is plan, it should NOT render a message for lacking plans', () => {
  const props = {
    plans: I.List([
      I.Map({
        id: 'initialPlanId',
        planName: 'The Initial Plan Name',
      })
    ]),
  }
  const wrapper = setup({ props })
  const noPlanMsgWrpr = wrapper.find('.plans-and-journals-no-plan-msg')

  const actual = noPlanMsgWrpr.length
  const expected = 0

  assert.equal(actual, expected)
})

test('components.PlansAndJournals | if there is NO journal, it should render a message for lacking journals', () => {
  const props = {
    journals: I.List(),
  }
  const wrapper = setup({ props })
  const noJournalMsgWrpr = wrapper.find('.plans-and-journals-no-journal-msg')

  const actual = noJournalMsgWrpr.length
  const expected = 1

  assert.equal(actual, expected)
})

test('components.PlansAndJournals | if there is journal, it should NOT render a message for lacking journals', () => {
  const props = {
    journals: I.List([
      I.Map({
        id: 'initialJournalId',
        planName: 'The Initial Journal Name',
      })
    ]),
  }
  const wrapper = setup({ props })
  const noJournalMsgWrpr = wrapper.find('.journals-and-journals-no-plan-msg')

  const actual = noJournalMsgWrpr.length
  const expected = 0

  assert.equal(actual, expected)
})

test('components.PlansAndJournals | if plans are provided, it should render each', () => {
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

test('components.PlansAndJournals | if plans are provided, it should render the the plan items with correct props', () => {
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

test('components.PlansAndJournals | if journals are provided, it should render each', () => {
  const testWithVars = (journals, quantity) => {
    const props = { journals }

    const wrapper = setup({ props })
    const journalItemsWrpr = wrapper.find('.plans-and-journals-journal-item')

    const actual = journalItemsWrpr.length
    const expected = quantity

    assert.equal(actual, expected)
  }

  testWithVars(I.fromJS([
    {
      id: '1',
      title: 'First Journal',
    },
    {
      id: '2',
      title: 'Second Journal',
    },
    {
      id: '3',
      title: 'Third Journal',
    },
  ]), 3)

  testWithVars(I.fromJS([
    {
      id: '1',
      title: 'First Journal',
    },
    {
      id: '2',
      title: 'Second Journal',
    },
    {
      id: '3',
      title: 'Third Journal',
    },
    {
      id: '4',
      title: 'Blah',
    },
    {
      id: '5',
      title: 'Bleh',
    },
  ]), 5)
})

test('components.PlansAndJournals | if journals are provided, it should render the the journal items with correct props', () => {
  const props = {
    match: {
      params: {
        countryId: 'de',
      },
    },
    journals: I.fromJS([
      {
        id: '1',
        title: 'First Journal',
      },
      {
        id: '2',
        title: 'Second Journal',
      },
      {
        id: '3',
        title: 'Third Journal',
      },
      {
        id: '4',
        title: 'Blah',
      },
      {
        id: '5',
        title: 'Bleh',
      },
    ]),
  }

  const sampleJournalItemWrpr = setup({ props })
    .find('.plans-and-journals-journal-item')
    .at(2)

  const actual = I.fromJS({
    countryId: sampleJournalItemWrpr.prop('countryId'),
    journal: sampleJournalItemWrpr.prop('journal'),
  })

  const expected = I.fromJS({
    countryId: 'de',
    journal: {
      id: '3',
      title: 'Third Journal',
    },
  })

  assert.isTrue(actual.equals(expected))
})
