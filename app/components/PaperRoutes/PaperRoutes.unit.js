import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import PaperRoutes from './PaperRoutes'

const defProps = {
  match: {
    params: {
      countryId: '',
    },
  },
  location: {
    pathname: '',
  },
}

const setup = TU.makeTestSetup({
  Component: PaperRoutes,
  defaultProps: defProps,
})

test('components.PaperRoutes | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})
