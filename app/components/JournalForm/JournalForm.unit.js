import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import I from 'immutable'
import D from 'date-fns'
import * as R from 'ramda'

import * as TU from 'services/testUtils'
import { JournalFormShell } from './JournalForm'

const deps = {
  cloudinaryUploadWidget: {
    openUploadWidget: td.func(),
  },
}

const JournalForm = JournalFormShell(deps)

const mockData = {
  ev: { preventDefault: () => {} },
  inOneDay: D.addDays(new Date(), 1),
  inTenDays: D.addDays(new Date(), 10),
}

const defProps = {
  handleSubmit: td.func(),
  history: {
    push: td.func(),
  },
  match: {
    params: { countryId: '' },
  },
  initialValues: I.Map({
    id: '',
  }),
  handleDeletePhotos: td.func(),
  location: {
    pathname: '',
  },
}

const setup = TU.makeTestSetup({
  Component: JournalForm,
  tools: ['td'],
  defaultProps: defProps,
})

const fillForm = (values, wrapper) => {
  Object.entries(values).forEach((entry) => {
    const getField = () => wrapper.find(`.journal-form-${entry[0]}`)

    getField().simulate('change', mockData.ev, entry[1])
  })
}

test('components.JournalForm | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('components.JournalForm | if isNotFound is true, it should call setNotFound with pathname', () => {
  const props = {
    isNotFound: true,
    setNotFound: td.func(),
    location: {
      pathname: '/random/pathname',
    },
  }

  setup({ props })

  td.verify(props.setNotFound('/random/pathname'), { times: 1 })
})

/**
 * TitleField
 */

test('components.JournalForm > TitleField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-title-field')

  const value = 'Sample Journal Title'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('components.JournalForm > TitleField | if changed to blank, it should show error', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-title-field')

  getField().simulate('change', null, '')

  const actual = getField().prop('errorText')

  assert.ok(actual)
})

test('components.JournalForm > TitleField | if NOT filled and submitted, it should NOT call handleSubmit()', () => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  td.verify(defProps.handleSubmit(), { times: 0, ignoreExtraArgs: true })
})

test('components.JournalForm > TitleField | if NOT filled and submitted, it should show error', () => {
  const wrapper = setup()

  wrapper.find('form').simulate('submit', mockData.ev)

  const getField = () => wrapper.find('.journal-form-title-field')
  const actual = getField().prop('errorText')

  assert.ok(actual)
})

test('components.JournalForm > TitleField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
    }),
  }

  const titleWrpr = setup({ props })
    .find('.journal-form-title-field')

  const actual = titleWrpr.prop('value')
  const expected = 'Random Initial Title'

  assert.equal(actual, expected)
})

test('components.JournalForm > TitleField | if initial value is provided, it should still be emptiable', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
    }),
  }

  const wrapper = setup({ props })
  const getField = () => wrapper.find('.journal-form-title-field')
  const newEmptyVal = ''

  getField().simulate('change', null, newEmptyVal)

  const actual = getField().prop('value')

  assert.isNotOk(actual)
})

/**
 * CopyField
 */

test('components.JournalForm > CopyField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-text-content-field')

  const value = 'Sample Text Content'
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('components.JournalForm > CopyField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      copy: 'Random Initial Text Content',
    }),
  }

  const copyWrpr = setup({ props })
    .find('.journal-form-text-content-field')

  const actual = copyWrpr.prop('value')
  const expected = 'Random Initial Text Content'

  assert.equal(actual, expected)
})

test('components.JournalForm > CopyField | if initial value is provided, it should still be emptiable', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      copy: 'Random Initial Text Content',
    }),
  }

  const wrapper = setup({ props })
  const getField = () => wrapper.find('.journal-form-text-content-field')
  const newEmptyVal = ''

  getField().simulate('change', null, newEmptyVal)

  const actual = getField().prop('value')

  assert.isNotOk(actual)
})

/**
 * Departure
 */

