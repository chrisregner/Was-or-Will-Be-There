import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import Xxx from './Xxx'

const setup = TU.makeTestSetup({
  Component: Xxx,
})

test('yyyyy.Xxx | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})
