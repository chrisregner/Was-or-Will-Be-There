import * as R from 'ramda'

export const smartMergeDeep = (theDefault, source) =>
  source
    ? R.mergeDeepRight(theDefault, source)
    : theDefault

export const trimIfString = (arg) =>
  typeof arg === 'string'
    ? R.trim(arg)
    : arg

// export const switchVals = (cases) => (theCase) => cases[theCase] || null
// export const switchFuncs = (cases) => (theCase) => (...args) =>
//   cases[theCase]
//     ? cases[theCase](...args)
//     : null
