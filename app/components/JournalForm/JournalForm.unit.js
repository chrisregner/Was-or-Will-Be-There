import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import I from 'immutable'
import D from 'date-fns'

import * as TU from 'services/testUtils'
import JournalForm from './JournalForm'

const mockData = {
  ev: { preventDefault: () => {} },
  inOneDay: new Date(),
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
}

const setup = TU.makeTestSetup({
  Component: JournalForm,
  tools: ['td'],
  defaultProps: defProps,
})

const fillForm = (values, wrapper) => {
  Object.entries(values).forEach((entry) => {
    const getField = () => wrapper.find(`.journal-form-${entry[0]}`)

    getField().simulate('change', mockData.ev, entry[1])
  })
}

test('JournalForm | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('JournalForm | it should render CountryName with correct props', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })
    const countryNameWrpr = wrapper.find('.journal-form-country-name')

    const actual = countryNameWrpr.prop('countryId')
    const expected = countryId

    assert.equal(actual, expected)
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

/**
 * TitleField
 */

test('JournalForm > TitleField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-title-field')

  const value = 'Sample Journal Title'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('JournalForm > TitleField | if changed to blank, it should show error', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-title-field')

  getField().simulate('change', null, '')

  const actual = getField().prop('errorText')

  assert.ok(actual)
})

test('JournalForm > TitleField | if NOT filled and submitted, it should NOT call handleSubmit()', () => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  td.verify(defProps.handleSubmit(), { times: 0, ignoreExtraArgs: true })
})

test('JournalForm > TitleField | if NOT filled and submitted, it should show error', () => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  const getField = () => wrapper.find('.journal-form-title-field')
  const actual = getField().prop('errorText')

  assert.ok(actual)
})

test('JournalForm > TitleField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
    }),
  }

  const titleWrpr = setup({ props })
    .find('.journal-form-title-field')

  const actual = titleWrpr.prop('value')
  const expected = 'Random Initial Title'

  assert.equal(actual, expected)
})

test('JournalForm > TitleField | if initial value is provided, it should still be emptiable', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
    }),
  }

  const wrapper = setup({ props })
  const getField = () => wrapper.find('.journal-form-title-field')
  const newEmptyVal = ''

  getField().simulate('change', null, newEmptyVal)

  const actual = getField().prop('value')

  assert.isNotOk(actual)
})

/**
 * TextContentField
 */

test('JournalForm > TextContentField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-text-content-field')

  const value = 'Sample Text Content'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('JournalForm > TextContentField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      textContent: 'Random Initial Text Content',
    }),
  }

  const textContentWrpr = setup({ props })
    .find('.journal-form-text-content-field')

  const actual = textContentWrpr.prop('value')
  const expected = 'Random Initial Text Content'

  assert.equal(actual, expected)
})

test('JournalForm > TextContentField | if initial value is provided, it should still be emptiable', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      textContent: 'Random Initial Text Content',
    }),
  }

  const wrapper = setup({ props })
  const getField = () => wrapper.find('.journal-form-text-content-field')
  const newEmptyVal = ''

  getField().simulate('change', null, newEmptyVal)

  const actual = getField().prop('value')

  assert.isNotOk(actual)
})

/**
 * Departure
 */

test('JournalForm > DepartureField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-departure-field')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('JournalForm > DepartureField | if HomecomingField is filled, it should have maxDate equal to HomecomingField\'s value', () => {
  const wrapper = setup()
  const getDepartureField = () => wrapper.find('.journal-form-departure-field')
  const getHomecomingField = () => wrapper.find('.journal-form-homecoming-field')

  const value = mockData.inOneDay
  getHomecomingField().simulate('change', null, value)

  const expected = value
  const actual = getDepartureField().prop('maxDate')

  assert.equal(actual, expected)
})

test('JournalForm > DepartureField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      departure: mockData.inOneDay,
    }),
  }
  const fieldWrpr = setup({ props }).find('.journal-form-departure-field')

  const actual = fieldWrpr.prop('value')
  const expected = mockData.inOneDay

  assert.deepEqual(actual, expected)
})

/**
 * Homecoming
 */

test('JournalForm > HomecomingField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-homecoming-field')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('JournalForm > HomecomingField | if DepartureField is filled, it should have minDate equal to DepartureField\'s value', () => {
  const wrapper = setup()
  const getHomecomingField = () => wrapper.find('.journal-form-homecoming-field')
  const getDepartureField = () => wrapper.find('.journal-form-departure-field')

  const value = mockData.inOneDay
  getDepartureField().simulate('change', null, value)

  const expected = value
  const actual = getHomecomingField().prop('minDate')

  assert.equal(actual, expected)
})

