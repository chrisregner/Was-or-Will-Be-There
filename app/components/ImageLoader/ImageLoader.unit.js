import React from 'react'
import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import ImageLoader from './ImageLoader'

const defProps = {
  loader: (<div id='defaultLoader' />),
  loaded: (<div id='defaultLoaded' />),
  src: '/default/src',
}

const setup = TU.makeTestSetup({
  Component: ImageLoader,
  defaultProps: defProps,
  defaultEnzymeOpts: { disableLifecycleMethods: true },
  tools: ['td'],
})

test('components.ImageLoader | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('components.ImageLoader | it should render the correct image initially', () => {
  const actual = setup().find('img').prop('src')
  const expected = '/default/src'
  assert.equal(actual, expected)
})

test('components.ImageLoader | it should NOT render the loaded node initially', () => {
  const actual = setup().find('#defaultLoaded').length
  const expected = 0
  assert.equal(actual, expected)
})

test('components.ImageLoader | if the image is NOT loaded yet after mount, it should render the loader', () => {
  const actual = setup({ useMount: true }).find('#defaultLoader').length
  const expected = 1
  assert.equal(actual, expected)
})

test('components.ImageLoader | if the image is already loaded after mount, it should NOT render the loader', () => {
  const wrapper = setup({ useMount: true })
  wrapper.instance().imgRef({ complete: true })
  wrapper.instance().componentDidMount()
  wrapper.update()

  const actual = wrapper.find('#defaultLoader').length
  const expected = 0
  assert.equal(actual, expected)
})

test('components.ImageLoader | if the image is already loaded after mount, it should render the loaded node', () => {
  const wrapper = setup({ useMount: true })
  wrapper.instance().imgRef({ complete: true })
  wrapper.instance().componentDidMount()
  wrapper.update()

  const actual = wrapper.find('#defaultLoaded').length
  const expected = 1
  assert.equal(actual, expected)
})

test('components.ImageLoader | if the image has loaded later, it should NOT the loader', () => {
  let loadCB
  const wrapper = setup()
  const catchLoadCB = (eventName, cb) => {
    if (eventName === 'load')
      loadCB = cb
  }

  wrapper.instance().imgRef({ addEventListener: catchLoadCB })
  wrapper.instance().componentDidMount()
  loadCB()
  wrapper.update()

  const actual = wrapper.find('#defaultLoader').length
  const expected = 0
  assert.equal(actual, expected)
})

test('components.ImageLoader | if the image has loaded later, it should render the loaded node', () => {
  let loadCB
  const wrapper = setup()
  const catchLoadCB = (eventName, cb) => {
    if (eventName === 'load')
      loadCB = cb
  }

  wrapper.instance().imgRef({ addEventListener: catchLoadCB })
  wrapper.instance().componentDidMount()
  loadCB()
  wrapper.update()

  const actual = wrapper.find('#defaultLoaded').length
  const expected = 1
  assert.equal(actual, expected)
})
