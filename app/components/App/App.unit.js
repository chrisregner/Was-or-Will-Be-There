import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

const setup = () => {
  return shallow(<App />)
}

test('it should render without error', t => {
  const wrapper = setup()
  const actual = wrapper.exists()

  t.true(actual)
})