test('components.JournalForm > DepartureField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-departure-field')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('components.JournalForm > DepartureField | if HomecomingField is filled, it should have maxDate equal to HomecomingField\'s value', () => {
  const wrapper = setup()
  const getDepartureField = () => wrapper.find('.journal-form-departure-field')
  const getHomecomingField = () => wrapper.find('.journal-form-homecoming-field')

  const value = mockData.inOneDay
  getHomecomingField().simulate('change', null, value)

  const expected = value
  const actual = getDepartureField().prop('maxDate')

  assert.equal(actual, expected)
})

test('components.JournalForm > DepartureField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      departure: mockData.inOneDay,
    }),
  }
  const fieldWrpr = setup({ props }).find('.journal-form-departure-field')

  const actual = fieldWrpr.prop('value')
  const expected = mockData.inOneDay

  assert.deepEqual(actual, expected)
})

/**
 * Homecoming
 */

test('components.JournalForm > HomecomingField | it should work', () => {
  const wrapper = setup()
  const getField = () => wrapper.find('.journal-form-homecoming-field')

  const value = mockData.inOneDay
  getField().simulate('change', null, value)

  const expected = value
  const actual = getField().prop('value')

  assert.equal(actual, expected)
})

test('components.JournalForm > HomecomingField | if DepartureField is filled, it should have minDate equal to DepartureField\'s value', () => {
  const wrapper = setup()
  const getHomecomingField = () => wrapper.find('.journal-form-homecoming-field')
  const getDepartureField = () => wrapper.find('.journal-form-departure-field')

  const value = mockData.inOneDay
  getDepartureField().simulate('change', null, value)

  const expected = value
  const actual = getHomecomingField().prop('minDate')

  assert.equal(actual, expected)
})

test('components.JournalForm > HomecomingField | it should accept initial value', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: '',
      homecoming: mockData.inOneDay,
    }),
  }
  const fieldWrpr = setup({ props }).find('.journal-form-homecoming-field')

  const actual = fieldWrpr.prop('value')
  const expected = mockData.inOneDay

  assert.deepEqual(actual, expected)
})

/**
 * Delete
 */

test('components.JournalForm > DeleteBtn | if initial journal title is provided, it should the render a delete button', () => {
  const props = {
    initialValues: I.Map({
      title: 'The Title',
    }),
  }
  const deleteBtnWrpr = setup({ props })
    .find('.journal-form-delete-btn')

  const actual = deleteBtnWrpr.exists()

  assert.isTrue(actual)
})

test('components.JournalForm > DeleteBtn | if initial journal title is NOT provided, it should NOT the render a delete button', () => {
  const deleteBtnWrpr = setup().find('.journal-form-delete-btn')
  const actual = deleteBtnWrpr.exists()
  assert.isFalse(actual)
})

test('components.JournalForm > DeleteBtn | if delete button is clicked, it should call handleDelete() with id', () => {
  const fakeHandleDelete = td.func()
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: 'Title',
    }),
    handleDelete: fakeHandleDelete,
  }
  const deleteBtnWrpr = setup({ props })
    .find('.journal-form-delete-btn')

  deleteBtnWrpr.simulate('click')

  td.verify(fakeHandleDelete('randomId'), { times: 1 })
})

test('components.JournalForm > DeleteBtn | if delete button is clicked, it should call history.push() with correct args', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
      initialValues: I.Map({
        id: 'randomId',
        title: 'Title',
      }),
      handleDelete: () => {},
    }

    const deleteBtnWrpr = setup({ props })
      .find('.journal-form-delete-btn')

    deleteBtnWrpr.simulate('click')

    const expectedArg = `/countries/${countryId}/journals`

    td.verify(defProps.history.push(expectedArg), { times: 1 })
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

/**
 * onSubmit
 */

