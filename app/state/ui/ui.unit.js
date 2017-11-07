import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'
import Joi from 'joi-browser'

import * as fromPlans from 'state/plans'
import uiReducer, * as fromUi from './ui'

/**
 * Reducers
 */

test.skip('ui | it should return the correct default state')

test('ui.ADD_PLAN | it should work', () => {
  const initialState = I.Map({
    snackbar: {
      isVisible: false,
      message: '',
    },
  })
  const action = fromPlans.addPlan(I.Map())

  const actual = uiReducer(initialState, action).get('snackbar').toJS()
  const expected = Joi.object().keys({
    isVisible: Joi.any().only(true).required(),
    message: Joi.string().required(),
  })

  assert.isNull(expected.validate(actual).error)
})

test('ui.EDIT_PLAN | it should work', () => {
  const initialState = I.Map({
    snackbar: {
      isVisible: false,
      message: '',
    },
  })
  const action = fromPlans.editPlan(I.Map())

  const actual = uiReducer(initialState, action).get('snackbar').toJS()
  const expected = Joi.object().keys({
    isVisible: Joi.any().only(true).required(),
    message: Joi.string().required(),
  })

  assert.isNull(expected.validate(actual).error)
})

test('ui.DELETE_PLAN | it should work', () => {
  const initialState = I.Map({
    snackbar: {
      isVisible: false,
      message: '',
    },
  })
  const action = fromPlans.deletePlan('randomId')

  const actual = uiReducer(initialState, action).get('snackbar').toJS()
  const expected = Joi.object().keys({
    isVisible: Joi.any().only(true).required(),
    message: Joi.string().required(),
  })

  assert.isNull(expected.validate(actual).error)
})

test.skip('ui.ADD_JOURNAL | it should work')
test.skip('ui.EDIT_JOURNAL | it should work')
test.skip('ui.DELETE_JOURNAL | it should work')

test('ui.HIDE_SNACKBAR | it should work', () => {
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

test('ui.SET_PAPER_HEIGHT | it should work', () => {
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

test('ui.SET_GHOST_HEIGHT | it should work', () => {
  const tryAddingToEmptyHeights = () => {
    const initialState = I.fromJS({
      ghostHeights: {},
    })
    const action = fromUi.setGhostHeight('someGhost', 143)

    const actual = uiReducer(initialState, action).get('ghostHeights')
    const expected = I.Map({ someGhost: 143 })

    assert.isTrue(actual.equals(expected))
  }

  const tryAddingToNonEmptyHeights = () => {
    const initialState = I.fromJS({
      ghostHeights: {
        firstGhost: 111,
      },
    })
    const action = fromUi.setGhostHeight('secondGhost', 222)

    const actual = uiReducer(initialState, action)
    const expected = I.fromJS({
      ghostHeights: {
        firstGhost: 111,
        secondGhost: 222,
      },
    })

    assert.isTrue(actual.equals(expected))
  }

  const tryUpdatingAHeight = () => {
    const initialState = I.fromJS({
      ghostHeights: {
        someGhost: 666,
      },
    })
    const action = fromUi.setGhostHeight('someGhost', 143)

    const actual = uiReducer(initialState, action)
    const expected = I.fromJS({
      ghostHeights: {
        someGhost: 143,
      },
    })

    assert.isTrue(actual.equals(expected))
  }

  tryAddingToEmptyHeights()
  tryAddingToNonEmptyHeights()
  tryUpdatingAHeight()
})

test('ui.SET_REAL_ROUTE', () => {
  const tryUpdatingANull = () => {
    const initialState = I.fromJS({ realRoute: null })
    const action = fromUi.setRealRoute('new/route')

    const actual = uiReducer(initialState, action)
    const expected = I.Map({ realRoute: 'new/route' })

    assert.isTrue(actual.equals(expected))
  }

  const tryUpdatingAnOldRoute = () => {
    const initialState = I.fromJS({ realRoute: 'old/route' })
    const action = fromUi.setRealRoute('new/route')

    const actual = uiReducer(initialState, action)
    const expected = I.Map({ realRoute: 'new/route' })

    assert.isTrue(actual.equals(expected))
  }

  tryUpdatingANull()
  tryUpdatingAnOldRoute()
})

/**
 * Getters
 */

const { uiGetters } = fromUi

test('ui.getSnackbarInfo() | it should work', () => {
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

test('ui.getHighestHeight() | it should work', () => {
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

test('ui.getHighestGhostHeight() | it should work', () => {
  const state = I.fromJS({
    ghostHeights: {
      firstPaper: 0,
      secondPaper: 999,
      thirdPaper: 143,
    },
  })

  const actual = uiGetters.getHighestGhostHeight(state)
  const expected = 999

  assert.equal(actual, expected)
})

test('ui.isRouteCurrent() | when passed route is current, it should return true', () => {
  const state = I.fromJS({
    realRoute: 'current/route',
  })

  const actual = uiGetters.isRouteCurrent(state, 'current/route')

  assert.isTrue(actual)
})

test('ui.isRouteCurrent() | when passed route is NOT current, it should return false', () => {
  const state = I.fromJS({
    realRoute: 'current/route',
  })

  const actual = uiGetters.isRouteCurrent(state, 'not-current/route')

  assert.isFalse(actual)
})
