import * as R from 'ramda'

const isObject = arg => typeof arg === 'object'

const recursiveSmartMergeDeep = (theDefault, source) =>
  Object.entries(source)
    .reduce((newObj, [k, v]) => {
      if (!newObj[k])
        newObj[k] = v
      else if (
        typeof v.isImmutable === 'function' &&
        typeof newObj[k].isImmutable === 'function' &&
        v.isImmutable() &&
        newObj[k].isImmutable()
      )
        newObj[k] = recursiveSmartMergeDeep(newObj[k], v)
      else if (isObject(v) && isObject(newObj[k]))
        newObj[k] = recursiveSmartMergeDeep(newObj[k], v)
      else
        newObj[k] = v

      return newObj
    }, R.clone(theDefault))

export const smartMergeDeep = (theDefault, source) =>
  source
    ? recursiveSmartMergeDeep(theDefault, source)
    : theDefault
