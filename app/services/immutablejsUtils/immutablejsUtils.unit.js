import { test } from 'mocha'
import { assert } from 'chai'
import * as I from 'immutable'

import * as immutablejsUtils from './immutablejsUtils'

/**
 * smartMergeDeep()
 */

const { smartMergeDeep } = immutablejsUtils

test('services.immutablejsUtils.smartMergeDeep() | if the second arg is undefined, it should return the first arg', () => {
  const firstArg = 'first arg'
  const actual = smartMergeDeep(firstArg)
  const expected = firstArg

  assert.equal(actual, expected)
})

test('services.immutablejsUtils.smartMergeDeep() | it should deep merge reqular objects', () => {
  const baseObj = {
    a: 'a',
    b: {
      c: 'c',
    },
    d: 'd',
  }
  const sourceObj = {
    d: 4,
    b: {
      c: 3,
      e: 5,
    },
  }
  const actual = smartMergeDeep(baseObj, sourceObj)
  const expected = {
    a: 'a',
    b: {
      c: 3,
      e: 5,
    },
    d: 4,
  }

  assert.deepEqual(actual, expected)
})

// NOTE: this asserts the actual and expected objects that are CONVERTED with Immutable.fromJS(),
//   INSTEAD of asserting their original ImmutableJS-and-native-JS hybrid object form
test('services.immutablejsUtils.smartMergeDeep() | if the source\'s and corresponding base\'s property is both Immutable data structure, it should mergeDeep it properly', () => {
  const baseObj = {
    a: 'a',
    b: {
      c: 'c',
    },
    d: 'd',
    e: I.fromJS({
      iA: 'iA',
      iB: {
        iC: 'iC',
      },
      iD: 'iD',
      iE: 'iE',
    }),
    f: 'f',
  }
  const sourceObj = {
    a: 1,
    b: {
      c: 3,
    },
    d: 'd',
    e: I.fromJS({
      iA: {
        iF: 16,
      },
      iB: {
        iC: 13,
      },
      iD: 14,
    }),
  }
  const actual = smartMergeDeep(baseObj, sourceObj)
  const expected = {
    a: 1,
    b: {
      c: 3,
    },
    d: 'd',
    e: I.fromJS({
      iA: {
        iF: 16,
      },
      iB: {
        iC: 13,
      },
      iD: 14,
      iE: 'iE',
    }),
    f: 'f',
  }

  assert.isTrue(I.fromJS(actual).equals(I.fromJS(expected)))
})

// NOTE: this asserts the actual and expected objects that are CONVERTED with Immutable.fromJS(),
//   INSTEAD of asserting their original ImmutableJS-and-native-JS hybrid object form
test('services.immutablejsUtils.smartMergeDeep() | if the source\'s and corresponding base\'s NESTED property both an Immutable data structure, it should mergeDeep it properly', () => {
  const baseObj = {
    a: 'a',
    b: {
      c: 'c',
    },
    d: 'd',
    e: {
      nestedE: I.fromJS({
        iA: 'iA',
        iB: {
          iC: 'iC',
        },
        iD: 'iD',
        iE: 'iE',
      }),
    },
    f: 'f',
  }
  const sourceObj = {
    a: 1,
    b: {
      c: 3,
    },
    d: 'd',
    e: {
      nestedE: I.fromJS({
        iA: {
          iF: 16,
        },
        iB: {
          iC: 13,
        },
        iD: 14,
      }),
    },
  }
  const actual = smartMergeDeep(baseObj, sourceObj)
  const expected = {
    a: 1,
    b: {
      c: 3,
    },
    d: 'd',
    e: {
      nestedE: I.fromJS({
        iA: {
          iF: 16,
        },
        iB: {
          iC: 13,
        },
        iD: 14,
        iE: 'iE',
      }),
    },
    f: 'f',
  }

  assert.isTrue(I.fromJS(actual).equals(I.fromJS(expected)))
})
