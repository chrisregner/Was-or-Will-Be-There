import React from 'react'
import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import InsertPaperTransition from './InsertPaperTransition'

const defProps = {
  nth: 0,
  pathname: '',
  children: (<div />),
}

const setup = TU.makeTestSetup({
  Component: InsertPaperTransition,
  defaultProps: defProps,
})

test('components.InsertPaperTransition | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})
