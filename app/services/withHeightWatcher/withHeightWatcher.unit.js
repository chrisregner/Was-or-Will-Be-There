import test from 'tape'
import React from 'react'
import td from 'testdouble'
import ResizeDetector from 'react-resize-detector'

import * as tu from 'services/testUtils'
import withHeightWatcher from './withHeightWatcher'

const SomeCmpt = () => (<div/>)
const HeightWatcher = withHeightWatcher(SomeCmpt, 'SomeCmpt')
const defProps = {
  store: {
    getState: () => {},
    dispatch: () => {},
  },
}

const setup = tu.makeTestSetup({
  Component: HeightWatcher,
  defaultProps: defProps,
})

test('withHeightWatcher() | it should wrap passed component', t => {
  const wrapper = setup()//.dive() // dive thru connect() HOC
  const passedCmptWrpr = wrapper.dive().find(SomeCmpt)

  const actual = passedCmptWrpr.exists()

  t.is(actual, true)
  t.end()
})

test('HeightWatcher | it should have a wrapped displayName', t => {
  const actual = HeightWatcher.displayName
  const expected = 'Connect(WithHeightWatcher(SomeCmpt))'

  t.is(actual, expected)
  t.end()
})

/*
set on mount
onResize, if changed, set
onResize, if NOT changed, do NOT set
 */

// test('HeightWatcher > ResizeDetector.onResize() | it should call setPaperHeight() on resize with correct arg???', t => {
//   const wrapper = setup().dive() // dive thru connect() HOC
//   const getResizeDetectorWrpr = () => wrapper.find(ResizeDetector)
//   const setPaperHeight = td.func()

//   // replace setPaperHeight with test double
//   wrapper.setProps({ setPaperHeight })

//   // simulate resize
//   getResizeDetectorWrpr().prop('onResize')(undefined, 143)

//   td.verify(setPaperHeight(143), { times: 1 })
//   t.end()
// })
