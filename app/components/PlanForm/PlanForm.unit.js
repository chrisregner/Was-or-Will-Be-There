import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import I from 'immutable'
import D from 'date-fns'

import * as TU from 'services/testUtils'

import PlanForm from './PlanForm'

const mockData = {
  ev: { preventDefault: () => {} },
  inOneDay: D.addDays(new Date(), 1),
  inTenDays: D.addDays(new Date(), 10),
}

const defProps = {
  handleSubmit: td.func(),
  history: {
    push: td.func(),
  },
  match: {
    params: { countryId: '' },
  },
  location: {
    pathname: '',
  },
}

const setup = TU.makeTestSetup({
  Component: PlanForm,
  tools: ['td'],
  defaultProps: defProps,
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

test('components.PlanForm | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('components.PlanForm | if isNotFound is true, it should call setNotFound with pathname', () => {
  const props = {
    isNotFound: true,
    setNotFound: td.func(),
    location: {
      pathname: '/random/pathname',
    },
  }

  setup({ props })

  td.verify(props.setNotFound('/random/pathname'), { times: 1 })
})

test('components.PlanForm | if isNotFound is NOT true, it should NOT call setNotFound with pathname', () => {
  const props = {
    setNotFound: td.func(),
  }

  setup({ props })

  td.verify(props.setNotFound(), { times: 0, ignoreExtraArgs: true })
})

/**
 * TitleField
 */

test('components.PlanForm > TitleField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="TitleField"]')

  const value = 'Sample Plan Name'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('components.PlanForm > TitleField | if changed to blank, it should show error', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="TitleField"]')

  getField().simulate('change', null, '')

  const actual = getField().prop('errorText')

  assert.ok(actual)
})

test('components.PlanForm > TitleField | if NOT filled and submitted, it should NOT call handleSubmit()', () => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  td.verify(defProps.handleSubmit(), { times: 0, ignoreExtraArgs: true })
})

test('components.PlanForm > TitleField | if NOT filled and submitted, it should show error', () => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  const getField = () => wrapper.find('[data-name="TitleField"]')
  const actual = getField().prop('errorText')

  assert.ok(actual)
})

test('components.PlanForm > TitleField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: 'Random Initial Plan',
    }),
  }

  const titleWrpr = setup({ props })
    .find('[data-name="TitleField"]')

  const actual = titleWrpr.prop('value')
  const expected = 'Random Initial Plan'

  assert.equal(actual, expected)
})

test('components.PlanForm > TitleField | if initial value is provided, it should still be emptiable', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: 'Random Initial Plan',
    }),
  }

  const wrapper = setup({ props })
  const getField = () => wrapper.find('[data-name="TitleField"]')
  const newEmptyVal = ''

  getField().simulate('change', null, newEmptyVal)

  const actual = getField().prop('value')

  assert.isNotOk(actual)
})

/**
 * CopyField
 */

test('components.PlanForm > CopyField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="CopyField"]')

  const value = 'Sample Copy'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('components.PlanForm > CopyField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      copy: 'Random Initial Copy',
    }),
  }

  const copyWrpr = setup({ props })
    .find('[data-name="CopyField"]')

  const actual = copyWrpr.prop('value')
  const expected = 'Random Initial Copy'

  assert.equal(actual, expected)
})

test('components.PlanForm > CopyField | if initial value is provided, it should still be emptiable', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      copy: 'Random Initial Copy',
    }),
  }

  const wrapper = setup({ props })
  const getField = () => wrapper.find('[data-name="CopyField"]')
  const newEmptyVal = ''

  getField().simulate('change', null, newEmptyVal)

  const actual = getField().prop('value')

  assert.isNotOk(actual)
})

/**
 * Departure
 */

test('components.PlanForm > DepartureField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('components.PlanForm > DepartureField | if HomecomingField is filled, it should have maxDate equal to HomecomingField\'s value', () => {
  const wrapper = setup()
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mockData.inOneDay
  getHomecomingField().simulate('change', null, value)

  const expected = value
  const actual = getDepartureField().prop('maxDate')

  assert.equal(actual, expected)
})

test('components.PlanForm > DepartureField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      departure: mockData.inOneDay,
    }),
  }
  const fieldWrpr = setup({ props }).find('[data-name="DepartureField"]')

  const actual = fieldWrpr.prop('value')
  const expected = mockData.inOneDay

  assert.deepEqual(actual, expected)
})

/**
 * Homecoming
 */

test('components.PlanForm > HomecomingField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('components.PlanForm > HomecomingField | if DepartureField is filled, it should have minDate equal to DepartureField\'s value', () => {
  const wrapper = setup()
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mockData.inOneDay
  getDepartureField().simulate('change', null, value)

  const expected = value
  const actual = getHomecomingField().prop('minDate')

  assert.equal(actual, expected)
})

