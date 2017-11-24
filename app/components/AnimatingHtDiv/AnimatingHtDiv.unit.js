import React from 'react'
import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import AnimatingHtDiv from './AnimatingHtDiv'

const defProps = {
  children: (<div />)
}
const setup = TU.makeTestSetup({
  Component: AnimatingHtDiv,
  defaultProps: defProps
})

test('components.AnimatingHtDiv | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})
