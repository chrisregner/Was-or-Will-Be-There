import test from 'tape'

import * as immutablejsUtils from './immutablejsUtils'

/**
 * smartMergeDeep()
 */

const { smartMergeDeep } = immutablejsUtils

test('immutablejsUtils.smartMergeDeep() | if the second arg is undefined, it should return the first arg', t => {
  const firstArg = 'first arg'
  const actual = smartMergeDeep(firstArg)
  const expected = firstArg

  t.is(actual, expected)
  t.end()
})

test('immutablejsUtils.smartMergeDeep() | it should deep merge reqular objects', t => {
  const firstObj = {
    a: 'a',
    b: {
      c: 'c',
    },
    d: 'd',
  }
  const secondObj = {
    d: 4,
    b: {
      c: 3,
      e: 5,
    },
  }
  const actual = smartMergeDeep(firstObj, secondObj)
  const expected = {
    a: 'a',
    b: {
      c: 3,
      e: 5,
    },
    d: 4,
  }

  t.deepEqual(actual, expected)
  t.end()
})
