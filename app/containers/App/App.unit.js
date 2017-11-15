import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { BareApp } from './App'

const defProps = {
  isPathNotFound: td.func(),
  fetchCountryNames: td.func(),
  location: {
    pathname: '',
  },
}

const setup = TU.makeTestSetup({
  Component: BareApp,
  defaultProps: defProps,
  tools: ['td'],
})

test('containers.App | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('containers.App | it should call isPathNotFound once with location.pathname', () => {
  const props = {
    location: {
      pathname: '/random/pathname',
    },
  }

  setup({ props })

  td.verify(defProps.isPathNotFound('/random/pathname'), { times: 1 })
})

test('containers.App | if isPathNotFound returned true, it should render the not found page', () => {
  const wrapper = setup({
    hooks: {
      beforeRender: () => {
        td.when(defProps.isPathNotFound(td.matchers.anything()))
          .thenReturn(true)
      },
    },
  })

  const actual = wrapper.find('.app-not-found').prop('isVisible')
  assert.isTrue(actual)
})

test('containers.App | if isPathNotFound returned true, it should NOT render the routes', () => {
  const wrapper = setup({
    hooks: {
      beforeRender: () => {
        td.when(defProps.isPathNotFound(td.matchers.anything()))
          .thenReturn(true)
      },
    },
  })

  const actual = wrapper.find('.app-routes').prop('isVisible')
  assert.isFalse(actual)
})

test('containers.App | if isPathNotFound does NOT return true, it should render the routes', () => {
  const wrapper = setup({
    hooks: {
      beforeRender: () => {
        td.when(defProps.isPathNotFound(td.matchers.anything()))
          .thenReturn(false)
      },
    },
  })

  const actual = wrapper.find('.app-routes').prop('isVisible')
  assert.isTrue(actual)
})

test('containers.App | if isPathNotFound does NOT return true, it should NOT render the not found page', () => {
  const wrapper = setup({
    hooks: {
      beforeRender: () => {
        td.when(defProps.isPathNotFound(td.matchers.anything()))
          .thenReturn(false)
      },
    },
  })

  const actual = wrapper.find('.app-not-found').prop('isVisible')
  assert.isFalse(actual)
})
