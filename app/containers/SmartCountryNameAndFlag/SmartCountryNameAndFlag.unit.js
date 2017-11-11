import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { BareSmartCountryNameAndFlag } from './SmartCountryNameAndFlag'

const defProps = {
  location: {
    pathname: '',
  },
  match: {
    params: {
      countryId: '',
    },
  },
  setNotFound: td.func(),
}

const setup = TU.makeTestSetup({
  Component: BareSmartCountryNameAndFlag,
  defaultProps: defProps,
  tools: ['td'],
})

test('containers.SmartCountryNameAndFlag | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('containers.SmartCountryNameAndFlag | it should render country name and flag with country id', () => {
  const props = {
    match: {
      params: {
        countryId: 'de',
      },
    },
  }

  const actual = setup({ props })
    .find('.paper-routes-country-name-and-flag')
    .prop('countryId')
  const expected = 'de'

  assert.equal(actual, expected)
})

test('containers.SmartCountryNameAndFlag | if country id is NOT valid, it should call setNotFound() with pathname on componentWillMount', () => {
  const props = {
    location: {
      pathname: '/random/pathname',
    },
    match: {
      params: {
        countryId: 'invalidCountryId',
      },
    },
  }

  const componentWillMount = setup({ props })
    .instance()
    .componentWillMount

  td.reset()
  componentWillMount()
  td.verify(defProps.setNotFound('/random/pathname'))
})

test('containers.SmartCountryNameAndFlag | if country id is valid, it should NOT call setNotFound()', () => {
  const props = {
    match: {
      params: {
        countryId: 'de',
      },
    },
  }

  setup({ props })

  td.verify(defProps.setNotFound(), { times: 0, ignoreExtraArgs: true })
})
