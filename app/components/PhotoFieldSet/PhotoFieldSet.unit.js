import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import PhotoFieldSet from './PhotoFieldSet'

import { createJournalThumbUrl, createJournalPhotoUrl } from 'constants/'

const mocks = {
  ev: {
    preventDefault: td.func(),
  },
}

const defProps = {
  path: '',
  id: '',
  handleDeletePhoto: td.func(),
  handleRestorePhoto: td.func(),
  handleSetPhotoDesc: td.func(),
}

const setup = TU.makeTestSetup({
  Component: PhotoFieldSet,
  tools: ['td'],
  defaultProps: defProps,
})

test('PhotoFieldSet | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('PhotoFieldSet > Photo | it should render', () => {
  const props = { path: 'random/path' }
  const expectedPhotoUrl = createJournalPhotoUrl('random/path')
  const photoWrpr = setup({ props }).find(`[src='${expectedPhotoUrl}']`)
  const actual = photoWrpr.exists()

  assert.isOk(expectedPhotoUrl)
  assert.isTrue(actual)
})

test('PhotoFieldSet > Photo | it should be hidden by default', () => {
  const photoContainerWrpr = setup().find('.photo-field-set-photo-wrapper')
  const photoContainerCns = photoContainerWrpr.prop('className').split(' ')

  const actual = photoContainerCns
  const expected = 'dn'

  assert.include(actual, expected)
})

test('PhotoFieldSet > Photo | it should use description as alt', () => {
  const props = {
    description: 'The Random Description',
  }
  const photoWrpr = setup({ props }).find('.photo-field-set-photo')

  const actual = photoWrpr.prop('alt')
  const expected = 'The Random Description'

  assert.equal(actual, expected)
})

test('PhotoFieldSet > ThumbPhoto | it should render', () => {
  const props = { path: 'random/path' }
  const expectedThumbUrl = createJournalThumbUrl('random/path')
  const thumbWrpr = setup({ props }).find(`[src='${expectedThumbUrl}']`)
  const actual = thumbWrpr.exists()

  assert.isOk(expectedThumbUrl)
  assert.isTrue(actual)
})

test('PhotoFieldSet > ThumbPhoto | it should use description as alt', () => {
  const props = {
    description: 'The Random Description',
  }
  const thumbWrpr = setup({ props }).find('.photo-field-set-thumb-photo')

  const actual = thumbWrpr.prop('alt')
  const expected = 'The Random Description'

  assert.equal(actual, expected)
})

test('PhotoFieldSet > ThumbPhoto | if isDeleted prop is true, it should render the overlay', () => {
  const props = {
    isDeleted: true,
  }
  const thumbWrpr = setup({ props }).find('.photo-field-set-thumb-photo-overlay')

  const actual = thumbWrpr.exists()

  assert.isTrue(actual)
})

test('PhotoFieldSet > ThumbPhoto | if isDeleted prop is NOT true, it should NOT render the overlay', () => {
  const props = {
    isDeleted: null,
  }
  const thumbWrpr = setup({ props }).find('.photo-field-set-thumb-photo-overlay')

  const actual = thumbWrpr.exists()

  assert.isFalse(actual)
})

test('PhotoFieldSet > ThumbPhoto | it should show the full-sized photo on click', () => {
  const wrapper = setup()

  wrapper.find('.photo-field-set-thumb-photo').simulate('click')

  const photoContainerWrpr = wrapper.find('.photo-field-set-photo-wrapper')
  const photoContainerCns = photoContainerWrpr.prop('className').split(' ')

  const actual = photoContainerCns
  const notExpected = ['dn', 'fadeOut']

  notExpected.forEach((notExpectedCn) => {
    assert.notInclude(actual, notExpectedCn)
  })
})

