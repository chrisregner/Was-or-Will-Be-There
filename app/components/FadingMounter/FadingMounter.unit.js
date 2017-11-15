import React from 'react'
import { test } from 'mocha'
import { assert } from 'chai'
import lolex from 'lolex'

import * as TU from 'services/testUtils'
import FadingMounter, { duration } from './FadingMounter'

const SampleCmpt = () => (<div />)
const defProps = {
  isVisible: true,
  component: SampleCmpt,
}

const setup = TU.makeTestSetup({
  Component: FadingMounter,
  defaultProps: defProps
})

test('components.FadingMounter | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('components.FadingMounter | when mounted with isVisible set to true, it should render the component', () => {
  const actual = setup().find(SampleCmpt).length
  const expected = 1
  assert.equal(actual, expected)
})

test('components.FadingMounter | when mounted with isVisible set to true, it should have the correct fading in class', () => {
  const actual = setup().prop('className').split(' ')
  const expected = 'fadeIn'
  assert.include(actual, expected)
})

test('components.FadingMounter | when mounted with isVisible set to false, it should NOT render the component', () => {
  const props = { isVisible: false }
  const actual = setup({ props }).find(SampleCmpt).length
  const expected = 0
  assert.equal(actual, expected)
})

test('components.FadingMounter | when isVisible is changed to true, it should render the component', () => {
  const props = { isVisible: false }
  const actual = setup({ props }).setProps({ isVisible: true }).find(SampleCmpt).length
  const expected = 1
  assert.equal(actual, expected)
})

test('components.FadingMounter | when isVisible is changed to true, it should have the correct fading in class', () => {
  const props = { isVisible: false }
  const actual = setup({ props }).setProps({ isVisible: true }).prop('className').split(' ')
  const expected = 'fadeIn'
  assert.include(actual, expected)
})

test('components.FadingMounter | when isVisible is changed to true, it should NOT have the fading out class', () => {
  const props = { isVisible: false }
  const actual = setup({ props }).setProps({ isVisible: true }).prop('className').split(' ')
  const notExpected = 'fadeOut'
  assert.notInclude(actual, notExpected)
})

test('components.FadingMounter | when isVisible is changed to false, it should have the correct fading out class', () => {
  const actual = setup().setProps({ isVisible: false }).prop('className').split(' ')
  const expected = 'fadeOut'
  assert.include(actual, expected)
})

test('components.FadingMounter | when isVisible is changed to false, it should NOT have the fading in class', () => {
  const actual = setup().setProps({ isVisible: false }).prop('className').split(' ')
  const notExpected = 'fadeIn'
  assert.notInclude(actual, notExpected)
})

test('components.FadingMounter | when isVisible is changed to false, it should render the component until the set duration', () => {
  const fakeClock = lolex.install()
  const wrapper = setup().setProps({ isVisible: false })

  let actual = wrapper.find(SampleCmpt).length
  let expected = 1
  assert.equal(actual, expected)

  fakeClock.tick(duration / 2)
  actual = wrapper.find(SampleCmpt).length
  expected = 1
  assert.equal(actual, expected)

  fakeClock.tick((duration / 2) - 50)
  actual = wrapper.find(SampleCmpt).length
  expected = 1
  assert.equal(actual, expected)

  fakeClock.tick(100)
  actual = wrapper.update().find(SampleCmpt).length
  expected = 0
  assert.equal(actual, expected)

  fakeClock.uninstall()
})
