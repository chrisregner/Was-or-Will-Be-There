import * as R from 'ramda'

export const trimIfString = arg =>
  typeof arg === 'string'
    ? R.trim(arg)
    : arg

export const makePropNegator = (...keys) => obj =>
  R.mapObjIndexed(
    (v, k) => keys.includes(k) ? !v : v,
    obj,
  )

export const isObjSubset = (superset, subset) =>
  !Object.entries(subset)
    .find(([k, v]) => !superset[k] || superset[k] !== v)

// export const switchVals = (cases) => (theCase) => cases[theCase] || null
// export const switchFuncs = (cases) => (theCase) => (...args) =>
//   cases[theCase]
//     ? cases[theCase](...args)
//     : null
