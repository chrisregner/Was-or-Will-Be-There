import test from 'tape'
import React from 'react'
import td from 'testdouble'
import ResizeDetector from 'react-resize-detector'

import * as tu from 'services/testUtils'
import withHeightWatcher from './withHeightWatcher'

const SomeCmpt = () => (<div />)
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

test.skip('withHeightWatcher() | it should wrap passed component', (t) => {
  const wrapper = setup()// .dive() // dive thru connect() HOC
  const passedCmptWrpr = wrapper.dive().find(SomeCmpt)

  const actual = passedCmptWrpr.exists()

  t.is(actual, true)
  t.end()
})

test.skip('HeightWatcher | it should pass the props to wrapped component')

test.skip('HeightWatcher | it should have a wrapped displayName', (t) => {
  const actual = HeightWatcher.displayName
  const expected = 'Connect(WithHeightWatcher(SomeCmpt))'

  t.is(actual, expected)
  t.end()
})

test.skip('HeightWatcher > ResizeDetector | When mounted, it should call setPaperHeight() with correct arg')
test.skip('HeightWatcher > ResizeDetector | When will unmount, it should call setPaperHeight() with zero')

test.skip('HeightWatcher > ResizeDetector | When resized, it should call setPaperHeight() with correct arg', (t) => {
  const wrapper = setup().dive() // Dive thru connect() HOC
  const getResizeDetectorWrpr = () => wrapper.find(ResizeDetector)
  const setPaperHeight = td.func()

  wrapper.setProps({ setPaperHeight }) // Replace setPaperHeight with test double
  getResizeDetectorWrpr().prop('onResize')(undefined, 143) // Simulate resize

  td.verify(setPaperHeight(143), { times: 1 })
  t.end()
})
