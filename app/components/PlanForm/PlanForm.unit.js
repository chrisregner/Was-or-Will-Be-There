import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import td from 'testdouble'
import I from 'immutable'
import D from 'date-fp'

import { smartMergeDeep } from 'services/fpUtils'

import PlanForm from './PlanForm'

const mocks = {
  handleSubmit: td.func(),
  push: td.func(),
  ev: { preventDefault: () => {} },
  inOneDay: new Date(),
  inTenDays: D.add('days', 10, new Date()),
}

const setup = (args = {}) => {
  td.reset()

  const { props } = args

  const defaultProps = {
    handleSubmit: mocks.handleSubmit,
    history: {
      push: mocks.push,
    },
    match: {
      params: { countryId: '' }
    }
  }
  const finalProps = smartMergeDeep(defaultProps, props)


  return shallow(<PlanForm {...finalProps} />)
}

const fillForm = (values, wrapper) => {
  Object.entries(values).forEach(entry => {
    const getField = () => wrapper.find(`[data-name='${entry[0]}']`)

    getField().simulate('change', mocks.ev, entry[1])
  })
}

test('it should render without error', t => {
  const wrapper = setup()
  const actual = wrapper.exists()

  t.true(actual)
})

test.todo('it should render CountyName with correct props')

/**
 * PlanNameField
 */

test('PlanNameField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="PlanNameField"]')

  const value = 'Sample Plan Name'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
})

test('PlanNameField | if changed to blank, it should show error', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="PlanNameField"]')

  getField().simulate('change', null, '')

  const actual = getField().prop('errorText')

  t.truthy(actual)
})

test('PlanNameField | if NOT filled and submitted, it should NOT call handleSubmit()', t => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mocks.ev)

  t.notThrows(() => {
    td.verify(mocks.handleSubmit(), { times: 0, ignoreExtraArgs: true })
  })
})

test('PlanNameField | if NOT filled and submitted, it should show error', t => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mocks.ev)

  const getField = () => wrapper.find('[data-name="PlanNameField"]')
  const actual = getField().prop('errorText')

  t.truthy(actual)
})

test.todo('PlanNameField | it should accept initial value')
test.todo('PlanNameField | if initial value is provided, it should still be emptiable')

/**
 * NotesField
 */

test('NotesField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="NotesField"]')

  const value = 'Sample Notes'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
})

test.todo('NotesField | it should accept initial value')
test.todo('NotesField | if initial value is provided, it should still be emptiable')

/**
 * Departure
 */

test('DepartureField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mocks.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
})

test('DepartureField | if HomecomingField is filled, it should have maxDate equal to HomecomingField\'s value', t => {
  const wrapper = setup()
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mocks.inOneDay
  getHomecomingField().simulate('change', null, value)

  const expected = value
  const actual = getDepartureField().prop('maxDate')

  t.is(expected, actual)
})

test.todo('DepartureField | it should accept initial value')
test.todo('DepartureField | if initial value is provided, it should still be emptiable')

/**
 * Homecoming
 */

test('HomecomingField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mocks.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
})

test('HomecomingField | if DepartureField is filled, it should have minDate equal to DepartureField\'s value', t => {
  const wrapper = setup()
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mocks.inOneDay
  getDepartureField().simulate('change', null, value)

  const expected = value
  const actual = getHomecomingField().prop('minDate')

  t.is(expected, actual)
})

test.todo('HomecomingField | it should accept initial value')
test.todo('HomecomingField | if initial value is provided, it should still be emptiable')

/**
 * OnSubmit
 */

test('.OnSubmit() | if form is valid, it should call handleSubmit() with trimmed data', t => {
  const values = {
    PlanNameField: '  Sample Spaceous Name  ',
    NotesField: `
      Sample Spaceous Note
    `,
    DepartureField: mocks.inOneDay,
    HomecomingField: mocks.inTenDays,
  }
  const wrapper = setup()

  fillForm(values, wrapper)
  wrapper.find('form').simulate('submit', mocks.ev)

  const expectedArg = I.Map({
    planName: 'Sample Spaceous Name',
    notes: 'Sample Spaceous Note',
    departure: mocks.inOneDay,
    homecoming: mocks.inTenDays,
  })

  t.notThrows(() => {
    td.verify(mocks.handleSubmit(expectedArg), { times: 1 })
  })
})

test('.OnSubmit() | if form is valid, it should call history.push() with correct args', t => {
  const testWithVar = countryId => {
    const props = {
      match: {
        params: { countryId }
      }
    }
    const wrapper = setup({ props })

    fillForm({ PlanNameField: 'Sample Plan Name' }, wrapper)
    wrapper.find('form').simulate('submit', mocks.ev)

    const expectedArg = `/countries/${countryId}`

    t.notThrows(() => {
      td.verify(mocks.push(expectedArg), { times: 1 })
    })
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})
