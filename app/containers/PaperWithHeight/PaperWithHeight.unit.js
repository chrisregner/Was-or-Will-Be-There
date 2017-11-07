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

test('containers.PaperWithHeight | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('containers.PaperWithHeight | it should use the height prop as height', () => {
  const props = { height: 143 }
  const wrapper = setup({ props })

  const actual = wrapper
    .find('.paper-with-height-paper')
    .prop('style')
    .height
  const expected = 143

  assert.equal(actual, expected)
})

test('containers.PaperWithHeight > ghost | it should use the ghostHeight as height', () => {
  const props = { ghostHeight: 666 }
  const wrapper = setup({ props })

  const actual = wrapper
    .find('.paper-with-height-ghost')
    .prop('style')
    .height
  const expected = 666

  assert.equal(actual, expected)
})

test('containers.PaperWithHeight | it should render its children', () => {
  const childNode = <div id='foo'>Bar</div>
  const wrapper = setup({ childNode })

  const actual = wrapper.contains(childNode)

  assert.isTrue(actual)
})
