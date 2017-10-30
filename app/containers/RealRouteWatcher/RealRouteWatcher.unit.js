import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { BareRealRouteWatcher as RealRouteWatcher } from './RealRouteWatcher'

const defProps = {
  setRealRoute: td.func(),
  location: {
    pathname: '',
  },
}

const setup = TU.makeTestSetup({
  Component: RealRouteWatcher,
  defaultProps: defProps,
  tools: ['td'],
})

test('RealRouteWatcher | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('RealRouteWatcher | it should call setRealRoute() with correct props on mount', () => {
  const props = {
    location: {
      pathname: 'pathname/on/mount',
    },
  }

  setup({ props })

  td.verify(defProps.setRealRoute('pathname/on/mount'), { times: 1 })
})

test('RealRouteWatcher | it should call setRealRoute() with correct props on update', () => {
  const wrapper = setup()

  wrapper.setProps({
    location: {
      pathname: 'pathname/on/update',
    },
  })

  td.verify(defProps.setRealRoute('pathname/on/update'), { times: 1 })
})
