import React from 'react'
import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import I from 'immutable'
import * as R from 'ramda'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from 'constants/'
import { cloudinaryUploadWidget as _cloudinaryUploadWidget } from 'services/cloudinary'
import * as FU from 'services/functionalUtils'
import CountryName from 'components/countryName'
import PhotoFieldSet from 'components/PhotoFieldSet'

const validationRules = {
  title: title => !title && 'title is required',
}

const JournalFormShell = ({ cloudinaryUploadWidget }) =>
  class JournalForm extends React.PureComponent {
    static propTypes = {
      handleSubmit: PropTypes.func.isRequired,
      handleDelete: PropTypes.func,
      initialValues: IPropTypes.contains({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        textContent: PropTypes.string,
        departure: PropTypes.instanceOf(Date),
        homecoming: PropTypes.instanceOf(Date),
        photos: IPropTypes.listOf(IPropTypes.contains({
          id: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          description: PropTypes.string,
        })),
      }).isRequired,
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
      match: PropTypes.shape({
        params: PropTypes.shape({
          countryId: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      handleDeletePhotos: PropTypes.func.isRequired,
    }

    state = {
      values: I.Map({
        photos: this.props.initialValues.get('photos') || I.List([]),
      }),
      errors: {},
      initialValues: this.props.initialValues.delete('photos'),
      photosDeleted: [],
    }

    componentWillUnmount = () => {
      const { handleDeletePhotos } = this.props
      const { values } = this.state

      handleDeletePhotos(values.get('photos'))
    }

    makeHandleChange = fieldName => (ev, newVal) => {
      const error = validationRules[fieldName]
        ? validationRules[fieldName](newVal, this.state.values)
        : ''

      this.setState(({initialValues, values, errors}) => ({
        initialValues: initialValues && initialValues.filter((v, k) =>
          k !== fieldName
        ),
        values: values.set(fieldName, newVal),
        errors: R.merge(errors, { [fieldName]: error }),
      }))
    }

    getFinalProp = (fieldName) => {
      const { values, initialValues } = this.state

      if (values.get(fieldName))
        return values.get(fieldName)
      else if (initialValues && initialValues.get(fieldName))
        return initialValues.get(fieldName)
    }

    handleChangeTitle = this.makeHandleChange('title')
    handleChangeTextContent = this.makeHandleChange('textContent')
    handleChangeDeparture = this.makeHandleChange('departure')
    handleChangeHomecoming = this.makeHandleChange('homecoming')
    handleDelete = () => {
      const { match, history, initialValues } = this.props
      const id = initialValues.get('id')

      this.props.handleDelete(id)

      history.push(`/countries/${match.params.countryId}`)
    }
    handleSubmit = (ev) => {
      ev.preventDefault()

      // Merge values with final initial values, if any
      const mergedValues = this.state.initialValues
        ? this.state.initialValues.merge(this.state.values)
        : this.state.values

      // Validate all fields
      const errors = Object.keys(validationRules).reduce((errorsAcc, fieldName) => {
        const error = validationRules[fieldName](mergedValues.get(fieldName), mergedValues)

        errorsAcc[fieldName] = error

        return errorsAcc
      }, {})

      const isFormValid = !Object.values(errors)
        .find(error => !!error)

      this.setState({
        errors
      })

      if (isFormValid) {
        const {
          handleSubmit,
          history,
          match,
        } = this.props
        const trimmedValues = mergedValues.map(FU.trimIfString)

        handleSubmit(trimmedValues, this.state.photosDeleted)
        history.push(`/countries/${match.params.countryId}`)
      }
    }
    handleOpenUploadWidget = () => {
      cloudinaryUploadWidget.openUploadWidget(
        {
          cloud_name: CLOUDINARY_CLOUD_NAME,
          upload_preset: CLOUDINARY_UPLOAD_PRESET,
        },
        (err, res) => {
          if (err) console.error('Error upon uploading:', err)

          const photosData = res.map(photoData => I.Map({
            id: photoData.public_id,
            path: photoData.path,
            isNew: true,
          }))

          this.setState(prevState => ({
            values: prevState.values.set('photos', prevState.values.get('photos').concat(photosData)),
          }))
        },
      )
    }
    handleDeletePhoto = (photoId) => {
      this.setState(({ values }) => ({
          values: values.update('photos', photos =>
            photos.map(photo =>
              photo.get('id') === photoId
                ? photo.set('isDeleted', true)
                : photo))
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
              : photo
            )
        ),
      }))
    }

    rootElRef = (rootEl) => {
      this.rootEl = rootEl
    }

    render = () => {
      const countryId = this.props.match.params.countryId
      const { values, errors, initialValues } = this.state

      return (
        <form
          className='journal-form-form pt2 pb3 pr2 pl2'
          ref={this.rootElRef}
          onSubmit={this.handleSubmit}
        >
          <CountryName
            className='journal-form-country-name ma0'
            wrapperEl='h2'
            countryId={countryId}
          />
          <TextField
            className='journal-form-title-field w-100--i db--i'
            floatingLabelText='Title*'
            floatingLabelFixed
            onChange={this.handleChangeTitle}
            errorText={errors.title || ''}
            value={this.getFinalProp('title') || ''}
          />
          <TextField
            className='journal-form-text-content-field w-100--i db--i'
            floatingLabelText='Text Content'
            floatingLabelFixed
            onChange={this.handleChangeTextContent}
            multiLine
            rowsMax={4}
            value={this.getFinalProp('textContent') || ''}
          />
          <DatePicker
            className='journal-form-departure-field'
            textFieldStyle={{ width: '100%' }}
            floatingLabelText='Departure Date'
            floatingLabelFixed
            onChange={this.handleChangeDeparture}
            errorText={errors.departure || ''}
            minDate={new Date()}
            maxDate={values.get('homecoming')}
            value={this.getFinalProp('departure') || null}
          />
          <DatePicker
            className='journal-form-homecoming-field'
            textFieldStyle={{ width: '100%' }}
            floatingLabelText='Homecoming Date'
            floatingLabelFixed
            onChange={this.handleChangeHomecoming}
            errorText={errors.homecoming || ''}
            minDate={values.get('departure') || new Date()}
            value={this.getFinalProp('homecoming') || null}
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
                  handleSetPhotoDesc={this.handleSetPhotoDesc}
                />
              )).toJS()
            }

            <RaisedButton
              onClick={this.handleOpenUploadWidget}
              className='journal-form-upload-btn mt3'
              label='Upload Photos'
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

const JournalForm = JournalFormShell({ cloudinaryUploadWidget: _cloudinaryUploadWidget })

export { JournalFormShell }
export default JournalForm
