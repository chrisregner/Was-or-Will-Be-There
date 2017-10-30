import test from 'tape'
import I from 'immutable'
import Joi from 'joi-browser'

import * as fromPlans from 'state/plans'
import uiReducer, * as fromUi from './ui'

/**
 * Reducers
 */

test.skip('ui | it should return the correct default state')

test('ui.ADD_PLAN | it should work', (t) => {
  const initialState = I.Map({ snackbar: null })
  const action = fromPlans.addPlan(I.Map())

  const actual = uiReducer(initialState, action).get('snackbar').toJS()
  const expected = Joi.object().keys({
    isVisible: Joi.any().only(true).required(),
    message: Joi.string().required(),
  })

  t.is(expected.validate(actual).error, null)
  t.end()
})

test('ui.HIDE_SNACKBAR | it should work', (t) => {
  const action = fromUi.hideSnackbar()
  const initialState = I.fromJS({
    snackbar: {
      isVisible: true,
      message: 'Some message',
    },
  })

  const actual = uiReducer(initialState, action).get('snackbar')
  const expected = I.Map({
    isVisible: false,
    message: 'Some message',
  })

  t.is(actual.equals(expected), true)
  t.end()
})

test('ui.SET_PAPER_HEIGHT | it should work', (t) => {
  const tryAddingToEmptyHeights = () => {
    const initialState = I.fromJS({
      paperHeights: {},
    })
    const action = fromUi.setPaperHeight('somePaper', 143)

    const actual = uiReducer(initialState, action).get('paperHeights')
    const expected = I.Map({ somePaper: 143 })

    t.is(actual.equals(expected), true)
  }

  const tryAddingToNonEmptyHeights = () => {
    const initialState = I.fromJS({
      paperHeights: {
        firstPaper: 111,
      },
    })
    const action = fromUi.setPaperHeight('secondPaper', 222)

    const actual = uiReducer(initialState, action)
    const expected = I.fromJS({
      paperHeights: {
        firstPaper: 111,
        secondPaper: 222,
      },
    })

    t.is(actual.equals(expected), true)
  }

  const tryUpdatingAHeight = () => {
    const initialState = I.fromJS({
      paperHeights: {
        somePaper: 666,
      },
    })
    const action = fromUi.setPaperHeight('somePaper', 143)

    const actual = uiReducer(initialState, action)
    const expected = I.fromJS({
      paperHeights: {
        somePaper: 143,
      },
    })

    t.is(actual.equals(expected), true)
  }

  t.plan(3)
  tryAddingToEmptyHeights()
  tryAddingToNonEmptyHeights()
  tryUpdatingAHeight()
})

test('ui.SET_REAL_ROUTE', (t) => {
  const tryUpdatingANull = () => {
    const initialState = I.fromJS({ realRoute: null })
    const action = fromUi.setRealRoute('new/route')

    const actual = uiReducer(initialState, action)
    const expected = I.Map({ realRoute: 'new/route' })

    t.is(actual.equals(expected), true)
  }

  const tryUpdatingAnOldRoute = () => {
    const initialState = I.fromJS({ realRoute: 'old/route' })
    const action = fromUi.setRealRoute('new/route')

    const actual = uiReducer(initialState, action)
    const expected = I.Map({ realRoute: 'new/route' })

    t.is(actual.equals(expected), true)
  }

  t.plan(2)
  tryUpdatingANull()
  tryUpdatingAnOldRoute()
})

/**
 * Getters
 */

const { uiGetters } = fromUi

test('ui.getSnackbarInfo() | it should work', (t) => {
  const state = I.Map({
    snackbar: {
      isVisible: true,
      message: 'All hail Cthulhu!',
    },
  })

  const actual = uiGetters.getSnackbarInfo(state)
  const expected = state.get('snackbar')

  t.is(actual, expected)
  t.end()
})

test('ui.getHighestHeight() | it should work', (t) => {
  const state = I.fromJS({
    paperHeights: {
      firstPaper: 0,
      secondPaper: 999,
      thirdPaper: 143,
    },
  })

  const actual = uiGetters.getHighestHeight(state)
  const expected = 999

  t.is(actual, expected)
  t.end()
})

test('ui.isRouteCurrent() | when passed route is current, it should return true', (t) => {
  const state = I.fromJS({
    realRoute: 'current/route',
  })

  const actual = uiGetters.isRouteCurrent(state, 'current/route')
  const expected = true

  t.is(actual, expected)
  t.end()
})

test('ui.isRouteCurrent() | when passed route is NOT current, it should return false', (t) => {
  const state = I.fromJS({
    realRoute: 'current/route',
  })

  const actual = uiGetters.isRouteCurrent(state, 'not-current/route')
  const expected = false

  t.is(actual, expected)
  t.end()
})
