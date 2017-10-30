import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import I from 'immutable'
import D from 'date-fp'

import * as Tu from 'services/testUtils'

import PlanForm from './PlanForm'

const mockData = {
  ev: { preventDefault: () => {} },
  inOneDay: new Date(),
  inTenDays: D.add('days', 10, new Date()),
}

const defProps = {
  handleSubmit: td.func(),
  setPaperHeight: td.func(),
  history: {
    push: td.func(),
  },
  match: {
    params: { countryId: '' },
  },
}

const setup = Tu.makeTestSetup({
  Component: PlanForm,
  tools: ['mui', 'td'],
  defaultProps: defProps,
  defaultEnzymeOpts: {
    disableLifecycleMethods: true,
  },
})

const fillForm = (values, wrapper) => {
  Object.entries(values).forEach((entry) => {
    const getField = () => wrapper.find(`[data-name='${entry[0]}']`)

    getField().simulate('change', mockData.ev, entry[1])
  })
}

/**
 * Self
 */

test('PlanForm | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('PlanForm | it should render CountyName with correct props', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })
    const countryNameWrpr = wrapper.find('[data-name="CountryName"]')

    const actual = countryNameWrpr.prop('countryId')
    const expected = countryId

    assert.equal(actual, expected)
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

test('PlanForm | it should render the correct country flag', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })
    const countryFlagWrpr = wrapper.find(`[src="https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/${countryId}.svg"]`)

    const actual = countryFlagWrpr.exists()

    assert.isTrue(actual)
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

/**
 * PlanNameField
 */

test('PlanForm > PlanNameField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="PlanNameField"]')

  const value = 'Sample Plan Name'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(expected, actual)
})

test('PlanForm > PlanNameField | if changed to blank, it should show error', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="PlanNameField"]')

  getField().simulate('change', null, '')

  const actual = getField().prop('errorText')

  assert.ok(actual)
})

test('PlanForm > PlanNameField | if NOT filled and submitted, it should NOT call handleSubmit()', () => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  td.verify(defProps.handleSubmit(), { times: 0, ignoreExtraArgs: true })
})

test('PlanForm > PlanNameField | if NOT filled and submitted, it should show error', () => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  const getField = () => wrapper.find('[data-name="PlanNameField"]')
  const actual = getField().prop('errorText')

  assert.ok(actual)
})

test.skip('PlanNameField | it should accept initial value', () => {})
test.skip('PlanNameField | if initial value is provided, it should still be emptiable', () => {})

/**
 * NotesField
 */

test('PlanForm > NotesField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="NotesField"]')

  const value = 'Sample Notes'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(expected, actual)
})

test.skip('NotesField | it should accept initial value', () => {})
test.skip('NotesField | if initial value is provided, it should still be emptiable', () => {})

/**
 * Departure
 */

test('PlanForm > DepartureField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(expected, actual)
})

test('PlanForm > DepartureField | if HomecomingField is filled, it should have maxDate equal to HomecomingField\'s value', () => {
  const wrapper = setup()
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mockData.inOneDay
  getHomecomingField().simulate('change', null, value)

  const expected = value
  const actual = getDepartureField().prop('maxDate')

  assert.equal(expected, actual)
})

test.skip('DepartureField | it should accept initial value', () => {})
test.skip('DepartureField | if initial value is provided, it should still be emptiable', () => {})

/**
 * Homecoming
 */

test('PlanForm > HomecomingField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(expected, actual)
})

test('PlanForm > HomecomingField | if DepartureField is filled, it should have minDate equal to DepartureField\'s value', () => {
  const wrapper = setup()
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mockData.inOneDay
  getDepartureField().simulate('change', null, value)

  const expected = value
  const actual = getHomecomingField().prop('minDate')

  assert.equal(expected, actual)
})

test.skip('HomecomingField | it should accept initial value', () => {})
test.skip('HomecomingField | if initial value is provided, it should still be emptiable', () => {})

/**
 * OnSubmit
 */

test('PlanForm > .OnSubmit() | if form is valid, it should call handleSubmit() with trimmed data', () => {
  const values = {
    PlanNameField: '  Sample Spaceous Name  ',
    NotesField: `
      Sample Spaceous Note
    `,
    DepartureField: mockData.inOneDay,
    HomecomingField: mockData.inTenDays,
  }
  const wrapper = setup()

  fillForm(values, wrapper)
  wrapper.find('form').simulate('submit', mockData.ev)

  const expectedArg = I.Map({
    planName: 'Sample Spaceous Name',
    notes: 'Sample Spaceous Note',
    departure: mockData.inOneDay,
    homecoming: mockData.inTenDays,
  })

  td.verify(defProps.handleSubmit(expectedArg), { times: 1 })
})

test('PlanForm > .OnSubmit() | if form is valid, it should call history.push() with correct args', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })

    fillForm({ PlanNameField: 'Sample Plan Name' }, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const expectedArg = `/countries/${countryId}`

    td.verify(defProps.history.push(expectedArg), { times: 1 })
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})
