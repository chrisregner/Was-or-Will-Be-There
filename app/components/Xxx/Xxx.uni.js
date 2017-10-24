import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import td from 'testdouble'

import { smartMergeDeep } from 'services/fpUtils'

import Xxx from './Xxx'

const setup = (args = {}) => {
  td.reset()

  const { props } = args

  const defaultProps = {}
  const finalProps = smartMergeDeep(defaultProps, props)

  return shallow(<Xxx {...finalProps} />)
}

test('it should render without error', t => {
  const wrapper = setup()
  const actual = wrapper.exists()

  t.true(actual)
})
