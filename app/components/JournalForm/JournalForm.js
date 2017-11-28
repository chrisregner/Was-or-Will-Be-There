import React from 'react'
import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import I from 'immutable'
import * as R from 'ramda'
import { Switch, Route } from 'react-router-dom'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from 'constants/'
import * as FU from 'services/functionalUtils'
import PhotoFieldSet from 'components/PhotoFieldSet'

const validationRules = {
  title: title => !title && 'title is required',
}

class JournalForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func,
    initialValues: IPropTypes.contains({
      id: PropTypes.string,
      title: PropTypes.string,
      copy: PropTypes.string,
      departure: PropTypes.instanceOf(Date),
      homecoming: PropTypes.instanceOf(Date),
      photos: IPropTypes.listOf(IPropTypes.contains({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        description: PropTypes.string,
      })),
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        countryId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    handleDeletePhotos: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    isNotFound: PropTypes.bool,
    setNotFound: PropTypes.func,
  }

  static defaultProps = {
    initialValues: I.Map(),
  }

  state = {
    values: this.props.initialValues.update('photos', photos =>
      photos || I.List()),
    errors: {},
    isUploadBtnEnabled: true,
    isClOpened: false,
  }

  status = 'not-saved'

  componentWillMount = () => {
    const { isNotFound, setNotFound, location } = this.props

    if (isNotFound)
      setNotFound(location.pathname)
  }

  componentWillUnmount = () => {
    const { handleDeletePhotos } = this.props
    const { values } = this.state
    let toDelete

    /* delete images that should be deleted */
    if (this.status === 'not-saved')
      toDelete = 'not-saved'
    else if (this.status === 'saved')
      toDelete = 'deleted'
    else if (this.status === 'deleted')
      toDelete = 'all'

    handleDeletePhotos({
      photos: values.get('photos'),
      toDelete: [toDelete],
    })

    /* remove cloudinary upload widget event listeners  */
    document.removeEventListener('cloudinarywidgeterror', this.enableUploadBtn)
    document.removeEventListener('cloudinarywidgetclosed', this.enableUploadBtn)
  }

  makeHandleChange = fieldName => (ev, newVal) => {
    const error = validationRules[fieldName]
      ? validationRules[fieldName](newVal, this.state.values)
      : ''

    this.setState(({values, errors}) => ({
      values: values.set(fieldName, newVal),
      errors: R.merge(errors, { [fieldName]: error }),
    }))
  }

  handleChangeTitle = this.makeHandleChange('title')
  handleChangeCopy = this.makeHandleChange('copy')
  handleChangeDeparture = this.makeHandleChange('departure')
  handleChangeHomecoming = this.makeHandleChange('homecoming')

  handleDelete = () => {
    const { match, history, initialValues } = this.props
    const id = initialValues.get('id')

    this.status = 'deleted'
    this.props.handleDelete(id)

    history.push(`/countries/${match.params.countryId}/journals`)
  }

  handleSubmit = (ev) => {
    ev.preventDefault()

    const { values } = this.state

    // Validate all fields
    const errors = Object.keys(validationRules).reduce((errorsAcc, fieldName) => {
      const error = validationRules[fieldName](values.get(fieldName), values)

      errorsAcc[fieldName] = error

      return errorsAcc
    }, {})

    const isFormValid = !Object.values(errors)
      .find(error => !!error)

    this.setState({ errors })
    this.status = isFormValid ? 'saved' : this.status

    if (isFormValid) {
      const {
        handleSubmit,
        history,
        match,
      } = this.props
      const trimmedValues = values.map(FU.trimIfString)

      handleSubmit(trimmedValues)
      history.push(`/countries/${match.params.countryId}/journals`)
    }
  }

  handleOpenUploadWidget = () => {
    const cl = pnjScripts.get('cloudinaryWidget')
    const openUploadWidget = () => {
      document.addEventListener('cloudinarywidgeterror', this.enableUploadBtn)
      document.addEventListener('cloudinarywidgetclosed', this.enableUploadBtn)

      cl.openUploadWidget(
        {
          cloud_name: CLOUDINARY_CLOUD_NAME,
          upload_preset: CLOUDINARY_UPLOAD_PRESET,
        },
        (err, res) => {
          if (res) {
            const photosData = res.map(photoData => I.Map({
              id: photoData.public_id,
              path: photoData.path,
              isNotSaved: true,
            }))

            this.setState(prevState => ({
              values: prevState.values.set('photos', prevState.values.get('photos').concat(photosData)),
              isUploadBtnEnabled: true,
            }))
          } else if (err) {
            console.error('Error upon uploading images:', err)
            this.enableUploadBtn()
          }
        },
      )

      if (!this.state.isClOpened)
        this.setState({ isClOpened: true })
    }

    if (cl) {
      this.setState({ isUploadBtnEnabled: false })
      openUploadWidget()
    } else {
      this.setState({ isUploadBtnEnabled: false })
      pnjScripts.setCallback(['cloudinaryWidget'], openUploadWidget)
    }
  }

  handleDeletePhoto = (photoId) => {
    this.setState(({ values }) => ({
      values: values.update('photos', photos =>
        photos.map(photo =>
          photo.get('id') === photoId
            ? photo.set('isDeleted', true)
            : photo)),
    }))
  }

  handleRestorePhoto = (photoId) => {
    this.setState(({ values }) => ({
      values: values.update('photos', photos =>
        photos.map(photo =>
          photo.get('id') === photoId
            ? photo.delete('isDeleted')
            : photo)),
    }))
  }

  handleSetPhotoDesc = (photoId, description) => {
    this.setState(({ values }) => ({
      values: values.set(
        'photos',
        values
          .get('photos')
          .map(photo => photo.get('id') === photoId
            ? photo.set('description', description)
            : photo)),
    }))
  }

  enableUploadBtn = () => !this.state.isUploadBtnEnabled &&
    this.setState({ isUploadBtnEnabled: true })

  rootElRef = (rootEl) => {
    this.rootEl = rootEl
  }

  render = () => {
    const { initialValues } = this.props
    const { values, errors, isUploadBtnEnabled } = this.state

    return (
      <form
        className='journal-form-form pt0 pb3 pr2 pl2'
        ref={this.rootElRef}
        onSubmit={this.handleSubmit}
      >
        <div className='dn db-l pt3 fw5 f5'>
          <Switch>
            <Route exact path='/countries/:countryId/journals/new' render={() => 'Add New Journal'} />
            <Route exact path='/countries/:countryId/journals/:id' render={() => 'Edit Journal'} />
          </Switch>
        </div>
        <TextField
          className='journal-form-title-field w-100--i db--i'
          floatingLabelText='Title*'
          floatingLabelFixed
          onChange={this.handleChangeTitle}
          errorText={errors.title || ''}
          value={values.get('title') || ''}
        />
        <TextField
          className='journal-form-text-content-field w-100--i db--i'
          floatingLabelText='Story'
          floatingLabelFixed
          onChange={this.handleChangeCopy}
          multiLine
          rowsMax={4}
          value={values.get('copy') || ''}
        />
        <DatePicker
          className='journal-form-departure-field'
          textFieldStyle={{ width: '100%' }}
          floatingLabelText='Departure Date'
          floatingLabelFixed
          onChange={this.handleChangeDeparture}
          errorText={errors.departure || ''}
          maxDate={values.get('homecoming')}
          value={values.get('departure') || null}
        />
        <DatePicker
          className='journal-form-homecoming-field'
          textFieldStyle={{ width: '100%' }}
          floatingLabelText='Homecoming Date'
          floatingLabelFixed
          onChange={this.handleChangeHomecoming}
          errorText={errors.homecoming || ''}
          minDate={values.get('departure')}
          value={values.get('homecoming') || null}
        />
        <div>
          <Subheader style={{ lineHeight: '24px !important' }} className='pt3--i pb2--i pl0--i'>
            Photos
          </Subheader>

          {
            values.get('photos').map(photo => (
              <PhotoFieldSet
                key={photo.get('id')}
                id={photo.get('id')}
                path={photo.get('path')}
                className='journal-form-photo-field-set'
                description={photo.get('description') || ''}
                isDeleted={photo.get('isDeleted')}
                handleDeletePhoto={this.handleDeletePhoto}
                handleRestorePhoto={this.handleRestorePhoto}
                handleSetPhotoDesc={this.handleSetPhotoDesc}
              />
            )).toJS()
          }

          <RaisedButton
            onClick={this.handleOpenUploadWidget}
            className='journal-form-upload-btn mt3'
            label={isUploadBtnEnabled ? 'Upload Photos' : 'Opening Image Uploader'}
            disabled={!isUploadBtnEnabled}
          />
        </div>

        <div className='tr'>
          {
            (initialValues &&
            initialValues.get('title')) &&
            <RaisedButton
              onClick={this.handleDelete}
              className='journal-form-delete-btn mt3 mr3'
              secondary
              label='Delete'
            />
          }

          <RaisedButton
            className='mt3'
            primary
            label='Save'
            type='submit'
          />
        </div>
      </form>
    )
  }
}

export default JournalForm
