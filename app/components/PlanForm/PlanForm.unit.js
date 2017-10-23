import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import td from 'testdouble'
import D from 'date-fp'

import { smartMergeDeep } from 'services/fpUtils'


import PlanForm from './PlanForm'

const mocks = {
  handleSubmit: td.func(),
  ev: { preventDefault: () => {} },
  inOneDay: new Date(),
  inTenDays: D.add('days', 10, new Date()),
}

const setup = (args = {}) => {
  td.reset()

  const { props } = args

  const defaultProps = {
    handleSubmit: mocks.handleSubmit
  }
  const finalProps = smartMergeDeep(defaultProps, props)

  return shallow(<PlanForm {...finalProps} />)
}

test('PlanForm | it should render without error', t => {
  const wrapper = setup()
  const actual = wrapper.exists()

  t.true(actual)
})

/**
 * PlanNameField
 */

test('PlanForm > PlanNameField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="PlanNameField"]')

  const value = 'Sample Plan Name'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
})

test.skip('PlanForm > PlanNameField | if NOT filled and submitted, it should NOT call handleSubmit()', t => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mocks.ev)

  t.notThrows(() => {
    td.verify(mocks.handleSubmit(), { times: 0, ignoreExtraArgs: true })
  })
})

test('PlanForm > PlanNameField | if changed to blank, it should show error', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="PlanNameField"]')

  getField().simulate('change', null, '')

  const actual = getField().prop('errorText')

  t.truthy(actual)
})

test('PlanForm > PlanNameField | if NOT filled and submitted, it should show error', t => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mocks.ev)

  const getField = () => wrapper.find('[data-name="PlanNameField"]')
  const actual = getField().prop('errorText')

  t.truthy(actual)
})

test.todo('PlanForm > PlanNameField | it should accept initial value')
test.todo('PlanForm > PlanNameField | if initial value is provided, it should still be emptiable')

/**
 * NotesField
 */

test('PlanForm > NotesField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="NotesField"]')

  const value = 'Sample Notes'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
})

test.todo('PlanForm > NotesField | it should accept initial value')
test.todo('PlanForm > NotesField | if initial value is provided, it should still be emptiable')

/**
 * Departure
 */

test('PlanForm > DepartureField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mocks.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
})

test('PlanForm > DepartureField | if HomecomingField is filled, it should have maxDate equal to HomecomingField\'s value', t => {
  const wrapper = setup()
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mocks.inOneDay
  getHomecomingField().simulate('change', null, value)

  const expected = value
  const actual = getDepartureField().prop('maxDate')

  t.is(expected, actual)
})

test.skip('PlanForm > DepartureField | if HomecomingField is filled but it isn\'t, and submitted, it should NOT call handleSubmit()', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mocks.inOneDay
  getField().simulate('change', null, value)

  wrapper.find('form').simulate('submit', mocks.ev)

  t.notThrows(() => {
    td.verify(mocks.handleSubmit(), { times: 0, ignoreExtraArgs: true })
  })
})

test.todo('PlanForm > DepartureField | it should accept initial value')
test.todo('PlanForm > DepartureField | if initial value is provided, it should still be emptiable')

/**
 * Homecoming
 */

test('PlanForm > HomecomingField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mocks.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
})

test('PlanForm > HomecomingField | if DepartureField is filled, it should have minDate equal to DepartureField\'s value', t => {
  const wrapper = setup()
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mocks.inOneDay
  getDepartureField().simulate('change', null, value)

  const expected = value
  const actual = getHomecomingField().prop('minDate')

  t.is(expected, actual)
})

test.skip('PlanForm > HomecomingField | if DepartureField is filled but it isn\'t, and submitted, it should NOT call handleSubmit()', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mocks.inOneDay
  getField().simulate('change', null, value)

  wrapper.find('form').simulate('submit', mocks.ev)

  t.notThrows(() => {
    td.verify(mocks.handleSubmit(), { times: 0, ignoreExtraArgs: true })
  })
})

test.todo('PlanForm > HomecomingField | it should accept initial value')
test.todo('PlanForm > HomecomingField | if initial value is provided, it should still be emptiable')

/**
 * OnSubmit
 */

const fillForm = (values, wrapper) => {
  Object.entries(values).forEach(entry => {
    const getField = () => wrapper.find(`[data-name='${entry[0]}']`)

    getField().simulate('change', mock.ev, entry[1])
  })
}

test.skip('PlanForm.OnSubmit() | if form is valid, it should call handleSubmit() with trimmed data', () => {
  const values = {
    PlanNameField: '  Sample Spaceous Name  ',
    NotesNameField: `
      Sample Spaceous Note
    `,
    DepartureField: mocks.inOneDay,
    Homecoming: mocks.inTenDays,
  }
  const wrapper = setup()

  fillForm(values, wrapper)

  const expectedArgs = {
    planName: 'Sample Spaceous Name',
    notes: 'Sample Spaceous Note',
    departure: mocks.inOneDay,
    homecoming: mocks.inTenDays,
  }

  t.notThrows(() => {
    td.verify(mocks.handleSubmit(expectedArgs), { times: 1 })
  })
})
