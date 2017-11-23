import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'

import uiReducer, * as fromUi from './ui'

/**
 * Reducers
 */

test.skip('state.ui | it should return the correct default state')

test('state.ui.SET_SNACKBAR | it should work when there is initial snackbar', () => {
  const action = fromUi.setSnackbar('Some new snackbar message')
  const initialState = I.fromJS({
    snackbar: {
      isVisible: true,
      message: 'Some initial snackbar message',
    },
  })

  const actual = uiReducer(initialState, action).get('snackbar')
  const expected = I.Map({
    isVisible: true,
    message: 'Some new snackbar message',
  })

  assert.isTrue(actual.equals(expected))
})

test('state.ui.SET_SNACKBAR | it should work when there is NO initial snackbar', () => {
  const action = fromUi.setSnackbar('Some new snackbar message')

  const actual = uiReducer(undefined, action).get('snackbar')
  const expected = I.Map({
    isVisible: true,
    message: 'Some new snackbar message',
  })

  assert.isTrue(actual.equals(expected))
})

test('state.ui.HIDE_SNACKBAR | it should work', () => {
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

  assert.isTrue(actual.equals(expected))
})

test('state.ui.SET_NOT_FOUND | it should work with initial state', () => {
  const initialState = I.Map({ notFound: '/old/not/found/route' })
  const action = fromUi.setNotFound('/new/not/found/route')

  const actual = uiReducer(initialState, action).get('notFound')
  const expected = '/new/not/found/route'

  assert.equal(actual, expected)
})

test('state.ui.SET_NOT_FOUND | it should work with NO initial state', () => {
  const action = fromUi.setNotFound('/not/found/route')

  const actual = uiReducer(undefined, action).get('notFound')
  const expected = '/not/found/route'

  assert.equal(actual, expected)
})

/**
 * Getters
 */

const { uiGetters } = fromUi

test('state.ui.getSnackbarInfo() | it should work', () => {
  const state = I.Map({
    snackbar: {
      isVisible: true,
      message: 'All hail Cthulhu!',
    },
  })

  const actual = uiGetters.getSnackbarInfo(state)
  const expected = state.get('snackbar')

  assert.equal(actual, expected)
})

test('state.ui.isPathNotFound() | when passed route is equal to the not-found route in state, it should return true', () => {
  const state = I.fromJS({
    notFound: '/not/found/route',
  })

  const actual = uiGetters.isPathNotFound(state, '/not/found/route')

  assert.isTrue(actual)
})

test('state.ui.isPathNotFound() | when passed route is NOT equal to the not-found route in state, it should return false', () => {
  const state = I.fromJS({
    notFound: '/not/found/route',
  })

  const actual = uiGetters.isPathNotFound(state, '/wrong/route')

  assert.isFalse(actual)
})