test('PhotoFieldSet > HideFullSizeButton | if full-sized photo is shown, it should hide the full-sized photo on click', () => {
  const wrapper = setup()

  wrapper.find('.photo-field-set-thumb-photo').simulate('click')
  wrapper.find('.photo-field-set-hide-full-sized-photo').simulate('click')

  const photoContainerWrpr = wrapper.find('.photo-field-set-photo-wrapper')
  const photoContainerCns = photoContainerWrpr.prop('className').split(' ')

  const actual = photoContainerCns
  const expected = 'fadeOut'

  assert.include(actual, expected)
})

test('PhotoFieldSet > DescriptionField | it should render', () => {
  const descFieldWrpr = setup().find('.photo-field-set-description-field')
  const actual = descFieldWrpr.exists()

  assert.isTrue(actual)
})

test('PhotoFieldSet > DescriptionField | it should call show the value', () => {
  const props = {
    description: 'The Random Description',
  }
  const descFieldWrpr = setup({ props }).find('.photo-field-set-description-field')

  const actual = descFieldWrpr.prop('value')
  const expected = 'The Random Description'

  assert.equal(actual, expected)
})

test('PhotoFieldSet > DescriptionField | when changed, it should call handleSetPhotoDesc() with correct props', () => {
  const props = {
    id: 'randomId',
  }

  setup({ props })
    .find('.photo-field-set-description-field')
    .simulate('change', mocks.ev, 'The New Description')

  const expectedArgs = ['randomId', 'The New Description']

  td.verify(defProps.handleSetPhotoDesc(...expectedArgs), { times: 1 })
})

test('PhotoFieldSet > DescriptionField | if isDeleted prop is true, it should be disabled', () => {
  const props = {
    isDeleted: true,
  }

  const descFieldWrpr = setup({ props }).find('.photo-field-set-description-field')

  const actual = descFieldWrpr.prop('disabled')

  assert.isTrue(actual)
})

test('PhotoFieldSet > DeletePhotoButton | if isDeleted prop is NOT true, it should render', () => {
  const props = {
    isDeleted: null,
  }
  const delPhotoBtnWrpr = setup({ props })
    .find('.photo-field-set-delete-photo-btn')
  const actual = delPhotoBtnWrpr.exists()

  assert.isTrue(actual)
})

test('PhotoFieldSet > DeletePhotoButton | if isDeleted prop is true, it should NOT render', () => {
  const props = {
    isDeleted: true,
  }
  const delPhotoBtnWrpr = setup({ props })
    .find('.photo-field-set-delete-photo-btn')
  const actual = delPhotoBtnWrpr.exists()

  assert.isFalse(actual)
})

test('PhotoFieldSet > DeletePhotoButton | when clicked, it should call handleDeletePhoto() with correct props', () => {
  const props = {
    id: 'randomId',
  }

  setup({ props })
    .find('.photo-field-set-delete-photo-btn')
    .simulate('click')

  const expectedArg = 'randomId'

  td.verify(defProps.handleDeletePhoto(expectedArg), { times: 1 })
})

test('PhotoFieldSet > RestorePhotoButton | if isDeleted prop is true, it should render', () => {
  const props = {
    isDeleted: true,
  }
  const delPhotoBtnWrpr = setup({ props })
    .find('.photo-field-set-restore-photo-btn')
  const actual = delPhotoBtnWrpr.exists()

  assert.isTrue(actual)
})

test('PhotoFieldSet > RestorePhotoButton | if isDeleted prop is NOT true, it should NOT render', () => {
  const props = {
    isDeleted: null,
  }
  const delPhotoBtnWrpr = setup({ props })
    .find('.photo-field-set-restore-photo-btn')
  const actual = delPhotoBtnWrpr.exists()

  assert.isFalse(actual)
})

test('PhotoFieldSet > RestorePhotoButton | when clicked, it should call handleRestorePhoto() with correct props', () => {
  const props = {
    id: 'randomId',
    isDeleted: true,
  }

  setup({ props })
    .find('.photo-field-set-restore-photo-btn')
    .simulate('click')

  const expectedArg = 'randomId'

  td.verify(defProps.handleRestorePhoto(expectedArg), { times: 1 })
})
