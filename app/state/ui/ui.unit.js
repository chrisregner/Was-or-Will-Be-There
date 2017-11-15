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

test('state.ui.SET_PAPER_HEIGHT | it should work', () => {
  const tryAddingToEmptyHeights = () => {
    const initialState = I.fromJS({
      paperHeights: {},
    })
    const action = fromUi.setPaperHeight('somePaper', 143)

    const actual = uiReducer(initialState, action).get('paperHeights')
    const expected = I.Map({ somePaper: 143 })

    assert.isTrue(actual.equals(expected))
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

    assert.isTrue(actual.equals(expected))
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

    assert.isTrue(actual.equals(expected))
  }

  tryAddingToEmptyHeights()
  tryAddingToNonEmptyHeights()
  tryUpdatingAHeight()
})

test('state.ui.REMOVE_PAPER_HEIGHT | it should work', () => {
  const tryRemovingTheLastHeight = () => {
    const initialState = I.fromJS({
      paperHeights: {
        somePaper: 666,
      },
    })
    const action = fromUi.removePaperHeight('somePaper')

    const actual = uiReducer(initialState, action).get('paperHeights')
    const expected = I.Map()

    assert.isTrue(actual.equals(expected))
  }

  const tryRemovingOneOfTheHeights = () => {
    const initialState = I.fromJS({
      paperHeights: {
        firstPaper: 111,
        secondPaper: 222,
        thirdPaper: 333,
      },
    })
    const action = fromUi.removePaperHeight('secondPaper')

    const actual = uiReducer(initialState, action)
    const expected = I.fromJS({
      paperHeights: {
        firstPaper: 111,
        thirdPaper: 333,
      },
    })

    assert.isTrue(actual.equals(expected))
  }

  tryRemovingTheLastHeight()
  tryRemovingOneOfTheHeights()
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

test('state.ui.getHighestHeight() | it should work', () => {
  const state = I.fromJS({
    paperHeights: {
      firstPaper: 0,
      secondPaper: 999,
      thirdPaper: 143,
    },
  })

  const actual = uiGetters.getHighestHeight(state)
  const expected = 999

  assert.equal(actual, expected)
})

test('state.ui.getHeightByComponentName() | it should work', () => {
  const state = I.fromJS({
    paperHeights: {
      firstPaper: 0,
      secondPaper: 143,
      thirdPaper: 999,
    },
  })

  const actual = uiGetters.getHeightByComponentName(state, 'secondPaper')
  const expected = 143

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