test('components.JournalForm.onSubmit() | if form is valid and initial values were provided, it should call handleSubmit() with correct data including the id', () => {
  const testWithChangingSomeField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Title',
        homecoming: mockData.inOneDay,
      }),
    }
    const values = {
      'text-content-field': `
        Sample Spaceous Text Content
      `,
      'departure-field': mockData.inOneDay,
      'homecoming-field': mockData.inTenDays,
    }
    const wrapper = setup({ props })

    fillForm(values, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const actual = TU.getArgs(defProps.handleSubmit)[0]
    const expected = I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
      copy: 'Sample Spaceous Text Content',
      departure: mockData.inOneDay,
      homecoming: mockData.inTenDays,
      photos: I.List(),
    })

    assert.isTrue(actual.equals(expected))
  }

  const testWithChangingNoField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Title',
        homecoming: mockData.inOneDay,
      }),
    }
    const wrapper = setup({ props })

    wrapper.find('form').simulate('submit', mockData.ev)

    const actual = TU.getArgs(defProps.handleSubmit)[0]
    const expected = I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
      homecoming: mockData.inOneDay,
      photos: I.List(),
    })

    assert.isTrue(actual.equals(expected))
  }

  const testWithEmptiyingAField = () => {
    const props = {
      initialValues: I.Map({
        id: 'randomId',
        title: 'Random Initial Title',
        copy: `
          Sample Spaceous Text Content
        `,
        homecoming: mockData.inOneDay,
      }),
    }
    const wrapper = setup({ props })
    const values = {
      'text-content-field': '',
    }

    fillForm(values, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const actual = TU.getArgs(defProps.handleSubmit)[0]
    const expected = I.Map({
      id: 'randomId',
      title: 'Random Initial Title',
      homecoming: mockData.inOneDay,
      copy: '',
      photos: I.List(),
    })

    assert.isTrue(actual.equals(expected))
  }

  testWithChangingSomeField()
  testWithChangingNoField()
  testWithEmptiyingAField()
})

