import test from 'tape'
import React from 'react'

import * as tu from 'services/testUtils'
import { BarePaperWithHeight as PaperWithHeight } from './PaperWithHeight'

const defProps = { height: 0 }

const setup = tu.makeTestSetup({
  Component: PaperWithHeight,
  defaultProps: defProps,
})

test('PaperWithHeight | it should render without error', t => {
  const wrapper = setup()

  const actual = wrapper.exists()
  const expected = true

  t.is(actual, true)
  t.end()
})

test('PaperWithHeight | it should use the height prop as style', t => {
  const props = { height: 143 }
  const wrapper = setup({ props })

  const actual = wrapper.prop('style')
  const expected = props

  t.deepEqual(actual, expected)
  t.end()
})

test('PaperWithHeight | it should render its children', t => {
  const childNode = <div id='foo'>Bar</div>
  const wrapper = setup({ childNode })

  const actual = wrapper.contains(childNode)
  const expected = true

  t.is(actual, expected)
  t.end()
})
