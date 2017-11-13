import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import CollapsibleItem from './CollapsibleItem'

const setup = TU.makeTestSetup({
  Component: CollapsibleItem,
})

test('components.CollapsibleItem | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('components.CollapsibelItem | it should render without error')
test('components.CollapsibelItem > summary | it should render the title')
test('components.CollapsibelItem > summary | when clicked, it should toggle its details')
test('components.CollapsibelItem > summary > timeBadge | when shouldRenderTimebadge is true, it should be rendered with correct props')
test('components.CollapsibelItem > summary > timeBadge | when shouldRenderTimebadge is NOT true, it should NOT be rendered')
test('components.CollapsibelItem > details > editLink | it should be rendered')
test('components.CollapsibelItem > details > fullTitle | when title in summary is truncated by css, it should be rendered')
test('components.CollapsibelItem > details > fullTitle | when title in summary is NOT truncated by css, it should NOT be rendered')
test('components.CollapsibelItem > details > dateRange | when both departure and homecoming is provided, it should be rendered')
test('components.CollapsibelItem > details > dateRange | when only departure is provided, it should still be rendered with "(TBD)" in place of homecoming')
test('components.CollapsibelItem > details > dateRange | when only homecoming is provided, it should still be rendered with "(TBD)" in place of departure')
test('components.CollapsibelItem > details > dateRange | when both departure and homecoming is NOT provided, it should not be rendered')
test('components.CollapsibelItem > details > copy | when copy is provided, it should be rendered')
test('components.CollapsibelItem > details > copy | when copy is NOT provided, it should NOT be rendered')
test('components.CollapsibelItem > details > photosSlider | when photo(s) are provided, it should be rendered with these')