test('components.JournalForm.onSubmit() | if form is valid, it should call history.push() with correct args', () => {
  const testWithVar = (countryId) => {
    const props = {
      match: {
        params: { countryId },
      },
    }
    const wrapper = setup({ props })

    fillForm({ 'title-field': 'Sample Journal Title' }, wrapper)
    wrapper.find('form').simulate('submit', mockData.ev)

    const expectedArg = `/countries/${countryId}/journals`

    td.verify(defProps.history.push(expectedArg), { times: 1 })
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

/**
 * Image Upload
 */

test('components.JournalForm[imageUpload].state.values.photos | it should accept initial values', () => {
  const props = {
    initialValues: I.Map({
      photos: I.List([
        I.Map({
          id: 'fakeFirstPredefinedPubId',
          path: 'fake/first/predefined/path',
        }),
        I.Map({
          id: 'fakeSecondPredefinedPubId',
          path: 'fake/second/predefined/path',
        }),
      ]),
    }),
  }
  const wrapper = setup({ props })

  const actual = wrapper.state('values').get('photos')
  const expected = props.initialValues.get('photos')

  assert.isTrue(actual.equals(expected))
})

test('components.JournalForm[imageUpload] > PhotoFieldSet | it should render it with correct props for each photo data in state', () => {
  const wrapper = setup()
  const photos = I.List([
    I.Map({
      id: 'fakeFirstPredefinedPubId',
      path: 'fake/first/predefined/path',
      isDeleted: true,
    }),
    I.Map({
      id: 'fakeSecondPredefinedPubId',
      path: 'fake/second/predefined/path',
      description: 'The Description of Second Photo',
    }),
  ])

  wrapper.setState(prevState => ({
    values: prevState.values.set('photos', photos),
  }))

  const photoFieldSetWrpr = () => wrapper.find('.journal-form-photo-field-set')

  const testTotalPhotoFieldSets = () => {
    const actual = photoFieldSetWrpr().length
    const expected = 2

    assert.equal(actual, expected)
  }

  const testFirstPhotoFieldSet = () => {
    const allProps = photoFieldSetWrpr().at(0).props()
    const actual = R.pick(
      [
        'id', 'path', 'description', 'isDeleted',
        'handleDeletePhoto', 'handleRestorePhoto', 'handleSetPhotoDesc',
      ],
      allProps
    )
    const expected = {
      id: 'fakeFirstPredefinedPubId',
      path: 'fake/first/predefined/path',
      description: '',
      handleDeletePhoto: wrapper.instance().handleDeletePhoto,
      handleRestorePhoto: wrapper.instance().handleRestorePhoto,
      handleSetPhotoDesc: wrapper.instance().handleSetPhotoDesc,
      isDeleted: true,
    }

    assert.deepEqual(actual, expected)
  }

  const testSecondPhotoFieldSet = () => {
    const allProps = photoFieldSetWrpr().at(1).props()
    const actual = R.pick(
      [
        'id', 'path', 'description', 'isDeleted',
        'handleDeletePhoto', 'handleRestorePhoto', 'handleSetPhotoDesc',
      ],
      allProps
    )
    const expected = {
      id: 'fakeSecondPredefinedPubId',
      path: 'fake/second/predefined/path',
      description: 'The Description of Second Photo',
      handleDeletePhoto: wrapper.instance().handleDeletePhoto,
      handleRestorePhoto: wrapper.instance().handleRestorePhoto,
      handleSetPhotoDesc: wrapper.instance().handleSetPhotoDesc,
      isDeleted: undefined,
    }

    assert.deepEqual(actual, expected)
  }

  testTotalPhotoFieldSets()
  testFirstPhotoFieldSet()
  testSecondPhotoFieldSet()
})

test('components.JournalForm[imageUpload] > UploadPhotoBtn | when clicked, it should call openUploadWidget()', () => {
  const uploadBtnWrpr = setup().find('.journal-form-upload-btn')
  uploadBtnWrpr.simulate('click')
  td.verify(deps.cloudinaryUploadWidget.openUploadWidget(), { times: 1, ignoreExtraArgs: true })
})

test('components.JournalForm[imageUpload] > UploadPhotoBtn | when openUploadWidget() succeeds and photo state has existing data, it should add correct photo details to the state', () => {
  const wrapper = setup()
  const predefPhotos = I.List([
    I.Map({
      id: 'fakeFirstPredefinedPubId',
      path: 'fake/first/predefined/path',
    }),
    I.Map({
      id: 'fakeSecondPredefinedPubId',
      path: 'fake/second/predefined/path',
    }),
  ])

  wrapper.setState(prevState => ({
    values: prevState.values.set('photos', predefPhotos),
  }))
  wrapper.find('.journal-form-upload-btn')
    .simulate('click')

  const successHandler = TU.getArgs(deps.cloudinaryUploadWidget.openUploadWidget)[1]
  const fakeRes = [{
    path: 'fake/first/path',
    public_id: 'fakeFirstPubId',
  }, {
    path: 'fake/second/path',
    public_id: 'fakeSecondPubId',
  }]

  successHandler(null, fakeRes)

  const actual = wrapper.state('values').get('photos')
  const expected = I.List([
    I.Map({
      id: 'fakeFirstPredefinedPubId',
      path: 'fake/first/predefined/path',
    }),
    I.Map({
      id: 'fakeSecondPredefinedPubId',
      path: 'fake/second/predefined/path',
    }),
    I.Map({
      id: 'fakeFirstPubId',
      path: 'fake/first/path',
      isNotSaved: true,
    }),
    I.Map({
      id: 'fakeSecondPubId',
      path: 'fake/second/path',
      isNotSaved: true,
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('components.JournalForm[imageUpload] > UploadPhotoBtn | when openUploadWidget() succeeds and photo state has NO existing data, it should add correct photo data to the state', () => {
  const wrapper = setup()

  wrapper.find('.journal-form-upload-btn')
    .simulate('click')

  const successHandler = TU.getArgs(deps.cloudinaryUploadWidget.openUploadWidget)[1]
  const fakeRes = [{
    path: 'fake/first/path',
    public_id: 'fakeFirstPubId',
  }, {
    path: 'fake/second/path',
    public_id: 'fakeSecondPubId',
  }]

  successHandler(null, fakeRes)

  const actual = wrapper.state('values').get('photos')
  const expected = I.List([
    I.Map({
      id: 'fakeFirstPubId',
      path: 'fake/first/path',
      isNotSaved: true,
    }),
    I.Map({
      id: 'fakeSecondPubId',
      path: 'fake/second/path',
      isNotSaved: true,
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('components.JournalForm[imageUpload] > DeleteBtn | if delete button is clicked, it should set the status state to "deleted"', () => {
  const props = {
    initialValues: I.Map({
      id: 'randomId',
      title: 'Title',
    }),
    handleDelete: () => {},
  }

  const wrapper = setup({ props })

  wrapper.find('.journal-form-delete-btn')
    .simulate('click')

  const actual = wrapper.state('status')
  const expected = 'deleted'

  assert.equal(actual, expected)
})

test('components.JournalForm[imageUpload].handleDeletePhoto() | it should add isDeleted property to the correct photo', () => {
  const wrapper = setup()
  const predefPhotos = I.List([
    I.Map({
      id: 'firstPredefinedPhotoId',
      path: 'first/predefined/path',
    }),
    I.Map({
      id: 'secondPredefinedPhotoId',
      path: 'second/predefined/path',
    }),
    I.Map({
      id: 'thirdPredefinedPhotoId',
      path: 'third/predefined/path',
    }),
  ])

  wrapper.setState(prevState => ({
    values: prevState.values.set('photos', predefPhotos),
  }))

  wrapper.instance().handleDeletePhoto('secondPredefinedPhotoId')

  const actual = wrapper.state('values').get('photos')
  const expected = I.List([
    I.Map({
      id: 'firstPredefinedPhotoId',
      path: 'first/predefined/path',
    }),
    I.Map({
      id: 'secondPredefinedPhotoId',
      path: 'second/predefined/path',
      isDeleted: true,
    }),
    I.Map({
      id: 'thirdPredefinedPhotoId',
      path: 'third/predefined/path',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('components.JournalForm[imageUpload].handleRestorePhoto() | it should remove isDeleted property to the correct photo', () => {
  const wrapper = setup()
  const predefPhotos = I.List([
    I.Map({
      id: 'firstPredefinedPhotoId',
      path: 'first/predefined/path',
    }),
    I.Map({
      id: 'secondPredefinedPhotoId',
      path: 'second/predefined/path',
      isDeleted: true,
    }),
    I.Map({
      id: 'thirdPredefinedPhotoId',
      path: 'third/predefined/path',
      isDeleted: true,
    }),
  ])

  wrapper.setState(prevState => ({
    values: prevState.values.set('photos', predefPhotos),
  }))

  wrapper.instance().handleRestorePhoto('secondPredefinedPhotoId')

  const actual = wrapper.state('values').get('photos')
  const expected = I.List([
    I.Map({
      id: 'firstPredefinedPhotoId',
      path: 'first/predefined/path',
    }),
    I.Map({
      id: 'secondPredefinedPhotoId',
      path: 'second/predefined/path',
    }),
    I.Map({
      id: 'thirdPredefinedPhotoId',
      path: 'third/predefined/path',
      isDeleted: true,
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('components.JournalForm[imageUpload].handleSetPhotoDesc() | it should work', () => {
  const wrapper = setup()
  const photos = I.List([
    I.Map({
      id: 'fakeFirstPredefinedPubId',
      path: 'fake/first/predefined/path',
    }),
    I.Map({
      id: 'fakeSecondPredefinedPubId',
      path: 'fake/second/predefined/path',
      description: 'The second photo\'s old description',
    }),
    I.Map({
      id: 'fakeThirdPredefinedPubId',
      path: 'fake/third/predefined/path',
    }),
  ])

  wrapper.setState(({ values }) => ({
    values: values.set('photos', photos),
  }))
  wrapper.instance().handleSetPhotoDesc('fakeSecondPredefinedPubId', 'The second photo\'s new description')
  wrapper.instance().handleSetPhotoDesc('fakeThirdPredefinedPubId', 'The third photo\'s new description')

  const actual = wrapper.state('values').get('photos')
  const expected = I.List([
    I.Map({
      id: 'fakeFirstPredefinedPubId',
      path: 'fake/first/predefined/path',
    }),
    I.Map({
      id: 'fakeSecondPredefinedPubId',
      path: 'fake/second/predefined/path',
      description: 'The second photo\'s new description',
    }),
    I.Map({
      id: 'fakeThirdPredefinedPubId',
      path: 'fake/third/predefined/path',
      description: 'The third photo\'s new description',
    }),
  ])

  assert.isTrue(actual.equals(expected))
})

test('components.JournalForm[imageUpload].onSubmit() | if form is valid, it should call handleSubmit with correct photo data', () => {
  const props = {
    initialValues: I.Map({
      id: 'initialId',
      title: 'The Initial Title',
    }),
  }
  const wrapper = setup({ props })
  const photos = I.List([
    I.Map({
      id: 'firstPhotoId',
      path: 'first/photo/path',
    }),
    I.Map({
      id: 'secondPhotoId',
      path: 'second/photo/path',
      description: 'The second photo\'s description',
      isDeleted: true,
    }),
    I.Map({
      id: 'thirdPhotoId',
      path: 'third/photo/path',
      description: 'The third photo\'s description',
    }),
  ])

  wrapper.setState(prevState => ({
    values: prevState.values.set('photos', photos),
  }))
  wrapper.find('.journal-form-form').simulate('submit', mockData.ev)

  const actual = TU.getArgs(defProps.handleSubmit)[0]
  const expected = I.fromJS({
    id: 'initialId',
    title: 'The Initial Title',
    photos: [
      {
        id: 'firstPhotoId',
        path: 'first/photo/path',
      },
      {
        id: 'secondPhotoId',
        path: 'second/photo/path',
        description: 'The second photo\'s description',
        isDeleted: true,
      },
      {
        id: 'thirdPhotoId',
        path: 'third/photo/path',
        description: 'The third photo\'s description',
      },
    ],
  })

  assert.isTrue(actual.equals(expected))
})

test('components.JournalForm[imageUpload].onSubmit() | if form is valid, it should set the status state to "saved"', () => {
  const props = {
    initialValues: I.Map({
      id: 'initialId',
      title: 'The Initial Title',
    }),
  }
  const wrapper = setup({ props })

  wrapper.find('.journal-form-form').simulate('submit', mockData.ev)

  const actual = wrapper.state('status')
  const expected = 'saved'

  assert.equal(actual, expected)
})

test('components.JournalForm[imageUpload] | when unmounted and status is the default of "not-saved", it should call handleDeletePhotos() with photos and "not-saved"', () => {
  const wrapper = setup()
  const photos = I.fromJS([
    {
      id: 'firstPhotoId',
      path: 'first/photo/path',
    },
    {
      id: 'secondPhotoId',
      path: 'second/photo/path',
      description: 'The second photo\'s description',
      isDeleted: true,
    },
    {
      id: 'thirdPhotoId',
      path: 'third/photo/path',
      description: 'The third photo\'s description',
      isNotSaved: true,
    },
  ])

  wrapper.setState(({ values }) => ({
    values: values.set('photos', photos),
  }))
  wrapper.unmount()

  td.verify(
    defProps.handleDeletePhotos({
      toDelete: ['not-saved'],
      photos,
    })
  )
})

test('components.JournalForm[imageUpload] | when unmounted and status is "saved", it should call handleDeletePhotos() with photos and "deleted"', () => {
  const wrapper = setup()
  const photos = I.fromJS([
    {
      id: 'firstPhotoId',
      path: 'first/photo/path',
    },
    {
      id: 'secondPhotoId',
      path: 'second/photo/path',
      description: 'The second photo\'s description',
      isDeleted: true,
    },
    {
      id: 'thirdPhotoId',
      path: 'third/photo/path',
      description: 'The third photo\'s description',
      isNotSaved: true,
    },
  ])

  wrapper.setState(({ values }) => ({
    status: 'saved',
    values: values.set('photos', photos),
  }))
  wrapper.unmount()

  td.verify(
    defProps.handleDeletePhotos({
      toDelete: ['deleted'],
      photos,
    })
  )
})

test('components.JournalForm[imageUpload] | when unmounted and status is "deleted", it should call handleDeletePhotos() with photos and "all"', () => {
  const wrapper = setup()
  const photos = I.fromJS([
    {
      id: 'firstPhotoId',
      path: 'first/photo/path',
    },
    {
      id: 'secondPhotoId',
      path: 'second/photo/path',
      description: 'The second photo\'s description',
      isDeleted: true,
    },
    {
      id: 'thirdPhotoId',
      path: 'third/photo/path',
      description: 'The third photo\'s description',
      isNotSaved: true,
    },
  ])

  wrapper.setState(({ values }) => ({
    status: 'deleted',
    values: values.set('photos', photos),
  }))
  wrapper.unmount()

  td.verify(
    defProps.handleDeletePhotos({
      toDelete: ['all'],
      photos,
    })
  )
})
