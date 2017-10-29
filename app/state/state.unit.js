import test from 'tape'
import td from 'testdouble'
import * as I from 'immutable'

import { gettersShell } from './state'

const deps = {
  uiGetters: {
    getHightestPaperHeight: td.func()
  }
}

const setup = () => {
  td.reset()
}

/**
 * Getters
 */

const { uiGetters } = gettersShell(deps)

test('state.getHightestPaperHeight | it should return the ', t => {
  setup()

  const expectedArg = 'expected result for getHightestPaperHeight()'
  const expectedRes = 'expected result of getHightestPaperHeight()'
  const passedState = I.Map({
    ui: expectedArg
  })

  td.when(deps.uiGetters.getHightestPaperHeight(expectedArg))
    .thenReturn(expectedRes)

  const actual = uiGetters.getHightestPaperHeight(passedState)
  const expected = expectedRes

  t.is(actual, expected)
  t.end()
})
