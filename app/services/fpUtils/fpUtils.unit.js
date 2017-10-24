import test from 'ava'

import * as fpUtils from './fpUtils'

/**
 * smartMergeDeep()
 */

const { smartMergeDeep } = fpUtils

test('smartMergeDeep() | if the second arg is undefined, it should return the first arg', t => {
  const firstArg = 'first arg'
  const actual = smartMergeDeep(firstArg)
  const expected = firstArg

  t.is(actual, expected)
})

/**
 * trimIfString()
 */

const { trimIfString } = fpUtils

test('trimIfString() | if the arg is string, it should trim and return it', t => {
  const actual = trimIfString('   Spaceous String   ')
  const expected = 'Spaceous String'

  t.is(actual, expected)
})

test('smartMergeDeep() | it should deep merge reqular objects', t => {
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
    }
  }
  const actual = smartMergeDeep(firstObj, secondObj)
  const expected = {
    a: 'a',
    b: {
      c: 3,
      e: 5,
    },
    d: 4
  }

  t.deepEqual(actual, expected)
})

test('trimIfString() | if the arg is NOT string, it should just return it', t => {
  const testWithVar = (arg) => {
    const actual = trimIfString(arg)
    const expected = arg

    // if (typeof arg === 'object')
    //   t.deepEqual(actual, expected)
    // else
      t.is(actual, expected)
  }

  testWithVar(123)
  testWithVar({ foo: 'bar' })
  testWithVar(['a', 'b', 'c'])
})

/**
 * switchVals()
 */

// const { switchVals } = fpUtils
// const switchValsSharedTest1 = t => {
//   const myCases = {
//     foo: 'fooVal',
//     bar: 'barVal',
//   }
//   const switchMyCases = switchVals(myCases)
//   const res = switchMyCases('baz')

//   t.is(res, null)
// }

// test('switchVals() | when called with an object, it should return a function', switchValsSharedTest1)
// test('switchVals()::switchVals()() | when second arg is NOT one of the first arg\'s keys, it should return null', switchValsSharedTest1)

// test('switchVals()::switchVals()() | when second arg is one of the first arg\'s keys, it should return the first arg\'s value with that key', t => {
//   const myCases = {
//     foo: 'fooVal',
//     bar: 'barVal',
//   }
//   const switchMyCases = switchVals(myCases)
//   const res = switchMyCases('foo')

//   t.is(res, 'fooVal')
// })

/**
 * switchFuncs()
 */

// const { switchFuncs } = fpUtils
// const switchFuncsSharedTest1 = t => {
//   const myFuncs = {
//     foo: (arg) => (arg === 'fooArg') && 'fooRes',
//     bar: () => {},
//   }
//   const switchMyFuncs = switchFuncs(myFuncs)
//   const myFunc = switchMyFuncs('foo')
//   const res = myFunc('fooArg')

//   t.is(res, 'fooRes')
// }

// test('switchFuncs() | when called with an object, it should return a function', switchFuncsSharedTest1)
// test('switchFuncs()() | when called with a string, it should return a function', switchFuncsSharedTest1)
// test('switchFuncs()()() | when second arg is one of the first arg\'s keys, it should call the first arg\'s value, whose key matches the second arg, with the third arg', switchFuncsSharedTest1)
// test('switchFuncs()()() | when second arg is one of the first arg\'s keys, it return the result of the first arg\'s value, whose key matches the second arg, called with the third arg', switchFuncsSharedTest1)

// test('switchFuncs()::switchFuncs()()::switchFuncs()()() | when second arg is NOT one of the first arg\'s keys, it should return null', t => {
//   const myFuncs = {
//     foo: (arg) => (arg === 'fooArg') && 'fooRes',
//     bar: () => {},
//   }
//   const switchMyFuncs = switchFuncs(myFuncs)
//   const myFunc = switchMyFuncs('baz')
//   const res = myFunc('fooArg')

//   t.is(res, null)
// })
