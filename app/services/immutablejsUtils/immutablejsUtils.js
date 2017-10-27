import * as R from 'ramda'

export const smartMergeDeep = (theDefault, source) =>
  source
    ? R.mergeDeepRight(theDefault, source)
    : theDefault
