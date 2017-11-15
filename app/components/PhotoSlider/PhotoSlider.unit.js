import { test } from 'mocha'
import { assert } from 'chai'
import I from 'immutable'

import { createJournalPhotoUrl } from 'constants/'
import * as TU from 'services/testUtils'
import PhotoSlider from './PhotoSlider'

const defProps = {
  photos: I.List([
    I.Map({
      id: 'a',
      path: 'photo/a/path',
    }),
    I.Map({
      id: 'b',
      description: 'Photo B description',
      path: 'photo/b/path',
    }),
    I.Map({
      id: 'c',
      path: 'photo/c/path',
    }),
  ]),
}

const setup = TU.makeTestSetup({
  Component: PhotoSlider,
  defaultProps: defProps,
})

test('components.PhotoSlider | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('components.PhotosSlider > photoSet | it should be rendered for each photo passed', () => {
  const actual = setup()
    .find('[data-test="photo-set"]')
    .length
  const expected = 3
  assert.equal(actual, expected)
})

test('components.PhotosSlider > photoSet | when description is provided, it should render it as text', () => {
  const actual = setup()
    .find('[data-test="photo-set"]')
    .at(1)
    .find('[data-test="description"]')
    .text()
  const expected = 'Photo B description'
  assert.equal(actual, expected)
})

test('components.PhotosSlider > photoSet | when description is provided, it should use it as alt attribute', () => {
  const actual = setup()
    .find('[data-test="photo-set"]')
    .at(1)
    .find('[data-test="photo"]')
    .prop('alt')
  const expected = 'Photo B description'
  assert.equal(actual, expected)
})

test('components.PhotosSlider > photoSet | when description is NOT provided, it should use empty string as alt attribute', () => {
  const actual = setup()
    .find('[data-test="photo-set"]')
    .at(2)
    .find('[data-test="photo"]')
    .prop('alt')
  const expected = ''
  assert.equal(actual, expected)
})

test('components.PhotosSlider > photoSet | it should render the correct photo', () => {
  const actual = setup()
    .find('[data-test="photo-set"]')
    .at(2)
    .find('[data-test="photo"]')
    .prop('src')
  const expected = createJournalPhotoUrl('photo/c/path')
  assert.equal(actual, expected)
})
