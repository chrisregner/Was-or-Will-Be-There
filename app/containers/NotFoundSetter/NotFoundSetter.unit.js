import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { BareNotFoundSetter } from './NotFoundSetter'

const defProps = {
  setNotFound: td.func(),
  location: {
    pathname: '',
  },
}

const setup = TU.makeTestSetup({
  Component: BareNotFoundSetter,
  defaultProps: defProps,
  tools: ['td'],
})

test('containers.NotFoundSetter | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('containers.NotFoundSetter | it should call setNotFound with pathname', () => {
  const props = {
    location: {
      pathname: '/random/pathname',
    },
  }

  setup({ props })

  td.verify(defProps.setNotFound('/random/pathname'), { times: 1 })
})
