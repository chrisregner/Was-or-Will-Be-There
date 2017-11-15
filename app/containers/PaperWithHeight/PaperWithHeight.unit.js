import { test } from 'mocha'
import { assert } from 'chai'
import React from 'react'

import * as TU from 'services/testUtils'
import { BarePaperWithHeight as PaperWithHeight } from './PaperWithHeight'

const defProps = {
  height: 0,
}

const setup = TU.makeTestSetup({
  Component: PaperWithHeight,
  defaultProps: defProps,
  tools: ['mui'],
  defaultEnzymeOpts: {
    disableLifecycleMethods: true,
  },
})

test('containers.PaperWithHeight | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('containers.PaperWithHeight > Paper | when mounted, its height should be the sum of children wrapper\'s and props height', () => {
  const props = { height: 1000 }
  const wrapper = setup({ useMount: true, props })

  wrapper.instance().childrenWrapperEl = { offsetHeight: 143 }
  wrapper.instance().componentDidMount()
  wrapper.update()

  const actual = wrapper
    .find('.paper-with-height-paper')
    .at(0) // index 0 is the Paper cmpt, while index 1 is the div that Paper cmpt creates
    .prop('style')
    .height
  const expected = 1143

  assert.equal(actual, expected)
})

test('containers.PaperWithHeight > Paper | when resized, its height should be the sum of children wrapper\'s and props height', () => {
  const props = { height: 1000 }
  const wrapper = setup({ props })
  const resizeFn = wrapper
    .find('.paper-with-height-children-wrapper-resize-detector')
    .prop('onResize')

  resizeFn(null, 1143)
  wrapper.update()

  const actual = wrapper
    .find('.paper-with-height-paper')
    .at(0) // index 0 is the Paper cmpt, while index 1 is the div that Paper cmpt creates
    .prop('style')
    .height
  const expected = 2143

  assert.equal(actual, expected)
})

test('containers.PaperWithHeight | it should render its children', () => {
  const childNode = <div id='foo'>Bar</div>
  const wrapper = setup({ childNode })

  const actual = wrapper.contains(childNode)

  assert.isTrue(actual)
})