test('components.PlanForm > HomecomingField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      homecoming: mockData.inOneDay,
    }),
  }
  const fieldWrpr = setup({ props }).find('[data-name="HomecomingField"]')

  const actual = fieldWrpr.prop('value')
  const expected = mockData.inOneDay

  assert.deepEqual(actual, expected)
})

/**
 * Delete
 */

test('components.PlanForm > DeleteBtn | if id is provided, it should the render a delete button', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
    }),
  }
  const deleteBtnWrpr = setup({ props })
    .find('.plan-form-delete-btn')

  const actual = deleteBtnWrpr.exists()

  assert.isTrue(actual)
})

test('components.PlanForm > DeleteBtn | if delete button is clicked, it should handleDelete with id', () => {
  const fakeHandleDelete = td.func()
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
    }),
    handleDelete: fakeHandleDelete,
  }
  const deleteBtnWrpr = setup({ props })
    .find('.plan-form-delete-btn')

  deleteBtnWrpr.simulate('click')

  td.verify(fakeHandleDelete('randomId'), { times: 1 })
})

test('components.PlanForm > DeleteBtn | if delete button is clicked, it should call history.push() with correct args', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
      initialValues: I.Map({
        id: 'randomId',
        title: '',
      }),
      handleDelete: () => {},
    }

    const deleteBtnWrpr = setup({ props })
      .find('.plan-form-delete-btn')

    deleteBtnWrpr.simulate('click')

    const expectedArg = `/countries/${countryId}/plans`

    td.verify(defProps.history.push(expectedArg), { times: 1 })
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

/**
 * onSubmit
 */

test('components.PlanForm.onSubmit() | if form is valid, it should call handleSubmit() with trimmed data', () => {
  const values = {
    TitleField: '  Sample Spaceous Name  ',
    CopyField: `
      Sample Spaceous Note
    `,
    DepartureField: mockData.inOneDay,
    HomecomingField: mockData.inTenDays,
  }
  const wrapper = setup()

  fillForm(values, wrapper)
  wrapper.find('form').simulate('submit', mockData.ev)

  const expectedArg = I.Map({
    title: 'Sample Spaceous Name',
    copy: 'Sample Spaceous Note',
    departure: mockData.inOneDay,
    homecoming: mockData.inTenDays,
  })

  td.verify(defProps.handleSubmit(expectedArg), { times: 1 })
})

test('components.PlanForm.onSubmit() | if form is valid and initial values were provided, it should call handleSubmit() with correct data and id', () => {
  const testWithChangingSomeField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Plan',
        homecoming: mockData.inOneDay,
      }),
    }
    const values = {
      CopyField: `
        Sample Spaceous Note
      `,
      DepartureField: mockData.inOneDay,
      HomecomingField: mockData.inTenDays,
    }
    const wrapper = setup({ props })

    fillForm(values, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const actual = I.fromJS(TU.getArgs(defProps.handleSubmit))
    const expected = I.List([
      I.Map({
        id: 'randomId',
        title: 'Random Initial Plan',
        copy: 'Sample Spaceous Note',
        departure: mockData.inOneDay,
        homecoming: mockData.inTenDays,
      }),
    ])

    assert.isTrue(actual.equals(expected))
    td.verify(defProps.handleSubmit(), { times: 1, ignoreExtraArgs: true })
  }

  const testWithChangingNoField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Plan',
        homecoming: mockData.inOneDay,
      }),
    }
    const wrapper = setup({ props })

    wrapper.find('form').simulate('submit', mockData.ev)

    const actual = I.fromJS(TU.getArgs(defProps.handleSubmit))
    const expected = I.List([
      I.Map({
        id: 'randomId',
        title: 'Random Initial Plan',
        homecoming: mockData.inOneDay,
      }),
    ])

    assert.isTrue(actual.equals(expected))
    td.verify(defProps.handleSubmit(), { times: 1, ignoreExtraArgs: true })
  }

  const testWithEmptiyingAField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Plan',
        copy: `
          Sample Spaceous Note
        `,
        homecoming: mockData.inOneDay,
      }),
    }
    const wrapper = setup({ props })
    const values = {
      CopyField: '',
    }

    fillForm(values, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const actual = I.fromJS(TU.getArgs(defProps.handleSubmit))
    const expected = I.List([
      I.Map({
        id: 'randomId',
        title: 'Random Initial Plan',
        homecoming: mockData.inOneDay,
        copy: '',
      }),
    ])

    assert.isTrue(actual.equals(expected))
    td.verify(defProps.handleSubmit(), { times: 1, ignoreExtraArgs: true })
  }

  testWithChangingSomeField()
  testWithChangingNoField()
  testWithEmptiyingAField()
})

test('components.PlanForm.onSubmit() | if form is valid, it should call history.push() with correct args', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })

    fillForm({ TitleField: 'Sample Plan Name' }, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const expectedArg = `/countries/${countryId}/plans`

    td.verify(defProps.history.push(expectedArg), { times: 1 })
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})
