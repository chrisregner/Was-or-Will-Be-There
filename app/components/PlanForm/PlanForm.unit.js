import test from 'tape'
import td from 'testdouble'
import I from 'immutable'
import D from 'date-fp'

import * as Tu from 'services/testUtils'

import { BarePlanForm as PlanForm } from './PlanForm'

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
  }
})

const fillForm = (values, wrapper) => {
  Object.entries(values).forEach(entry => {
    const getField = () => wrapper.find(`[data-name='${entry[0]}']`)

    getField().simulate('change', mockData.ev, entry[1])
  })
}

/**
 * Self
 */

test('PlanForm | it should render without error', t => {
  const wrapper = setup()
  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})

test('PlanForm | it should render CountyName with correct props', t => {
  const testWithVar = countryId => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })
    const countryNameWrpr = wrapper.find('[data-name="CountryName"]')

    const actual = countryNameWrpr.prop('countryId')
    const expected = countryId

    t.is(actual, expected)
  }

  t.plan(3)
  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

test('PlanForm | it should render the correct country flag', t => {
  const testWithVar = countryId => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })
    const countryFlagWrpr = wrapper.find(`[src="https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/${countryId}.svg"]`)

    const actual = countryFlagWrpr.exists()
    const expected = true

    t.is(actual, expected)
  }

  t.plan(3)
  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

// test('PlanForm | when mounted, it should call setPaperHeight() with correct arg', t => {
//   setup({ useMount: true })

//   t.doesNotThrow(() => {
//     td.verify(
//       defProps.setPaperHeight(0), // Enzyme sets to the DOM>offsetHeight to 0
//       { times: 1 }
//     )
//   })
//   t.end()
// })

// test('PlanForm | when mounted, it should add updatePaperHeight() to resize event listeners', t => {
//   let fakeAddEventListener
//   const wrapper = setup({
//     hooks: {
//       beforeRender: () => {
//         fakeAddEventListener = td.replace(window, 'addEventListener')
//       }
//     },
//     useMount: true
//   })
//   const updatePaperHeight = wrapper.instance().updatePaperHeight

//   t.doesNotThrow(() => {
//     td.verify(
//       fakeAddEventListener('resize', updatePaperHeight),
//       { times: 1 }
//     )
//   })
//   t.end()
// })

// test('PlanForm | when updated and the height has changed, it should call setPaperHeight() with correct arg', t => {
//   const wrapper = setup({ useMount: true })

//   wrapper.instance().rootEl = { offsetHeight: 143 }
//   wrapper.instance().componentDidUpdate()

//   t.doesNotThrow(() => {
//     td.verify(
//       defProps.setPaperHeight(143),
//       { times: 1 }
//     )

//     td.verify(
//       defProps.setPaperHeight(),
//       { times: 2, ignoreExtraArgs: true } // once on mount + once on update = 2 calls
//     )
//   })
//   t.end()
// })

// test('PlanForm | when updated and the height has NOT changed, it should NOT call setPaperHeight()', t => {
//   const wrapper = setup({ useMount: true })

//   wrapper.instance().componentDidUpdate()

//   t.doesNotThrow(() => {
//     td.verify(
//       defProps.setPaperHeight(),
//       { times: 1, ignoreExtraArgs: true } // once on mount = 1 call
//     )
//   })
//   t.end()
// })

// test('PlanForm | when unmounted, it should call setPaperHeight() with zero', t => {
//   const wrapper = setup({ useMount: true })

//   wrapper.unmount()

//   t.doesNotThrow(() => {
//     td.verify(
//       defProps.setPaperHeight(0),
//       { times: 2 } // once on mount + once on unmount = 2 calls
//     )

//     td.verify(
//       defProps.setPaperHeight(),
//       { times: 2, ignoreExtraArgs: true } // once on mount + once on unmount = 2 calls
//     )
//   })
//   t.end()
// })

// test('PlanForm | when unmounted, it should remove the updatePaperHeight() from resize event listeners', t => {
//   let fakeRemoveEventListener
//   const wrapper = setup({
//     hooks: {
//       beforeRender: () => {
//         fakeRemoveEventListener = td.replace(window, 'removeEventListener')
//       }
//     },
//     useMount: true
//   })
//   const updatePaperHeight = wrapper.instance().updatePaperHeight

//   wrapper.unmount()

//   t.doesNotThrow(() => {
//     td.verify(
//       fakeRemoveEventListener('resize', updatePaperHeight),
//       { times: 1 }
//     )
//   })
//   t.end()
// })

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
  t.end()
})

test('PlanForm > PlanNameField | if changed to blank, it should show error', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="PlanNameField"]')

  getField().simulate('change', null, '')

  const actual = getField().prop('errorText')

  t.ok(actual)
  t.end()
})

test('PlanForm > PlanNameField | if NOT filled and submitted, it should NOT call handleSubmit()', t => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  td.verify(defProps.handleSubmit(), { times: 0, ignoreExtraArgs: true })
  t.end()
})

test('PlanForm > PlanNameField | if NOT filled and submitted, it should show error', t => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  const getField = () => wrapper.find('[data-name="PlanNameField"]')
  const actual = getField().prop('errorText')

  t.ok(actual)
  t.end()
})

test.skip('PlanNameField | it should accept initial value', t => {})
test.skip('PlanNameField | if initial value is provided, it should still be emptiable', t => {})

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
  t.end()
})

test.skip('NotesField | it should accept initial value', t => {})
test.skip('NotesField | if initial value is provided, it should still be emptiable', t => {})

/**
 * Departure
 */

test('PlanForm > DepartureField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
  t.end()
})

test('PlanForm > DepartureField | if HomecomingField is filled, it should have maxDate equal to HomecomingField\'s value', t => {
  const wrapper = setup()
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mockData.inOneDay
  getHomecomingField().simulate('change', null, value)

  const expected = value
  const actual = getDepartureField().prop('maxDate')

  t.is(expected, actual)
  t.end()
})

test.skip('DepartureField | it should accept initial value', t => {})
test.skip('DepartureField | if initial value is provided, it should still be emptiable', t => {})

/**
 * Homecoming
 */

test('PlanForm > HomecomingField | it should work', t => {
  const wrapper = setup()
  const getField = () => wrapper.find('[data-name="HomecomingField"]')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  t.is(expected, actual)
  t.end()
})

test('PlanForm > HomecomingField | if DepartureField is filled, it should have minDate equal to DepartureField\'s value', t => {
  const wrapper = setup()
  const getHomecomingField = () => wrapper.find('[data-name="HomecomingField"]')
  const getDepartureField = () => wrapper.find('[data-name="DepartureField"]')

  const value = mockData.inOneDay
  getDepartureField().simulate('change', null, value)

  const expected = value
  const actual = getHomecomingField().prop('minDate')

  t.is(expected, actual)
  t.end()
})

test.skip('HomecomingField | it should accept initial value', t => {})
test.skip('HomecomingField | if initial value is provided, it should still be emptiable', t => {})

/**
 * OnSubmit
 */

test('PlanForm > .OnSubmit() | if form is valid, it should call handleSubmit() with trimmed data', t => {
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
  t.end()
})

test('PlanForm > .OnSubmit() | if form is valid, it should call history.push() with correct args', t => {
  const testWithVar = countryId => {
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
  t.end()
})
