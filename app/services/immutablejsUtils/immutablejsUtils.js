import * as R from 'ramda'
import I from 'immutable'

const isImmutable = (obj) => I.Iterable.isIterable(obj)
const isObject = arg => typeof arg === 'object'

const smartGet = (obj, k) =>
  typeof obj.get === 'function'
    ? obj.get(k)
    : obj[k]

const smartSet = (obj, k, v) => {
  if (typeof obj.set === 'function')
    return obj.set(k, v)

  obj[k] = v

  return obj
}

const recursiveSmartReducer = (newObj, v, k) =>
  (
    isImmutable(v) && isImmutable(smartGet(newObj, k)))
    || (isObject(v) && isObject(smartGet(newObj, k))
  )
    ? smartSet(newObj, k, smartMergeDeep(smartGet(newObj, k), v))
    : smartSet(newObj, k, v)

export const smartMergeDeep = (theDefault, source) => {
  if (source)
    return isImmutable(source)
      ? source.reduce(recursiveSmartReducer, theDefault)
      : Object.entries(source)
        .reduce((newObj, [k, v]) => recursiveSmartReducer(newObj, v, k), R.clone(theDefault))

  return theDefault
}
