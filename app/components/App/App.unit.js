import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

const setup = () => {
  return shallow(<App />)
}

test('App | it should render without error', t => {
  const wrapper = setup()
  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})
