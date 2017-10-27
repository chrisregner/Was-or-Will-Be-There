import test from 'tape'
import I from 'immutable'
import Joi from 'joi-browser'

import * as fromPlans from 'state/plans'
import uiReducer, * as fromUi from './ui'

const mocks = {
  initialState: I.Map({
    snackbar: null,
    paperHeights: I.Map({}),
  }),
}

test.skip('ui | it should return the correct default state')

test('ui.ADD_PLAN | it should work', t => {
  const action = fromPlans.addPlan()

  const actual = uiReducer(mocks.initialState, action).get('snackbar').toJS()
  const expected = Joi.object().keys({
    isVisible: Joi.any().only(true).required(),
    message: Joi.string().required(),
  })

  t.is(expected.validate(actual).error, null)
  t.end()
})

test('ui.HIDE_SNACKBAR | it should work', t => {
  const action = fromUi.hideSnackbar()
  const initialState = I.Map({
    snackbar: I.Map({
      isVisible: true,
      message: 'Some message',
    }),
  })

  const actual = uiReducer(initialState, action).get('snackbar')
  const expected = I.Map({
    isVisible: false,
    message: 'Some message',
  })

  t.is(actual.equals(expected), true)
  t.end()
})

test('ui.SET_PAPER_HEIGHT | it should work', t => {
  const tryAddingToEmptyHeights = () => {
    const action = fromUi.setPaperHeight('somePaper', 143)

    const actual = uiReducer(mocks.initialState, action).get('paperHeights')
    const expected = I.Map({ somePaper: 143 })

    t.is(actual.equals(expected), true)
  }

  const tryAddingToNonEmptyHeights = () => {
    const initialState = mocks.initialState.setIn(['paperHeights', 'firstPaper'], 111)
    const action = fromUi.setPaperHeight('secondPaper', 222)

    const actual = uiReducer(initialState, action).get('paperHeights')
    const expected = I.Map({
      firstPaper: 111,
      secondPaper: 222,
    })

    t.is(actual.equals(expected), true)
  }

  const tryUpdatingAHeight = () => {
    const initialState = mocks.initialState.setIn(['paperHeights', 'somePaper'], 666)
    const action = fromUi.setPaperHeight('somePaper', 143)

    const actual = uiReducer(initialState, action).get('paperHeights')
    const expected = I.Map({ somePaper: 143 })

    t.is(actual.equals(expected), true)
  }

  t.plan(3)
  tryAddingToEmptyHeights()
  tryAddingToNonEmptyHeights()
  tryUpdatingAHeight()
})