test('JournalForm > HomecomingField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      homecoming: mockData.inOneDay,
    }),
  }
  const fieldWrpr = setup({ props }).find('.journal-form-homecoming-field')

  const actual = fieldWrpr.prop('value')
  const expected = mockData.inOneDay

  assert.deepEqual(actual, expected)
})

/**
 * Delete
 */

test('JournalForm > DeleteBtn | if id is provided, it should the render a delete button', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
    }),
  }
  const deleteBtnWrpr = setup({ props })
    .find('.journal-form-delete-btn')

  const actual = deleteBtnWrpr.exists()

  assert.isTrue(actual)
})

test('JournalForm > DeleteBtn | if delete button is clicked, it should handleDelete with id', () => {
  const fakeHandleDelete = td.func()
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
    }),
    handleDelete: fakeHandleDelete,
  }
  const deleteBtnWrpr = setup({ props })
    .find('.journal-form-delete-btn')

  deleteBtnWrpr.simulate('click')

  td.verify(fakeHandleDelete('randomId'), { times: 1 })
})

test('JournalForm > DeleteBtn | if delete button is clicked, it should call history.push() with correct args', () => {
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
      .find('.journal-form-delete-btn')

    deleteBtnWrpr.simulate('click')

    const expectedArg = `/countries/${countryId}`

    td.verify(defProps.history.push(expectedArg), { times: 1 })
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

/**
 * onSubmit
 */

test('JournalForm > .onSubmit() | if form is valid, it should call handleSubmit() with trimmed data', () => {
  const values = {
    'title-field': '  Sample Spaceous Title  ',
    'text-content-field': `
      Sample Spaceous Text Content
    `,
    'departure-field': mockData.inOneDay,
    'homecoming-field': mockData.inTenDays,
  }
  const wrapper = setup()

  fillForm(values, wrapper)
  wrapper.find('form').simulate('submit', mockData.ev)

  const expectedArg = I.Map({
    title: 'Sample Spaceous Title',
    textContent: 'Sample Spaceous Text Content',
    departure: mockData.inOneDay,
    homecoming: mockData.inTenDays,
  })

  td.verify(defProps.handleSubmit(expectedArg), { times: 1 })
})

test('JournalForm > .onSubmit() | if form is valid and initial values were provided, it should call handleSubmit() with correct data including the id', () => {
  const testWithChangingSomeField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Title',
        homecoming: mockData.inOneDay,
      }),
    }
    const values = {
      'text-content-field': `
        Sample Spaceous Text Content
      `,
      'departure-field': mockData.inOneDay,
      'homecoming-field': mockData.inTenDays,
    }
    const wrapper = setup({ props })

    fillForm(values, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const expectedArg = I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
      textContent: 'Sample Spaceous Text Content',
      departure: mockData.inOneDay,
      homecoming: mockData.inTenDays,
    })

    td.verify(defProps.handleSubmit(expectedArg), { times: 1 })
  }

  const testWithChangingNoField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Title',
        homecoming: mockData.inOneDay,
      }),
    }
    const wrapper = setup({ props })

    wrapper.find('form').simulate('submit', mockData.ev)

    const expectedArg = I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
      homecoming: mockData.inOneDay,
    })

    td.verify(defProps.handleSubmit(expectedArg), { times: 1 })
  }

  const testWithEmptiyingAField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Title',
        textContent: `
          Sample Spaceous Text Content
        `,
        homecoming: mockData.inOneDay,
      }),
    }
    const wrapper = setup({ props })
    const values = {
      'text-content-field': '',
    }

    fillForm(values, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const expectedArg = I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
      homecoming: mockData.inOneDay,
      textContent: '',
    })

    td.verify(defProps.handleSubmit(expectedArg), { times: 1 })
  }

  testWithChangingSomeField()
  testWithChangingNoField()
  testWithEmptiyingAField()
})

test('JournalForm > .onSubmit() | if form is valid, it should call history.push() with correct args', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })

    fillForm({ 'title-field': 'Sample Journal Title' }, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const expectedArg = `/countries/${countryId}`

    td.verify(defProps.history.push(expectedArg), { times: 1 })
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

test.skip('JournalForm > PhotosField | ???')
test.skip('JournalForm > PhotosField > PhotoField | ???')
test.skip('JournalForm > PhotosField > DescriptionField | ???')
