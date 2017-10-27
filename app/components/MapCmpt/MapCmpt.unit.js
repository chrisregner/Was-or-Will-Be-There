import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'
import td from 'testdouble'

import * as IU from 'services/immutablejsUtils'

import MapCmpt from './MapCmpt'

const setup = (args = {}) => {
  td.reset()

  const { props } = args

  const defaultProps = {}
  const finalProps = IU.smartMergeDeep(defaultProps, props)

  return shallow(<MapCmpt {...finalProps} />)
}

test('MapCmpt | it should render without error', t => {
  const wrapper = setup()
  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})
