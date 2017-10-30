import test from 'tape'
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

test('RealRouteWatcher | it should render without error', (t) => {
  const wrapper = setup()

  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})

test('RealRouteWatcher | it should call setRealRoute() with correct props on mount', (t) => {
  const props = {
    location: {
      pathname: 'pathname/on/mount',
    },
  }

  setup({ props })

  td.verify(defProps.setRealRoute('pathname/on/mount'), { times: 1 })
  t.end()
})

test('RealRouteWatcher | it should call setRealRoute() with correct props on update', (t) => {
  const wrapper = setup()

  wrapper.setProps({
    location: {
      pathname: 'pathname/on/update',
    },
  })

  td.verify(defProps.setRealRoute('pathname/on/update'), { times: 1 })
  t.end()
})
