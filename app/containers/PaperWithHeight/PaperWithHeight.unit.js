import { test } from 'mocha'
import { assert } from 'chai'
import React from 'react'

import * as TU from 'services/testUtils'
import { BarePaperWithHeight as PaperWithHeight } from './PaperWithHeight'

const defProps = { height: 0 }

const setup = TU.makeTestSetup({
  Component: PaperWithHeight,
  defaultProps: defProps,
})

test('PaperWithHeight | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('PaperWithHeight | it should use the height prop as style', () => {
  const props = { height: 143 }
  const wrapper = setup({ props })

  const actual = wrapper.prop('style')
  const expected = props

  assert.deepEqual(actual, expected)
})

test('PaperWithHeight | it should render its children', () => {
  const childNode = <div id='foo'>Bar</div>
  const wrapper = setup({ childNode })

  const actual = wrapper.contains(childNode)

  assert.isTrue(actual)
})
